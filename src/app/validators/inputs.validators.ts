import {AbstractControl, ValidationErrors} from '@angular/forms';

export class CustomValidators {

    static emailValidator(control: AbstractControl): ValidationErrors | null {
        let valor: string = control.value;
        if(valor.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/)){
            return {emailValidator: true};
        }

        return null;
    }

    static senhaValidator(control: AbstractControl): ValidationErrors | null {
        let valor: string = control.value;
        if(valor.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
            return {senhaValidator : true}
        }

        return null;
    }

    static numeroValidator(control: AbstractControl): ValidationErrors | null {
        let valor: string = control.value;
        if(valor.match(/^[0-9]*$/)) {
            return {numeroValidator : true}
        }

        return null;
    }
}