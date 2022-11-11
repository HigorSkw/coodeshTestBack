export interface ISalesRequest {
  type: number;
  date: Date;
  product: string;
  value: number;
  seller: string;
}

export interface ISales extends ISalesRequest {
  id: string;
}
