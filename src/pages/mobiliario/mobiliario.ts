import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { ModalController } from 'ionic-angular';
import { DetallePage } from '../detalle/detalle';

/**
 * Generated class for the MobiliarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mobiliario',
  templateUrl: 'mobiliario.html',
})
export class MobiliarioPage {

  id: string;
  inventario: any;
  total:string[];
  totalnombres:string[];
  nombres:string[];
  json: any;


  
  
  //searchbar
  searchQuery: string = '';
  items: string[];
  compl: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpProvider, public modCtrl:ModalController) {

    this.id = navParams.get('data');
    //alert("pagina Mobiliario"+this.id);

    this.traerNombres();
    this.initializeItems();
   // this.traerDatos();
  }

  initializeItems() {

   this.items = this.nombres;
   this.compl = this.inventario;
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MobiliarioPage');

  }

  openModal(nombre_mob:string){

    this.navCtrl.push(DetallePage, {
      data: nombre_mob
    });
  }

  

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

  /*

 traerDatos(){

    this.http.revisarBase().then(
      (inv) => { 
        console.log(inv)     
        

       this.inventario = inv["inventario"];
       
      
       this.json = inv["inventario"];


       for (var i = 0; i < this.json.length; i++) {
       // console.log(json[i].nombre_mob);
       this.compl = this.json[i].nombre_mob;
       }

      

      

       this.items = this.compl;
  

       //console.log("Resultado:    "+JSON.stringify(json));   
       
               
          
         
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
      });
      
    }

    
  }


  
 
}
