import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RatingModule } from 'ng-starrating';
import { FormsModule } from '@angular/forms'

import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreateSongComponent } from './create-song/create-song.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { SongComponent } from './song/song.component';
import { SongReviewComponent } from './song-review/song-review.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { StarComponent } from './star/star.component';
import { SearchSongComponent } from './search-song/search-song.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateSongComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    ProfileComponent,
    SongComponent,
    SongReviewComponent,
    ReviewsComponent,
    StarComponent,
    SearchSongComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RatingModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSliderModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
