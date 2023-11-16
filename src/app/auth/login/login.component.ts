import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  
  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    Password: ['', [Validators.required]],
    tipoUsuario: [, [Validators.required]]
  });

  public registerForm = this.fb.group({
    nombres: [Validators.required],
    fechaNacimiento: [Validators.required],
    genero: [Validators.required],
    tipoDocumento: [Validators.required], 
    email: [Validators.required] ,
    telefonoContacto: [Validators.required] ,


  });

  constructor( private router: Router, private fb: FormBuilder, private messageService: MessagesService ) { }

  ngOnInit(): void {
  }

  login() {
    if(this.loginForm.invalid) return this.messageService.mensajeInformativoPerzonalizado("Todos los campos son obligatorios");
    localStorage.setItem('Usuario', JSON.stringify(this.loginForm.value));
    this.router.navigateByUrl('/dashboard');
  }

  createUsuario(){
    this.validateRegisterForm();
    console.log(this.registerForm.value);

  };

  validateRegisterForm(){
    if(this.registerForm.invalid){
      return false;
    }else{
      return true;
    }

  }

  campoNoValido( campo: string ): boolean {    
    if ( this.registerForm.get(campo).invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }

}
