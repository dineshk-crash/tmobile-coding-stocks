import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input, OnDestroy,
  OnInit
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {
  @Input() data$: Observable<any>;
  chartData: any;
  prd:string;

  private subscription: Subscription;

  chart: {
    title: string;
    type: string;
    data: any;
    columnNames: string[];
    options: any;
  };
  constructor(private cd: ChangeDetectorRef) {}

  @Input('period') set period(dt: string) {
    this.prd = dt; console.log('period in chart', this.prd);
  }

  ngOnInit() {
    this.chart = {
      title: '',
      type: 'LineChart',
      data: [],
      columnNames: ['period', 'close'],
      options: { title: `Stock price`, width: '600', height: '400' }
    };

    this.subscription = this.data$.subscribe(newData => {
      if (this.prd === '1m') { // if 1m time period is selected...modify the chart columns and data
        this.chart.columnNames = ['period', 'close', 'low', 'high'];
        this.chartData = newData;
      } else {
        this.chart.columnNames = ['period', 'close'];
        this.chartData = newData.map(data => [data[0], data[1]]);
        console.log(this.chartData);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
