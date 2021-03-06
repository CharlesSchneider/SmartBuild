import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import '@angular/common/locales/global/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './_layout/content/content.component';
import { HeaderComponent } from './_layout/header/header.component';
import { FooterComponent } from './_layout/footer/footer.component';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { GlobalMaskConfig } from './shared/globalmask.config';
import { ToastrModule } from 'ngx-toastr';
import { CustomerFormModalComponent } from './customers/customer-form-modal/customer-form-modal.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    NgxMaskModule.forRoot(GlobalMaskConfig),
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing',
      closeButton: true,
      toastClass: 'ngx-toastr sb-ngx-toastr shadow',
      positionClass: 'toast-top-center'
    })
  ],
  entryComponents: [
    CustomerFormComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
