import {Component, Input, OnInit} from "@angular/core";
import {AuthService} from "../service/auth.service";
import {ApiService} from "../service/api.service";
@Component({
    moduleId: module.id,
    selector: 'tweet',
    templateUrl: 'tweet.component.html'
})
export class TweetComponent implements OnInit {

    @Input() tweetId: number;

    @Input() friendId: number;

    tweetHTML: any;

    constructor(private api: ApiService, private auth: AuthService){}

    ngOnInit(): void {
        this.api.get<{html: string}>('/users/' + this.auth.getUserId() + '/friends/' + this.friendId + '/tweets/' + this.tweetId + '/embed').subscribe(tweet => {
            this.tweetHTML = tweet.html;
        })
    }
}