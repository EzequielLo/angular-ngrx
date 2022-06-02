import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { customIncrement } from '../state/counter.actions';
import { getCounter } from '../state/counter.selectors';

@Component({
  selector: 'app-counter-custom',
  templateUrl: './counter-custom.component.html',
  styleUrls: ['./counter-custom.component.css']
})
export class CounterCustomComponent implements OnInit {
  value!: number;
  value$!: Observable<number>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.value$ = this.store.select(getCounter)
  }

  onAdd() {
    this.store.dispatch(customIncrement({ count: +this.value }))

  }

}
