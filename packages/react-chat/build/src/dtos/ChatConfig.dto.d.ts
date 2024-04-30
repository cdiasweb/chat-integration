import { RenderMode } from './RenderOptions.dto';
import { RawAssistantOptions } from './AssistantOptions.dto';
import { z } from 'zod';
import { PublicVerify, RuntimeOptions as SDKRuntimeOptions } from '@voiceflow/sdk-runtime';
import { BaseRequest } from '@voiceflow/base-types';

export declare const RUNTIME_URL = "https://general-runtime.voiceflow.com";
export type VerifyOptions = z.infer<typeof VerifyOptions>;
export type UserOptions = z.infer<typeof UserOptions>;
export type LaunchOptions = z.infer<typeof LaunchOptions>;
export declare const VerifyOptions: z.ZodObject<{
    projectID: z.ZodString;
}, "strip", z.ZodTypeAny, {
    projectID: string;
}, {
    projectID: string;
}>;
export declare const LaunchOptions: z.ZodObject<{
    event: z.ZodOptional<z.ZodEffects<z.ZodObject<{
        type: z.ZodString;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        type: z.ZodString;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        type: z.ZodString;
    }, z.ZodTypeAny, "passthrough">>, BaseRequest.BaseRequest<unknown>, z.objectInputType<{
        type: z.ZodString;
    }, z.ZodTypeAny, "passthrough">>>;
}, "strip", z.ZodTypeAny, {
    event?: BaseRequest.BaseRequest<unknown> | undefined;
}, {
    event?: z.objectInputType<{
        type: z.ZodString;
    }, z.ZodTypeAny, "passthrough"> | undefined;
}>;
export declare const UserOptions: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    image?: string | undefined;
}, {
    name?: string | undefined;
    image?: string | undefined;
}>;
export interface ChatConfig extends z.infer<typeof ChatConfig>, SDKRuntimeOptions<PublicVerify> {
}
export interface RawChatConfig extends z.input<typeof ChatConfig>, Omit<SDKRuntimeOptions<PublicVerify>, 'url'> {
}
export interface LoadConfig extends RawChatConfig {
    assistant?: RawAssistantOptions;
}
export declare const ChatConfig: z.ZodEffects<z.ZodObject<{
    autostart: z.ZodOptional<z.ZodBoolean>;
    allowDangerousHTML: z.ZodDefault<z.ZodBoolean>;
    url: z.ZodDefault<z.ZodString>;
    userID: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string, string | number>>;
    versionID: z.ZodOptional<z.ZodString>;
    verify: z.ZodObject<{
        projectID: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        projectID: string;
    }, {
        projectID: string;
    }>;
    user: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        image?: string | undefined;
    }, {
        name?: string | undefined;
        image?: string | undefined;
    }>>;
    render: z.ZodEffects<z.ZodOptional<z.ZodObject<{
        mode: z.ZodDefault<z.ZodNativeEnum<typeof RenderMode>>;
        target: z.ZodEffects<z.ZodOptional<z.ZodType<HTMLElement, z.ZodTypeDef, HTMLElement>>, HTMLElement | undefined, HTMLElement | undefined>;
    }, "strip", z.ZodTypeAny, {
        mode: RenderMode;
        target?: HTMLElement | undefined;
    }, {
        mode?: RenderMode | undefined;
        target?: HTMLElement | undefined;
    }>>, {
        mode: RenderMode.EMBEDDED;
        target: HTMLElement;
    } | {
        mode: RenderMode.OVERLAY;
        target?: undefined;
    }, {
        mode?: RenderMode | undefined;
        target?: HTMLElement | undefined;
    } | undefined>;
    launch: z.ZodOptional<z.ZodObject<{
        event: z.ZodOptional<z.ZodEffects<z.ZodObject<{
            type: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            type: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            type: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, BaseRequest.BaseRequest<unknown>, z.objectInputType<{
            type: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>>;
    }, "strip", z.ZodTypeAny, {
        event?: BaseRequest.BaseRequest<unknown> | undefined;
    }, {
        event?: z.objectInputType<{
            type: z.ZodString;
        }, z.ZodTypeAny, "passthrough"> | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    url: string;
    render: {
        mode: RenderMode.EMBEDDED;
        target: HTMLElement;
    } | {
        mode: RenderMode.OVERLAY;
        target?: undefined;
    };
    allowDangerousHTML: boolean;
    verify: {
        projectID: string;
    };
    autostart?: boolean | undefined;
    userID?: string | undefined;
    versionID?: string | undefined;
    user?: {
        name?: string | undefined;
        image?: string | undefined;
    } | undefined;
    launch?: {
        event?: BaseRequest.BaseRequest<unknown> | undefined;
    } | undefined;
}, {
    verify: {
        projectID: string;
    };
    autostart?: boolean | undefined;
    allowDangerousHTML?: boolean | undefined;
    url?: string | undefined;
    userID?: string | number | undefined;
    versionID?: string | undefined;
    user?: {
        name?: string | undefined;
        image?: string | undefined;
    } | undefined;
    render?: {
        mode?: RenderMode | undefined;
        target?: HTMLElement | undefined;
    } | undefined;
    launch?: {
        event?: z.objectInputType<{
            type: z.ZodString;
        }, z.ZodTypeAny, "passthrough"> | undefined;
    } | undefined;
}>, {
    autostart: boolean;
    url: string;
    render: {
        mode: RenderMode.EMBEDDED;
        target: HTMLElement;
    } | {
        mode: RenderMode.OVERLAY;
        target?: undefined;
    };
    allowDangerousHTML: boolean;
    verify: {
        projectID: string;
    };
    userID?: string | undefined;
    versionID?: string | undefined;
    user?: {
        name?: string | undefined;
        image?: string | undefined;
    } | undefined;
    launch?: {
        event?: BaseRequest.BaseRequest<unknown> | undefined;
    } | undefined;
}, {
    verify: {
        projectID: string;
    };
    autostart?: boolean | undefined;
    allowDangerousHTML?: boolean | undefined;
    url?: string | undefined;
    userID?: string | number | undefined;
    versionID?: string | undefined;
    user?: {
        name?: string | undefined;
        image?: string | undefined;
    } | undefined;
    render?: {
        mode?: RenderMode | undefined;
        target?: HTMLElement | undefined;
    } | undefined;
    launch?: {
        event?: z.objectInputType<{
            type: z.ZodString;
        }, z.ZodTypeAny, "passthrough"> | undefined;
    } | undefined;
}>;
//# sourceMappingURL=ChatConfig.dto.d.ts.map