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



  id: string;
  inventario: any;
  
  totalnombres:string[];
  public nombres:string[];

  tap: number = 0;

  items:any;
  
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
  


  todo={};

user=null;
userId = [];

//para el total
public costo_total:number=0;
arreglodeobjetos = [];

//para la fecha
public event = { startTime: new Date().toISOString(), endTime: new Date().toISOString()}


//para la base de datos
nombre_evento: string;
tipo_evento: string;
fecha_evento: any;
fecha_envio_evento: any;
fecha_recoleccion_evento: any;
pagado_evento: any;
nombre_titular_evento: string;
direccion_evento: string;
cantidad: number;
anticipo: number;
saldo: number;


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
    
      this.getMessages();
    this.initializeItems();
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
   
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
          text: 'Ño',
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

   

   agregaraInventario(){
    console.log(this.costo_total);
    console.log(this.anticipo);
    

    this.saldo=this.costo_total-this.anticipo;

    console.log(this.saldo);

    this.http.insertarEvento(
      this.nombre_evento,
      this.tipo_evento,
      this.fecha_evento,
      this.fecha_envio_evento, 
      this.fecha_recoleccion_evento, 
      this.pagado_evento, 
      this.nombre_titular_evento, 
      this.direccion_evento,
      this.costo_total,
      this.anticipo,
      this.saldo).then(
      (res) => { 
        console.log(res["registro"]);

        if(res["registro"] == "registrado"){
          alert("Registro Existoso");
          this.view.dismiss();
        }else if(res["registro"] == "noregistrado"){
          alert("No Registrado Asegurate de Cntar con Internet");
        }
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

   presentAlert(nombre: string, cantidad: number, costo: number) {
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
              this.seikoas(data.reservados,costo,nombre);
            }
          }
        ] 
        
      });
      alert.present();

}
  tgExtras(){
    this.hideCards=true;
    this.hideDates=false;
    //console.log(this.todo);
    
  }


seikoas(reservados:number, precio: number, nombre: string){
 
  console.log("dentro del seikoas");
  console.log(reservados);
  console.log(precio);
  console.log(nombre);

    var tot:number;
    
    tot=precio*reservados;
    this.costo_total=tot+this.costo_total;

    this.arreglodeobjetos.push({
      nombre_mob:nombre, cantidad_mob:reservados, total: tot
    })
console.log(this.arreglodeobjetos);

}

   getMessages(){    
    this.http.revisarBase().then(
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

    this.agregaraInventario();
   // this.haciaeventos.push({nombre_evento: event.title})

   /*
   let loading  = this.loadingCtrl.create({
    content: 'Agregando Evento...'
  });
  loading.present();*/

 

    this.view.dismiss(this.event);
    
    
  }

 

}
