  import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { text } from '@angular/core/src/render3/instructions';
import { LoginPage } from '../login/login';


/**
 * Generated class for the NotasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notas',
  templateUrl: 'notas.html',
})
export class NotasPage {

  user : string;
  pass: string;
  notas: any;
  respuesta: any;
  respuestaBorrar: any;
  nombreusuario: string

  nombreNota: string;
  cuerponota: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: HttpProvider,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public modalCtl: ModalController) {

    this.user = navParams.get('user');
    this.pass = navParams.get('pass');
    this.sacarNotesChidoris();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotasPage');
  }



  salirFunction(){
    
    let alert = this.alertCtrl.create({
      title: 'Cerrar sesión',
      subTitle: 'Esta seguro que desea salir?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
          } 
          },
          {
            text: 'Si',
            handler: () => {
              this.navCtrl.setRoot(LoginPage);
            }
          }
      ]
    });
    alert.present();




  }
  sacarNotesChidoris()
  {
    this.http.sacarNotas(this.user).then(
      (res)=>{

        
        
          this.notas = res["notasuno"];
        if (res["notasuno"] == undefined) {

          let alert = this.alertCtrl.create({
            title: 'UPSS',
            subTitle: 'Parece ser que no estas registrado. <br/> Vuelve al inicio y da click en registrar :D',
            buttons: [
              {
                text: 'SALIR',
                role: 'cancel',
                handler: () => {
                  this.navCtrl.setRoot(LoginPage);
                }
              }
            ]
          });
          alert.present();
          
        }else{
          console.log(this.notas);
          
        }

      },(error)=>{
      console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
    })
  
  }

  agregarnota()
  {

    const myAnadir = this.modalCtl.create('ModalnotasaddPage', {nombre:this.user});
    myAnadir.onDidDismiss(() => {
      this.sacarNotesChidoris();
         console.log('Modal closed');
      });

    myAnadir.present();

    
  }

  

/*
  borrarNota(id_nota, note, body)
  {
    let alert = this.alertCtrl.create({
      title: note,
      subTitle: body,
      buttons: [
        {
          text: 'Eliminar',
          role: 'cancel',
          cssClass: 'customClass',
          handler: () => {
            
            this.presentConfirm(id_nota);
          }
        },
        {
          text: 'OK',
          handler: () => {
            
          }
        }
      ]
    });
    alert.present();
  }

*/
editarnota(id_nota, nota, cuerpo, ruta){

    

    const myAnadir = this.modalCtl.create('EditarnotaPage', {id_nota: id_nota, note: nota, body: cuerpo, ruta: ruta});
    myAnadir.onDidDismiss(() => {
      this.sacarNotesChidoris();
         console.log('Modal closed');
      });

    myAnadir.present();


}

  presentConfirm(id_nota) {
    let alert = this.alertCtrl.create({
      title: 'Eliminar nota',
      message: 'Esta accion ya no se puede deshacer :C',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Si, Acepto',
          handler: () => {
            this.loadingDeBorrar(id_nota);
            console.log(id_nota);
          }
        }
      ]
    });
    alert.present();
  }


  loadingDeBorrar(id_nota) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  

    loading.onDidDismiss(() => {

this.confirmar(id_nota);

      
    });
    
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  confirmar(id_nota){
  this.http.borrarNota(id_nota).then(
      (res)=>{

        this.respuestaBorrar = res["evento"];
        console.log(this.respuestaBorrar);
        this.sacarNotesChidoris();

      },(error)=>{
      console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
    })
    
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Agregando sus notas :V'
    });
  
    loading.onDidDismiss(() => {
      this.sacarNotesChidoris();
    });
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

}
