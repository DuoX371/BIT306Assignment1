import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegisterVolunteerComponent } from '../register-volunteer/register-volunteer.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  passMinLength = 4;
  constructor(public loginService: LoginService, public router: Router, public registerPop: MatDialog) { }

  loginForm = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', {validators: [Validators.required, Validators.minLength(this.passMinLength)]})
  })

  onLogin(){
    if(!this.loginForm.valid) return;
    const user = this.loginService.login(this.loginForm.value);
    if(user === null){
      Swal.fire({
        icon: 'error',
        title: 'Invalid username or password',
        showConfirmButton: false,
        timer: 3000,
        heightAuto: false //must set heigh auto
      })
    }else{
      Swal.fire({
        icon: 'success',
        title: 'Login successful',
        showConfirmButton: false,
        timer: 3000,
        heightAuto: false //must set heigh auto
      })

      //redirect to home page
      this.router.navigate(['']);
    }
  }

  onRegister(){
    this.registerPop.open(RegisterVolunteerComponent);
  }

  ngOnInit(): void {
  }

}
