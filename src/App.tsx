import React from 'react';
import logo from './logo.svg';
import { Ticker, TickerCode, TickerData, TickerName } from './Ticker';

interface CardProps {
  tickerData: Ticker;
}

let decimalDigit = 5;
decimalDigit = 10 ** decimalDigit;

const tickersData: Ticker[] = [
  {
    ticker: {
      base: 'BTC',
      target: 'USD',
      price: '42154.99647490',
      volume: '68553.68375147',
      change: '-185.10466605',
    },
    code: 'BTC-USD',
    name: 'Bitcoin',
    timestamp: new Date().getTime(),
    success: true,
    error: ''
  },
  {
    ticker: {
      base: 'ETH',
      target: 'USD',
      price: '2936.73934216',
      volume: '837075.21062595',
      change: '0.69398693',
    },
    code: 'ETH-USD',
    name: 'Ether',
    timestamp: new Date().getTime(),
    success: true,
    error: ''
  },
  {
    ticker: {
      base: 'LTC',
      target: 'USD',
      price: '154.92954857',
      volume: '659689.90312977',
      change: '-0.65777966',
    },
    code: 'LTC-USD',
    name: 'Litecoin',
    timestamp: new Date().getTime(),
    success: true,
    error: ''
  },
  {
    ticker: {
      base: 'DOGE',
      target: 'USD',
      price: '0.12801854',
      volume: '1040971239.03340006',
      change: '0.00143942',
    },
    code: 'DOGE-USD',
    name: 'Dogecoin',
    timestamp: new Date().getTime(),
    success: true,
    error: ''
  },
];

const Card = (props: CardProps) => {
  const { tickerData } = props;
  const tickerVolume = Math.round(parseFloat(tickerData.ticker.volume) * decimalDigit) / decimalDigit;
  const tickerChange = Math.round(parseFloat(tickerData.ticker.change) * decimalDigit) / decimalDigit;

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mr-4 mb-4">
      <div className="max-w-sm rounded overflow-hidden border">
        <div className="px-6 py-4">
          <div className="font-bold text-3xl mb-1">{tickerData.name}</div>
          <p className="text-yellow-500 text-xl mb-4">
            ${tickerData.ticker.price}
          </p>
          <table className="text-gray-500 table-fixed text-sm">
            <thead>
              <tr>
                <td className="w-1/3">volume:</td>
                <td className="w-1/3"></td>
                <td className="w-1/3">change:</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${tickerVolume}</td>
                <td></td>
                <td className={tickerChange < 0 ? 'text-red-500' : 'text-green-500'}>{tickerChange}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="p-4 flex flex-wrap">
      <div className="w-full mb-6">
        <span className="font-semibold text-4xl">Cryptocurrency Realtime Price</span>
      </div>

      {tickersData.map((tickerData) => {
        return <Card tickerData={tickerData} />;
      })}
    </div>
  );
}

export default App;
