import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';

interface Data {
  id: number;
  crypto: string;
  price: number;
  change: string;
  icon: string;
}

export default function Wallet() {

  const [data, setData] = useState<Data[]>([
    { 'id': 1, 'crypto': 'BITCOIN', 'price': 3000.00, 'change': '+5,67%', 'icon': 'assets/images/ETH.svg' },  
    { 'id': 2, 'crypto': 'BITCOIN', 'price': 3000.00, 'change': '+5,67%', 'icon': 'assets/images/ETH.svg' },
    { 'id': 3, 'crypto': 'BITCOIN', 'price': 3000.00, 'change': '+5,67%', 'icon': 'assets/images/ETH.svg' },
    { 'id': 4, 'crypto': 'BITCOIN', 'price': 3000.00, 'change': '+5,67%', 'icon': 'assets/images/ETH.svg' },
    { 'id': 5, 'crypto': 'BITCOIN', 'price': 3000.00, 'change': '+5,67%', 'icon': 'assets/images/ETH.svg' }   
  ]);

  const handleAdd = () => {
    const newData = { id: data.length + 1, crypto: 'ETH', price: 3000.00, change: '-4,23%', icon: 'assets/images/ETH.svg' };
    setData([...data, newData]);
  };

  const handleDelete = (id: number) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  return (
    <div className="wallet-container">
      <div className="wallet">
        <Card className="balance"> 
          <CardContent className="image">
            <img src="assets/images/J.svg"/>
          </CardContent>
          <CardContent className="text">
            <h5>Balance in US$</h5>
            <p>(approximately)</p>
          </CardContent> 
          <CardContent className="value">
            <h3>$32,256.56</h3> 
          </CardContent> 
        </Card>
        <Card className="variation"> 
          <CardContent className="text">
            <p>Daily Variation</p>
            <Chip className="chip-variation" icon={<img src="assets/images/ETH.svg"/>} label="ETH" />            
            <p>+5,65%</p>
          </CardContent> 
          <CardContent className="image"></CardContent>
        </Card>
        <Card className="news"> 
          <CardContent className="text">
            <h5>NFTs NEWS</h5>
            <p>New ElephantX NFT to be lauched!</p>
            <a>Read more +</a>
          </CardContent> 
          <CardContent className="image"></CardContent>              
        </Card>
        <div className="my-wallet">
          <div className="wallet-menu-table">            
            <Chip className="chip" icon={<img src="assets/images/Z.svg"/>} label="My Wallet" />
            <button className="btn btn-pry" onClick={handleAdd}>+ Add crypto</button>
          </div>
          {data.length > 0 ? (
            <TableContainer className="wallet-table">
              <Table>
                <TableHead>
                  <TableRow>              
                    <TableCell align='center'>#</TableCell>
                    <TableCell align='center'>Crypto</TableCell>
                    <TableCell align='center'>Holdings</TableCell>
                    <TableCell align='center'>Change</TableCell>
                    <TableCell align='center'>Trade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow>
                      <TableCell align='center'>{row.id}</TableCell>
                      <TableCell align='center'><Chip className="chip-table" icon={<img src="assets/images/ETH.svg"/>} label={row.crypto} /></TableCell>
                      <TableCell align='center'>
                        <div className="holdings">
                          <p>US{row.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>
                          <p className="quantity">345 BTC</p>
                        </div>                        
                      </TableCell>
                      <TableCell align='center'>{row.change}</TableCell>
                      <TableCell align='center'>
                        <button className="btn" onClick={() => handleDelete(row.id)}>
                          <img src="assets/images/P.svg" /> 
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div className="table-empty">
              <img src="assets/images/N.svg" />
              <h1>Nothing here yet...</h1>
              <h3>Add a crypto and start earning</h3>
            </div>            
          )}
        </div>        
      </div>      
    </div>
  );
}