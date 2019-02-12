import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController, ViewController, LoadingController } from 'ionic-angular';
import * as moment from 'moment';
import { HttpProvider } from '../../providers/http/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the CotizacionrapidaModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cotizacionrapida-modal',
  templateUrl: 'cotizacionrapida-modal.html',
})
export class CotizacionrapidaModalPage {

 fecha_envio_evento: string;

 inventario: any;
 items:any;
 moviles:any;
 mobiliarios =[];

 wakawaka:string;
 public costo_total:number=0;
 arreglodeobjetos = [];
 arreglodefecha = [];

 hora_envio_evento: any;
 hora_recoleccion_evento: any;

 id_evento: string;
 
 pagos: any;

 costo_total_recibido: string;
 saldo_recibido: string;
 saldo_final: number;
 anticipo_recibido: string;
 anticipo_final:number;

 costo_final: number;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private http: HttpProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public viewCtrl : ViewController) {

      this.fecha_envio_evento = navParams.get('data');
      this.hora_envio_evento = navParams.get('horae');
      this.hora_recoleccion_evento = navParams.get('horar');
      this.id_evento = navParams.get('id');
      this.getMessages();
      this.sacarPago();

      console.log(this.id_evento);
      
  

  }
  initializeItems() {
    
    //this.mobiliarios = this.inventario;
    this.items=this.inventario;
    this.inventario=this.moviles;
   }

   getMessages(){    
    this.http.yanosequehaceesta(this.fecha_envio_evento).then(
      (inv) => { 
       this.inventario = inv["inventario"];
       //this.mobiliarios = this.inventario;     
       this.moviles = inv["inventario"];
       //this.nombres = JSON.parse(JSON.stringify(this.moviles));
       this.items = this.mobiliarios;    
       
       
         
      },
      (error) =>{
        console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );
    }


    sacarPago(){
      this.http.sacarTotalCosto(this.id_evento).then(
        (inv) => { 
         console.log(inv)     
          
  
         this.pagos= inv["costo"];

         for(let entry of this.pagos){
          this.costo_total_recibido=entry.costo_total;
          this.saldo_recibido=entry.saldo;
          this.anticipo_recibido=entry.anticipo
         }
  
  //       console.log("costo total primero: "+this.costo_total_recibido);
         
        
           
        },
        (error) =>{
          console.log("Error"+JSON.stringify(error));
          alert("Verifica que cuentes con internet");
        }
      );
    }

   presentAlert(id_mob: number, nombre: string, cantidad: Number, costo: number) {
      
    this.wakawaka = cantidad.toString();

      let alert = this.alertCtrl.create({

        title: 'Selecciona la cantidad',
        //inputs:[this.inventario.mob]
        inputs: [
          {
            name: 'reservados',
            placeholder: 'Cantidad',
            type: 'Number',
            min:"0",
            max:this.wakawaka
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
             
            }
          },
          {
            text: 'Ok',
            handler: data => {
              
              if(parseInt(data.reservados)==0){

                let toast = this.toastCtrl.create({
                  message: 'No se pueden elegir 0 de '+ nombre,
                  duration: 2500,
                  position: 'bottom'
                  
                });
                toast.present();
  
              }else if(data.reservados==""){
  
                let toast = this.toastCtrl.create({
                  message: 'Favor de elegir mas de 0',
                  duration: 2500,
                  position: 'bottom'
                  
                });
                toast.present();
              } else
              if(parseInt(data.reservados) > cantidad ){
                console.log("---------------------------------------------------");
                console.log("Disponibles2: "+cantidad);
                console.log("Elgidos2:     "+parseInt(data.reservados));
                let toast = this.toastCtrl.create({
                  message: 'No hay cantidad suficiente',
                  duration: 3000,
                  position: 'top'
                  
                });
                toast.present();
              }else{
                console.log("Agregando a seikoas");
                this.seikoas(id_mob,data.reservados,costo);
              }
            }
          }
        ] 
      });
      alert.present();
}

seikoas(id_mob: number, reservados:number, precio: number){
 
  

  var tot:number;
    
  tot=precio*reservados;
  this.costo_total=tot+this.costo_total;

    this.arreglodeobjetos.push({
      id_mob: id_mob,ocupados:reservados
    })
console.log(this.arreglodeobjetos);

}


