import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
import { HomePage} from '../home/home';
import { EventModalPage } from '../event-modal/event-modal';
import * as moment from 'moment';








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
  
  
  




  root_url : string = "http://avisositd.xyz/mobiliaria/ListaMobiliario.php";
  mobiliarios =[];
  compl: string[];
  moviles:any;
  
  queryText : string;

  searchbar
  searchQuery: string = '';
  

user=null;
userId = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private http: HttpProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public events: Events,
    public modalCtrl: ModalController
    ) {    

      //para pasar al final de la cotizacion
      let preselectedDate = moment(this.navParams.get('selectedDay')).format();

      //carga el metodo que trae los items de la abse de datos y lo guarda
      //en el array inventario []
    
      this.getMessages();

    

    
    this.initializeItems();
   
  }

  initializeItems() {
    
    //this.mobiliarios = this.inventario;
    this.items=this.inventario;
    this.inventario=this.moviles;
    
   }

   continuarCotizacion(arreglochido: any){

    //this.navCtrl.push(EventModalPage, {arreglo: arreglochido});

    let alert = this.alertCtrl.create({
      title: 'Confirmar Cotización',
      message: 'El costo total seria de: '+ this.total,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Continuar',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();

   }


   regresarpaatras(){

     this.navCtrl.setRoot(HomePage);
   }

/*
   abrirSelector(){
     this.httpcliente.get('http://avisositd.xyz/mobiliaria/ListaMobiliario.php').subscribe(res=>{

      this.selector.show({
        title: 'Cantidad; ',
        positiveButtonText: 'Aceptar',
        negativeButtonText: 'Cancelar',
        items: [
          res['inventario']
        ],
        displayKey: 'cantidad_mob'
     }).then(result =>{
  
        console.log(result[0]);
  
     });
     



     });
    
   }
*/
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



seikoas(reservados:number, precio: number, nombre: string){

  console.log("dentro del seikoas");
  console.log(reservados);
  console.log(precio);
  console.log(nombre);

    var tot:number;
    
    tot=precio*reservados;
    this.total=tot+this.total;

    this.arreglodeobjetos.push({
      nombre_mob:nombre, cantidad_mob:reservados, total: tot
    })
console.log(this.arreglodeobjetos);

}

   getMessages(){
     
    this.http.revisarBase().then(
      (inv) => { 
        //console.log(inv)     
        

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
 
 
   

}
