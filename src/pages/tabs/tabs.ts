import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';

import { HomePage } from '../home/home';
import { MobiliarioPage } from '../mobiliario/mobiliario';
import { ConfiguracionPage } from '../configuracion/configuracion';



@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  calendario = HomePage;
  inventario = MobiliarioPage;
  configuracion = ConfiguracionPage;

  @ViewChild('myTabs') tabsRef: Tabs;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
   let openTab = this.navParams.get('openTab');
   if(openTab){

    this.tabsRef.select(openTab);

   }

  }

}
