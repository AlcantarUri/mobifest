import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { PagosPage } from '../pagos/pagos';
import { ToastController } from 'ionic-angular';




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

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public http: HttpProvider, public navParams: NavParams) {

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
    console.log(this.id);

    this.http.abonarEvento(this.id,abono).then(
      (inv) => { 
       console.log(inv)     
        

       var json = inv["resultado"];
       var string;

       console.log(json);

       for (var i = 0; i < json.length; i++) {
        console.log(json[i].resulta);
        string = json[i].resulta;
        } 
 
         console.log("Nombre"+string);

         var result = string.localeCompare("registra");

         console.log(result);   
       
         if(result != 0){

          let toast = this.toastCtrl.create({
            message: 'Error revisa tu conexion a internet',
            duration: 3000,
            position: 'top'
          });

          toast.present(); 
        
         }else{
          this.navCtrl.setRoot(PagosPage);
         }


      },
      (error) =>{
        console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );




  }

}
