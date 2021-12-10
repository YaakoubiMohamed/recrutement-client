import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CondidatService {

  constructor(public afs:AngularFirestore) { }

  addCondidat(condidat){
    this.afs.collection('condidats').add(condidat);
  }

  getCondidats(){
    return this.afs.collection('condidats').snapshotChanges();
  }

  deleteCondidat(id){
    this.afs.collection('condidats').doc(id).delete();
  }

  editCondidat(condidat, id){
    this.afs.collection('condidats').doc(id).update(condidat);
  }
}