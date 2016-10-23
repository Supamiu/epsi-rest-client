import {Injectable} from "@angular/core";
import {User} from "../model/user";
@Injectable()
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
}