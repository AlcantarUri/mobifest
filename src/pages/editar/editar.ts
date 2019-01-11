import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';

/**
 * Generated class for the EditarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar',
  templateUrl: 'editar.html',
})
export class EditarPage {

  idrecibido: string;
  public evento: any;

  respuesta: any;
  respuestados: string;

id_mob: number;
nombre_evento: string;
tipo_evento: string;
fecha_envio_evento: any;
hora_envio_evento: any;
fecha_recoleccion_evento: any;
hora_recoleccion_evento:any;
pagado_evento: any;
nombre_titular_evento: string;
telefono_titular_evento: string;
direccion_evento: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: HttpProvider,
              public toastCtrl: ToastController) {

                this.idrecibido=navParams.get('id');
                console.log(this.idrecibido);
                this.sacardetalles(this.idrecibido);


  }

  patras(){
    this.navCtrl.pop();
  }

  sacardetalles(id_evento: string){

    this.http.detallesdeleventodeldia(id_evento).then(
      (res)=>{

        
       
        this.evento = res["evento"];


for(let entry of this.evento){
  this.nombre_evento = entry.nombre_evento,
  this.tipo_evento = entry.tipo_evento,
  this.fecha_envio_evento = entry.fecha_envio_evento,
  this.hora_envio_evento= entry.hora_envio_evento,
  this.fecha_recoleccion_evento = entry.fecha_recoleccion_evento,
  this.hora_recoleccion_evento = entry.hora_recoleccion_evento;
  this.pagado_evento = entry.pagado_evento,
  this.nombre_titular_evento = entry.nombre_titular_evento,
  this.direccion_evento = entry.direccion_evento,
  this.telefono_titular_evento = entry.telefono_titular_evento

  
                
  console.log("this is:   "+this.nombre_evento);
  console.log("this is:   "+this.tipo_evento);
  console.log("this is:   "+this.fecha_envio_evento);
  console.log("this is:   "+this.hora_envio_evento);
  console.log("this is:   "+this.fecha_recoleccion_evento);
  console.log("this is:   "+this.hora_recoleccion_evento);
  console.log("this is:   "+this.pagado_evento);
  console.log("this is:   "+this.nombre_titular_evento);
  console.log("this is:   "+this.direccion_evento);
  console.log("this is:   "+this.telefono_titular_evento);

}

        
        console.log(this.evento);

      },(error)=>{
      console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
    })
  }

  save(){
    this.http.actualizarEvento(
      this.idrecibido,
      this.nombre_evento,
      this.tipo_evento,
      this.fecha_envio_evento, 
      this.hora_envio_evento,
      this.fecha_recoleccion_evento, 
      this.hora_recoleccion_evento,
      this.nombre_titular_evento, 
      this.direccion_evento,
      this.telefono_titular_evento).then(
      (res) => { 
        this.respuesta = res['resultado'];

        console.log(this.respuesta);


        for(let entry of this.respuesta){
          this.respuestados = entry.resulta;
        }
        console.log("Respuesta dos: "+this.respuestados);
        if(this.respuestados == "registra"){

          this.cambiosChidos();
          this.navCtrl.pop();
          
        }else if(this.respuestados == "noRegistra"){

          alert("No Registrado Asegurate de Cntar con Internet");
          this.cambionoRealizdo();
          this.navCtrl.pop();
        }
      },
      (error) =>{
        console.error(error);
        alert("No Registrado Asegurate de Cntar con Internet"+error);
        console.log("RegistroError en php Exitoso");
      }
    )
  }


  cambiosChidos() {
    let toast = this.toastCtrl.create({
      message: 'Cambio Realizados Correctamente',
      duration: 2000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      
    });
  
    toast.present();
  }
  cambionoRealizdo() {
    let toast = this.toastCtrl.create({
      message: 'Cambios NO realizados',
      duration: 2000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      
    });
  
    toast.present();
  }
}
