import {Component, Input} from "@angular/core";
import {Tweet} from "../model/tweet";
import {ApiService} from "../service/api.service";
import {AuthService} from "../service/auth.service";
@Component({
    moduleId: module.id,
    selector: 'tweet',
    templateUrl: 'tweet.component.html'
})
//Gestion de l'affichage et des actions sur un tweet.
export class TweetComponent {

    @Input() tweet: Tweet;

    @Input() favorite: boolean = false;

    constructor(private api: ApiService, private auth: AuthService) {
    }

    //Formatte la date proprement à partir de la date twitter.
    getTweetDate(): string {
        return new Date(this.tweet.created_at).toLocaleDateString();
    }

    //Ajout le tweet en favoris.
    addFavorite(): void {
        this.api.post<{error?: string}>('/users/' + this.auth.getUserId() + '/saved', JSON.stringify({tweeter_id: this.tweet.id})).subscribe();
    }

    //Retire le tweet des favoris.
    deleteFavorite(): void {
        this.api.delete('/users/' + this.auth.getUserId() + '/saved/' + this.tweet.id).subscribe();
    }
}