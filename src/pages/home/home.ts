import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
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

  fechados: string;

  public eventosChidos: any;
  modo : string;
  fecha: string;
  mesmasuno: number;
  masmes: string;

  public dtae: number;
  fechasTraer:any;
  hora_evento: any;



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
          private toastCtrl: ToastController,
          private loadingCtrl: LoadingController
          ) {
            
  }


  ionViewDidEnter() {
    this.eventosTodos();
  }

  


  eventosTodos(){

    this.http.traerFechas().then(
      (inv) => { 
        console.log("fechas todas   "+inv);
        
        var json = inv["evento"];
        this.eventSource = [];

       for (var i = 0; i < json.length; i++) {
       // console.log(json[i].nombre_mob);

       var ano = json[i].ano;
       var mes = json[i].mes-1;
       var dia =json[i].dia;
   
      
       //console.log("llega en  "+i+"    "+ano+"-"+mes+"-"+dia);
       ano = new Date(Date.UTC(ano, mes, dia) + (1000 * 60 * 60 * 24));  

            
            this.eventSource.push({
                title: json[i].nombre_evento,
                startTime: ano,
                endTime: ano,             
                allDay: false
            });   

            
            
            //console.log("cambiado formato"+ano);
       }
       
               
         
        
        
      
         
      },
      (error) =>{
        console.log("Error"+JSON.stringify(error));
        
        alert("Verifica que cuentes con internet");
      }
    );

  

    

  }


abrirAlert(){
  /*
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
          // pasar a cotizacion rapida


        }
      }
    ]
  });
  alert.present();*/
  this.alarm();

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
      this.eventosTodos;
    }
  });

}


  addEvent(data: any){

    var arrayDeCadenas = this.fecha.split("-");

    
    var ano = arrayDeCadenas[0];
    var mes = arrayDeCadenas[1];
    var dia = arrayDeCadenas[2];

    if(mes.length < 2 ){
      mes = "0"+mes;
    }


    var arrayDia = dia.split("T");
    

    if(arrayDia[0].length < 2){
       dia = "0"+arrayDia[0];
    }

   this.fecha = ano+"-"+mes+"-"+dia;

   console.log(this.fecha+" HOME");



    let modal = this.modalCtrl.create('EventoAgregaritemsPage', {selectedDay:this.fecha, hora_evento: this.hora_evento});
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
  //  console.log(this.eventosChidos);

  
}

  mostrarEventosDelDia(){

    this.mesmasuno = this.selectedDay.getMonth() + 1;
    

    this.fecha = this.selectedDay.getFullYear()+"-"+this.mesmasuno+"-"+this.selectedDay.getDate();
    //console.log(this.fecha);

    if (this.mesmasuno == 1){
      this.masmes = "Enero"
    }else 
    if (this.mesmasuno == 2){
      this.masmes = "Febrero"
    }else
    if (this.mesmasuno == 3){
      this.masmes = "Marzo"
    }else
    if (this.mesmasuno == 4){
      this.masmes = "Abril"
    }else
    if (this.mesmasuno == 5){
      this.masmes = "Mayo"
    }else
    if (this.mesmasuno == 6){
      this.masmes = "Junio"
    }else
    if (this.mesmasuno == 7){
      this.masmes = "Julio"
    }else
    if (this.mesmasuno == 8){
      this.masmes = "Agosto"
    }else
    if (this.mesmasuno == 9){
      this.masmes = "Septiembre"
    }else
    if (this.mesmasuno == 10){
      this.masmes = "Octubre"
    }else
    if (this.mesmasuno == 11){
      this.masmes = "Noviembre"
    }else
    if (this.mesmasuno == 12){
      this.masmes = "Diciembre"
    }
    this.fechados = this.selectedDay.getDate()+" de "+this.masmes+" del "+this.selectedDay.getFullYear();
    //console.log(this.fechados);
    
    this.http.obtenerEventosdelDia(this.fecha).then(
      (res)=>{

      
      this.eventosChidos = res["eventodelDia"];
     //console.log(this.eventosChidos);
          
      
      

    },(error)=>{
      console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
    })

    
  }


  mostrarEvento(id_evento: string, fecha_envio_evento: string){

    //console.log(id_evento, fecha_envio_evento);
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
  //console.log(this.fechados);
  let prompt = this.alertCtrl.create({
    title: 'Atención',
    subTitle: "Esta a punto de crear un evento el dia: <br/>"+ this.fechados,
    buttons: [
      {
        text: 'Cancelar',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Continuar',
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
