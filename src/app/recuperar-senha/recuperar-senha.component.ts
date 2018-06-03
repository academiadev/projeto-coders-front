import { Component, OnInit } from '@angular/core';
import { RecupararSenhaService } from '../service/recuparar-senha.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../validators/inputs.validators';
import { Router } from '@angular/router';

@Component({
  selector: 'ca-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {

  recuperarForm: FormGroup;

  constructor(private recupararService : RecupararSenhaService,
              private router : Router) { }

  onSubmit(form: any) {
    this.recupararService.recuparar(form);
    this.router.navigate(['/emailEnviado']);
  }

  ngOnInit() {
    this.recuperarForm = new FormGroup({
      email: new FormControl('', [Validators.required, CustomValidators.emailValidator])
    });
  }

  get email(): any { return this.recuperarForm.get('email'); }

}
