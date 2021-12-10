import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {

  constructor(public afs:AngularFirestore) { }

  addCompetence(competence){
    this.afs.collection('competences').add(competence);
  }

  getCompetencesListe(){
    return this.afs.collection('competences').snapshotChanges();
  }

  getCompetence(id){
    this.afs.collection('competences').doc(id).get();
  }

  editCompetence(competence, id){
    this.afs.collection('competences').doc(id).update(competence);
  }

  deleteCompetence(id){
    this.afs.collection('competences').doc(id).delete();
  }
}
