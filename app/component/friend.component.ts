import {Component, Input} from "@angular/core";
import {ApiService} from "../service/api.service";
import {AuthService} from "../service/auth.service";
@Component({
    moduleId: module.id,
    selector: "friend",
    templateUrl: "friend.component.html"
})
export class FriendComponent {

    @Input() friendId: number;

    friend:any;

    constructor(private api:ApiService, private auth:AuthService){}

    ngOnInit():void{
        this.api.get('/users/' + this.auth.getUserId() + "/friends/" + this.friendId).subscribe(friend => {
            this.friend = friend;
        });
    }
}