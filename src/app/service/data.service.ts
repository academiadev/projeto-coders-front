
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs';
import { AppError } from './../commons/app-error';
import { NotFoundError } from './../commons/not-found-error';
import { BadInputError } from './../commons/bad-input';
import { BadCredentialsError } from './../commons/bad-credentials';
import { environment } from './../../environments/environment.dev';
import { ParamValue } from './param-value';

export class DataService {

    constructor(
        protected url: string,
        protected http: HttpClient
    ) { }

    protected getHeaders() {
        let requestHeaders = new HttpHeaders();
        requestHeaders = requestHeaders.set('Accept', 'application/json');
        requestHeaders = requestHeaders.set('Authorization', 'Bearer ' + localStorage.getItem(environment.tokenName));
        return { headers: requestHeaders };
    }

    protected getHeadersParams(param: ParamValue[]) {
        return this.getHeadersParamsToken(param, localStorage.getItem(environment.tokenName));
    }

    protected getHeadersParamsToken(param: ParamValue[], token: string) {
        let requestHeaders = new HttpHeaders();
        requestHeaders = requestHeaders.set('Accept', 'application/json');
        requestHeaders = requestHeaders.set('Authorization', 'Bearer ' + token);
        let params = new HttpParams();
        param.forEach(p => {
            params = params.set(p.key, p.value);
        });
        return { headers: requestHeaders, params: params };
    }

    getAll<T>(): Observable<T> {
        return this.http.get(this.url, this.getHeaders()).pipe(
            map(res => <T>res),
            catchError(this.handleError)
        );
    }

    update<T>(object): Observable<T> {
        return this.http.post(this.url, object, this.getHeaders()).pipe(
            map(res => <T>res),
            catchError(this.handleError)
        );
    }

    protected handleError(error: HttpErrorResponse) {
        if (error.status === 400) {
            return throwError(new BadInputError(error));
        }
        if (error.status === 401) {
            return throwError(new BadCredentialsError(error));
        }
        if (error.status === 404) {
            return throwError(new NotFoundError());
        }
        return throwError(new AppError(error));
    }


}
