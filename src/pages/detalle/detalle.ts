import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { ModalController } from 'ionic-angular';


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
 
  detainv:string[];
 


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpProvider,  public modCtrl:ModalController) {

    this.nombre = navParams.get('data');
   
    console.log(this.nombre);

    var i = 0, strLength = this.nombre.length;
 
    for(i; i < strLength; i++) {
 
     this.nombre = this.nombre.replace(" ", "_");
 
    
    }
 

 //  console.log(this.nombre);

    this.detalle(this.nombre);

  }

  detalle(nombre:string){

    this.http.sacarDetalles(nombre).then(
      (data) => { 
       // console.log(data)  

        this.detainv = data["detalle"];

       // console.log("Resultado"+JSON.stringify(this.detainv));

        

       /*  var json = data["detalle"];

       for (var i = 0; i < json.length; i++) {
       // console.log(json[i].nombre_mob);
       this.rango = json[i].cantidad_mob;
       }

        console.log("Nombre"+this.rango);
*/


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

  EditarItem(){
    const myAnadir = this.modCtrl.create('EditarInventarioPage', {nombre:this.nombre});

    myAnadir.present();
  }

}
