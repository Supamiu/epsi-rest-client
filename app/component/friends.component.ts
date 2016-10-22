import {Component, Input} from "@angular/core";
@Component({
    moduleId: module.id,
    selector: 'friends',
    templateUrl: 'friends.component.html'
})
export class FriendsComponent {

    @Input() friendIds: number[] = [];
}