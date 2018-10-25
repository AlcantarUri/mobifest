import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarInventarioPage } from './editar-inventario';

@NgModule({
  declarations: [
    EditarInventarioPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarInventarioPage),
  ],
})
export class EditarInventarioPageModule {}
