import {Injectable} from "@angular/core";
import {RequestOptionsArgs, Http, RequestMethod, Headers} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import {AuthService} from "./auth.service";

@Injectable()
//Service d'api, destiné à être injecté par DI. Utilise rxjs pour la partie reactive et gère la serialization.
export class ApiService {

    //L'url de l'api.
    private api_url = "http://localhost:3030";

    //Injection des dépendences.
    constructor(private http: Http, private auth: AuthService) {
    }

    //Requête DELETE.
    public delete(uri: string, options: RequestOptionsArgs = {}): Observable<any> {
        options.method = RequestMethod.Delete;
        return this.request<any>(uri, options);
    }

    //Requête PUT.
    public put<T>(uri: string, body: string, options: RequestOptionsArgs = {}): Observable<T> {
        options.method = RequestMethod.Put;
        options.body = body;
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        return this.request<T>(uri, options);
    }

    //Requête POST.
    public post<T>(uri: string, body: string, options: RequestOptionsArgs = {}): Observable<T> {
        options.method = RequestMethod.Post;
        options.body = body;
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        return this.request<T>(uri, options);
    }

    //Requête GET.
    public get<T>(uri: string, options: RequestOptionsArgs = {}): Observable<T> {
        options.method = RequestMethod.Get;
        return this.request<T>(uri, options);
    }

    //La requête paramétrable appellée par tous les verbes HTTP pour construire et envoyer la requête finale.
    public request<T>(uri: string, options: RequestOptionsArgs): Observable<T> {
        if (this.auth.isConnected()) {
            if (uri.indexOf('?') === -1) {
                uri += "?key=" + this.auth.key;
            } else {
                uri += "&key=" + this.auth.key;
            }
        }
        return this.http.request(this.api_url + uri, options).map(res => {
            if(res.status !== 204 && res.text().length > 0) {
                return <T>res.json();
            }else{
                return null;
            }
        });
    }
}