import {Component, Input} from "@angular/core";
@Component({
    moduleId: module.id,
    selector: "friend",
    templateUrl: "friend.component.html"
})
//Composant simple qui gère l'affichage d'un ami.
export class FriendComponent {

    @Input() friend: any;
}