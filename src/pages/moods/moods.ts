import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GratitudesPage } from '../gratitudes/gratitudes';

@Component({
  selector: 'page-moods',
  templateUrl: 'moods.html'
})
export class MoodsPage {
  buttonSelected: boolean = false;
  happyButtonColor: string = 'light';
  sadButtonColor: string = 'light';
  isHappy: boolean;

  tab3Root = GratitudesPage;

  constructor(public nav: NavController) {

  }

  showHappyModal() {
    if (this.happyButtonColor == 'light') {
      this.happyButtonColor = 'primary';
      this.sadButtonColor = 'light';
    }
    this.buttonSelected = true;
    this.isHappy = true;
  }

  showSadModal() {
    if (this.sadButtonColor == 'light') {
      this.sadButtonColor = 'primary';
      this.happyButtonColor = 'light';
    }
    this.buttonSelected = true;
    this.isHappy = false;
  }

}
