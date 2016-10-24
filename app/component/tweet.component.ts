import {Component, Input, OnInit} from "@angular/core";
import {Tweet} from "../model/tweet";
@Component({
    moduleId: module.id,
    selector: 'tweet',
    templateUrl: 'tweet.component.html'
})
export class TweetComponent implements OnInit {
    ngOnInit(): void {
        console.log(this.tweet)
    }

    @Input() tweet: Tweet;

    getTweetDate():string{
        return new Date(this.tweet.created_at).toLocaleDateString();
    }
}