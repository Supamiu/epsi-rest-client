import {Component} from "@angular/core";
import {ApiService} from "../service/api.service";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: './log-in.component.html',
    styles: ['#wrapper{height:100%}']
})
export class LoginComponent {

    private login: string;

    private password: string;

    constructor(private api: ApiService, private auth: AuthService, private router: Router) {
    }

    connect(): void {
        this.api.get<{key: string}>("/login?login=" + this.login + "&password=" + this.password).subscribe(result => {
            this.auth.key = result.key;
            this.router.navigateByUrl('/home');
        });
    }

    signup(): void {
        this.router.navigateByUrl('/signup');
    }
}