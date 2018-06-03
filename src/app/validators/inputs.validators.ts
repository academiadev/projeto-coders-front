import {AbstractControl, ValidationErrors} from '@angular/forms';

export class CustomValidators {

    private static senhaPatetrn = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
    private static emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    private static numeroPattern = /^[0-9]*$/;

    static emailValidator(control: AbstractControl): ValidationErrors | null {
        let valor: string = control.value;
        if(valor.match(CustomValidators.emailPattern)) {
            return null;
        }

        return {emailValidator: true};
    }

    static senhaValidator(control: AbstractControl): ValidationErrors | null {
        let valor: string = control.value;
        if(valor.match(CustomValidators.senhaPatetrn)) {
            return null;
        }

        return {senhaValidator : true};
    }

    static numeroValidator(control: AbstractControl): ValidationErrors | null {
        let valor: string = control.value;
        if(valor.match(CustomValidators.numeroPattern)) {
            return null;
        }

        return {numeroValidator : true};
    }

    static Match(firstControlName, secondControlName) {
      return (control: AbstractControl) => {
        let firstControlValue = control.get(firstControlName).value;
        let secondControlValue = control.get(secondControlName).value;
        if (firstControlValue != secondControlValue) {
            control.get(secondControlName).setErrors({MatchFields: true});
        } else {
          return null
        }
      };
    }
}
