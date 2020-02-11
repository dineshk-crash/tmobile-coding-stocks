import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  symbol: string;
  period: string;

  quotes$ = this.priceQuery.priceQueries$;

  fromMaxDate: Date = new Date();
  toMaxDate: Date = new Date();
  toMinDate: Date;

  timePeriods = [
    { viewValue: 'All available data', value: 'max' },
    { viewValue: 'Five years', value: '5y' },
    { viewValue: 'Two years', value: '2y' },
    { viewValue: 'One year', value: '1y' },
    { viewValue: 'Year-to-date', value: 'ytd' },
    { viewValue: 'Six months', value: '6m' },
    { viewValue: 'Three months', value: '3m' },
    { viewValue: 'One month', value: '1m' }
  ];

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required],
      fromDate: [null],
      toDate: [null]
    });
  }

  ngOnInit() {
    this.onFormChanges();
  }

  onFormChanges(): void {
    this.stockPickerForm.valueChanges.subscribe(value => {
      console.log(value);
      if (this.stockPickerForm.valid) {
        this.fetchQuote();
      }
    });
  }

  onFormDateChange(event: MatDatepickerInputEvent<Date>) {
    console.log(event);
    const toDateVal = this.stockPickerForm.get('toDate').value;
    if (event.value === null) {
      this.toMinDate = null;
    } else if (event.value !== null && toDateVal !== null && event.value > toDateVal) {
      this.stockPickerForm.get('toDate').setValue(event.value);
      this.toMinDate = new Date(event.value);
    } else {
      this.toMinDate = new Date(event.value);
    }
  }

  fetchQuote() {
      const { symbol, period } = this.stockPickerForm.value;
      this.period = period;
      this.priceQuery.fetchQuote(symbol, period);
  }
}
