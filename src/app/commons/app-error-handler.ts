import { ErrorHandler, Injector, Injectable } from '@angular/core';
import { toast } from 'angular2-materialize';
import { AppError } from './app-error';
import { BadCredentialsError } from './bad-credentials';
import { AuthService } from './../service/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AppErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) {

    }

    handleError(error) {
        const auth = this.injector.get(AuthService);
        console.log(error);


        if (error instanceof BadCredentialsError) {
            const appError: AppError = error;
            auth.logoutAndRedirect();
            toast('Usuário sem permissão. Deslogando...', 2000, 'rounded');
            return;
        }

        if (error instanceof AppError) {
            const appError: AppError = error;
            toast(appError.originalError ? appError.originalError.message : appError.originalError, 'Ocorreu um erro!', 2000, 'rounded');
            return;
        }

        toast(error, 2000, 'rounded');
        return;
    }

}
