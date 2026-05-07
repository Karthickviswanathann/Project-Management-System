import {
  Component,
  Input
} from '@angular/core';

import {
  BaseChartDirective
} from 'ng2-charts';

@Component({
  selector: 'app-chart',
  standalone: true,

  imports: [
    BaseChartDirective
  ],

  template: `

  <div class="chart-card">

    <div class="chart-header">

      <h2>
        {{title}}
      </h2>

      <p>
        {{description}}
      </p>

    </div>


    <div class="chart-wrapper">

      <canvas
        baseChart
        [type]="type"
        [data]="{
          labels: labels,
          datasets: datasets
        }"
        [options]="chartOptions">

      </canvas>

    </div>

  </div>

  `,

  styles:[`

  .chart-card{

    background:white;

    border-radius:18px;

    padding:20px;

    box-shadow:0 2px 12px rgba(0,0,0,.08);

  }

  .chart-header{

    margin-bottom:20px;

  }

  .chart-header h2{

    margin:0;

    font-size:22px;

    font-weight:600;

  }

  .chart-header p{

    color:#6b7280;

    margin-top:6px;

  }

  .chart-wrapper{

    height:400px;

    position:relative;

  }

  `]

})

export class ChartComponent {

  @Input()
  title = 'Chart';

  @Input()
  description = '';

  @Input()
  labels:string[] = [];

  @Input()
  datasets:any[] = [];

  @Input()
  type:any = 'bar';


  chartOptions:any = {

    responsive:true,

    maintainAspectRatio:false,

    plugins:{

      legend:{
        display:true
      }

    },

    scales:{

      y:{
        beginAtZero:true
      }

    }

  };

}