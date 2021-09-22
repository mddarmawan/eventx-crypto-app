export interface Ticker {
  ticker: TickerData;
  timestamp: number;
  success: boolean;
  error: string;
  code: TickerCode;
  name: TickerName;
}

export interface TickerData {
  base: TickerBase;
  target: TickerTarget;
  price: string;
  volume: string;
  change: string;
}

export type TickerBase =
  | 'BTC'
  | 'ETH'
  | 'LTC'
  | 'XMR'
  | 'XRP'
  | 'DOGE'
  | 'DASH'
  | 'MAID'
  | 'LSK'
  | 'SJCX';

export type TickerTarget = 'USD';
export type TickerCode = `${TickerBase}-${TickerTarget}`;

export type TickerName =
  | 'Bitcoin'
  | 'Ether'
  | 'Litecoin'
  | 'Monero'
  | 'Ripple'
  | 'Dogecoin'
  | 'Dash'
  | 'MaidSafeeCoin'
  | 'Lisk'
  | 'Storjoin X';
