import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AnadirInvModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-anadir-inv-modal',
  templateUrl: 'anadir-inv-modal.html',
})
export class AnadirInvModalPage {

  constructor(private navParams: NavParams, private view: ViewController) {
  }


  cerrarModal(){
    this.view.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnadirInvModalPage');
  }

}
