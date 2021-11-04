import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataComponentService } from 'src/app/services/data-component.service';
import { ActivatedRoute } from '@angular/router';
import { Cardinfo } from 'src/app/Models/cardinfo';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

  card_id:number
  datas: Cardinfo[]=[]
  form = {
    inputData: new FormGroup({
      customername: new FormControl('', [Validators.required, Validators.minLength(5)]),
      cardname: new FormControl('', [Validators.required, Validators.minLength(5)]),
      cardinfo: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16),Validators.pattern("^[0-9]*$")]),
      securitycode: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern("^[0-9]*$"), Validators.maxLength(4)]),
      exp: new FormControl('', [Validators.required]),
      id: new FormControl
    })
  }
  constructor(public dataObject: DataComponentService, public Router: Router,activatedRoute: ActivatedRoute,public datepipe: DatePipe) { 
    this.card_id = activatedRoute.snapshot.params.id
  }


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
  get id() {
    return this.form.inputData.get('id')
  }
  setData(id:number){
    this.dataObject.getDataById(id).subscribe((res:any[]) => {
      this.datas = res
      this.onEdit(this.datas)
    })
  }

  onEdit(datas: any){
    let date = datas.exp
    let formattedDate = this.datepipe.transform(date, 'YYYY-MM-dd')
    this.form.inputData.controls['customername'].setValue(datas.customerName)
    this.form.inputData.controls['cardname'].setValue(datas.cardName)
    this.form.inputData.controls['cardinfo'].setValue(datas.cardInfo)
    this.form.inputData.controls['securitycode'].setValue(datas.securityCode)
    this.form.inputData.controls['exp'].setValue(formattedDate)
    this.form.inputData.controls['id'].setValue(datas.id)
  }

  updateData(card_id:number){
    console.log(this.form.inputData.value)
    this.dataObject.updateData(this.form.inputData.value,card_id)
    .subscribe((res) =>{
      if(res){
        this.form.inputData.reset()
        alert('Sukses Update')
        this.Router.navigate(['home'])
      }
    })
  }

  ngOnInit(): void {
    this.setData(this.card_id)
  }

}