continuarCotizacion(arreglochido: any){
  //this.navCtrl.push(EventModalPage, {arreglo: arreglochido});
  let alert = this.alertCtrl.create({
    title: 'Confirmar Cotización',
    message: 'El costo extra seria de: '+ this.costo_total+'<br> Desea agregar IVA?',
    
    
    buttons: [
      {
        text: 'Cancelar',
        handler: () => {
          console.log('Cancelar');
          
        }
      },
      {
        text: 'No',
        role: 'cancel',
        handler: () => {
          console.log('Ño');

          //añadir a inventario
          console.log(this.costo_total);
          this.confirmar();
          

        }
      },
      {
        text: 'Sí',
        handler: () => {
          console.log('Sí');
          this.confirmar();
          this.pasaraCotizacionconIva();
        }
      }
    ]
  });
  alert.present();
 }

 pasaraCotizacionconIva() {
    
  
  this.costo_total= this.costo_total+(this.costo_total*.16);
  console.log(this.costo_total);

}

confirmar(){
  let alert = this.alertCtrl.create({
    title: 'Confirmar Cotización',
    message: '¿Desea agregar el costo e inventario al evento?',
    
    
    buttons: [
      {
        text: 'Cancelar',
        handler: () => {
          console.log('Cancelar');
          
        }
      },
      {
        text: 'No',
        role: 'cancel',
        handler: () => {
          console.log('Ño');

          //añadir a inventario
          this.viewCtrl.dismiss(this.costo_total); 
          

        }
      },
      {
        text: 'Sí',
        handler: () => {
          console.log('Sí');
          this.presentLoadingCustom();
        }
      }
    ]
  });
  alert.present();
}

presentLoadingCustom() {
  let loading = this.loadingCtrl.create({
    content: 'Agregando Evento por favor espere...',
    duration: 2000
  });

  loading.onDidDismiss(() => {
    this.juntarobjetos();
    this.actualizarpago();
    this.viewCtrl.dismiss(this.costo_total);   
  });

  loading.present();
}

juntarobjetos(){

  

  for (var i = 0; i < this.arreglodeobjetos.length; i++) {
    this.arreglodefecha.push({
      fecha_evento: this.fecha_envio_evento, 
      hora_evento: this.hora_envio_evento, 
      id_evento: this.id_evento,
      hora_recoleccion_evento: this.hora_recoleccion_evento
      
    })
    console.log(this.arreglodeobjetos);
    
    }

    for (var i = 0; i < this.arreglodeobjetos.length; i++) {
      
        
      

this.http.addInventorytoEvent(
  this.arreglodefecha[i].fecha_evento,
  this.arreglodefecha[i].hora_evento,
  this.arreglodeobjetos[i].id_mob,
  this.arreglodeobjetos[i].ocupados,
  this.arreglodefecha[i].id_evento,
  this.arreglodefecha[i].hora_recoleccion_evento
).then((inv)=>{

},(error)=>{
  console.log("Error"+JSON.stringify(error));
})
      
      
      }

    
    

}

actualizarpago(){
  
  this.costo_final = this.costo_total+parseFloat(this.costo_total_recibido);
  
  this.saldo_final=parseFloat(this.saldo_recibido);
  
  this.anticipo_final=parseFloat(this.anticipo_recibido);
  
  this.saldo_final = this.costo_final-this.anticipo_final;

  this.http.actualizarPagosacarTotalCosto(
    this.costo_final,
    this.saldo_final,
    this.id_evento
  ).then(
    (inv) => { 
     console.log(inv);     
      
    },
    (error) =>{
      console.log("Error"+JSON.stringify(error));
      alert("Verifica que cuentes con internet");
    }
  );
  

  
}

getItems(ev: any) {
  // Reset items back to all of the items
  this.initializeItems();

  // set val to the value of the searchbar
  const val = ev.target.value;

  // if the value is an empty string don't filter the items
  if (val && val.trim() != '') {
    this.inventario = this.inventario.filter((item) => {
      return (item.nombre_mob.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }
}

atras(){
  this.navCtrl.pop();
}


}
