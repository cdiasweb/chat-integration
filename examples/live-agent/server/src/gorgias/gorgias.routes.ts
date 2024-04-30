import { SocketEvent } from './socket-event.enum';
import { Application } from 'express-ws';
import { match } from 'ts-pattern';
import { GorgiasService } from './gorgias.service';
import { WebSocket } from 'ws';
export const gorgiasRoutes = async (app: Application) => {
  const gorgias = new GorgiasService();
  // Gorgias event
  app.post(`/gorgias/user/:userID/conversation/:conversationID/ticket_updated`, async (req, res) => {
    const { userID, conversationID } = req.params;
    const webhookData = req.body;
    const assigneeUser = webhookData?.ticket?.assignee_user;
    // Assign support member
    if (assigneeUser) {
      await gorgias?.connectAgent(webhookData);
    }

    res.send('ok');
  });

  app.post(`/gorgias/user/:userID/conversation/:conversationID/ticket_message`, async (req, res) => {
    const { userID, conversationID } = req.params;
    const webhookData = req.body;
    const assigneeUser = webhookData?.ticket?.assignee_user;

    console.log('ticket message:', webhookData);
    if (webhookData.message.from_agent) {
      await gorgias.sendAgentReply(webhookData);
    }

    res.send('ok');
  });

  app.ws(`/gorgias/user/:userID/conversation/:conversationID/socket`, async (ws, req) => {
    const { userID, conversationID } = req.params;
    console.log('Received a socket message: ', userID, conversationID, req.params, req.body);
    await gorgias.subscribeToConversation(conversationID, ws, (event) =>
      match(event.type)
        .with(SocketEvent.USER_MESSAGE, () => gorgias?.sendUserReply(userID, conversationID, event.data.message))
        .otherwise(() => console.warn('unknown event', event))
    );
  });

  app.head('/gorgias', (req, res) => {
    res.send('ok');
  });

  app.post('/gorgias/conversation', async (req, res) => {
    const { userID, conversationID } = await gorgias.createConversation(req.body);

    res.json({ userID, conversationID });

    await gorgias.sendHistory(userID, conversationID, req.body.history);
  });

  app.ws(`/socket`, async (ws, req) => {
    const { userID, conversationID } = req.params;
    console.log('socket message: ', userID, conversationID);
    await gorgias.subscribeToConversation(conversationID, ws, (event) =>
      match(event.type)
        .with(SocketEvent.LIVE_AGENT_CONNECT, () => gorgias?.connectAgent(event.data))
        .otherwise(() => console.warn('unknown event', event))
    );
  });
};
