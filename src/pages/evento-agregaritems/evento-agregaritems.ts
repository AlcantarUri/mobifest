import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController, ViewController, LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
import { HomePage} from '../home/home';
import { EventModalPage } from '../event-modal/event-modal';
import * as moment from 'moment';
import { LoadedModule } from 'ionic-angular/umd/util/module-loader';








/**
 * Generated class for the EventoAregaritemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.../
 */

@IonicPage()
@Component({
  selector: 'page-evento-agregaritems',
  templateUrl: 'evento-agregaritems.html',
})


export class EventoAgregaritemsPage {

prueba: any;



  id: string;
  inventario: any;
  cantidadisponible: any;
  totalnombres:string[];
  public nombres:string[];

  tap: number = 0;

  items:any;

  arreglodos: any;
  
  //para ocultar el buscador
 hideDates;
 hideCards;
//para el ultimo paso donde se va a la base de datos lo guardado
 haciaeventos =[];
 haciapagos =[];
 haciarentado =[];



  root_url : string = "http://avisositd.xyz/mobiliaria/ListaMobiliario.php";
  mobiliarios =[];
  compl: string[];
  moviles:any;
  
  queryText : string;

  searchbar
  searchQuery: string = '';
  

wakawaka:string;
  todo={};

user=null;
userId = [];

public fecha_tentativa: string;
public solo_fecha: string;

arreglodefecha = [];
arreglodeobjetos = [];
arreglofinal =[];

comparaelegidos : Number;
comparadsiponibles : Number;

//para la fecha
public event = { startTime: new Date().toISOString(), endTime: new Date().toISOString()}


//para la base de datos
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
public costo_total:number=0;
fecha_evento: string;
hora_evento:string;
ocupados: number;

//id del evento
idEvento: number = 9999;





  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private http: HttpProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public events: Events,
    public modalCtrl: ModalController,
    public view: ViewController,
    public loadingCtrl: LoadingController
    ) {    
    
        //inician los cards visibles y ls fechas ocultas
    this.hideCards=false;
    this.hideDates=true;
    this.pagado_evento=false;
    this.anticipo = 0;
    
      //para pasar al final de la cotizacion
      

      //carga el metodo que trae los items de la abse de datos y lo guarda
      //en el array inventario []
    
    this.initializeItems();
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();


    this.fecha_tentativa = this.navParams.get('selectedDay');
    console.log(this.fecha_tentativa);
    this.fecha_envio_evento = this.fecha_tentativa['title'];
    console.log(this.fecha_envio_evento);


    
    

    this.getMessages();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;

    this.fecha_recoleccion_evento = this.fecha_envio_evento

   
  }

  initializeItems() {
    
    //this.mobiliarios = this.inventario;
    this.items=this.inventario;
    this.inventario=this.moviles;
   }
   cerrarModal(){
    this.view.dismiss();
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
            this.tgExtras();
            
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

   
   
ocultarFormulario(){
    this.hideDates=!this.hideDates;
    this.hideCards=!this.hideCards;
    this.getMessages();
}



   agregaraInventario(){
    //console.log(this.costo_total);
   // console.log(this.anticipo);
    


   if(this.nombre_evento==null){
    this.nombre_evento="Pendiente";
  }
  if(this.tipo_evento==null){
    this.tipo_evento="Otro";
  }
  if(this.hora_envio_evento==null){
    this.hora_envio_evento="00:00:00";
    console.log(this.hora_envio_evento);
  }
  if(this.hora_recoleccion_evento==null){
    this.hora_recoleccion_evento="00:00:00";
  }
  if(this.direccion_evento==null){
    this.direccion_evento="Pendiente";
  }
  if(this.telefono_titular_evento==null){
    this.telefono_titular_evento="Pendiente";
  }
    

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

      ).then(
      (res) => { 

        this.arreglodos = res['registro'];

        console.log(this.arreglodos);
       

        
      },
      (error) =>{
        console.error(error);
        alert("No Registrado Asegurate de Cntar con Internet"+error);
        
      }
    )
    
    

   }

   
   aNuevoMetodoparaPagos(){
  
    this.saldo=this.costo_total-this.anticipo;

   

    this.http.addPagosMetodoNuevo(
      this.costo_total,
      this.saldo,
      this.anticipo
      ).then(
      (res) => { 

        this.arreglodos = res['registro'];
        console.log("El ID encontrado es:   "+this.arreglodos);
        console.log(this.costo_total);
        console.log(this.saldo);
        console.log(this.anticipo);
      },
      (error) =>{
        console.error(error);
        alert("No Registrado Asegurate de Cntar con Internet"+error);
        
      }
    )
    
    

   }


  pasaraCotizacionconIva() {
    
    this.hideCards=true;
    this.hideDates=false;
    this.costo_total= this.costo_total+(this.costo_total*.16);

  }
   regresarpaatras(){

     this.navCtrl.setRoot(HomePage);
   }


//alert para pedir numero de items de mobiliario

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
                console.log('Cancel clicked');
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
                  console.log("Nombre "+nombre+ " ID "+id_mob);

                }                 
              }
            }
          ] 
          
        });
        alert.present();

  }


  
  tgExtras(){
    this.hideCards=true;
    this.hideDates=false;
    //this.arreglodefecha =[];
    //this.arreglodeobjetos=[];
    //this.arreglofinal=[];
    //console.log(this.todo);
    
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

juntarobjetos(){

  

  for (var i = 0; i < this.arreglodeobjetos.length; i++) {
    // console.log(json[i].nombre_mob);
    this.arreglodefecha.push({
      fecha_evento: this.fecha_envio_evento, 
      hora_evento: this.hora_envio_evento, 
      hora_recoleccion_evento: this.hora_recoleccion_evento
      
    })
    
    }

    for (var i = 0; i < this.arreglodeobjetos.length; i++) {
      // console.log(json[i].nombre_mob);
      //this.arreglofinal.push({
        
      

this.http.dispoibilidadmob(
  this.arreglodefecha[i].fecha_evento,
  this.arreglodefecha[i].hora_evento,
  this.arreglodeobjetos[i].id_mob,
  this.arreglodeobjetos[i].ocupados,
  this.arreglodefecha[i].hora_recoleccion_evento
).then((inv)=>{

},(error)=>{
  console.log("Error"+JSON.stringify(error));
})
      
      
      }

    
    

}

   getMessages(){    
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
 
   save(){

    if(this.nombre_titular_evento==null){


      let toast = this.toastCtrl.create({
        message: 'Favor de elegir la titular del evento',
        duration: 2500,
        position: 'top'
      });
    
      toast.present();

    }else{
    this.agregaraInventario();
    this.presentLoadingCustom();

    this.view.dismiss(this.event);
    }
  }


  presentLoadingCustom() {
    let loading = this.loadingCtrl.create({
      content: 'Agregando Evento por favor espere...',
      duration: 2000
    });
  
    loading.onDidDismiss(() => {
      this.juntarobjetos();
      this.aNuevoMetodoparaPagos();
    });
  
    loading.present();
  }

 

}
