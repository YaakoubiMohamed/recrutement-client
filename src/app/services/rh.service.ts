import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RhService {

  constructor(public afs:AngularFirestore) { }

  addRh(rh){
    this.afs.collection('rh').add(rh);
  }

  getRhs(){
    return this.afs.collection('rh').snapshotChanges();
  }

  deleteRh(id){
    this.afs.collection('rh').doc(id).delete();
  }

  editRh(rh, id){
    this.afs.collection('rh').doc(id).update(rh);
  }
}
