import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import axios from 'axios';

interface Result {
  id: number;
  crypto: string;
  price: number;
  link: string;
  volume_1hrs_usd: number;
  volume_1day_usd: number;
}

export default function TableSection() {  
  const [results, setResults] = useState<Result[]>([]);
  const [moreResults, setMoreResults] = useState<boolean>(true);
  const [loadingResults, setLoadingResults] = useState<boolean>(false);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    setLoadingResults(true);

    try {
      const response = await axios.get<Result[]>('http://localhost:3030/results', {
        params: {
          limit: 5,
          offset: 0
        }
      });

      if (response.data.length < 5) {
        setMoreResults(false);
      }

      setResults(response.data);
    } catch (error) {
      console.error(error);
    }

    setLoadingResults(false);
  };

  const loadMoreResults = async () => {
    setLoadingResults(true);

    try {
      const response = await axios.get<Result[]>('/api/result', {
        params: {
          limit: 5,
          offset: results.length
        }
      });

      if (response.data.length < 5) {
        setMoreResults(false);
      }

      setResults([...results, ...response.data]);
    } catch (error) {
      console.error(error);
    }

    setLoadingResults(false);
  };
        
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
              {results.map((row) => (
                <TableRow key={row.id}>           
                  <TableCell align="center">{row.id}</TableCell>      
                  <TableCell align="center"><Chip className="chip-table" icon={<img src={row.link}/>} label={row.crypto} />  </TableCell>
                  <TableCell align="center">{row.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</TableCell>
                  <TableCell align="center">
                    <label className={`${(((row.volume_1hrs_usd - row.volume_1day_usd) / (row.volume_1day_usd) * 100) >= 0) ? "positive" : "negative"}`}>
                      {((row.volume_1hrs_usd - row.volume_1day_usd) / (row.volume_1day_usd) * 100) >= 0 ? 
                        `+${((row.volume_1hrs_usd - row.volume_1day_usd) / (row.volume_1day_usd) * 100).toFixed(2)}` : 
                            ((row.volume_1hrs_usd - row.volume_1day_usd) / (row.volume_1day_usd) * 100).toFixed(2)}%
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
        </TableContainer>
    </section>
  );    
}