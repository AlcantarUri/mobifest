import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAgregarPagoEnCalendarioPage } from './modal-agregar-pago-en-calendario';

@NgModule({
  declarations: [
    ModalAgregarPagoEnCalendarioPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAgregarPagoEnCalendarioPage),
  ],
})
export class ModalAgregarPagoEnCalendarioPageModule {}
