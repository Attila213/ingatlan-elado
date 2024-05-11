import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../shared/auth.service';
import { DataService } from '../shared/house.service';
import { User } from '../model/user';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private auth:AuthService){}
  
  email:string = '';
  password:string = '';
  name:string = '';

  user:User = {
    id: '',
    name: '',
    email: ''
  }

  register(){
    if(this.email==''){
      alert("Please enter email")
      return
    }

    if(this.password==''){
      alert("Please enter password")
      return
    }

    this.auth.register(this.email,this.password,this.name);
    
  
    

    this.email=''
    this.name=''
    this.password=''
  }
}
