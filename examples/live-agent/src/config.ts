import { AssistantOptions, ChatConfig } from '@voiceflow/react-chat';

const imageLogo = 'https://cdiasweb.github.io/chat-integration/examples/live-agent/shared/logo.jpeg';

const IMAGE = imageLogo;
const AVATAR = imageLogo;

export const ASSISTANT: AssistantOptions = AssistantOptions.parse({
  title: "Asistencia Virtual Farmapiel",
  description: "Deja que te ayude.",
  image: IMAGE,
  avatar: AVATAR,
});

export const CONFIG = ChatConfig.parse({
  verify: { projectID: import.meta.env.VF_PROJECT_ID },
});
