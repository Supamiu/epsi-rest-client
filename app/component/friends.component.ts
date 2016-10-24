import {ViewChild, Component, Input, OnChanges} from "@angular/core";
import {ApiService} from "../service/api.service";
import {AuthService} from "../service/auth.service";
import {TweetsComponent} from "./tweets.component";

@Component({
    moduleId: module.id,
    selector: 'friends',
    templateUrl: 'friends.component.html'
})
export class FriendsComponent implements OnChanges {

    @Input() friendIds: number[];

    public twitter_friends: any[] = [];

    @ViewChild(TweetsComponent) tweets: TweetsComponent;

    constructor(private api: ApiService, private auth: AuthService) {
    }

    loadTweets(): void {
        this.tweets.load();
    }

    ngOnChanges(): void {
        if (this.friendIds !== undefined) {
            if (this.friendIds.length > 0) {
                this.api.get<any>('/users/' + this.auth.getUserId() + "/friends/lookup?ids=" + this.friendIds.join(',')).subscribe(friends => {
                    if (friends.errors === undefined) {
                        this.twitter_friends = <any[]>friends;
                    }
                });
            }
        }
    }
}