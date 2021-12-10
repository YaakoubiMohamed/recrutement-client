import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OffreService } from 'src/app/services/offre.service';

@Component({
  selector: 'app-offre-detail',
  templateUrl: './offre-detail.component.html',
  styleUrls: ['./offre-detail.component.css']
})
export class OffreDetailComponent implements OnInit {
  offre: any;
  offre_id: any;
  etat: string;

  constructor(private offreservice:OffreService, private router:Router) { }

  ngOnInit(): void {
    this.offre_id = localStorage.getItem('offre_id');
    this.etat = localStorage.getItem('etat');
    console.log(this.offre_id);
    this.offreservice.getOffre(this.offre_id)
    .subscribe(snapshot => {
      console.log(snapshot.data());
      this.offre = snapshot.data();
    })
  }


  show(offre){
    localStorage.setItem('offre',JSON.stringify(offre));
    this.router.navigate(['/dashboard/quiz']);
  }

}
