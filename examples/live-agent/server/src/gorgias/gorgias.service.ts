/* eslint-disable no-restricted-syntax, xss/no-mixed-html */
import { stripHtml } from 'string-strip-html';
import { WebSocket } from 'ws';

import axios from '../axios';
import { connectLiveAgent, disconnectLiveAgent, sendLiveAgentMessage } from '../sockets';
import { UserData } from './gorgias.user.data';

export class GorgiasService {
  private readonly conversations = new Map<string, WebSocket>();

  private readonly conversationsAssigned = new Map<string, boolean>();

  private readonly userData = new Map<string, UserData>();

  private send(conversationID: string, event: { type: string; data: any }) {
    const ws = this.conversations.get(String(conversationID));
    console.log('FOUND WS: ', conversationID, !!ws);
    ws?.send(JSON.stringify(event));
  }

  public async connectAgent(conversation: any) {
    const agent = {
      name: conversation?.ticket?.assignee_user?.firstname ?? 'Agent',
    };
    const conversationID = conversation?.ticket?.id ?? '';
    console.log('Connect Agent: ', agent, ' Conversation ID: ', conversationID);

    // Check if already assigned or close ticket
    if (this.conversationsAssigned.get(conversationID)) {
      const ticketClosed = conversation?.ticket?.status === 'closed';
      if (ticketClosed) {
        console.log('Disconnecting agent...');
        await this.disconnectAgent(conversation);
        return;
      }

      console.warn('Agent already assigned to conversation ID: ', conversationID);
      return;
    }

    this.conversationsAssigned.set(conversationID, true);

    this.send(conversationID, connectLiveAgent(conversation, agent));
  }

  public async disconnectAgent(conversation: any) {
    const agent = conversation?.ticket?.assignee_user?.firstname ?? 'Agent';

    this.send(conversation.id, disconnectLiveAgent(conversation, agent));
    this.conversations.get(conversation.id)?.close();
    this.conversations.delete(conversation.id);
  }

  public async sendAgentReply(conversation: any) {
    const conversationID = conversation.ticket.id;
    const message = conversation.message.text;

    this.send(conversationID, sendLiveAgentMessage(message));
  }

  public async sendUserReply(userID: string, conversationID: string, message: string) {
    console.log('sendUserReply', message, userID, conversationID);
    const userData = this.userData.get(String(userID));
    const userEmail = userData?.email ?? 'support@test.com';
    const userName = userData?.name ?? 'user_name@test.com';
    await this.sendUserMessageToTicket(userEmail, userName, conversationID, message);
  }

  public async createConversation(conversationData: any) {
    const name = conversationData?.name ?? 'Empty name';
    const email = conversationData?.email ?? 'empty@email.com'
    console.log(name, email);

    const ticket = await this.createTicket(name, email, conversationData.history);

    const customerID = ticket.customer.id;

    this.userData.set(String(customerID), {
      email,
      name,
    });
    console.log(this.userData);

    return {
      userID: customerID,
      conversationID: ticket.id,
    };
  }

  public async sendHistory(userID: string, conversationID: string, history: Array<{ author: string; text: string }>) {
    for (const { author, text } of history) {
      console.log('SEND HISTORY: ', author, text);
    }
  }

  public async subscribeToConversation(conversationID: string, ws: WebSocket, handler: (event: { type: string; data: any }) => any) {
    ws.on('message', (message) => handler(JSON.parse(message.toString())));
    this.conversations.set(conversationID, ws);
  }

  public async createCustomer(name: any, email: any) {
    const response = await axios.post('/customer', {
      name,
      email,
    });

    return response.data;
  }

  public async createTicket(name: any, email: any, messages: Array<any>) {
    const history = [];
    for (const message of messages) {
      history.push({
        sender: {
          email,
          name,
        },
        body_text: message.text,
        channel: 'api',
        from_agent: false,
        subject: `from: ${name}`,
        via: 'api',
      });
    }
    const data = {
      customer: {
        name,
        email,
      },
      messages: history,
      tags: [
        {
          name: 'Chatbot ticket',
        },
      ],
      channel: 'api',
      from_agent: false,
      status: 'open',
      via: 'api',
    };

    const response = await axios.post('/tickets', data);

    return response.data;
  }

  public async sendUserMessageToTicket(userEmail: string, userName: string, conversationID: string, textMessage: string) {
    const message = {
      channel: 'api',
      from_agent: false,
      sender: {
        email: userEmail,
        name: userName,
      },
      source: {
        type: 'api',
      },
      via: 'api',
      body_text: textMessage,
    };

    const response = await axios.post(`/tickets/${conversationID}/messages?action=force`, message);

    return response.data;
  }
}
