import {Component, Input, EventEmitter, Output} from "@angular/core";
import {Tweet} from "../model/tweet";
import {ApiService} from "../service/api.service";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
@Component({
    moduleId: module.id,
    selector: 'tweet',
    templateUrl: 'tweet.component.html'
})
//Gestion de l'affichage et des actions sur un tweet.
export class TweetComponent {

    @Input() tweet: Tweet;

    @Input() favorite: boolean = false;

    @Input() favoriteId: number;

    @Output() ondelete = new EventEmitter<string>();

    //Gestion des dépendences via le constructeur.
    constructor(private api: ApiService, private auth: AuthService) {
    }

    //Formatte la date proprement à partir de la date twitter.
    getTweetDate(): string {
        return new Date(this.tweet.created_at).toLocaleDateString();
    }

    //Ajout le tweet en favoris.
    addFavorite(): void {
        this.api.post<{error?: string}>('/users/' + this.auth.getUserId() + '/saved', JSON.stringify({tweeter_id: this.tweet.id_str})).subscribe(() => {
            Materialize.toast("Favoris Ajouté", 4000);
        });
    }

    //Retire le tweet des favoris.
    deleteFavorite(): void {
        this.api.delete('/users/' + this.auth.getUserId() + '/saved/' + this.tweet.id_str).subscribe(() => {
            this.ondelete.emit(this.tweet.id_str);
            Materialize.toast("Favoris Supprimé", 3000);
        });
    }
}