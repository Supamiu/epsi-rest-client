import {Injectable} from "@angular/core";
import {User} from "../model/user";
@Injectable()
//Service d'uahtntification, utilise le localstorage pour stocker une clef et un utilisateur,
//Le but étant de pouvoir donner une clef à l'API pour authentifier l'utilisateur lors de la requête.
export class AuthService {

    public get key(): string {
        return localStorage.getItem("api_key");
    }

    public set key(key: string) {
        localStorage.setItem("api_key", key);
    }

    public get user(): User {
        return <User>JSON.parse(localStorage.getItem("user"));
    }

    public set user(user: User) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    public isConnected(): boolean {
        return this.key !== null;
    }

    public getUserId(): number {
        return +atob(this.key).split(':')[0];
    }

    public getUserName(): string {
        return atob(this.key).split(':')[1];
    }
}