import {Injectable} from "@angular/core";
import {RequestOptionsArgs, Http, RequestMethod} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import {AuthService} from "./auth.service";

@Injectable()
export class ApiService {

    private api_url = "http://localhost:3030";

    constructor(private http: Http, private auth: AuthService) {
    }

    public put<T>(uri: string, body: string, options: RequestOptionsArgs = {}): Observable<T> {
        options.method = RequestMethod.Put;
        options.body = body;
        return this.request<T>(uri, options);
    }

    public post<T>(uri: string, body: string, options: RequestOptionsArgs = {}): Observable<T> {
        options.method = RequestMethod.Post;
        options.body = body;
        return this.request<T>(uri, options);
    }

    public get<T>(uri: string, options: RequestOptionsArgs = {}): Observable<T> {
        options.method = RequestMethod.Get;
        return this.request<T>(uri, options);
    }

    public request<T>(uri: string, options: RequestOptionsArgs): Observable<T> {
        if (this.auth.isConnected()) {
            if(uri.indexOf('?') === -1) {
                uri += "?key=" + this.auth.key;
            }else{
                uri += "&key=" + this.auth.key;
            }
        }
        return this.http.request(this.api_url + uri, options).map(res => <T>res.json());
    }
}