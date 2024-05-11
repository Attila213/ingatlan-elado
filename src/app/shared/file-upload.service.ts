import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private afsg :AngularFireStorage) { }

  
  uploadFile(file: File) {
    const filePath = `uploads/${Date.now()}_${file.name}`;
    const fileRef = this.afsg.ref(filePath);
    return fileRef.put(file);
  }
}
