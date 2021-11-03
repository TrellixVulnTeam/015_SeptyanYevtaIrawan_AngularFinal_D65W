import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = {
    inputData: new FormGroup({
      email:new FormControl,
      password:new FormControl
    })
  }

  login(){
    this.authServices.login(this.form.inputData.value)
  }
  constructor(public authServices: AuthService, public Router: Router) { }

  
  get email() {
    return this.form.inputData.get('email')
  }
  get password() {
    return this.form.inputData.get('password')
  }
  ngOnInit(): void {
  }

}
