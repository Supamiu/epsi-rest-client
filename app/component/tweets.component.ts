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

    tweets: Tweet[];

    constructor(private api: ApiService, private auth: AuthService) {
    }

    load(): void {
        this.api.get<Tweet[]>('/users/' + this.auth.getUserId() + "/friends/" + this.friendId + "/tweets").subscribe(tweets => {
            this.tweets = tweets;
        })
    }
}