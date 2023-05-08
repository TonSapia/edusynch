import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import { getAssetsAPI } from '../../pages/api/coinbaseAPI';
import Acordeon from "@/components/landpage/Acordeon";

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

export default function TableSection() {  
  const [results, setResults] = useState<Asset[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [moreResults, setMoreResults] = useState<boolean>(true);
  const [lessResults, setLessResults] = useState<boolean>(false);
  const [loadingResults, setLoadingResults] = useState<boolean>(false);

  useEffect(() => {
    loadResults();
  }, []);

  /** Carrega os resultados da tabela via API */
  const loadResults = async () => {
    setLoadingResults(true);

    try {      
      const response = await getAssetsAPI();
      setResults(response.slice(5))
      setAssets(response.slice(0,-5));
      setMoreResults(true);
      setLessResults(false); 
    } catch (error) {
      console.error(error);
    }

    setLoadingResults(false);
  };

  /** Carrega mais resultados na tabela */
  const loadMoreResults = async () => {
    setLoadingResults(true);
    setAssets([...assets, ...results]);
    setMoreResults(false);
    setLessResults(true);  
    setLoadingResults(false);
  };

  const getAcordeonBackgroundClass = (indice: number) => {
    return indice % 2 === 0 ? 'acordeon-background-even' : 'acordeon-background-odd';
  }
        
  return(
    <section id="table-section" className='table-section'>         
        <TableContainer className='table'>
          <h1>Top Cryptos</h1>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">#</TableCell>
                <TableCell align="center">Crypto</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Change</TableCell>
                <TableCell align="center">Trade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assets.map((row, index) => (
                <TableRow key={index}>           
                  <TableCell align="center">{index + 1}</TableCell>      
                  <TableCell align="center"><Chip className="chip-table" icon={(row.url_icon.length > 0) ? <img src={row.url_icon}/> : <img src="assets/images/ETH.svg"/>} label={row.asset_id} />  </TableCell>
                  <TableCell align="center">{row.price_usd ? row.price_usd.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : "R$ 5,00"}</TableCell>
                  <TableCell align="center">
                    <label className={`${(((row.volume_1hrs_usd - row.volume_1day_usd) / (row.volume_1day_usd)) >= 0) ? "positive" : "negative"}`}>
                      {((row.volume_1hrs_usd - row.volume_1day_usd) / (row.volume_1day_usd)) >= 0 ? 
                        `+${(((row.volume_1hrs_usd - row.volume_1day_usd) / row.volume_1day_usd)).toFixed(2)}` : 
                            (((row.volume_1hrs_usd - row.volume_1day_usd) / row.volume_1day_usd)).toFixed(2)}%
                    </label>
                  </TableCell>
                  <TableCell align="center">
                    <button className='btn btn-ter btn-table'>Buy</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {moreResults && (
            <button className='btn btn-link btn-link-table primary' onClick={loadMoreResults} disabled={loadingResults}>
              {loadingResults ? 'Loading...' : 'View more +'}
            </button>
          )}      

          {lessResults && (
            <button className='btn btn-link btn-link-table primary' onClick={loadResults} >
              View less +
            </button>
          )}      
        </TableContainer>
        <div className="acordeon-list">
          <h1>Top Cryptos</h1>
          {assets.map((acordeon, index) => (
            <Acordeon 
              key={index} 
              classAcordeon={getAcordeonBackgroundClass(index)}
              label={acordeon.asset_id}
              name={acordeon.name}
              crypto={acordeon.url_icon} 
              price={acordeon.price_usd ? acordeon.price_usd.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : "R$ 5,00"} 
              change={(((acordeon.volume_1hrs_usd - acordeon.volume_1day_usd) / acordeon.volume_1day_usd)).toFixed(2)}
            />
          ))}
          {moreResults && (
            <button className='btn btn-link btn-link-table primary' onClick={loadMoreResults} disabled={loadingResults}>
              {loadingResults ? 'Loading...' : 'View more +'}
            </button>
          )} 

          {lessResults && (
            <button className='btn btn-link btn-link-table primary' onClick={loadResults} >
              View less +
            </button>
          )}   
        </div>
    </section>
  );    
}