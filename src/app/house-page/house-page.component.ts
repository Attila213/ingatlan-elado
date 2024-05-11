import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,NavigationEnd, Router } from '@angular/router';
import { DataService } from '../shared/house.service';
import { House } from '../model/house';
import { User } from '../model/user';
import { HouseFeatures } from '../model/house_features';
import { HouseLocation } from '../model/house_location';
import { FileUploadService } from '../shared/file-upload.service';

@Component({
  selector: 'app-house-page',
  templateUrl: './house-page.component.html',
  styleUrl: './house-page.component.css'
})

export class HousePageComponent implements OnInit{


  id: string ='';
  isOwner:boolean = false;
  selectedFile: File | null = null;

  houseOwner:User = {
    id: '',
    name: '',
    email: ''
  }

  houseFeatures:HouseFeatures={
    size: 0,
    rooms: 0
  }

  houseLocation:HouseLocation={
    address: '',
    city: '',
    street: ''
  }

  houseObject:House={
    id: '',
    price: 0,
    owner: this.houseOwner,
    images: [],
    features: this.houseFeatures,
    location: this.houseLocation
  }

  constructor(private route: ActivatedRoute,private data:DataService,private file_upload_service:FileUploadService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    if (this.id) {
      this.data.getHouseById(this.id).subscribe(house => {
        if (house) {
          this.houseObject.location= house.location; 
          this.houseObject.features = house.features;
          this.houseObject.images= house.images;
          this.houseObject.owner = house.owner;
          this.houseObject.price = house.price;
          this.houseObject.id = house.id;
          this.isOwner = localStorage.getItem("currentUserID") == house.owner.id

        } 
      });
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      this.file_upload_service.uploadFile(this.selectedFile).then(() => {
        console.log('File uploaded successfully');
      }).catch(error => {
        console.error('Error uploading file:', error);
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
