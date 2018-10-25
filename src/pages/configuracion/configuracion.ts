import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';



/**
 * Generated class for the ConfiguracionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-configuracion',
  templateUrl: 'configuracion.html',
})
export class ConfiguracionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modCtrl:ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguracionPage');
  }


  abrirClientes(){

    this.modCtrl.create('CatalogoclientesPage').present();
  }

  abrirPagos(){

    this.modCtrl.create('PagosPage').present();
  }

  abrirTrabajadores(){

    this.modCtrl.create('TrabajadoresPage').present();
  }
}
