import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
import { SelectSearchableComponent } from 'ionic-select-searchable';




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
  

@ViewChild('myselect') selectComponent:SelectSearchableComponent;
user=null;
userId = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private http: HttpProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public events: Events
    ) {
    
      this.getMessages();
    

    
    this.initializeItems();
   
  }

  initializeItems() {
    
    //this.mobiliarios = this.inventario;
    this.items=this.inventario;
    this.inventario=this.moviles;
    
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
       console.log(this.inventario);

       //console.log("Resultado:    "+JSON.stringify(json));   
         
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
