import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_COINBASE_API_KEY;

interface Asset {
  asset_id: string;
  name: string;
  type_is_crypto: number;
  data_trade_start: string;
  data_trade_end: string;
  data_orderbook_start: string;
  data_orderbook_end: string;
  data_quote_start: string;
  data_quote_end: string;
  data_trade_count: number;
  data_symbols_count: number;
  volume_1hrs_usd: number;
  volume_1day_usd: number;
  volume_1mth_usd: number;
  price_usd: number;
  url_icon: string;
}

interface Currencies { 
  asset_id: string;  
  value: number;
  price_usd: number;
  volume_1hrs_usd: number;
  volume_1day_usd: number;
  variation: string;  
}


export const getAssetsAPI = async (limit = 6, start = 0) => {
  try {
    const assetsUrl = 'https://rest.coinapi.io/v1/assets';
    const iconsUrl = `https://rest.coinapi.io/v1/assets/icons/32`;
    const assetsResponse = (await axios.get(assetsUrl, { 
      headers: { 'X-CoinAPI-Key': apiKey }
    })).data.slice(0, 11);
    const iconsResponse = (await axios.get(iconsUrl, { 
      headers: { 'X-CoinAPI-Key': apiKey }
    })).data.slice(0, 11);

    const assetsWithIcons = assetsResponse.map((asset: Asset) => ({
      ...asset,
      url_icon: iconsResponse.filter((e: Asset) => e.asset_id.includes(asset.asset_id)).map((icon: any) => icon.url)
    }));

    return assetsWithIcons;

  } catch (error) {    
    const response = await axios.get<Currencies[]>('http://localhost:3030/currencies', {});    
    return response.data; 
  }   
}

export const getCurrencyAPI = async () => {  
  try {
    const response = await axios.get<Currencies[]>(
      'https://rest.coinapi.io/v1/assets?filter_asset_id=BTC,ETH,XLM,XRP,ADA,EUR,JPY,CHF,SEK,GBP',
      {
        headers: {
          'X-CoinAPI-Key': apiKey,
        },
      }
    );

    return response.data;

  } catch (error) {    
    const response = await axios.get<Currencies[]>('http://localhost:3030/currencies', {});    
    return response.data; 
  }   
};