import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataComponentService } from 'src/app/services/data-component.service';
import { ActivatedRoute } from '@angular/router';
import { Cardinfo } from 'src/app/Models/cardinfo';

@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.css']
})
export class FormDataComponent implements OnInit {

  form = {
    inputData: new FormGroup({
      customername: new FormControl('', [Validators.required, Validators.minLength(5)]),
      cardname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      cardinfo: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16),Validators.pattern("^[0-9]*$")]),
      securitycode: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern("^[0-9]*$"), Validators.maxLength(4)]),
      exp: new FormControl('', [Validators.required]),
    })
  }
  constructor(public dataObject: DataComponentService, public Router: Router) { }

  get customername() {
    return this.form.inputData.get('customername')
  }
  get cardname() {
    return this.form.inputData.get('cardname')
  }
  get cardinfo() {
    return this.form.inputData.get('cardinfo')
  }
  get securitycode() {
    return this.form.inputData.get('securitycode')
  }
  get exp() {
    return this.form.inputData.get('exp')
  }


  addData(){
    this.dataObject.addData(this.form.inputData.value)
    .subscribe((res) =>{
      if(res){
        this.form.inputData.reset()
        alert('Sukses Input!')
        location.reload()
      }
    })
  }
  ngOnInit(): void {
  }

}
