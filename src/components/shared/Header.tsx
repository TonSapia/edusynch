import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Link from 'next/link';
import CarrouselCoin from './CarrouselCoin';
import LoginButtons from './LoginButtons';
import axios from 'axios';

interface Currencies { 
  asset_id: string;  
  value: number;
  price_usd: number;
  volume_1hrs_usd: number;
  volume_1day_usd: number;
  variation: string;  
}

export default function Header() {

  const [navActive, setNavActive] = useState(false);
  const [currencies, setCurrencies] = useState<Currencies[]>([]);

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        const response = await axios.get<Currencies[]>(
          'https://rest.coinapi.io/v1/assets?filter_asset_id=BTC,ETH,XLM,XRP,ADA',
          {
            headers: {
              'X-CoinAPI-Key': '63909DE3-908B-46C3-A2B4-613B7608EECF',
            },
          }
        );
                
        const currencies: Currencies[] = response.data.map(data => { 
          return {
            asset_id: data.asset_id,           
            price_usd: data.price_usd,
            volume_1day_usd: data.volume_1day_usd,
            volume_1hrs_usd: data.volume_1hrs_usd,
            value: Number(data.price_usd.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})),            
            variation: ((data.volume_1hrs_usd - data.volume_1day_usd) / (data.volume_1day_usd * 100)).toFixed(4).toString()
          };
        });  

        setCurrencies(currencies);        
      } catch (error) {
        console.error(error);
      }
    };

    getCurrencies();
  }, []);

  return (
    <header className='header'>
      <Link href='/' className='logo'>
        <Image src='/assets/images/Logo.svg' alt='logo' height={27} width={202}></Image>        
      </Link>
      <div onClick={() => setNavActive(!navActive)} className='nav-menu-icon'>
        {navActive ? (
          <Image src='assets/shared/mobile/icon-close.svg' alt='close menu' height={20} width={20} />
        ) : (
          <Image src='assets/shared/mobile/hamburger-menu.svg' alt='close menu' height={34} width={34} />
        )}
      </div>
      <Navbar navActive={navActive} />
      <CarrouselCoin currencies={currencies} />
      <LoginButtons />
    </header>
  );
}