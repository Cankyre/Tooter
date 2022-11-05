/// <reference types="node" />
import { TimeLike } from 'fs';
export declare type ClientOptions = {
    token: string;
    url: string;
};
export declare type Application = {
    name: string;
    website: string | null;
    vapid_key: string | null;
};
export declare type Token = {
    access_token: string;
    token_type: string;
    scope: string;
    created_at: TimeLike;
};
export declare type OauthTokenOptions = {
    url: string;
    clientId: string;
    clientSecret: string;
    redirectURI?: string;
    scope?: string;
    code: string;
};
export declare type PostContent = {
    status: string;
    mediaIDs?: (number | string)[];
    poll?: {
        options: string[];
        expiresIn: number;
        multiple?: boolean;
        hideTotals?: boolean;
    };
    inReplyTo?: string;
    sensitive?: boolean;
    spoiler?: boolean;
    visibility?: "public" | "unlisted" | "private" | "direct";
    scheduled?: Date;
    language?: String;
};
