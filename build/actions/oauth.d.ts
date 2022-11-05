import { OauthTokenOptions, Token, Application } from '../types';
export declare function getToken(options: OauthTokenOptions): Promise<Token>;
export declare function verifyToken(token: string, url: string): Promise<Application>;
