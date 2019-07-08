import { Component ,ViewChild, state} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from "chart.js";
import { MethodsProvider } from '../../providers/methods/methods';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  projectNames = new Array();
  fundsNeeded = new Array();
  currentFundedProjects = new Array();
  currentAmount =  new Array();
  state = 0;

  constructor(public navCtrl: NavController, public methods:MethodsProvider) {
  }

  ngOnInit() {
   
    this.methods.RetrieveProjectBrief().then((data:any) =>{
      this.fundsNeeded = [];
      this.projectNames = [];
      this.currentFundedProjects = [];
      this.currentAmount = [];
      for (var x = 0; x < data.length; x++){
        this.fundsNeeded.push(data[x].Requestingfunds);
        this.projectNames.push(data[x].name)
        if (data[x].Amount > 0){
          this.state = 1;
          this.currentFundedProjects.push(data[x].name)
          this.currentAmount.push(data[x].Amount)
        }
      }
      if (this.state != 0){
      this.doughnutChartMethod() 
      }

      this.barChartMethod();
    })
    ;
    // this.lineChartMethod();
  }

  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
    // 
    type: 'bar',
    data: {
        labels: this.projectNames,
        datasets: [{
            label: 'Amount Requested',
            data: this.fundsNeeded,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});    // 
  }

  doughnutChartMethod() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.currentFundedProjects,
        datasets: [{
          label: '# of Votes',
          data: this.currentAmount,
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384'
          ]
        }]
      }
    });
  }

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
        datasets: [
          {
            label: 'Sell per week',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
            spanGaps: false,
          }
        ]
      }
    });
  }

}
