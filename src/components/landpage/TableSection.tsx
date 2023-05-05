import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';

export default function TableSection() {  
  const rows = [
    { 'id': 1, 'crypto': 'BITCOIN', 'price': 'R$ 3000,00', 'change': '+5,67%' },  
    { 'id': 2, 'crypto': 'BITCOIN', 'price': 'R$ 3000,00', 'change': '+5,67%' },
    { 'id': 3, 'crypto': 'BITCOIN', 'price': 'R$ 3000,00', 'change': '+5,67%' },
    { 'id': 4, 'crypto': 'BITCOIN', 'price': 'R$ 3000,00', 'change': '+5,67%' },
    { 'id': 5, 'crypto': 'BITCOIN', 'price': 'R$ 3000,00', 'change': '+5,67%' },
    { 'id': 6, 'crypto': 'BITCOIN', 'price': 'R$ 3000,00', 'change': '+5,67%' },
    { 'id': 7, 'crypto': 'BITCOIN', 'price': 'R$ 3000,00', 'change': '+5,67%' },
    { 'id': 8, 'crypto': 'BITCOIN', 'price': 'R$ 3000,00', 'change': '+5,67%' },
    { 'id': 9, 'crypto': 'BITCOIN', 'price': 'R$ 3000,00', 'change': '+5,67%' },
    { 'id': 10, 'crypto': 'BITCOIN', 'price': 'R$ 3000,00', 'change': '+5,67%' },
  ];
      
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
              {rows.map((row) => (
                <TableRow key={row.id}>           
                  <TableCell align="center">{row.id}</TableCell>      
                  <TableCell align="center"><Chip className="chip-table" icon={<img src="assets/images/ETH.svg"/>} label={row.crypto} />  </TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                  <TableCell align="center">{row.change}</TableCell>
                  <TableCell align="center">
                    <button className='btn btn-ter'>Buy</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <button className='btn btn-link primary'> View more + </button>
        </TableContainer>
    </section>
  );    
}