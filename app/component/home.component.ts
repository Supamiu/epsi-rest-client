import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {ApiService} from "../service/api.service";
import {User} from "../model/user";
import {Http, RequestOptionsArgs, Headers} from "@angular/http";

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    private friendIds: number[] = [];

    constructor(private http: Http, private api: ApiService, private auth: AuthService, private router: Router) {
    }

    load(): void {
        this.api.get<{ids: number[]}>('/users/' + this.auth.getUserId() + '/friends').subscribe(friends => {
            this.friendIds = friends.ids;
        });
    }

    ngOnInit(): void {
        $('.collapsible').collapsible({
            accordion: false
        });
        if (!this.auth.isConnected()) {
            this.router.navigateByUrl("/login");
        } else {
            if (this.auth.user === null) {
                this.api.get<User>('/users/' + this.auth.getUserId()).subscribe(user => {
                    this.auth.user = user;
                    console.log(user.oauth, user.oauth_secret);
                    if (user.oauth !== null && user.oauth_secret !== null) {
                        this.load();
                    } else {
                        $('#modal1').openModal();
                    }
                })
            }
        }
    }

    signInWithTwitter() {
        let options: RequestOptionsArgs = {};
        options.headers = new Headers();
        options.headers.append("oauth_nonce");
        /*
         OAuth oauth_nonce="K7ny27JTpKVsTgdyLdDfmQQWVLERj2zAK5BslRsqyw",
         oauth_callback="http%3A%2F%2Fmyapp.com%3A3005%2Ftwitter%2Fprocess_callback",
         oauth_signature_method="HMAC-SHA1",
         oauth_timestamp="1300228849",
         oauth_consumer_key="OqEqJeafRSF11jBMStrZz",
         oauth_signature="Pc%2BMLdv028fxCErFyi8KXFM%2BddU%3D",
         oauth_version="1.0"
         */
        this.http.post('https://api.twitter.com/oauth/request_token', options).subscribe(res => console.log(res));
    }
}