import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {ApiService} from "./service/api.service";
import {AuthService} from "./service/auth.service";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./component/log-in.component";
import {HomeComponent} from "./component/home.component";
import {FormsModule} from "@angular/forms";
import {FriendComponent} from "./component/friend.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: '/home',
                pathMatch: 'full'
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'home',
                component: HomeComponent
            }
        ])],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        FriendComponent],
    bootstrap: [AppComponent],
    providers: [AuthService, ApiService]
})
export class AppModule {
}
