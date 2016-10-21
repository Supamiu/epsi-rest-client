export interface User {
    id?: number;

    login: string;

    password: string;

    oauth?: string;

    oauth_secret?: string;
}