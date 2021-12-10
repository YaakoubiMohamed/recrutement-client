import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offre } from '../classes/offre';
import { AuthService } from '../services/auth.service';
import { CondidatureService } from '../services/condidature.service';
import { OffreService } from '../services/offre.service';

@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class OffresComponent implements OnInit {

  offres: Offre[];
  tutorials: any;
  currentTutorial = null;
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  user: any;
  
  constructor(private router:Router, private offreservice:OffreService,
    private condidatureService: CondidatureService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getOffres();
    this.user = JSON.parse(localStorage.getItem('userInfo'));
    this.authService.isLoggedIn;
    
  }
  getOffres(){
    this.offreservice.getOffres().subscribe(admin => {
      this.offres = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Offre;
      });
      this.count = this.offres.length;
      console.log(this.offres);           
    });
  }

  handlePageChange(event): void {
    this.page = event;
    this.getOffres();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getOffres();
  }


  detail(offre){
    localStorage.setItem('offre_id',offre.uid);
    console.log(offre);
    this.router.navigate(['/offre-detail']);
  }

  postuler(offre){
    let condidature = {};
    condidature['offre'] = offre.uid;
    condidature['user'] = this.user.uid;
    condidature['etat'] = 'en attente';
    console.log(condidature);
    console.log(this.user);
    if(this.authService.isLoggedIn)
    {
      this.condidatureService.addCondidature(condidature);
      alert("Condidature effectuer avec succes");
    }
    else
    {
      alert("vous n'ete pas connecter");
    }    
  }

}