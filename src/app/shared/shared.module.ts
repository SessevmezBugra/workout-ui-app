import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    PageNotFoundComponent
  ],
  providers: [
    ApiService
  ]
})
export class SharedModule { }
