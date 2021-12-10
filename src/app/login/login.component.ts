import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Validation from './validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm : FormGroup;
  registerForm : FormGroup;
  resetForm : FormGroup;
  submitted = false;
  
  constructor(private fb: FormBuilder,public authService: AuthService,private router: Router) { }

  get f(): { [key: string]: AbstractControl } {
    return this.LoginForm.controls;
  }
  get re(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
  get rs(): { [key: string]: AbstractControl } {
    return this.resetForm.controls;
  }

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]]
    });

    this.registerForm = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]],
      confirmPassword: ['', Validators.required],
      telephone: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      acceptTerms: [false, Validators.requiredTrue]
    },
    {
      validators: [Validation.match('password', 'confirmPassword')]
    });

    this.resetForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }


  onSubmit(): void {
    this.submitted = true;

    if (this.LoginForm.invalid) {
      return;
    }

    console.log(JSON.stringify(this.LoginForm.value, null, 2));
    this.authService
      .SignIn(this.LoginForm.value);
      this.router.navigate(['/home']);
  }

  onRegister(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    console.log(JSON.stringify(this.registerForm.value, null, 2));
    this.authService
      .SignUp(this.registerForm.value);
      alert('compte creer');
      this.router.navigate(['/home']);
  }

 

  reset(){
    this.submitted = true;

    if (this.resetForm.invalid) {
      return;
    }

    console.log(JSON.stringify(this.resetForm.value, null, 2));
    this.authService
      .ForgotPassword(this.resetForm.value.email)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      });
  }

}
