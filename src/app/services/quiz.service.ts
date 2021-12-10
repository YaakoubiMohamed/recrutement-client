import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(public afs:AngularFirestore) { }

  addQuiz(quiz){
    this.afs.collection('quizs').add(quiz);
  }

  getQuizsListe(){
    return this.afs.collection('quizs').snapshotChanges();
  }

  getQuiz(id){
    this.afs.collection('quizs').doc(id).get();
  }

  editQuiz(quiz, id){
    this.afs.collection('quizs').doc(id).update(quiz);
  }

  deleteQuiz(id){
    this.afs.collection('quizs').doc(id).delete();
  }
}
