import {Component, OnInit} from '@angular/core';
import {AuthService} from "./service/auth.service";

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: `./app.component.html`
})
export class AppComponent implements OnInit{

    constructor(private auth:AuthService){}
    //Composant root de l'application, gère le routing entre autres.
    getUserName():string{
        return this.auth.getUserName();
    }

    ngOnInit():void{
        $(".dropdown-button").dropdown();
    }

    isConnected():boolean{
        return this.auth.isConnected();
    }
}
