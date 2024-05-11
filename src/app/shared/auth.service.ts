import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth"
import { Data, Route, Router } from '@angular/router';
import { DataService } from './house.service';
import { User } from '../model/user'
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth:AngularFireAuth,private router:Router,private data:DataService,private uservice:UserService) { }
    
  login(email:string,password:string){
      this.fireauth.signInWithEmailAndPassword(email,password).then(()=>{
        localStorage.setItem("token","true")

        this.uservice.getUserByEmail(email).subscribe(user => {
          if (user) {
            localStorage.setItem("currentUserID",user.id)
          } 
        });
        

        this.router.navigate(['dashboard']);
      },err=>{
        alert(err.message)
        this.router.navigate(["/login"])
      })
    
  }

  register(email:string,password:string,name:string){

    this.fireauth.createUserWithEmailAndPassword(email,password).then(()=>{

      let user:User = {
        id: '',
        name: '',
        email: ''
      }
      user.email = email;
      user.name = name;
      
      this.uservice.addUser(user)

      alert('Registration successful')
      this.router.navigate(["/login"])

    },err=>{
      alert(err.message)
      this.router.navigate(["/register"])
    })

  }
  addUser(user: any) {
    throw new Error('Method not implemented.');
  }

  logout(){
    this.fireauth.signOut().then(()=>{
      localStorage.removeItem('token')
      this.router.navigate(["/login"])
    },err=>{
      alert(err.message)
    })
  }

  isLoggedIn(){
    if(localStorage.getItem("Token") != null){
      return true;
    }
    return false;
  }
}
