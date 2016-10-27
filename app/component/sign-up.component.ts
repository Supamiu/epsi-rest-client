import {Component} from "@angular/core";
import {AuthService} from "../service/auth.service";
import {ApiService} from "../service/api.service";
import {Router} from "@angular/router";
@Component({
    moduleId: module.id,
    selector: 'signup',
    templateUrl: './sign-up.component.html',
    styles: ['#wrapper{height:100%}']
})
//Création de compte, un formulaire et une requête HTTP.
export class SignupComponent {
    login: string;

    password: string;

    password_confirm: string;

    constructor(private api: ApiService, private auth: AuthService, private router: Router) {
    }

    //Envoi de la requête HTTP pour la création de compte.
    signup(): void {
        if (this.password === this.password_confirm) {
            this.api.post<{key: string}>('/users', JSON.stringify({
                login: this.login,
                password: this.password
            })).subscribe(data => {
                this.auth.key = data.key;
                this.router.navigateByUrl('/home');
            });
        } else {
            Materialize.toast('Les mots de passe ne correspondent pas.', 4000);
        }
    }
}