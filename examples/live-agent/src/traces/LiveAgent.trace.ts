import type { TraceHandler } from '@voiceflow/react-chat';

import type { LiveAgentPlatform } from '../../shared/live-agent-platform.enum';

export const LiveAgent = (handoff: (payload: any) => void): TraceHandler => ({
  canHandle: ({ type }) => (type as string) === 'talk_to_agent',
  handle: ({ context }, trace) => {
    handoff(trace.payload);
    return context;
  },
});
