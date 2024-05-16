import { AssistantOptions, ChatConfig } from '@voiceflow/react-chat';
import {
  ConfettiExtension,
  DiscountFormExtension,
  FormExtension,
  GetYourDiscount
} from "../extensions/chatbot-extensions";
const imageLogo = 'https://cdiasweb.github.io/chat-integration/examples/live-agent/build/logo.jpeg';

const IMAGE = imageLogo;
const AVATAR = imageLogo;

export const ASSISTANT: AssistantOptions = AssistantOptions.parse({
  title: "Asistencia Virtual Farmapiel",
  description: "Deja que te ayude.",
  image: IMAGE,
  avatar: AVATAR,
  color: '#7199A0',
  extensions: [FormExtension, DiscountFormExtension, ConfettiExtension, GetYourDiscount],
  watermark: false
});

export const CONFIG = ChatConfig.parse({
  verify: { projectID: import.meta.env.VF_PROJECT_ID },
});
