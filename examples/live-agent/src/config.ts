import { AssistantOptions, ChatConfig } from '@voiceflow/react-chat';
import {FormExtension} from "../extensions/chatbot-extensions";
const imageLogo = '/logo.jpeg';

const IMAGE = imageLogo;
const AVATAR = imageLogo;

export const ASSISTANT: AssistantOptions = AssistantOptions.parse({
  title: "Asistencia Virtual Farmapiel",
  description: "Deja que te ayude.",
  image: IMAGE,
  avatar: AVATAR,
  color: '#09A1B9',
  extensions: [FormExtension]
});

export const CONFIG = ChatConfig.parse({
  verify: { projectID: import.meta.env.VF_PROJECT_ID },
});
