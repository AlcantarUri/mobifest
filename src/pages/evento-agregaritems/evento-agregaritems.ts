import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import 'rxjs/add/operator/map';


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
  total:any;
  totalnombres:string[];
  nombres:string[];

  root_url : string = "http://avisositd.xyz/mobiliaria/ListaMobiliario.php";
  mobiliarios =[] ;
  moviles:any;
  

  //searchbar
  searchQuery: string = '';
  items: string[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private http: HttpProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
    ) {
      //this.id = navParams.get('data');
      this.getMessages();
    //alert("pagina Mobiliario"+this.id);

    //this.traerNombres();
    //this.traerDatos();
    this.initializeItems();
   
  }

  initializeItems() {

    this.items = this.nombres;
    
   
   }

   getMessages(){
     
     var json; 
     this.http.getAll().subscribe(data => {  json = data; });

     this.moviles= [];
     for (var i of json.data) {
      this.moviles.push(i.quantity_produced);
       }
       console.log(this.moviles);


   }

/*
this.http.sacarDetalles(nombre).then(
      (data) => { 
        console.log(data)  

        this.detainv = data["detalle"];

        console.log("Resultado"+JSON.stringify(this.detainv));

        let nombre = this.detainv["nombre_mob"];

        console.log(nombre);



      },
      (error) =>{
        console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );

traerNombres(){
    
  this.http.revisarBase().then(
    (nomb) => { 
      console.log(nomb);

      this.mobiliarios = nomb["inventario"];
      console.log(this.mobiliarios);
    
    },(error)=>{

    }
    );
    
  
}

 /*
   traerNombres(){
     
     this.http.sacarNombresMobiliarioBase().then(
       (nomb) => { 
         console.log(nomb)  
 
         this.nombres = nomb["nombres"];
         this.items = this.nombres;

         //console.log("Resultado  "+this.nombres);
 
          
       },
       (error) =>{
         console.log("Error"+JSON.stringify(error));
         alert("Verifica que cuentes con internet");
       }
     );
     
   }
 
   /*traerDatos(){
 
     this.http.revisarBase().then(
       (inv) => { 
         console.log(inv)  
 
 
         this.inventario = inv["inventario"];
 
         this.items = this.inventario["nombre_mob"];
         this.total = inv;
 
         
         
        // console.log("Resultado"+result);
                
           
          
       },
       (error) =>{
         console.log("Error"+JSON.stringify(error));
         alert("Verifica que cuentes con internet");
       }
     );
 
   }*/
 
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
