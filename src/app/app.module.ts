import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OffresComponent } from './offres/offres.component';
import { OffreDetailComponent } from './offres/offre-detail/offre-detail.component';
import { CondidatureComponent } from './dashboard/condidature/condidature.component';
import { CvComponent } from './dashboard/cv/cv.component';
import { PublicationsComponent } from './publications/publications.component';
import { LoginComponent } from './login/login.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule} from '@angular/fire';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { PublicationDetailComponent } from './publications/publication-detail/publication-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { MessagesComponent } from './dashboard/messages/messages.component';
import { ChangePasswordComponent } from './dashboard/change-password/change-password.component';
import { QuizComponent } from './dashboard/quiz/quiz.component';
import { CountdownModule } from 'ngx-countdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutsComponent,
    FooterComponent,
    HeaderComponent,
    AboutComponent,
    ContactComponent,
    DashboardComponent,
    OffresComponent,
    OffreDetailComponent,
    CondidatureComponent,
    CvComponent,
    PublicationsComponent,
    LoginComponent,
    ForgotPasswordComponent,
    SidebarComponent,
    NavbarComponent,
    PublicationDetailComponent,
    ProfileComponent,
    MessagesComponent,
    ChangePasswordComponent,
    QuizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    NgxPaginationModule,
    CountdownModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
