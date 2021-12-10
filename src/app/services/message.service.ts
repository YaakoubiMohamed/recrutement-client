import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(public afs:AngularFirestore) { }

  addMessage(message){
    this.afs.collection('messages').add(message);
  }

  getMessagesListe(){
    return this.afs.collection('messages').snapshotChanges();
  }

  getReponsesListe(){
    return this.afs.collection('reponse').snapshotChanges();
  }

  getMessage(id){
    this.afs.collection('messages').doc(id).get();
  }

  editMessage(message, id){
    this.afs.collection('messages').doc(id).update(message);
  }

  deleteMessage(id){
    this.afs.collection('messages').doc(id).delete();
  }
}
