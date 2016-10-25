import {Component, Input} from "@angular/core";
import {Tweet} from "../model/tweet";
import {ApiService} from "../service/api.service";
import {AuthService} from "../service/auth.service";
@Component({
    moduleId: module.id,
    selector: 'tweet',
    templateUrl: 'tweet.component.html'
})
export class TweetComponent {

    @Input() tweet: Tweet;

    @Input() favorite: boolean = false;

    constructor(private api: ApiService, private auth: AuthService) {
    }

    getTweetDate(): string {
        return new Date(this.tweet.created_at).toLocaleDateString();
    }

    addFavorite(): void {
        console.log("ADD FAVORITE !");
        return this.api.post<{error?: string}>('/users/' + this.auth.getUserId() + '/saved', JSON.stringify({tweeter_id: this.tweet.id})).subscribe();
    }

    deleteFavorite(): void {
        return this.api.delete('/users/' + this.auth.getUserId() + '/saved/' + this.tweet.id).subscribe();
    }
}