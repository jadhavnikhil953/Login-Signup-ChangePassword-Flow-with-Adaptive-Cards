import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import * as crypto from "crypto-js";
import{ MatDialog} from '@angular/material/dialog';
import { DialogContentExampleDialog } from '../practice/practice.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public uname: any = "";
  public pw: any = "";
  public uname_new: any = "";
  public pw_new: any = "";
  public pw_repeat: any = "";
  public fname: any = "";
  public lname: any = "";


  constructor( private dataService : DataService, private dialogRef : MatDialog, private router : Router) {
    this.getSessionInfo();
   }

  ngOnInit(): void {
  }

  signUp(){
    if(this.pw_new == this.pw_repeat){
      let encryptedPassword = crypto.AES.encrypt(this.pw_new, "MySecretKey").toString();
      this.dataService.signUp({uname:this.uname_new, cipher:encryptedPassword,firstName:this.fname,lastName:this.lname}).subscribe((data:any) =>{
        let dialog = this.dialogRef.open(DialogContentExampleDialog, {
          data: {
            message: data.message
          }
        });
        dialog.afterClosed().subscribe(result => {
          //console.log(`Dialog result: ${result}`);
          let isVisible = document.getElementById('signup');
          isVisible?.style.setProperty('display','none');
        });
      });
    }
    else{
      let dialog = this.dialogRef.open(DialogContentExampleDialog, {
        data: {
          message: "Password doesn't match"
        }
      });
      dialog.afterClosed().subscribe(result => {
        //console.log(`Dialog result: ${result}`);
      });
    }
  }

  isCookieEnabled(){
    try {
      window.localStorage.setItem("dummy","test");
      window.localStorage.removeItem("dummy");
      return true;
    } catch (error) {
      console.log(error)
      return false;
    }
  }

  getSessionInfo(){
    if(this.isCookieEnabled()){
      this.dataService.getSessionInfo({sessionID:window.localStorage.getItem('sessionID'),email:window.localStorage.getItem('email')}).subscribe((data:any) =>{
        console.log(data.body)
        console.log(data.headers.get('sessionID'))
        if(data.body.success){
          this.dataService.setCurrentUser(data.body.user);
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }

  login(){
    if(this.uname == ""){
    let dialog = this.dialogRef.open(DialogContentExampleDialog, {
        data: {
          message: 'Please enter username'
        }
      });
    dialog.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
    }
    else{
      if(this.pw == ""){ 
        let dialog = this.dialogRef.open(DialogContentExampleDialog, {
            data: {
              message: 'Please enter password'
            }
          });
        dialog.afterClosed().subscribe(result => {
          //console.log(`Dialog result: ${result}`);
        });
        }   
        else{
          // This is login api call
          let encryptedPassword = crypto.AES.encrypt(this.pw, "MySecretKey").toString();
          this.dataService.login({uname:this.uname,cipher:encryptedPassword}).subscribe((data:any) =>{
            if(!data.success){
                let dialog = this.dialogRef.open(DialogContentExampleDialog, {
                  data: {
                    message: data.message
                  }
                });
                dialog.afterClosed().subscribe(result => {
                  //console.log(`Dialog result: ${result}`);
                });
            }
            else{
              if(this.isCookieEnabled()){
                window.localStorage.setItem('email',data.user.email);
                window.localStorage.setItem('sessionID',data.user.sessionID)
              }
              this.dataService.setCurrentUser(data.user);
              this.router.navigate(['/dashboard']);
            }
          });
        }
    }
  }

}
