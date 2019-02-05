import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, AlertController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { SeguimientopagodetallePage } from '../seguimientopagodetalle/seguimientopagodetalle';
import { SeguimientopagodosPage } from '../seguimientopagodos/seguimientopagodos';
import { CotizacionrapidaModalPage } from '../cotizacionrapida-modal/cotizacionrapida-modal';
import { EventoAgregaritemsPage } from '../evento-agregaritems/evento-agregaritems';
import { TabsPage } from '../tabs/tabs';
import { AnonymousSubject } from 'rxjs/Subject';




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
  
  costot : number;
  costo_total: number;
  saldo: number;

  id_evento: string;

  pagos:any;
  public evento: any;
  public items:any;
  public observ: any;

  eliminado: any;
  eliminadores: any;
  camentarios: any;
  comnets: any;

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
                this.sacarPago(this.id_evento);

                
                
  }

  patras(){
    this.navCtrl.pop();
  }

  actualizar(){
    this.sacardetalles(this.id_evento);
    this.sacarItems(this.id_evento);
    this.sacarPago(this.id_evento);

  }

  sacardetalles(id_evento: string){

    this.http.detallesdeleventodeldia(id_evento).then(
      (res)=>{

        
       
        this.evento = res["evento"];
        this.observ = res["evento"];


for(let entry of this.evento){

  this.hora_envio_evento= entry.hora_envio_evento;
  this.hora_recoleccion_evento = entry.hora_recoleccion_evento;

  



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

  sacarPago(id_evento){
    this.http.detallePago(id_evento).then(
      (inv) => { 
          
        

       this.pagos= inv["pago"];

       for(let entry of this.pagos){
        var evento = entry.id_evento;
        this.costo_total = entry.costo_total;
        this.saldo = entry.saldo;
        
      }

       
      
         
      },
      (error) =>{
        console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );
  }

  

  borrar(id_evento, id_mob, ocupados, costo){

    console.log(id_evento,id_mob);

    var precio = ocupados*costo;
    console.log(precio);
    this.costo_total = this.costo_total - precio;
    this.saldo = this.saldo - precio;

    console.log(this.costo_total+"   "+this.saldo);


    this.http.borrrarItemsDelevento(id_evento,id_mob, this.costo_total, this.saldo).then(
      (res) => { 
        
          this.sacarPago(this.id_evento);
        if(res["cliente"] == "eliminado"){

          

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
    inputs: [
      {
        name: 'observacionesMaster',
        placeholder: 'Agregar Observaciones'
      }
    ],
    buttons: [
      {
        text: 'OK',
        role: 'cancel',
        handler: data => {

        }
        },
      {
        text: 'Agregar',
        handler: data => {
          if(data.observacionesMaster == ""){
            let ocservar = obs;
            this.actualizarComentario(ocservar);

          }else if(data.observacionesMaster != ""){

          let observar = obs+'<br/>'+data.observacionesMaster;
          this.actualizarComentario(observar);
        }
        }
      }
    ]
  });
  alert.present();
}   

actualizarComentario(observaciones: string){

  
  this.http.actualizarObservaciones(this.id_evento,observaciones).then(
    (inv) => { 
  
      console.log(inv);
      this.camentarios= inv['resultado'];

      for(let entry of this.camentarios){

        this.comnets = entry.resulta;
      }

      if(this.comnets == "registra"){

        let toast = this.toastCtrl.create({
          message: 'Observaciones Actualizadas!',
          duration: 2000,
          position: 'top'
        });  
      toast.present();
      this.actualizar();

      }else{
        let toast = this.toastCtrl.create({
          message: 'Fallo en la conexión inténtelo de nuevo',
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

eliminarEvento(){
  let alert = this.alertCtrl.create({
    title: '¿Desea eliminar este evento?',
    message: 'Esta acción no se puede deshacer!!',
    
    
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        handler: () => {

        
        }
      },
      {
        text: 'Eliminar',
        handler: () => {
          console.log("eligio eliminar evento");
          this.borrarEvento();
        }
      }
    ]
  });
  alert.present();
}

borrarEvento(){
  var eventoEntero = parseInt(this.id_evento);
  this.http.borrarEvento(eventoEntero).then(
    (inv) => { 
  
      this.eliminado= inv['evento'];
      console.log(this.eliminado);

      for(let entry of this.eliminado){

        this.eliminadores = entry.resulta;
      }
      console.log(this.eliminadores);

      if(this.eliminadores == "eliminado"){

        this.borrareventodos();

      }else{
        let toast = this.toastCtrl.create({
          message: 'Fallo la eliminacion de Evento',
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
borrareventodos(){
  this.http.borrarRemanentes(this.id_evento).then(
    (res)=>{

      var json = res['evento'];
      

      for(let entry of json){

        var jsondos = entry.resulta;
      }
      

      if(jsondos == "eliminado"){

        this.navCtrl.setRoot(TabsPage);
        let toast = this.toastCtrl.create({
          message: 'Eliminacion de Evento Exitosa!!!',
          duration: 2000,
          position: 'top'
        });  
      toast.present();
       

      }else{
        let toast = this.toastCtrl.create({
          message: 'Fallo la eliminacion de Moviliario y Pagos',
          duration: 2000,
          position: 'top'
        });  
      toast.present();
     }

    },(error)=>{
    console.log("Error"+JSON.stringify(error));
      alert("Verifica que cuentes con internet");
  })

}

}