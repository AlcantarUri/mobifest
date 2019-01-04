import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { SeguimientopagodetallePage } from '../seguimientopagodetalle/seguimientopagodetalle';
import { SeguimientopagodosPage } from '../seguimientopagodos/seguimientopagodos';

/**
 * Generated class for the DetalleventodiaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalleventodia',
  templateUrl: 'detalleventodia.html',
})
export class DetalleventodiaPage {
  


  id_evento: string;

  
  public evento: any;
  public items:any;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: HttpProvider,
              public toastCtrl : ToastController) {

                this.id_evento= navParams.get('data');

                this.sacardetalles(this.id_evento);
                this.sacarItems(this.id_evento);
  }

  sacardetalles(id_evento: string){

    this.http.detallesdeleventodeldia(id_evento).then(
      (res)=>{

        
       
        this.evento = res["evento"];

        
        console.log(this.evento);

      },(error)=>{
      console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
    })
  }
  sacarItems(id_evento: string){
    
    this.http.sacarItemsporEventos(id_evento).then(
      (res)=>{

       
        this.items = res["detalles"];
        
        console.log(this.items);

      },(error)=>{
      console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
    })
  }

  borrar(id_evento, id_mob){

    console.log(id_evento,id_mob);


    this.http.borraritemsdelEvento(id_evento,id_mob).then(
      (inv) => { 
        
          
        if(inv["cliente"] == "eliminado"){

          

          let toast = this.toastCtrl.create({
            message: 'Moviliario Eliminado',
            duration: 2000,
            position: 'top'
          });
        
          toast.present();
          this.sacarItems(id_evento);


        }else{

          let toast = this.toastCtrl.create({
            message: 'Fallo la eliminacion Contacta Administrador',
            duration: 2000,
            position: 'top'
          });
        
          toast.present();

        }
      },
      (error) =>{
        console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );

  }


  abono(){
    this.navCtrl.push(SeguimientopagodosPage, {
      data: this.id_evento
    });
    
  }
  

}
