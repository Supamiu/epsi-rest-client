import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {ApiService} from "../service/api.service";
import {User} from "../model/user";

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    //Les Ids de nos amis, remplis par ngOnInit
    private friendIds: number[] = [];

    //Gestion des dépendences.
    constructor(private api: ApiService, private auth: AuthService
        , private router: Router, private route: ActivatedRoute) {
    }

    //Charge le contenu de la page.
    load(): void {
        this.api.get<{ids: number[]}>('/users/' + this.auth.getUserId() + '/friends').subscribe(friends => {
            this.friendIds = friends.ids;
        });
    }

    //Exécutée une fois le comosant chargé.
    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            if (params.hasOwnProperty("oauth_token") && params.hasOwnProperty("oauth_verifier")) {
                this.api.post<User>("/users/" + this.auth.getUserId() + "/oauth", JSON.stringify(params)).subscribe(user => {
                    this.auth.user = user;
                    this.load();
                });
            }
        });
        $('.collapsible').collapsible({
            accordion: false
        });
        if (!this.auth.isConnected()) {
            this.router.navigateByUrl("/login");
        } else {
            if (this.auth.user === null) {
                this.api.get<User>('/users/' + this.auth.getUserId()).subscribe(user => {
                    this.auth.user = user;
                    if (user.oauth !== null && user.oauth_secret !== null) {
                        this.load();
                    } else {
                        $('#modal1').openModal();
                    }
                });
            }else{
                this.load();
            }
        }
    }

    //Ajoute la connection avec twitter.
    signInWithTwitter() {
        this.api.get<{link: string}>('/users/' + this.auth.getUserId() + '/oauth').subscribe(res => {
            window.location.href = res.link;
        })
    }
}