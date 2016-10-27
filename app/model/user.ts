//Modèle d'un utilisateur, avec un id, oauth, et oauth_secret optionnels.
export interface User {
    id?: number;

    login: string;

    password: string;

    oauth?: string;

    oauth_secret?: string;
}