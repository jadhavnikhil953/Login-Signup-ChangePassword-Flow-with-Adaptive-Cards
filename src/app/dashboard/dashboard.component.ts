import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';
import{ MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as crypto from "crypto-js";
import { DialogContentExampleDialog, PracticeComponent } from '../practice/practice.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser:any;
  display:any;
  isVisible:any;
  userQuestion:any = "";
  displayedColumns: string[] = ['ord_date'];
  pw_current: any = "";
  pw_new: any = "";
  pw_confirm: any = "";
  constructor(  private dataService: DataService, private router: Router, private dialogRef:MatDialog) { 
    this.currentUser = this.dataService.getCurrentUser();
    this.display = 'initial';
    this.isVisible = document.getElementById('dashboardText');
    this.isVisible?.style.setProperty('display','initial');
  }

  ngOnInit(): void {
  }

  changeVisibilityTo(displayProperty: any):void{
    this.isVisible = document.getElementById('dashboardText');
    this.isVisible?.style.setProperty('display',displayProperty);
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

  logout(){
    window.localStorage.clear();
    this.router.navigate(['login']);
  }

}

class ExampleDataSource extends DataSource<[]> {
  private _dataStream = new ReplaySubject<[]>();

  constructor(initialData: []) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: []) {
    this._dataStream.next(data);
  }
}
