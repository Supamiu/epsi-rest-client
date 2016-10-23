import {Component, Input} from "@angular/core";
@Component({
    moduleId: module.id,
    selector: "friend",
    templateUrl: "friend.component.html"
})
export class FriendComponent {

    @Input() friend: any;
}