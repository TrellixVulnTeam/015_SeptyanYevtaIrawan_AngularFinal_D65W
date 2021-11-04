import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Cardinfo } from 'src/app/Models/cardinfo';
import { Route } from '@angular/compiler/src/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  curr: string = ''
  constructor(public authServices:AuthService,public Router:Router) { }

  logout(){
    if(confirm("Are you sure to Log out ")) {
      localStorage.setItem('access_token' , "")
      alert("SUKSES LOGOUT REDIRECT KE LOGIN")
      this.Router.navigate(['login'])
      }
    else{
      console.log("Cancel");
    }
  }
    
  ngOnInit(): void {
    
  }

}
