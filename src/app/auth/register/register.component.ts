import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form = {
    inputData: new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*")]),
    })
  }
  constructor(public authServices: AuthService, public Router: Router) { }

  register() {
    this.authServices.Register(this.form.inputData.value)
      .subscribe((res) => {
        if (res) {
          this.form.inputData.reset()
          alert('Berhasil Mendaftar!')
          this.Router.navigate(['home'])
        }
      })
  }

  get username() {
    return this.form.inputData.get('username')
  }
  get email() {
    return this.form.inputData.get('email')
  }
  get password() {
    return this.form.inputData.get('password')
  }
  ngOnInit(): void {
  }

}
