import {Injectable} from "@angular/core";
import {RequestOptionsArgs, Http, RequestMethod, Headers} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import {AuthService} from "./auth.service";

@Injectable()
export class ApiService {

    private api_url = "http://localhost:3030";

    constructor(private http: Http, private auth: AuthService) {
    }

    public delete(uri: string, options: RequestOptionsArgs = {}): Observable<any> {
        options.method = RequestMethod.Delete;
        return this.request<any>(uri, options);
    }

    public put<T>(uri: string, body: string, options: RequestOptionsArgs = {}): Observable<T> {
        options.method = RequestMethod.Put;
        options.body = body;
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        return this.request<T>(uri, options);
    }

    public post<T>(uri: string, body: string, options: RequestOptionsArgs = {}): Observable<T> {
        options.method = RequestMethod.Post;
        options.body = body;
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        return this.request<T>(uri, options);
    }

    public get<T>(uri: string, options: RequestOptionsArgs = {}): Observable<T> {
        options.method = RequestMethod.Get;
        return this.request<T>(uri, options);
    }

    public request<T>(uri: string, options: RequestOptionsArgs): Observable<T> {
        if (this.auth.isConnected()) {
            if (uri.indexOf('?') === -1) {
                uri += "?key=" + this.auth.key;
            } else {
                uri += "&key=" + this.auth.key;
            }
        }
        return this.http.request(this.api_url + uri, options).map(res => <T>res.json());
    }
}