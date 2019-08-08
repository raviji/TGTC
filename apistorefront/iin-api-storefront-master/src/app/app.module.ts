import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

// app main component
import { AppComponent } from './app.component';

// routing module
import { AppRoutingModule } from './app-routing.module';

// can show page
import { CanShowPage } from './app-canload.guard';

// bootstrap module
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from './shared/shared.module';
import { DataListService } from './shared/services/data-list.service';
import { ValidationService } from './shared/services/validation.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
            BrowserModule,
            FormsModule,
            HttpClientModule,
            NgbModule,
            SharedModule.forRoot(),
            AppRoutingModule,
           ],
  providers: [DataListService, ValidationService, CookieService, CanShowPage],
  bootstrap: [AppComponent]
})
export class AppModule {}
