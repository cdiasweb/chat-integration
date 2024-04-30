import { TurnProps } from './turn';
import { ChatPersistence, ChatPosition } from '@voiceflow/voiceflow-types/build/cjs/version/chat';
import { RuntimeAction } from '@voiceflow/sdk-runtime';

export { ChatPersistence, ChatPosition };
export type { RuntimeAction };
export type SendMessage = (action: RuntimeAction, message?: string) => Promise<void>;
export declare enum SessionStatus {
    IDLE = "IDLE",
    ACTIVE = "ACTIVE",
    ENDED = "ENDED"
}
export interface SessionOptions {
    userID: string;
    turns?: TurnProps[];
    startTime?: number;
    status?: SessionStatus;
}
//# sourceMappingURL=session.d.ts.map