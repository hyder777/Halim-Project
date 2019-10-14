import {CSVRecord} from "./CSVModel";

export interface OrdersChart {
  chartLabel: string[];
  linesData: number[][];
}

export abstract class OrdersChartData {
  abstract getOrdersChartData(period: string): OrdersChart;
  abstract getDataFromCVSFile( records: CSVRecord[]): OrdersChart
}
