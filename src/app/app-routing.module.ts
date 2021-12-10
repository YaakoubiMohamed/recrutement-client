import { CondidatureComponent } from './dashboard/condidature/condidature.component';
import { MessagesComponent } from './dashboard/messages/messages.component';
import { PublicationsComponent } from './publications/publications.component';
import { OffresComponent } from './offres/offres.component';
import { ContactComponent } from './contact/contact.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { OffreDetailComponent } from './offres/offre-detail/offre-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { HomedComponent } from './dashboard/homed/homed.component';
import { PublicationDetailComponent } from './publications/publication-detail/publication-detail.component';
import { CvComponent } from './dashboard/cv/cv.component';
import { ChangePasswordComponent } from './dashboard/change-password/change-password.component';
import { QuizComponent } from './dashboard/quiz/quiz.component';

const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch: 'full'},
  {path: '', component: LayoutsComponent,children: [
    {path: 'home', component: HomeComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'about', component: AboutComponent},
    {path: 'publication', component: PublicationsComponent},
    {path: 'publication-detail', component: PublicationDetailComponent},
    {path: 'offres', component: OffresComponent},
    {path: 'offre-detail', component: OffreDetailComponent},
    {path: 'login', component: LoginComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent},    
  ]},
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: 'home', component: HomedComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'cv', component: CvComponent},
    {path: 'quiz', component: QuizComponent},
    {path: 'message', component: MessagesComponent},
    {path: 'condidature', component: CondidatureComponent},
    {path: 'change-password', component: ChangePasswordComponent},
  ]},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
