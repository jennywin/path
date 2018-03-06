import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-gratitudes',
  templateUrl: 'gratitudes.html'
})
export class GratitudesPage {
  private apiUrl = 'https://wqqfg2he0m.execute-api.us-west-1.amazonaws.com/prod';
  data: any;

  constructor(public navCtrl: NavController, private http: Http) {
    console.log('inside of gratitudes.ts');
    this.getUsers();
  }

  getData() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-api-key', '7Ltou26Gyo1IovaZSk2cRakl96Xf7d6damkmlRZm');
    return this.http.get(this.apiUrl, { headers: headers }).map((response: Response) => response.json());
  }

  getUsers() {
    this.getData().subscribe(
      data => {
        this.data = data.Items;
        console.log('ok, getting users:');
        console.log(this.data);
      },
      error => { console.log('something went wrong... ' + error) })
  }

}
