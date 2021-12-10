import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Validation from '../login/validation';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  resetPassword : FormGroup;
  submitted = false;
  code: any;
  
  constructor(private auth: AuthService,private afAuth: AngularFireAuth, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {}


  get f(): { [key: string]: AbstractControl } {
    return this.resetPassword.controls;
  }
  
  ngOnInit(): void {
    this.code = this.route.snapshot.queryParams['oobCode'];

    this.resetPassword = this.fb.group({
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    },
    {
      validators: [Validation.match('password', 'confirmPassword')]
    });
  }

  onSubmit(){
    this.auth.confirmPasswordReset(this.code, this.resetPassword.value.password);
  }

}
