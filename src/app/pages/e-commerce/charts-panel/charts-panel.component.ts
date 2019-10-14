import { Component, OnDestroy, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { OrdersChartComponent } from './charts/orders-chart.component';
import { ProfitChartComponent } from './charts/profit-chart.component';
import { OrdersChart } from '../../../@core/data/orders-chart';
import { ProfitChart } from '../../../@core/data/profit-chart';
import { OrderProfitChartSummary, OrdersProfitChartData } from '../../../@core/data/orders-profit-chart';
import {CSVRecord} from '../../../@core/data/CSVModel';

@Component({
  selector: 'ngx-ecommerce-charts',
  styleUrls: ['./charts-panel.component.scss'],
  templateUrl: './charts-panel.component.html',
})
export class ECommerceChartsPanelComponent implements OnDestroy {

  /*For CSV Records*/
  public records: CSVRecord[] = [];
  @ViewChild('csvReader', { static: true }) csvReader: any;

  private alive = false;

  chartPanelSummary: OrderProfitChartSummary[];
  period: string = 'cvsFile';
  ordersChartData: OrdersChart;
  profitChartData: ProfitChart;

  @ViewChild('ordersChart', { static: true }) ordersChart: OrdersChartComponent;
  @ViewChild('profitChart', { static: true }) profitChart: ProfitChartComponent;

  constructor(private ordersProfitChartService: OrdersProfitChartData) {
    this.ordersProfitChartService.getOrderProfitChartSummary()
      .pipe(takeWhile(() => this.alive))
      .subscribe((summary) => {
        this.chartPanelSummary = summary;
      });
    // this.getOrdersChartData(this.period);
    // this.getProfitChartData(this.period);
  }

  setPeriodAndGetChartData(value: string): void {
    if (this.period !== value) {
      this.period = value;
    }

    this.getOrdersChartData(value);
    this.getProfitChartData(value);
  }

  changeTab(selectedTab) {
    if (selectedTab.tabTitle === 'Profit') {
      this.profitChart.resizeChart();
    } else {
      this.ordersChart.resizeChart();
    }
  }

  getCVSData(records: CSVRecord[]) {
    this.ordersProfitChartService.getDataFromCVSFile(records)
      .pipe(takeWhile(() => this.alive))
      .subscribe(ordersChartData => {
        this.ordersChartData = ordersChartData;
      });
  }

  getOrdersChartData(period: string) {
    this.ordersProfitChartService.getOrdersChartData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe(ordersChartData => {
        this.ordersChartData = ordersChartData;
      });
  }

  getProfitChartData(period: string) {
    this.ordersProfitChartService.getProfitChartData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe(profitChartData => {
        this.profitChartData = profitChartData;
      });
  }

  uploadListener($event: any): void {

    const text = [];
    const files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      const input = $event.target;
      const reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        const csvData = reader.result;
        const csvRecordsArray = csvData;

        this.records = this.getDataRecordsArrayFromCSVFile(csvData, csvRecordsArray.toString().length);

        this.alive = true;
        this.ordersProfitChartService.getOrderProfitChartSummary()
          .pipe(takeWhile(() => this.alive))
          .subscribe((summary) => {
            this.chartPanelSummary = summary;
          });
        this.getCVSData(this.records);
        // this.getProfitChartData(this.period);
        // alert(this.records[2].sum_ead_el);
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    } else {
      alert('Please import valid .csv file.');
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    const csvArr: CSVRecord[] = [];
    const curruntRecord = csvRecordsArray.split(';');

    for (let i = 0; i < 10000; i = i + 20) {

      const csvRecord: CSVRecord = new CSVRecord();

      csvRecord.i = curruntRecord[0 + i] != undefined ? curruntRecord[0 + i].trim() : null;
      csvRecord.COD_CLAF = curruntRecord[1 + i] != undefined ? curruntRecord[1 + i].trim() : null;
      csvRecord.segmentationBCAR = curruntRecord[2 + i] != undefined ? curruntRecord[2 + i].trim() : null;
      csvRecord.type_instrument = curruntRecord[3 + i] != undefined ? curruntRecord[3 + i].trim() : null;
      csvRecord.segmentation = curruntRecord[4 + i] != undefined ? curruntRecord[4 + i].trim() : null;
      csvRecord.SegmentationPD = curruntRecord[5 + i] != undefined ? curruntRecord[5 + i].trim() : null;
      csvRecord.Rating = curruntRecord[6 + i] != undefined ? curruntRecord[6 + i].trim() : null;
      csvRecord.CATGARA = curruntRecord[7 + i] != undefined ? curruntRecord[7 + i].trim() : null;
      csvRecord.PD_VaR = curruntRecord[8 + i] != undefined ? curruntRecord[8 + i].trim() : null;
      csvRecord.PD_EL = curruntRecord[9 + i] != undefined ? curruntRecord[9 + i].trim() : null;
      csvRecord.PCD_VaR = curruntRecord[10 + i] != undefined ? curruntRecord[10 + i].trim() : null;
      csvRecord.PCD_EL = curruntRecord[11 + i] != undefined ? curruntRecord[11 + i].trim() : null;
      csvRecord.nbr = curruntRecord[12 + i] != undefined ? curruntRecord[12 + i].trim() : null;
      csvRecord.sum_ead_var = curruntRecord[13 + i] != undefined ? curruntRecord[13 + i].trim() : null;
      csvRecord.sum_ead_el = curruntRecord[14 + i] != undefined ? curruntRecord[14 + i].trim() : null;
      csvRecord.corr_VaR = curruntRecord[15 + i] != undefined ? curruntRecord[15 + i].trim() : null;
      csvRecord.sum_VaR = curruntRecord[16 + i] != undefined ? curruntRecord[16 + i].trim() : null;
      csvRecord.sum_EL = curruntRecord[17 + i] != undefined ? curruntRecord[17 + i].trim() : null;
      csvRecord.PD_reg = curruntRecord[18 + i] != undefined ? curruntRecord[18 + i].trim() : null;
      csvRecord.PCD_reg = curruntRecord[19 + i] != undefined ? curruntRecord[19 + i].trim() : null;
      csvRecord.sem_EAD_Reg = curruntRecord[20 + i] != undefined ? curruntRecord[20 + i].trim() : null;

      csvArr.push(csvRecord);
    }
    return csvArr;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith('.csv');
  }

  fileReset() {
    this.csvReader.nativeElement.value = '';
    this.records = [];
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
