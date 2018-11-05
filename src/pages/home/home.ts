import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { HttpProvider } from '../../providers/http/http';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();

  eventosChidos: any;
  modo : string;
  fecha: string;
  mesmasuno: number;

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

  addEvent(){

    let modal = this.modalCtrl.create('EventoAgregaritemsPage', {selectedDay:this.selectedDay});
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

}
