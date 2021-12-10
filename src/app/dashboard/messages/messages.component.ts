import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/classes/message';
import { Reponse } from 'src/app/classes/reponse';
import { Rh } from 'src/app/classes/rh';
import { MessageService } from 'src/app/services/message.service';
import { RhService } from 'src/app/services/rh.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  user: any;
  messages: Message[];
  users: Rh[];
  isshow = false;
  reponses: Reponse[];

  constructor(private messagesService: MessageService,
    private rhservice: RhService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userInfo'));
    this.getMessages();
    this.getRh();
  }

  getMessages(){
    this.messagesService.getMessagesListe().subscribe(admin => {
      this.messages = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Message;
      });
      this.messages = this.messages.filter(message => {
        return message.recepteur == this.user.email;
      })
      console.log(this.messages);           
    });
  }

  getRh(){
    this.rhservice.getRhs().subscribe(admin => {
      this.users = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Rh;
      });
      console.log(this.users);           
    });
  }

  show(message){
    this.isshow = true;
    console.log(message);
    this.messagesService.getReponsesListe().subscribe(admin => {
      this.reponses = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Reponse;
      });
      this.reponses = this.reponses.filter(reponse => {
        return reponse.message == message.uid;
      })
      console.log(this.reponses);           
    });
  }

}
