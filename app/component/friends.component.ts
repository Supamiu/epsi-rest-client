import {Component, Input, OnChanges, ChangeDetectionStrategy} from "@angular/core";
import {ApiService} from "../service/api.service";
import {AuthService} from "../service/auth.service";

@Component({
    moduleId: module.id,
    selector: 'friends',
    templateUrl: 'friends.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FriendsComponent implements OnChanges {

    @Input() friendIds: number[];

    friends: any[] = [];

    constructor(private api: ApiService, private auth: AuthService) {
    }

    ngOnChanges(): void {
        if (this.friendIds !== undefined) {
            if (this.friendIds.length > 0) {
                this.api.get<any>('/users/' + this.auth.getUserId() + "/friends/lookup?ids=" + this.friendIds.join(',')).subscribe(friends => {
                    if (friends.errors === undefined) {
                        this.friends = <any[]>friends;
                    }
                });
            }
        }
    }
}