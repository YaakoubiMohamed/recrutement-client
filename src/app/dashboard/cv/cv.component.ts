import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Competence } from 'src/app/classes/competence';
import { CompetenceService } from 'src/app/services/competence.service';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {

  edForm: FormGroup;
  competanceForm: FormGroup;
  experienceForm: FormGroup;
  socialForm: FormGroup;
  cvs: Competence[];
  competences: Competence[];
  user: any;
  submitted = false;
  educations: Competence[];
  experiences: Competence[];
  socials: Competence[];
  
  constructor(private fb: FormBuilder, private competenceService: CompetenceService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userInfo'));
    this.getCompetence();
    this.edForm = this.fb.group({
      "titre":[''],
      "niveau":[''],
      "institut":[''],
      "annee":[''],
      "type":['education'],
      "user":[this.user.uid],
    });
    this.competanceForm = this.fb.group({
      "titre":[''],
      "niveau":[''],
      "type":['competance'],
      "user":[this.user.uid],
    });

    this.experienceForm = this.fb.group({
      "titre":[''],
      "experience":[''],
      "annee":[''],
      "type":['experience'],
      "user":[this.user.uid],
    }); 
    
    this.socialForm = this.fb.group({
      "linkedin":[''],
      "github":[''],
      "type":['social'],
      "user":[this.user.uid],
    }); 
  }

  getCompetence(){
    this.competenceService.getCompetencesListe().subscribe(admin => {
      this.cvs = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Competence;
      });
      this.educations = this.cvs.filter(education => {
        return education.type == 'education';
      })
      this.experiences = this.cvs.filter(experience => {
        return experience.type == 'experience';
      })
      this.competences = this.cvs.filter(competence => {
        return competence.type == 'competance';
      })
      this.socials = this.cvs.filter(social => {
        return social.type == 'social';
      })
      console.log(this.educations,this.experiences,this.competences,this.socials);           
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.edForm.controls;
  }
  addEducation(){
    this.submitted = true;

    if (this.edForm.invalid) {
      return;
    }
    this.competenceService.addCompetence(this.edForm.value);
    this.edForm.reset();
    this.submitted = false;
  }

  addCompetance(){
    this.submitted = true;

    if (this.competanceForm.invalid) {
      return;
    }
    this.competenceService.addCompetence(this.competanceForm.value);
    this.competanceForm.reset();
    this.submitted = false;
  }

  addExperience(){
    this.submitted = true;

    if (this.experienceForm.invalid) {
      return;
    }
    this.competenceService.addCompetence(this.experienceForm.value);
    this.experienceForm.reset();
    this.submitted = false;
  }

  addSocial(){
    this.submitted = true;

    if (this.socialForm.invalid) {
      return;
    }
    this.competenceService.addCompetence(this.socialForm.value);
    this.socialForm.reset();
    this.submitted = false;
  }

}
