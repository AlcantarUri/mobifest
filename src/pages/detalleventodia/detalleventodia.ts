import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, AlertController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { SeguimientopagodetallePage } from '../seguimientopagodetalle/seguimientopagodetalle';
import { SeguimientopagodosPage } from '../seguimientopagodos/seguimientopagodos';
import { CotizacionrapidaModalPage } from '../cotizacionrapida-modal/cotizacionrapida-modal';
import { EventoAgregaritemsPage } from '../evento-agregaritems/evento-agregaritems';




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
  public observ: any;

  fecha_envio_evento: any;
  hora_envio_evento: any;
  hora_recoleccion_evento: any;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: HttpProvider,
              public toastCtrl : ToastController,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController) {

                this.id_evento= navParams.get('data');
                this.fecha_envio_evento = navParams.get('date');

                

                this.sacardetalles(this.id_evento);
                this.sacarItems(this.id_evento);

                
                
  }

  patras(){
    this.navCtrl.pop();
  }

  actualizar(){
    this.sacardetalles(this.id_evento);
    this.sacarItems(this.id_evento);

  }

  sacardetalles(id_evento: string){

    this.http.detallesdeleventodeldia(id_evento).then(
      (res)=>{

        
       
        this.evento = res["evento"];
        this.observ = res["evento"];


for(let entry of this.evento){

  this.hora_envio_evento= entry.hora_envio_evento;
  this.hora_recoleccion_evento = entry.hora_recoleccion_evento;

  console.log("this is:   "+this.hora_recoleccion_evento);

  

}

        
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


  addmob(){
    
    console.log(this.fecha_envio_evento);
    
    let modal = this.modalCtrl.create('CotizacionrapidaModalPage', {
      data:this.fecha_envio_evento,
      horae: this.hora_envio_evento,
      horar: this.hora_recoleccion_evento,
      id: this.id_evento});
    
  modal.onDidDismiss(data=>{

this.sacarItems(this.id_evento);
  }
    );
  modal.present();

}


edit(){

    let modal = this.modalCtrl.create('EditarPage', {
      id: this.id_evento});
    
  modal.onDidDismiss(data=>{

this.sacardetalles(this.id_evento);
  }
    );
  modal.present();

}


presentAlert(obs: string) {
  let alert = this.alertCtrl.create({
    title: 'Observaciones',
    subTitle: obs,
    buttons: ['OK']
  });
  alert.present();
}

}