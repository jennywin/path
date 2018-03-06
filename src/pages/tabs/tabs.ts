import { Component } from '@angular/core';

import { MoodsPage } from '../moods/moods';
import { GratitudesPage } from '../gratitudes/gratitudes';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MoodsPage;
  tab3Root = GratitudesPage;

  constructor() {

  }
}
