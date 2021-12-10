import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Publication } from '../classes/publication';
import { PublicationService } from '../services/publication.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css'],
  providers:[DatePipe]
})
export class PublicationsComponent implements OnInit {

  publications: Publication[];
  
  constructor(private router:Router, private publicationservice:PublicationService) { }

  ngOnInit(): void {
    this.getPublications();
  }
  getPublications(){
    this.publicationservice.getPublicationsListe().subscribe(admin => {
      this.publications = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Publication;
      });
      console.log(this.publications);           
    });
  }

  detail(publication){
    localStorage.setItem('publication',publication.uid);
    this.router.navigate(['/publication-detail']);
  }

}
