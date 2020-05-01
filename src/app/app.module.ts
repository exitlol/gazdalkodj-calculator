import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { PlayerCardComponent } from './player-card/player-card.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NewPlayersDialogComponent } from './shared/new-players-dialog/new-players-dialog.component';

registerLocaleData(localeHu, 'hu');
@NgModule({
   declarations: [
      AppComponent,
      MainLayoutComponent,
      PlayerCardComponent,
      ConfirmDialogComponent,
      NewPlayersDialogComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatCardModule,
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatRadioModule,
      MatInputModule,
      MatButtonModule,
      MatCheckboxModule,
      MatDialogModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      ConfirmDialogComponent,
      NewPlayersDialogComponent]
})
export class AppModule { }
