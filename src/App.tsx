import React, { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import NumberFormat from 'react-number-format';
import { Ticker } from './Ticker';

interface CardProps {
  tickerData: Ticker;
}

const DECIMAL = 5;
const client = new W3CWebSocket(process.env.REACT_APP_WEBSOCKET_CLIENT ?? '');

const Card = (props: CardProps) => {
  const { tickerData } = props;

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2 mb-1">
      <div className="w-full rounded overflow-hidden border">
        <div className="px-6 py-4">
          <div className="font-bold text-3xl mb-1">{tickerData.name}</div>
            <NumberFormat
              value={tickerData.ticker.price}
              className="text-yellow-500 text-xl mb-4"
              displayType={'text'}
              decimalScale={DECIMAL}
              thousandSeparator={true}
              prefix={'$'}
            />
          <table className="text-gray-500 table-fixed text-sm mt-4  ">
            <thead>
              <tr className="w-full">
                <td className="w-1/6">volume:</td>
                <td className="w-1/6">change:</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-1/6">
                  {tickerData.ticker.volume ?
                    <NumberFormat
                      value={tickerData.ticker.volume}
                      defaultValue='-'
                      displayType={'text'}
                      decimalScale={DECIMAL}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  : '-'}
                </td>
                <td className="w-1/6">
                  <NumberFormat
                    value={tickerData.ticker.change}
                    defaultValue='-'
                    className={parseFloat(tickerData.ticker.change) < 0 ? 'text-red-500' : 'text-green-500'}
                    displayType={'text'}
                    decimalScale={DECIMAL}
                    thousandSeparator={true}
                    suffix={'%'}
                  />
                </td>
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.onmessage = (message) => {
      const { data } = message;
      const tickers = JSON.parse(data as string) as Ticker[];
      setTickersData(tickers);
      setLoading(false);
    };
  }, []);

  return (
    <div className="p-4 flex flex-wrap">
      <div className="w-full mb-6">
        <span className="font-semibold text-4xl">Cryptocurrency Realtime Price</span>
      </div>

      {loading ? <span className="text-lg">Loading...</span>
        : tickersData.map((tickerData, index) => {
          return tickerData.success ? <Card key={index} tickerData={tickerData} /> : '';
        })
      }

    </div>
  );
}

export default App;
