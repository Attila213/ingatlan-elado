import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs : AngularFirestore) { }

  
  getUserById(userId: string) {
    return this.afs.collection<User>("/Users").doc(userId).valueChanges();
  };


  addUser(user:User){
    user.id = this.afs.createId();
    this.afs.collection("/Users").doc(user.id).set(user)
  }

  getAllUsers(){
    return this.afs.collection("/Users").snapshotChanges();
  }

  deleteUser(user:User){
    return this.afs.doc("/Users/"+user.id).delete();
  }

  updateUser(user:User){
    this.deleteUser(user);
    this.addUser(user);
  }

  getUserByEmail(email: string) {
    return this.afs.collection<User>('/Users', ref => ref.where('email', '==', email))
    .valueChanges({ idField: 'id' })
    .pipe(map(users => users[0]));  
  }

}


  
