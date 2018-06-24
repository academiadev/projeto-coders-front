import { Component, OnInit } from '@angular/core';
import { RecuperarSenhaService } from '../service/recuperar-senha.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../validators/inputs.validators';
import { Router } from '@angular/router';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'ca-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {

  recuperarForm: FormGroup;

  constructor(private recupararService: RecuperarSenhaService,
              private router: Router) { }

  onSubmit(form: any) {
    this.recupararService.recuperar(form).subscribe((res) => {
      toast('E-mail enviado!', 2000, 'rounded');
      this.router.navigate(['/login']);
    });
  }

  ngOnInit() {
    this.recuperarForm = new FormGroup({
      email: new FormControl('', [Validators.required, CustomValidators.emailValidator])
    });
  }

  get email(): any { return this.recuperarForm.get('email'); }

}
