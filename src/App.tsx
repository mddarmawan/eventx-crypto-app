import React, { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Ticker } from './Ticker';

interface CardProps {
  tickerData: Ticker;
}

let decimalDigit = 5;
decimalDigit = 10 ** decimalDigit;

// To be changed
const client = new W3CWebSocket('wss://0e40b8a50ac5.eu.ngrok.io/');

const Card = (props: CardProps) => {
  const { tickerData } = props;
  const tickerVolume = Math.round(parseFloat(tickerData.ticker.volume) * decimalDigit) / decimalDigit;
  const tickerChange = Math.round(parseFloat(tickerData.ticker.change) * decimalDigit) / decimalDigit;

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2 mb-1">
      <div className="w-full rounded overflow-hidden border">
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
  const [tickersData, setTickersData] = useState<Ticker[]>([]);

  useEffect(() => {
    client.onmessage = (message) => {
      const { data } = message;
      const tickersData = JSON.parse(data as string) as Ticker[];
      setTickersData(tickersData);
      console.log(tickersData)
    };
  }, []);

  return (
    <div className="p-4 flex flex-wrap">
      <div className="w-full mb-6">
        <span className="font-semibold text-4xl">Cryptocurrency Realtime Price</span>
      </div>

      {tickersData.map((tickerData, index) => {
        return tickerData.success ? <Card key={index} tickerData={tickerData} /> : '';
      })}
    </div>
  );
}

export default App;
