import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GooglePlus } from '@ionic-native/google-plus';
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private apiUrl = 'https://f88n7z5l9e.execute-api.us-west-1.amazonaws.com/prod';
  randomQuote: any;
  quotes: any;
  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;
  isLoggedIn: boolean = false;
  notifyTime: any;
  notifications: any[] = [];
  days: any[];
  chosenHours: number;
  chosenMinutes: number;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public platform: Platform, private http: Http, private googlePlus: GooglePlus, public localNotifications: LocalNotifications) {
    console.log('inside of home.ts');
    this.getQuotes();

    this.notifyTime = moment(new Date()).format();

    this.chosenHours = new Date().getHours();
    this.chosenMinutes = new Date().getMinutes();

    this.days = [
      { title: 'Monday', dayCode: 1, checked: false },
      { title: 'Tuesday', dayCode: 2, checked: false },
      { title: 'Wednesday', dayCode: 3, checked: false },
      { title: 'Thursday', dayCode: 4, checked: false },
      { title: 'Friday', dayCode: 5, checked: false },
      { title: 'Saturday', dayCode: 6, checked: false },
      { title: 'Sunday', dayCode: 0, checked: false }
    ];
  }

  getData() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-api-key', '7Ltou26Gyo1IovaZSk2cRakl96Xf7d6damkmlRZm');
    return this.http.get(this.apiUrl, {headers: headers}).map((response: Response) => response.json());
  }

  getQuotes() {
    this.getData().subscribe(
      data => {
        this.quotes = data.Items;
        this.randomQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)].quoteText;
      },
      error => { console.log('something went wrong... ' + error) })
  }

  login() {
    this.googlePlus.login({})
      .then(res => {
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

  ionViewDidLoad() {

  }

  timeChange(time) {
    this.chosenHours = time.hour;
    this.chosenMinutes = time.minute;
  }

  addNotifications() {
    let currentDate = new Date();
    let currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.

    for (let day of this.days) {

      if (day.checked) {

        let firstNotificationTime = new Date();
        let dayDifference = day.dayCode - currentDay;

        if (dayDifference < 0) {
          dayDifference = dayDifference + 7; // for cases where the day is in the following week
        }

        firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
        firstNotificationTime.setHours(this.chosenHours);
        firstNotificationTime.setMinutes(this.chosenMinutes);


        let notification = {
          id: day.dayCode,
          title: 'Revisit Your Path',
          text: 'Now seems like a good time to meditate, check-in and see how you\'re feeling, or read some gratitudes!',
          at: firstNotificationTime,
          every: 'week'
        };

        this.notifications.push(notification);

      }

    }

    console.log("Notifications to be scheduled: ", this.notifications);

    if (this.platform.is('cordova')) {

      // Cancel any existing notifications
      this.localNotifications.cancelAll().then(() => {

        // Schedule the new notifications
        this.localNotifications.schedule(this.notifications);

        this.notifications = [];

        let alert = this.alertCtrl.create({
          title: 'Notifications set',
          buttons: ['Ok']
        });

        alert.present();

      });

    }
  }

  cancelAll() {
    this.localNotifications.cancelAll();

    let alert = this.alertCtrl.create({
      title: 'Notifications cancelled',
      buttons: ['Ok']
    });

    alert.present();
  }

}
