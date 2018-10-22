import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();

  modo : string;
  

  calendar = {
    mode : 'month',
    currentDate: this.selectedDay
  }

  constructor(public navCtrl: NavController,
          private modalCtrl: ModalController,
          private alertCtrl: AlertController) {

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
