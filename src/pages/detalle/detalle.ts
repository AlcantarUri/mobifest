import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';

/**
 * Generated class for the DetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html',
})
export class DetallePage {

  nombre:string;
  detainv:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpProvider) {

    this.nombre = navParams.get('data');
    console.log(this.nombre);

    var i = 0, strLength = this.nombre.length;
 
    for(i; i < strLength; i++) {
 
     this.nombre = this.nombre.replace(" ", "_");
 
    
    }
 

    console.log(this.nombre);

    this.detalle(this.nombre);

  }

  detalle(nombre:string){

    this.http.sacarDetalles(nombre).then(
      (data) => { 
        console.log(data)  

        this.detainv = data["detalle"];

        console.log("Resultado"+JSON.stringify(this.detainv));

        let nombre = this.detainv["nombre_mob"];

        console.log(nombre);



      },
      (error) =>{
        console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallePage');
  }

}
