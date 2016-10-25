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
export class FavoritesComponent implements OnInit {

    favorites: Tweet[] = [];

    constructor(private api: ApiService, private auth: AuthService, private router:Router) {
    }

    ngOnInit(): void {
        if (!this.auth.isConnected()) {
            this.router.navigateByUrl("/login");
        }
        this.api.get<FavoriteTweet[]>('/users/' + this.auth.getUserId() + '/saved').subscribe(favorites => {
            favorites.forEach(favorite => {
                this.api.get<Tweet>('/users/' + this.auth.getUserId() + '/saved/' + favorite.id).subscribe(tweet => {
                    this.favorites.push(tweet);
                })
            });
        });
    }
}

export interface FavoriteTweet {
    id: number;
    tweeter_id: number;
}