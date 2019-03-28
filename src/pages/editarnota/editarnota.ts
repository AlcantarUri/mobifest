import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EditarnotaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editarnota',
  templateUrl: 'editarnota.html',
})
export class EditarnotaPage {
  id_nota: string;
  note: string;
  body: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.id_nota = navParams.get('id_nota');
    this.note = navParams.get('note');
    this.body = navParams.get('body');
    console.log(this.id_nota);
    console.log(this.note);
    console.log(this.body);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarnotaPage');
  }

}
