import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [GooglePlus]
})
export class HomePage {

  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;
  isLoggedIn: boolean = false;
  quote = {};

  constructor(public navCtrl: NavController, private googlePlus: GooglePlus, private apiServiceProvider: ApiServiceProvider) {

    this.apiServiceProvider.getQuote()
      .subscribe(data => {
        console.log('forismatic api data');
        console.log(data);
      })

  }

  login() {
    this.googlePlus.login({
      'scopes': 'profile email https://www.googleapis.com/auth/calendar.readonly',
      'webClientId': '351386646001-va0q6jbb4m4u64ecti9n9o7qdhqgdq71'
    })
      .then(res => {
        console.log('testing: logged in');
        console.log(res);
        this.displayName = res.displayName;
        this.email = res.email;
        this.familyName = res.familyName;
        this.givenName = res.givenName;
        this.userId = res.userId;
        this.imageUrl = res.imageUrl;

        this.isLoggedIn = true;
      })
      .catch(err => console.error(err));
  }

  logout() {
    this.googlePlus.logout()
      .then(res => {
        console.log(res);
        this.displayName = "";
        this.email = "";
        this.familyName = "";
        this.givenName = "";
        this.userId = "";
        this.imageUrl = "";

        this.isLoggedIn = false;
      })
      .catch(err => console.error(err));
  }

}
