import {TokenManager} from '../TokenManager';

export class BasicSession {
    public tokenManager: TokenManager;
    public expired: boolean;
    private accessToken: string;

    constructor (accessToken: string, tokenManager: TokenManager) {
        this.accessToken = accessToken;
        this.tokenManager = tokenManager;
        this.expired = false;
    }

    public getAccessToken () {
        return this.accessToken;
    }

    public handleExpiredToken (err: Error) {
        this.expired = true;
        return Promise.reject(err);
    }

}