import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { House } from '../model/house';
import { Observable, map } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore) {}

  addHouse(house:House){
      house.id = this.afs.createId();
      this.afs.collection("/Houses").doc(house.id).set(house)
  }

  getAllHouses(){
    return this.afs.collection("/Houses").snapshotChanges();
  }

  deleteHouse(house:House){
    return this.afs.doc("/Houses/"+house.id).delete();
  }

  updateHouse(house:House){
    this.deleteHouse(house);
    this.addHouse(house);
  }

  getAllHousesInCity(citySubstring?: string): Observable<House[]> {
    let query = this.afs.collection<House>('/Houses');

    if (citySubstring) {
      const endStr = citySubstring.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));
      query = this.afs.collection<House>('/Houses', ref => ref
        .where('location.city', '>=', citySubstring)
        .where('location.city', '<', endStr));
    }

    return query.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as House;
        const docId = a.payload.doc.id;
        return { docId, ...data };
      }))
    );
  }

  getHouseById(userId: string) {
    return this.afs.collection<House>("/Houses").doc(userId).valueChanges();
  };


}