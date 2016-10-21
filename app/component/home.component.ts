import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {ApiService} from "../service/api.service";
import {User} from "../model/user";

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    private friendIds: number[] = [];

    constructor(private api: ApiService, private auth: AuthService, private router: Router) {
    }

    ngOnInit(): void {
        $('.collapsible').collapsible({
            accordion : false
        });
        if (!this.auth.isConnected()) {
            this.router.navigateByUrl("/login");
        } else {
            if (this.auth.user === null) {
                this.api.get<User>('/users/' + this.auth.getUserId()).subscribe(user => {
                    this.auth.user = user;
                    this.api.get<{ids:number[]}>('/users/' + this.auth.getUserId() + '/friends').subscribe(friends => {
                        this.friendIds = friends.ids;
                    })
                })
            }
        }
    }
}