import {OnInit, Component} from "@angular/core";
import {ApiService} from "../service/api.service";
import {Tweet} from "../model/tweet";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'favorites',
    templateUrl: 'favorites.component.html'
})
//Composant qui gère la page des favoris.
export class FavoritesComponent implements OnInit {

    //Nos tweets à afficher.
    tweets: Tweet[] = [];

    //Constructeur simple qui utilise l'injection de dépendence angular pour récupérer ce dont il a besoin.
    constructor(private api: ApiService, private auth: AuthService, private router:Router) {
    }

    //Retire un élément de notre tableau.
    remove(tweet_id:string){
        let index = 0;
        this.tweets.forEach(tweet => {
            if(tweet.id_str === tweet_id){
                this.tweets.splice(index, 1);
                return;
            }
            index++;
        })
    }

    //Fonction exécutée une fois le composant chargé, elle vérifie la connection et charge les tweets.
    ngOnInit(): void {
        if (!this.auth.isConnected()) {
            this.router.navigateByUrl("/login");
        }
        this.api.get<FavoriteTweet[]>('/users/' + this.auth.getUserId() + '/saved').subscribe(favorites => {
            favorites.forEach(favorite => {
                this.api.get<Tweet>('/users/' + this.auth.getUserId() + '/saved/' + favorite.id).subscribe(tweet => {
                    this.tweets.push(tweet);
                });
            });
        });
    }
}

//Modèle simple qui sert de helper pour contenter le transpileur typescript et éviter de typer en any.
export interface FavoriteTweet {
    id: number;
    tweeter_id: number;
}