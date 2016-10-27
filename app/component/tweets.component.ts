import {Component, Input} from "@angular/core";
import {ApiService} from "../service/api.service";
import {AuthService} from "../service/auth.service";
import {Tweet} from "../model/tweet";
@Component({
    moduleId: module.id,
    selector: 'tweets',
    templateUrl: 'tweets.component.html'
})
export class TweetsComponent {
    @Input() friendId: number;

    //Tweets à afficher.
    tweets: Tweet[];

    //gestion de la DI.
    constructor(private api: ApiService, private auth: AuthService) {
    }

    //Charge les tweets à afficher.
    load(): void {
        console.log("LOADING TWEETS");
        this.api.get<Tweet[]>('/users/' + this.auth.getUserId() + "/friends/" + this.friendId + "/tweets").subscribe(tweets => {
            console.log("TWEETS LOADED");
            this.tweets = tweets;
        })
    }
}