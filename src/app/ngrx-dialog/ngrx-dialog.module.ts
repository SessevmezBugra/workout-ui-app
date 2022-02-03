import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgrxFormModule } from '../ngrx-form/ngrx-form.module';
import { FormDialogComponent } from './dynamic-dialog/form-dialog/form-dialog.component';
import { MessageDialogComponent } from './dynamic-dialog/message-dialog/message-dialog.component';
import { StoreModule } from '@ngrx/store';
import { ngrxDialogFeatureKey, ngrxDialogInitialState, ngrxDialogReducer } from './+state/ngrx-dialog.reducer';
import { NgrxDialogFacade } from './+state/ngrx-dialog.facade';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    NgrxFormModule,
    StoreModule.forFeature(ngrxDialogFeatureKey, ngrxDialogReducer, {
      initialState: ngrxDialogInitialState,
    }),
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [
    FormDialogComponent,
    MessageDialogComponent
  ],
  providers: [NgrxDialogFacade]
})
export class NgrxDialogModule { }
