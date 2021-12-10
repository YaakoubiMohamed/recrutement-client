import { Component, OnInit } from '@angular/core';
import { Publication } from 'src/app/classes/publication';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-publication-detail',
  templateUrl: './publication-detail.component.html',
  styleUrls: ['./publication-detail.component.css']
})
export class PublicationDetailComponent implements OnInit {

  publication: any;
  publication_id: any;
  publications: Publication[];

  constructor(private publicationservice:PublicationService) { }

  ngOnInit(): void {
    this.publication_id = localStorage.getItem('publication');
    console.log(this.publication_id);
    this.getPublications();
    this.publicationservice.getPublication(this.publication_id)
    .subscribe(snapshot => {
      console.log(snapshot.data());
      this.publication = snapshot.data();
    })
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
    this.publication = publication;
  }

}
