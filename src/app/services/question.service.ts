import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(public afs:AngularFirestore) { }

  addQuestion(question){
    this.afs.collection('questions').add(question);
  }

  getQuestionsListe(){
    return this.afs.collection('questions').snapshotChanges();
  }

  getQuestion(id){
    this.afs.collection('questions').doc(id).get();
  }

  editQuestion(question, id){
    this.afs.collection('questions').doc(id).update(question);
  }

  deleteQuestion(id){
    this.afs.collection('questions').doc(id).delete();
  }
}
