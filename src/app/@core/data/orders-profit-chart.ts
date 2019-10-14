import { Observable } from 'rxjs';
import { OrdersChart } from './orders-chart';
import { ProfitChart  } from './profit-chart';
import {CSVRecord} from "./CSVModel";

export interface OrderProfitChartSummary {
  title: string;
  value: number;
}

export abstract class OrdersProfitChartData {
  abstract getOrderProfitChartSummary(): Observable<OrderProfitChartSummary[]>;
  abstract getOrdersChartData(period: string): Observable<OrdersChart>;
  abstract getProfitChartData(period: string): Observable<ProfitChart>;
  abstract getDataFromCVSFile( records: CSVRecord[]): Observable<OrdersChart>;
}
