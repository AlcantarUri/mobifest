import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';


/**
 * Generated class for the SeguimientopagodetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-seguimientopagodetalle',
  templateUrl: 'seguimientopagodetalle.html',
})
export class SeguimientopagodetallePage {

  id:string;
  pagos:any;

  constructor(public navCtrl: NavController, public http: HttpProvider, public navParams: NavParams) {

    this.id = navParams.get('data');

    this.sacarPago();
   
    console.log(this.id);
  }

  sacarPago(){
    this.http.detallePago(this.id).then(
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeguimientopagodetallePage');
  }

  abonar(abono:string){
    console.log(abono);


  }

}
