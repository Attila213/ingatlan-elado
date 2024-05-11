import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email:string = '';
  password:string = '';

  constructor(private auth:AuthService) {}

  ngOnInit():void{
  }

  login(){
    if(this.email==''){
      alert("Please enter email")
      return
    }

    if(this.password==''){
      alert("Please enter password")
      return
    }


    this.auth.login(this.email,this.password);
    this.email=''
    this.password=''
  }

  logout(){
    this.auth.logout()
  }

}
