import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Condidature } from 'src/app/classes/condidature';
import { Offre } from 'src/app/classes/offre';
import { CondidatureService } from 'src/app/services/condidature.service';
import { OffreService } from 'src/app/services/offre.service';

@Component({
  selector: 'app-condidature',
  templateUrl: './condidature.component.html',
  styleUrls: ['./condidature.component.css']
})
export class CondidatureComponent implements OnInit {

  condidatures: Condidature[];
  user: any;
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9, 12];
  offres: Offre[];
  offreListe: Offre[];
  jobs: Array<{}> = [];

  constructor(private router:Router,private condidatureService: CondidatureService, private offreservice:OffreService) { }

  ngOnInit(): void {
    this.getCondidature();
    this.user = JSON.parse(localStorage.getItem('userInfo'));
  }


  getCondidature(){
    
    this.condidatureService.getCondidaturesListe().subscribe(admin => {
      this.condidatures = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Condidature;
      });
      this.count = this.condidatures.length;
      this.condidatures = this.condidatures.filter(condid => {
        return condid.user == this.user.uid;
      })
      this.offreservice.getOffres().subscribe(admin => {
        this.offres = admin.map(item => {
          let uid = item.payload.doc.id;
          let data = item.payload.doc.data();
          return { uid, ...(data as {}) } as Offre;
        });
        this.count = this.offres.length;
        console.log(this.offres);  
        this.offreListe = this.offres;      
        let i=0;  
        this.condidatures.forEach(data => {
          //console.log(i);
  //        this.offres.forEach(off =>{
            for(let j=0;j<this.count;j++){
                if(this.offres[j].uid == data.offre) {
                  let job={};
                  job['titre'] = this.offres[j].titre;
                  job['departement'] = this.offres[j].departement;
                  job['offre'] = this.offres[j].uid;
                  job['uid'] = data.uid;
                  job['etat'] = data.etat;
                  console.log(j);
                  this.jobs.push(job);
                                  
                console.log(this.offres[j].uid,data.offre);
                }
              }
              i++; 
            }); 
      });
      //console.log(this.condidatures);   
      
      
      
      
      //console.log(this.jobs);
    });
  }

  handlePageChange(event): void {
    this.page = event;
    this.getCondidature();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getCondidature();
  }

  delete(condidature){
    console.log(condidature);
    this.condidatureService.deleteCondidature(condidature.uid);
  }

  detail(condidature){
    localStorage.setItem('offre_id',condidature.offre);
    localStorage.setItem('etat',condidature.etat);
    this.router.navigate(['/offre-detail']);
  }
}
