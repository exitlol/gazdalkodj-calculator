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
import { registerLocaleData, getCurrencySymbol } from '@angular/common';
import localeHu from '@angular/common/locales/hu';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NewPlayersDialogComponent } from './shared/new-players-dialog/new-players-dialog.component';
import { NgxCurrencyModule, CurrencyMaskInputMode } from 'ngx-currency';

registerLocaleData(localeHu, 'hu');

export const customCurrencyMaskConfig = {
   align: 'right',
   allowNegative: true,
   allowZero: true,
   decimal: ',',
   precision: 0,
   prefix: '',
   suffix: ' Ft',
   thousands: '.',
   nullable: true,
   inputMode: CurrencyMaskInputMode.NATURAL
};
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
        MatDialogModule,
        NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
