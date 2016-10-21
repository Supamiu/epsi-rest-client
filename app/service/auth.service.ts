import {Injectable} from "@angular/core";
import {User} from "../model/user";
@Injectable()
export class AuthService {

    public user: User = null;

    public key: string = null;

    public isConnected(): boolean {
        return this.key !== null;
    }

    getUserId(): number {
        return +atob(this.key).split(':')[0];
    }
}