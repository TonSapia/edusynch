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

interface myWallet {
  id: number;
  name: string;
  user_id: number;
  asset_id: string;  
  quantity: number;
  price_usd: number;
  volume_1hrs_usd: number;
  volume_1day_usd: number;
  url_icon: string;
}

interface Wallet {
  id: number;
  name: string;
  user_id: number;
  asset_id: string;  
  quantity: number;  
  url_icon: string;
}

interface PostWallet {
  name: string;
  user_id: number;
  asset_id: string;  
  quantity: number;  
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

export const removeFromWallet = async (id: number, asset_id: string, quantity: number) => {
  const responseWallet = await axios.get<Wallet[]>(`http://localhost:3030/wallet?user_id=${id}&asset_id=${asset_id}`, {});   
  const quantityOld = responseWallet.data[0].quantity;
  const idWallet = responseWallet.data[0].id;
  const quantityNew = quantityOld - quantity;
  if (quantityNew > 0) {
    const response = await axios.patch(`http://localhost:3030/wallet/${idWallet}`, { quantity: quantityNew });
    return response.data;
  } else {
    const response = await axios.delete(`http://localhost:3030/wallet/${idWallet}`);
    return response.data;
  }
};

export const addToWallet = async (newCrypto: PostWallet) => {
  const responseWallet = await axios.get<Wallet[]>(`http://localhost:3030/wallet?user_id=${newCrypto.user_id}&asset_id=${newCrypto.asset_id}`, {});   
  
  if (responseWallet.data && responseWallet.data.length > 0) {
    const id = responseWallet.data[0].id;
    const quantity = responseWallet.data[0].quantity;
    const response = await axios.patch(`http://localhost:3030/wallet/${id}`, { quantity: (quantity + newCrypto.quantity) });
    return response.data;
  } else {
    const response = await axios.post<PostWallet>(`http://localhost:3030/wallet/`, newCrypto);
    return response.data;
  } 
};

export const getWalletAPI = async (user_id: number) => {
  const dataMyWallet: myWallet[] = [];

  try {
    const responseAssets = await axios.get<Asset[]>(
      'https://rest.coinapi.io/v1/assets?filter_asset_id=BTC,ETH,ADA,SOL,USDC',
      {
        headers: {
          'X-CoinAPI-Key': apiKey,
        },
      }
    );

    const responseWallet = await axios.get<Wallet[]>(`http://localhost:3030/wallet?user_id=${user_id}`, {});    
    
    responseWallet.data.forEach((wallet) => {
      dataMyWallet.push({
        id: wallet.id,
        user_id: wallet.user_id,
        name: wallet.name,
        asset_id: wallet.asset_id,  
        quantity: wallet.quantity,
        price_usd: Number(responseAssets.data.filter((e: Asset) => e.asset_id.includes(wallet.asset_id)).map((asset: any) => asset.price_usd)),
        volume_1hrs_usd: Number(responseAssets.data.filter((e: Asset) => e.asset_id.includes(wallet.asset_id)).map((asset: any) => asset.volume_1hrs_usd)),
        volume_1day_usd: Number(responseAssets.data.filter((e: Asset) => e.asset_id.includes(wallet.asset_id)).map((asset: any) => asset.volume_1day_usd)),
        url_icon: wallet.url_icon
      });
    });   

    return dataMyWallet;

  } catch (error) {    
    console.log(error);
    return dataMyWallet;
  }   
}

export const getAssetsAPI = async (limit = 6, start = 0) => {
  try {
    const assetsUrl = 'https://rest.coinapi.io/v1/assets?filter_asset_id=BTC,ETH,XLM,XRP,ADA,EUR,JPY,CHF,SOL,USDC';
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
      'https://rest.coinapi.io/v1/assets?filter_asset_id=BTC,ETH,XLM,XRP,ADA,EUR,JPY,CHF,SOL,USDC',
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