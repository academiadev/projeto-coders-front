import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../validators/inputs.validators';
import { RedefinirSenhaService } from '../service/redefinir-senha.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ca-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.css']
})
export class RedefinirSenhaComponent implements OnInit {

  redefinirForm: FormGroup;

  constructor(private redefinirService : RedefinirSenhaService,
    private router : Router) { }

  onSubmit(form: any) {
    this.redefinirService.redefinir(form);
    this.router.navigate(['/senhaRedefinida']);
  }

  ngOnInit() {
    this.redefinirForm = new FormGroup({
      senha: new FormControl('', [Validators.required, CustomValidators.senhaValidator]),
      senhaRepetida: new FormControl('', [Validators.required, CustomValidators.senhaValidator])
    }, CustomValidators.Match('senha', 'senhaRepetida'));
  }

  get senhaRepetida(): any { return this.redefinirForm.get('senhaRepetida'); }
  get senha(): any { return this.redefinirForm.get('senha'); }

}
