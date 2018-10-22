import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import * as moment from 'moment';

/**
 * Generated class for the CotizacionrapidaModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cotizacionrapida-modal',
  templateUrl: 'cotizacionrapida-modal.html',
})
export class CotizacionrapidaModalPage {

  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString()}

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private modalCtrl: ModalController) {

      let preselectedDate = moment(this.navParams.get('selectedDay')).format();
      this.event.startTime = preselectedDate;
      this.event.endTime = preselectedDate;
  

  }

  


}
