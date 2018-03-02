import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectsComponent } from './projects/projects.component';
import { HomeComponent } from './home/home.component';
import { VideosComponent } from './videos/videos.component';
import { ContactComponent } from './contact/contact.component';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },  
  { path: 'home', component: HomeComponent},
  { path: 'projects', component: ProjectsComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent }
  
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProjectsComponent,
    HomeComponent,
    VideosComponent,
    ContactComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
