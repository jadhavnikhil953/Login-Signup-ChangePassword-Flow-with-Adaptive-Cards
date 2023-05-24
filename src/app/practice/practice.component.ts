import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import{ MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService } from '../data.service';
import * as crypto from "crypto-js";

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {
  @ViewChild('chart')
  ELEMENT_DATA: any []= [];
  ouput : any ;
  orders_all: any[]=[];
  orders_map_reduce: any[]=[];
  dataSource = this.ELEMENT_DATA;
  title : any = 'CSP554';
  displayedColumns: string[] = ['cust_id', 'ord_date', 'price', 'items'];
  displayedColumnsMapReduce: string[] = ['cust_id', 'ord_total'];
  table_all: boolean = false;
  mapReduceFlag: boolean = false;
  chart: any;
  pw_current: any = "";
  pw_new: any = "";
  pw_confirm: any = "";
  chartData : any []=[];
  chartLabel: any[]=[];
  chartRef:any;	
  currentUser: any;
  chartOptions = {
    title:{
      text: "Total Impressions by Platforms"
    },
    animationEnabled: true,
    axisY: {
      includeZero: true,
      suffix: ""
    },
    data: [{
      type: "bar",
      indexLabel: "{y}",
      yValueFormatString: "#,###K",
      dataPoints: [
        { label: "Snapchat", y: 15 },
        { label: "Instagram", y: 20 },
        { label: "YouTube", y: 24 },
        { label: "Twitter", y: 29 },
        { label: "Facebook", y: 73 }
      ]
    }]
  }
  constructor( private dialogRef : MatDialog, private dataService: DataService) { 
    this.currentUser = this.dataService.getCurrentUser();
  }

  ngOnInit(): void {
  }

  changePassword(){
    if(this.pw_current == ""){
      let dialog = this.dialogRef.open(DialogContentExampleDialog, {
        data: {
          message: 'Please enter current password'
        }
      });
      dialog.afterClosed().subscribe(result => {
        //console.log(`Dialog result: ${result}`);
      });
    }
    else{
      if(this.pw_new != this.pw_confirm){
        let dialog = this.dialogRef.open(DialogContentExampleDialog, {
          data: {
            message: "Passwords don't match"
          }
        });
        dialog.afterClosed().subscribe(result => {
          //console.log(`Dialog result: ${result}`);
        });
      }
      else{
        let encryptedPassword = crypto.AES.encrypt(this.pw_confirm, "MySecretKey").toString();
        this.dataService.changePassword({uname:this.currentUser.email,cipher:encryptedPassword}).subscribe(result => {
          if(result.success){
            let dialog = this.dialogRef.open(DialogContentExampleDialog, {
              data: {
                message: result.message
              }
            });
            dialog.afterClosed().subscribe(result => {
              //console.log(`Dialog result: ${result}`);
              let isVisible = document.getElementById('signup');
              isVisible?.style.setProperty('display','none');
            });
          }
          else{
            let dialog = this.dialogRef.open(DialogContentExampleDialog, {
              data: {
                message: result.message
              }
            });
            dialog.afterClosed().subscribe(result => {
              //console.log(`Dialog result: ${result}`);
            });
          }
          
        });
      }
    }
    
  }

  getAllOrders(){
    // This is to display dialog box

    // let dialog = this.dialogRef.open(DialogContentExampleDialog);
    // dialog.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
    // let encryptedPassword = crypto.AES.encrypt("MyPassword", "MySecretKey").toString();

    // this.dataService.login({cipher:encryptedPassword}).subscribe((data:any) =>{
    //   console.log(data)
    // });
    this.clearAll();
    this.table_all = true;
    if(this.orders_all.length == 0){
      this.dataService.getAllOrders({}).subscribe((data:any) =>{
        this.orders_all = data;
      });
    }
  }

  mapReduce(){
      this.clearAll();
      this.mapReduceFlag = true;
      this.dataService.mapReduce({}).subscribe((data:any) =>{

        this.orders_map_reduce = data.results;
        this.chartOptions = {
          title:{
            text: "Data After mapReduce()"
          },
          animationEnabled: true,
          axisY: {
            includeZero: true,
            suffix: ""
          },
          data: [{
            type: "bar",
            indexLabel: "{y}",
            yValueFormatString: "#,###",
            dataPoints: []
          }]
        }
        this.orders_map_reduce.forEach(element => {
          let obj = {label:"",y:0};
          obj.label = element._id;
          obj.y = element.value;
          //this.chartData.push(obj);
          this.chartOptions.data[0].dataPoints.push(obj);
          this.chartLabel.push(element._id);
        });
      });
  }

  clearAll(){
    this.mapReduceFlag = false;
    this.table_all = false;
    this.chartData=[];
    this.chartLabel=[];
  }

  closeDialogue(){
    this.dialogRef.closeAll();
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './practiceDialog.component.html',
  styleUrls: ['./practice.component.css']
})
export class DialogContentExampleDialog {
  output : any;
  constructor( private dataService: DataService, @Inject(MAT_DIALOG_DATA) public data: any){
    //this.fire();
  }
  ngOnInit(): void {
    //this.fire();
  }
  fire(){
    this.dataService.getPosts({postName:"test"}).subscribe((data:any) =>{
      this.output = data[0].postName;
    });
    this.dataService.getAllOrders({}).subscribe((data:any) =>{
      //console.log(data);
    });
    //console.log(this.output)
    let k = 3;
    let input : any = [1,2,3,3,4,5];
    let count = 0;
    //console.log(Math.min(...input));
    let map = new Map();
    for(let i = 0; i<input.length;i++){
      if(map.has(input[i])){
        map.set(input[i],map.get(input[i])+1);
      }
      else{
        map.set(input[i],1);
      }
    }
    for(let [key,value] of map){
      if(value%2 == 1){
        count++;
      }
    }
    //console.log(this.output);
    //this.output=count;
    this.test();
  }

  test(){
    let k = 2;
    let input : any = [5,3,5,7,8];
    let finalCount=0;
    let count = 1;
    let index=0;
    for(let i=0;i<input.length;i++){
      if(input[i]<input[i+1]){
        count++;
        if(count == k){
          finalCount++;
          index++;
          i = index-1;
          count = 1;
        }
      }
      else{
        count = 1;
        index = i+1;
      }
    }
    //console.log(finalCount)
  }
}
