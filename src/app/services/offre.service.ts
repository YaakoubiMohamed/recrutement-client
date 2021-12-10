import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  constructor(public afs:AngularFirestore) { }

  addOffre(offre){
    this.afs.collection('offres').add(offre);
  }

  getOffres(){
    return this.afs.collection('offres').snapshotChanges();
  }

  getOffre(id){
    return this.afs.collection('offres').doc(id).get();
  }

  deleteOffre(id){
    this.afs.collection('offres').doc(id).delete();
  }

  editOffre(offre, id){
    this.afs.collection('offres').doc(id).update(offre);
  }
}