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
//Vue de login, simple et efficace.
export class LoginComponent {

    private login: string;

    private password: string;

    //On gère la DI et on efface les traces du précédent login.
    constructor(private api: ApiService, private auth: AuthService, private router: Router) {
        localStorage.removeItem("api_key");
        localStorage.removeItem("user");
    }

    //Requête API pour la connection.
    connect(): void {
        this.api.get<{key: string}>("/login?login=" + this.login + "&password=" + this.password).subscribe(result => {
            this.auth.key = result.key;
            this.router.navigateByUrl('/home');
        });
    }

    //On redirige vers la page de signup pour créer un compte.
    signup(): void {
        this.router.navigateByUrl('/signup');
    }
}