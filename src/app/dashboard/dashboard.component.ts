import { Component, Output } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { House } from '../model/house';
import { DataService } from '../shared/house.service';
import { User } from '../model/user';
import { HouseImage } from '../model/house_images';
import { HouseLocation } from '../model/house_location'
import { HouseFeatures } from '../model/house_features';
import { UserService } from '../shared/user.service'; 


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  houseList : House[] = [];
  
  userObject : User ={
    id: '',
    name: '',
    email: ''
  }

  house_location:HouseLocation={
    address: '',
    city: '',
    street: ''
  }
  
  house_features:HouseFeatures = {
    size: 0,
    rooms: 0
  }

  house_images:HouseImage[] = []
  
  houseObject : House ={
    id: '',
    price: 0,
    owner: this.userObject,
    location: this.house_location,
    images: this.house_images,
    features: this.house_features
  }
  
  owner:User = {
    id: '',
    name: '',
    email: '',
  }

  id:string ='';
  city:string ='';
  street:string = '';
  price:number =0;
  size:number = 0;
  rooms: number =0;
  address: string = '';

  constructor(private auth: AuthService,private data:DataService,private uservice:UserService){}

  ngOnInit():void{
    
    this.getAllHouses();

    let currentID:string|null = localStorage.getItem("currentUserID")
    
    if (currentID) {
      this.uservice.getUserById(currentID).subscribe(user => {
        if (user) {
          this.userObject.name= user.name; 
          this.userObject.id = user.id;
          this.userObject.email= user.email
        } 
      });
    }

  }

  logout(){
    this.auth.logout();
    localStorage.setItem("currentUserID","")
  }

  getAllHouses() {

    this.data.getAllHouses().subscribe(res => {

      this.houseList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while fetching student data');
    })

  }
  resetform(){

    this.id= '';
    this.city = '';
    this.street = '';
    this.price = 0;
    this.size = 0;
  }

  addHouse(){
    if(this.city == '' || this.street == '' || this.size==-1 || this.price == -1){
      alert("Fill all input fields");
      return
    }

    this.house_location.street = this.street;
    this.house_location.city = this.city;
    this.house_location.address = this.address;

    this.house_features.rooms = this.rooms;
    this.house_features.size = this.size;

    this.houseObject.id= '';
    this.house_location.city = this.city;
    this.house_location.street = this.street;
    this.house_location.address = this.address;

    this.houseObject.price = this.price;

    this.house_features.size = this.size;
    this.house_features.rooms = this.rooms;

    this.houseObject.features = this.house_features;
    this.houseObject.location = this.house_location;
    this.houseObject.price = this.price;

    this.data.addHouse(this.houseObject);
    this.resetform()
    
  }




}
