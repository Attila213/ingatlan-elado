import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { House } from '../../model/house';
import { DataService } from '../../shared/house.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-list-datas',
  templateUrl: './list-datas.component.html',
  styleUrl: './list-datas.component.css'
})
export class ListDatasComponent {

  @Input() testoutput?:House[];
  @Input() houseObject? : House;
  @Input() userObject? : User;


  searchCity:string='';
  constructor(private data:DataService,private router:Router){}
  
  searchCityMethod(){
    this.getAllHousesInCity(this.searchCity)
    console.log(this.testoutput)
  }
  
  getAllHousesInCity(citySubstring: string): void {
      this.data.getAllHousesInCity(citySubstring).subscribe(res => {
      this.testoutput = res;
    }, err => {
      alert('Error while fetching house data');
    });
  }

  goToHousePage(house:House) {
    this.router.navigate(['/house/'+house.id]);
  }
  
  deleteHouse(house:House){
    if(window.confirm("Are u sure you want to delete this?"))
    this.data.deleteHouse(house)
  }
}
