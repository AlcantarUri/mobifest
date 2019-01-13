import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { HttpProvider } from '../../providers/http/http';
import { ToastController } from 'ionic-angular';
import { DetalleventodiaPage } from '../detalleventodia/detalleventodia';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();

  public eventosChidos: any;
  modo : string;
  fecha: string;
  mesmasuno: number;

  public dtae: number;



  //ahora viene lo bueno con las hroas y las declaraciones
  nombreEvento12am: string ="Sin evento";
  nombreEvento1am: string ="Sin evento";
  nombreEvento2am: string ="Sin evento";
  nombreEvento3am: string ="Sin evento";
  nombreEvento4am: string ="Sin evento";
  nombreEvento5am: string ="Sin evento";
  nombreEvento6am: string ="Sin evento";
  nombreEvento7am: string ="Sin evento";
  nombreEvento8am: string ="Sin evento";
  nombreEvento9am: string ="Sin evento";
  nombreEvento10am: string ="Sin evento";
  nombreEvento11am: string ="Sin evento";
  
  nombreEvento12pm: string ="Sin evento";
  nombreEvento1pm: string ="Sin evento";
  nombreEvento2pm: string ="Sin evento";
  nombreEvento3pm: string ="Sin evento";
  nombreEvento4pm: string ="Sin evento";
  nombreEvento5pm: string ="Sin evento";
  nombreEvento6pm: string ="Sin evento";
  nombreEvento7pm: string ="Sin evento";
  nombreEvento8pm: string ="Sin evento";
  nombreEvento9pm: string ="Sin evento";
  nombreEvento10pm: string ="Sin evento";
  nombreEvento11pm: string ="Sin evento";



  calendar = {
    mode : 'month',
    currentDate: this.selectedDay
  }

  constructor(public navCtrl: NavController,
          private modalCtrl: ModalController,
          private alertCtrl: AlertController,
          private http: HttpProvider,
          private toastCtrl: ToastController
          ) {
  }


abrirAlert(){
  let alert = this.alertCtrl.create({
    title: 'Seleccione tipo de cotizacion',
    buttons: [
      {
        text: 'Cotizacion Normal',
        
        handler: () => {
          this.addEventNormal();
          console.log("c presiono bton normal");
          
        }
      },
      {
        text: 'Cotizacion Rapida',
        handler: () => {
          this.alarm();
          // pasar a cotizacion rapida


        }
      }
    ]
  });
  alert.present();
}


addEventNormal(){



  let modal = this.modalCtrl.create('CotizacionNormalPage', {selectedDay:this.selectedDay});
  modal.present();
 

  modal.onDidDismiss(data=>{
    if (data){
      let eventData = data;
      eventData.startTime = new Date(data.startTime);
      eventData.endTime = new Date(data.endTime);
      
      
      let events = this.eventSource;
      events.push(eventData);
      this.eventSource = [];
      setTimeout(()=> {
        this.eventSource = events;
      }) ;
    }
  });

}


  addEvent(data: any){



    let modal = this.modalCtrl.create('EventoAgregaritemsPage', {selectedDay:data});
    modal.present();
    
    
    

    modal.onDidDismiss(data=>{
      if (data){
        let eventData = data;
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
        
        
        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(()=> {
          this.eventSource = events;
        }) ;
      }
    });

  }

  OnViewTitleChanged(title){
      this.viewTitle =  title;
  }

  onTimeSelected(ev){
    this.selectedDay = ev.selectedTime;


    
    this.mostrarEventosDelDia();
    this.llenarCards();
    

  }

llenarCards(){
  console.log(this.eventosChidos);

  
}

  mostrarEventosDelDia(){

    this.mesmasuno = this.selectedDay.getMonth() + 1;

    this.fecha = this.selectedDay.getFullYear()+"-"+this.mesmasuno+"-"+this.selectedDay.getDate();
    console.log(this.fecha);
    
    this.http.obtenerEventosdelDia(this.fecha).then(
      (res)=>{

      
      this.eventosChidos = res["eventodelDia"];
     console.log(this.eventosChidos);
          
      
      

    },(error)=>{
      console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
    })

    
  }


  mostrarEvento(id_evento: string, fecha_envio_evento: string){

    console.log(id_evento, fecha_envio_evento);
    this.navCtrl.push(DetalleventodiaPage,{data: id_evento, date: fecha_envio_evento});
        
  }



  onEventSelected(event){
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');
    
    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'Desde: ' + start + '<br>Hasta: '+ end,
      buttons: ['OK']
    });
    alert.present();
    

  }

  //prueba
alarm() {
  let prompt = this.alertCtrl.create({
    title: 'Seleccione fecha Tentativa',
    inputs: [
      {
        name: 'title',
        placeholder: 'Title',
        type: 'date'
      },
    ],
    buttons: [
      {
        text: 'Cancelar',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Aceptar',
        handler: data => {
          console.log('Saved clicked');
          console.log(data);
          this.addEvent(data);

        }
      }
    ]
  });
  prompt.present();
}

//termina prueba

}
