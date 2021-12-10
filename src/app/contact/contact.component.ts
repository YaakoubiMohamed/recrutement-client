import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  date = new Date();
  
  constructor(private fb: FormBuilder, private contactService: MessageService) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      "sujet":[''],
      "texte":[''],
      "date":[this.date],
      "emmetteur":[''],
      "recepteur":['test@gmail.com'],
    })
  }

  envoyer(){
    this.contactService.addMessage(this.contactForm.value);
  }

}
