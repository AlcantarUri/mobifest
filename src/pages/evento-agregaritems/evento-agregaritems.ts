import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController, ViewController, LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
import { HomePage} from '../home/home';
import { EventModalPage } from '../event-modal/event-modal';
import * as moment from 'moment';
import { LoadedModule } from 'ionic-angular/umd/util/module-loader';
import { TabsPage } from '../tabs/tabs';








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

  botonAgregar : boolean;
  ivavalor: number;
  descuento: number;
  fletevalor: number;

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

 hideIva;
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

porcentaje: number;

costo_subtotal: number = 0;






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
    this.hideIva = false;
      //para pasar al final de la cotizacion

      //enable add event button when class starts
      this.botonAgregar = false;
      

      //carga el metodo que trae los items de la abse de datos y lo guarda
      //en el array inventario []
    
    this.initializeItems();
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();


    this.fecha_envio_evento = this.navParams.get('selectedDay');
    console.log(this.fecha_envio_evento);
    //this.fecha_envio_evento = this.fecha_tentativa['title'];
    //console.log(this.fecha_envio_evento);


    //se inicializan los valores de descuento e iva
    this.ivavalor=0;
    this.descuento=0;
    

    this.getMessages();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;

    this.fecha_recoleccion_evento = this.fecha_envio_evento
    this.traerClientes();
    this.initializeClientes();

   
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

    this.botonAgregar =!this.botonAgregar;
    
    if(this.nombre_titular_evento==null){


      let toast = this.toastCtrl.create({
        message: 'Favor de elegir la titular del evento',
        duration: 2500,
        position: 'top'
      });
    
      toast.present(); 
      this.botonAgregar =!this.botonAgregar;
    }else if(this.fecha_envio_evento==""){
      let toast = this.toastCtrl.create({
        message: 'No se eligió fecha de Evento!!',
        duration: 2500,
        position: 'middle'
      });
    
      toast.present(); 
      this.botonAgregar =!this.botonAgregar;
    }else {
            this.save();
            
      }
   }

   iva(){
    let alert = this.alertCtrl.create({
      title: 'IVA',
      
      
      
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
          this.ivavalor = 0;
          console.log(this.ivavalor);

            
          }
        },
        {
          text: 'Sí',
          handler: () => {
            this.ivavalor = 1;
    
            console.log("aplico iva?? "+this.ivavalor);
            this.costo_total= this.costo_total+(this.costo_total*.16);
            this.hideIva= true;

            

          }
        }
      ]
    });
    alert.present();
   }

   flete(){
    let alert = this.alertCtrl.create({
      title: 'Escriba el total del Flete',
      inputs: [
        {
          name: 'fletev',
          placeholder: 'Flete',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aplicar',
          handler: data => {
            this.fletevalor=data.fletev;
            console.log(this.fletevalor);

           if(data.fletev == ""){

            let toast = this.toastCtrl.create({
              message: 'Introduzca un valor porfavor',
              duration: 2500,
              position: 'bottom'
              
            });
            toast.present();

           }else{
            this.costo_total = (this.fletevalor*1) + (this.costo_total*1);
           }
          }
        }
      ]
    });
    alert.present();
   }


   descuentos(){
    let alert = this.alertCtrl.create({
      title: 'Escriba el Porcentaje de Descuento',
      inputs: [
        {
          name: 'descuento',
          placeholder: 'Porcentaje de Descuento',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aplicar',
          handler: data => {
            this.descuento=data.descuento;
            console.log(this.descuento);

           if(data.descuento == ""){

            let toast = this.toastCtrl.create({
              message: 'Introduzca un número porfavor',
              duration: 2500,
              position: 'bottom'
              
            });
            toast.present();

           }else{
            this.porcentaje= parseInt(data.descuento)/100;
            this.costo_total = this.costo_total - this.costo_total*this.porcentaje;
           }
            
            
            

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
    
    console.log("IVA = "+this.ivavalor+" Descuento = "+this.descuento);

   if(this.nombre_evento==null){
    this.nombre_evento="Nombre de evento Pendiente";
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
    this.direccion_evento="Dirección Pendiente";
  }
  if(this.telefono_titular_evento==null){
    this.telefono_titular_evento="Teléfono Pendiente";
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
      this.descuento,
      this.ivavalor

      ).then(
      (res) => { 

        this.arreglodos = res['registro'];

        console.log(this.arreglodos);
        if(this.arreglodos =='registrado'){
          console.log("registro Satisfactorio");
          
          this.presentLoadingCustom();

        }else if(this.arreglodos=='noregistrado'){
          console.log("Contacte al URI");

          
            this.presentToastWithOptions();
          
        }
       

        
      },
      (error) =>{
        console.error(error);
        alert("No Registrado Asegurate de Cntar con Internet"+error);
        
      }
    )
    
    

   }


   async presentToastWithOptions() {
    const toast = await this.toastCtrl.create({
      message: 'Evento NO REGISTRADO verifique la conexión a internet e inténtelo de nuevo.',
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'OK'
    });
    toast.present();
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
  this.costo_subtotal = this.costo_total;

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

  console.log(inv);

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

    
    this.agregaraInventario();
    this.guardarCliente();
    //this.presentLoadingCustom();

    
    
  }


  presentLoadingCustom() {
    let loading = this.loadingCtrl.create({
      content: 'Agregando Evento por favor espere...',
      duration: 1800
    });
  
    loading.onDidDismiss(() => {
      this.juntarobjetos();
      this.aNuevoMetodoparaPagos();
      let loading = this.loadingCtrl.create({
        content: 'Agregando Mobiliario por favor espere...',
        duration: 400
      });
      loading.onDidDismiss(() => {
      //this.view.dismiss(this.event);
      this.navCtrl.setRoot(TabsPage);
      this.botonAgregar =!this.botonAgregar;
    });
    loading.present();

    });
  
    loading.present();
  }

  ///////Troca


  vistaBoo:boolean =true;
  complClient: any;
  inventarioCliente: any;
  movilesClientes:any;
  searchQueryClient: string = '';


  revisar(){
    this.vistaBoo=false;
  }

  guardarCliente(){
    this.http.anadirCliente(this.nombre_titular_evento,this.telefono_titular_evento ,this.direccion_evento).then(
      (inv) => { 
        console.log(inv)     
        

      },
      (error) =>{
        console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );
  }

  itemClick(nombre:string, telefono:string, direccion:string){
    this.vistaBoo=true;

    this.telefono_titular_evento = telefono;
    //this.direccion_evento = direccion;
    this.nombre_titular_evento = nombre;
  }

  initializeClientes(){
    this.inventarioCliente = this.complClient;

  }

  getClientes(ev: any) {
    // Reset items back to all of the items
    this.initializeClientes();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.inventarioCliente = this.inventarioCliente.filter((item) => {
        return (item.nombre_cliente.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  

  traerClientes(){
    this.http.revisarClientes().then(
      (inv) => { 
       // console.log(inv)     
        

       this.inventarioCliente = inv["clientes"];
       this.complClient = inv["clientes"];

      },
      (error) =>{
        console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );
  }
 

}
