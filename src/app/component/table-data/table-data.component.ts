import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataComponentService } from 'src/app/services/data-component.service';
import { ActivatedRoute  } from '@angular/router';
import { Cardinfo } from 'src/app/Models/cardinfo';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})
export class TableDataComponent implements OnInit {

  datas: Cardinfo[]=[]
  elements: any = [];
    headElements = ['ID', 'First', 'Last', 'Handle'];

  constructor(public dataObject: DataComponentService,public Router:Router) { }
  
  ngOnInit(): void {
    this.setData()
    
  }

  Delete(id:number,name:string) {
    if(confirm("Are you sure to delete "+name)) {
      this.dataObject.deleteData(id).subscribe((response) => {
        this.setData()
      })
    }else{
      console.log("Cancel");
    }
  }
  setData(){
    this.dataObject.getData().subscribe(res => {
      this.datas = res
    })
  }
}
