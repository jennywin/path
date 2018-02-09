import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Health } from '@ionic-native/health';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  isHealthAvailable: boolean = false;

  constructor(public navCtrl: NavController, private health: Health) {

  }

  checkHealth() {
    this.health.isAvailable()
      .then((available:boolean) => {
        this.isHealthAvailable = available;
        console.log("health is available? " + this.isHealthAvailable);
        this.health.requestAuthorization([
          {
            read: ['activity', 'gender', 'date_of_birth']
          }
        ])
        .then(res => console.log("finished getting health data" + res))
        .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }

  getHealthData() {
    console.log("starting to query aggregated data");
    this.health.queryAggregated({
      startDate: new Date(new Date().getTime() - 50 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
      dataType: 'activity',
      bucket: 'week'
    });
  }
}
