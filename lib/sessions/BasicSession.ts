import {TokenManager} from '../TokenManager';

export class BasicSession {
    public tokenManager: TokenManager;
    private accessToken: string;

    constructor (accessToken: string, tokenManager: TokenManager) {
        this.accessToken = accessToken;
        this.tokenManager = tokenManager;
    }

    public getAccessToken () {
        return this.accessToken;
    }

}