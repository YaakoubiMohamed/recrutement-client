import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(public afs:AngularFirestore) { }

  addPublication(publication){
    this.afs.collection('publications').add(publication);
  }

  getPublicationsListe(){
    return this.afs.collection('publications').snapshotChanges();
  }

  getPublication(id){
    return this.afs.collection('publications').doc(id).get();
  }

  editPublication(publication, id){
    this.afs.collection('publications').doc(id).update(publication);
  }

  deletePublication(id){
    this.afs.collection('publications').doc(id).delete();
  }
}
