import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CounterRoutingModule } from './counter-routing.module';
import { CounterComponent } from './counter/counter.component';
import { CounterButtonsComponent } from './counter-buttons/counter-buttons.component';
import { CounterCustomComponent } from './counter-custom/counter-custom.component';
import { CounterOutputComponent } from './counter-output/counter-output.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './state/counter.reducer';
import { COUNTER_STATE_NAME } from './state/counter.selectors';


@NgModule({
  declarations: [
    CounterComponent,
    CounterButtonsComponent,
    CounterCustomComponent,
    CounterOutputComponent
  ],
  imports: [
    CommonModule,
    CounterRoutingModule,
    FormsModule,
    StoreModule.forFeature(COUNTER_STATE_NAME, counterReducer)
  ]
})
export class CounterModule { }
