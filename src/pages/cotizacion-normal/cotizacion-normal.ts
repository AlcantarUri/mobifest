import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import * as moment from 'moment';
import { Events } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';


/**
 * Generated class for the CotizacionNormalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cotizacion-normal',
  templateUrl: 'cotizacion-normal.html',
})
export class CotizacionNormalPage {

  inventariodos: any;
  inventario: any;
  moviles:any;
  items:any;
  mobiliarios =[];


  cantidaddos:any;
  hideFechas;
  hideCards;
  mostrarfinal;

  
  
  cantidadisponible : any; 

  arreglodeobjetos = [];
  public event = { startTime: new Date().toISOString(), endTime: new Date().toISOString()}




//para la base de datos
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
cantidad: number;
anticipo: number;
saldo: number;

diponible_en_inventario: number;

public costo_total:number=0;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http : HttpProvider,
              public view: ViewController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController

              ) {

                let preselectedDate = moment(this.navParams.get('selectedDay')).format();
                this.event.startTime = preselectedDate;
                this.event.endTime = preselectedDate;
                this.hideFechas= false;
                this.hideCards = true;
                this.pagado_evento=false;
                this.anticipo = 0;
                this.mostrarfinal = true;
                
                  //metodo principal para el molibiario sin filtro de ocupado
               //this.getMessages();
                this.initializeItems();

  }

  initializeItems() {
    
    //this.mobiliarios = this.inventario;
    this.items=this.inventario;
    this.inventario=this.moviles;

    this.arreglodeobjetos= [];

   }

   


  agregarDisponibilidad(id_mob:number, reservados:number){

   
  
    console.log(this.fecha_envio_evento);
    console.log(this.hora_envio_evento);
    console.log(reservados);
    console.log(id_mob);
  
    
    this.http.dispoibilidadmob(
      this.fecha_envio_evento,
      this.hora_envio_evento,
      id_mob,
      reservados,
      this.fecha_recoleccion_evento
    ).then(
      (inv) => { 


        this.cantidadisponible = inv["cantidadusada"];
        console.log(this.cantidadisponible);
        
          
       
      },
      (error) =>{
        console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );
  
  }

   agregaraInventario(){

    this.saldo=this.costo_total-this.anticipo;

    console.log("El saldo final es de"+this.saldo);

    this.http.insertarEvento(
      this.nombre_evento,
      this.tipo_evento,
      this.fecha_envio_evento, 
      this.hora_envio_evento,
      this.fecha_recoleccion_evento, 
      this.hora_recoleccion_evento,
      this.pagado_evento, 
      this.nombre_titular_evento, 
      this.direccion_evento,
      this.telefono_titular_evento,
      this.costo_total,
      this.anticipo,
      this.saldo).then(
      (res) => { 
        console.log(res["registro"]);

        if(res["registro"] == "registrado"){
          alert("Registro Existoso");
          console.log("Registro Exitoso");
          this.view.dismiss();
        }else if(res["registro"] == "noregistrado"){
          alert("No Registrado Asegurate de Cntar con Internet");
          console.log("Registro NO Exitoso");
        }
      },
      (error) =>{
        console.error(error);
        alert("No Registrado Asegurate de Cntar con Internet"+error);
        console.log("RegistroError en php Exitoso");
      }
    )
    
  }

  


  ocultarFormulario(){

    this.hideFechas= !this.hideFechas;
    this.sacarCosas();


  }

  sacarCosas(){
    this.http.yanosequehaceesta(this.fecha_envio_evento).then(
      (inv) => { 
        this.inventario = inv["inventario"];
        //this.mobiliarios = this.inventario;     
        this.moviles = inv["inventario"];
        //this.nombres = JSON.parse(JSON.stringify(this.moviles));
        this.items = this.mobiliarios;  
        console.log(this.inventario);
         
      },
      (error) =>{
        console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );
  }
  
  
   
   continuarCotizacion(arreglochido: any){
    //this.navCtrl.push(EventModalPage, {arreglo: arreglochido});
    let alert = this.alertCtrl.create({
      title: 'Confirmar Cotización',
      message: 'El costo total seria de: '+ this.costo_total+'<br> Desea agregar IVA?',
      
      
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
            //this.view.dismiss();
            this.regresarAfinal();
            
          }
        },
        {
          text: 'Sí',
          handler: () => {
            console.log('Sí');
            this.pasaraCotizacionconIva();
          }
        }
      ]
    });
    alert.present();
   }

   pasaraCotizacionconIva(){
   this.costo_total= this.costo_total+(this.costo_total*.16);
   this.regresarAfinal();
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

  presentAlert(id_mob: number, nombre: string, cantidad: number, costo: number) {
    let alert = this.alertCtrl.create({

      title: 'Selecciona la cantidad',
      //inputs:[this.inventario.mob]
      inputs: [
        {
          name: 'reservados',
          placeholder: 'Cantidad',
          type: 'number',
          min:"0"
        }
        
       ],

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            //this.seikoas(id_mob,data.reservados,costo,nombre);
            this.seikoas(id_mob, data.reservados);
            this.calcularTotal(data.reservados, costo);
            
          }
        }
      ] 
      
    });
    alert.present();

}

seikoas(id_mob: number, reservados:number){

  this.arreglodeobjetos.push({
    fecha_evento: this.fecha_envio_evento, 
    hora_evento: this.hora_envio_evento, 
    id_mob: id_mob,
    ocupados:reservados,
    hora_recoleccion_evento: this.hora_recoleccion_evento
  })
  console.log(this.arreglodeobjetos);

}

juntarobjetos(){

    for (var i = 0; i < this.arreglodeobjetos.length; i++) {
      // console.log(json[i].nombre_mob);
      //this.arreglofinal.push({
        
      

this.http.dispoibilidadmob(
  this.arreglodeobjetos[i].fecha_evento,
  this.arreglodeobjetos[i].hora_evento,
  this.arreglodeobjetos[i].id_mob,
  this.arreglodeobjetos[i].ocupados,
  this.arreglodeobjetos[i].hora_recoleccion_evento
).then((inv)=>{

},(error)=>{
  console.log("Error"+JSON.stringify(error));
})
      
      
      }

    
    

}

  calcularTotal(reservados:number, precio:number) {
    var tot:number;
    
  tot=precio*reservados;
  this.costo_total=tot+this.costo_total;
  }


  save(){
    this.agregaraInventario();

    this.presentLoadingCustom();

    
    this.view.dismiss();
    
  }


  presentLoadingCustom() {
    let loading = this.loadingCtrl.create({
      content: 'Agregando Evento por favor espere...',
      duration: 2000
    });
  
    loading.onDidDismiss(() => {
      this.juntarobjetos();
    });
  
    loading.present();
  }

  regresarAfinal(){
    console.log("regresaralfinal");
    this.hideFechas= !this.hideFechas;
    this.mostrarfinal = !this.mostrarfinal;
  }

cerrarModal(){
  this.view.dismiss();
}
  }
  



