import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatalogoclientesPage } from './catalogoclientes';

@NgModule({
  declarations: [
    CatalogoclientesPage,
  ],
  imports: [
    IonicPageModule.forChild(CatalogoclientesPage),
  ],
})
export class CatalogoclientesPageModule {}
