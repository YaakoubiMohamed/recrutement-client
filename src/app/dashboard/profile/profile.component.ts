import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CondidatService } from 'src/app/services/condidat.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  updateForm: FormGroup;
  user: any;
  photo: any;
  @ViewChild("img") img: ElementRef; 
  newimg = false;

  constructor(private storage: AngularFireStorage,
    private fb: FormBuilder, private condidatService: CondidatService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userInfo'));
    console.log(this.user);
    this.updateForm = this.fb.group({
      nom: [this.user.nom, [Validators.required]],
      prenom: [this.user.prenom, [Validators.required]],
      email: [this.user.email, [Validators.required,Validators.email]],
      telephone: [this.user.email, [Validators.required]],
      adresse: [this.user.adresse, [Validators.required]],
      photo: [this.user.photo],
      uid: [this.user.uid],
    });    
  }

  update(user){
    console.log(user);
    let profile ={};
    profile = user;
    if(!this.newimg) {
      profile['photo']= this.user.photo;
    }
    else{
      profile['photo']= this.img;
    }
    console.log(profile);
    this.condidatService.editCondidat(profile,this.user.uid);
    localStorage.setItem('userInfo',JSON.stringify(profile));

  }

  upload(f, img) {
    this.newimg = true;
    const path = `/images/${f.files[0].name}`;
    const storageReference = this.storage.ref('/images/' + f.files[0].name);
    const uploadTask = this.storage.upload(path,(f.files[0]));
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageReference.getDownloadURL().subscribe(downloadURL => {
          this.img = downloadURL;
          //fileUpload.name = fileUpload.file.name;
          console.log(this.img);
        });
      })
    ).subscribe();
  }

}
