import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';



/**
 * Generated class for the EventoAgregaritemsPage page.
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
  nombres:string[];

  tap: number = 0;

  root_url : string = "http://avisositd.xyz/mobiliaria/ListaMobiliario.php";
  mobiliarios =[];
  compl: string[];
  moviles:any;
  

  searchbar
  searchQuery: string = '';
  items: string[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private http: HttpProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public events: Events
    ) {
      //this.id = navParams.get('data');
      this.getMessages();
    //alert("pagina Mobiliario"+this.id);

 
    this.initializeItems();
   
  }

  initializeItems() {
    
    this.items = this.nombres;
    this.mobiliarios = this.inventario;
    
  
   }

   getMessages(){
     
    this.http.revisarBase().then(
      (inv) => { 
        console.log(inv)     
        

       this.inventario = inv["inventario"];
       //this.mobiliarios = this.inventario;
      
       this.moviles = inv["inventario"];


       for (var i = 0; i < this.moviles.length; i++) {
       // console.log(json[i].nombre_mob);
       this.mobiliarios = this.moviles[i].nombre_mob;
       this.mobiliarios = this.moviles[i].cantidad_mob;
       this.mobiliarios = this.moviles[i].costo_mob;
       }

       this.items = this.mobiliarios;

       //console.log("Resultado:    "+JSON.stringify(json));   
         
      },
      (error) =>{
        console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );


   }


   agregaruno(){

    this.tap++;


   }
   restaruno(){

    this.tap--;
    

  }
 
   getItems(ev: any) {
     // Reset items back to all of the items
     this.initializeItems();
 
     // set val to the value of the searchbar
     const val = ev.target.value;
 
     // if the value is an empty string don't filter the items
     if (val && val.trim() != '') {
       this.items = this.items.filter((item) => {
         return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
       })
     }
   }
 
 
   

}
