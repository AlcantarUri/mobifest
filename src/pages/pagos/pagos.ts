import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';

/**
 * Generated class for the PagosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pagos',
  templateUrl: 'pagos.html',
})
export class PagosPage {

  pagos:any;

  constructor(public navCtrl: NavController, public http: HttpProvider, public navParams: NavParams, public view: ViewController) {

    this.sacarPagos();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagosPage');
  }

  cerrarModal(){
    this.view.dismiss();
  }

  sacarPagos(){
    
    this.http.revisarSaldos().then(
      (inv) => { 
       console.log(inv)     
        

       this.pagos= inv["pago"];

       console.log(this.pagos);
      
         
      },
      (error) =>{
        console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );
  }

}
