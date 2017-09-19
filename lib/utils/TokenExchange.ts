export interface TokenRequestData {
    grant_type: 'client_credentials' | 'refresh_grant' | 'password' | 'authorization_code';
    refresh_token?: string;
    code?: string;
}
