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

    //Les Ids des amis de l'utilisateur.
    @Input() friendIds: number[];

    //Les amis de l'utilisateur
    public twitter_friends: any[] = [];

    //Référence vers un composant enfant : TweetsComponent.
    @ViewChild(TweetsComponent) tweets: TweetsComponent;

    //Gestion de l'injection de dépendences.
    constructor(private api: ApiService, private auth: AuthService) {
    }

    //Fonction appellée à chaque changement du DOM.
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
    //Charge les tweets de l'utilisateur en cours (dans l'itération du ngFor)
    loadTweets():void{
        this.tweets.load();
    }
}