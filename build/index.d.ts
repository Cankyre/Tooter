import { ClientOptions, Application, PostContent } from './types';
import { getToken } from './actions/oauth';
export declare class Tooter {
    url: string;
    token: string;
    constructor(options: ClientOptions);
    verifyToken(): Promise<Application>;
    toot(status: string | PostContent): Promise<any>;
}
export { getToken };
