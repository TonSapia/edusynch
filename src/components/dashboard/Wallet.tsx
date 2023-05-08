import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import { getWalletAPI, addToWallet, removeFromWallet } from '../../pages/api/coinbaseAPI';
import Modal from '../shared/Modal';
import { Option } from "../shared/inputs/SelectInput";

interface Wallet {
  user_id: number;
  asset_id: string;  
  name: string;
  quantity: number;  
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

const options: Option[] = [    
  { value: "ETH", label: "Ethereum ETH", icon: "assets/images/ETH.png"},
  { value: "BTC", label: "Bitcoin BTC", icon: "assets/images/BTC.png"},
  { value: "ADA", label: "Cardano ADA", icon: "assets/images/ADA.png"},
  { value: "SOL", label: "Solana SOL", icon: "assets/images/SOL.png"},
  { value: "USDC", label: "USD Coin USDC", icon: "assets/images/USDC.png"},
];

const optionsTransfer: Option[] = [    
  { value: "1", label: "Transfer in", icon: ""},
  { value: "2", label: "Transfer out", icon: ""},  
];

export default function Wallet() {
  const [wallet, setWallet] = useState<Wallet>();
  const [idCrypto,   setIdCrypto] = React.useState(''); 
  const [nameCrypto, setNameCrypto] = React.useState(''); 
  const [iconCrypto, setIconCrypto] = React.useState(''); 
  const [dataWallet, setWalletData] = useState<myWallet[]>([]);
  const [modalCryptoOpen,   setModalCryptoOpen] = React.useState(false);  
  const [modalTransferOpen, setModalTransferOpen] = React.useState(false);  

  

  const user_id: number = 1;  

  useEffect(() => {
    loadResults();
  }, []);
  
  const loadResults = async () => {
    try {      
      const response = await getWalletAPI(user_id);
      setWalletData(response)     
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const select = document.querySelector<HTMLInputElement>('.MuiSelect-nativeInput');
    const selectedOption = select?.value;

    const inputNumber = document.querySelector<HTMLInputElement>('.MuiInputBase-inputAdornedStart');
    const valorNumber = inputNumber?.valueAsNumber;

    if(selectedOption && valorNumber) {
      const newDataTable = {
        id: dataWallet.length + 1,
        user_id: 1,
        name: options.filter(e => e.value.includes(selectedOption))[0].label,
        asset_id: selectedOption,  
        quantity: valorNumber,
        price_usd: 3000.00,
        volume_1hrs_usd: 3000.00,
        volume_1day_usd: 3000.00,
        url_icon: options.filter(e => e.value.includes(selectedOption))[0].icon,
      };  

      const newData = {        
        user_id: 1,
        name: options.filter(e => e.value.includes(selectedOption))[0].label,
        asset_id: selectedOption,  
        quantity: valorNumber,       
        url_icon: options.filter(e => e.value.includes(selectedOption))[0].icon,
      };
            
      setWallet(newData);

      try { 
        if(wallet != undefined) {
          const response = await addToWallet(wallet);
          setWalletData([...dataWallet, newDataTable]);
          loadResults();
          handleModalClose();
        }        
      } catch (error) {
        console.error(error);
      } 
    }       
  };

  const transferCrypto = async (id: string, name: string, img: string) => {     
    setNameCrypto(name);      
    setIconCrypto(img); 
    setIdCrypto(id);
    handleModalTransferOpen();
  }

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const select = document.querySelector<HTMLInputElement>('.MuiSelect-nativeInput');
    const selectedOption = select?.value;

    const inputNumber = document.querySelector<HTMLInputElement>('.MuiInputBase-inputAdornedStart');
    const valorNumber = inputNumber?.valueAsNumber;

    const inputHidden = document.querySelector<HTMLInputElement>('.id_crypto');
    const valorHidden = inputHidden?.value;

    if(selectedOption && valorNumber && valorHidden) {
      try { 
        const response = await removeFromWallet(1, valorHidden, valorNumber);
        loadResults();
        handleModalClose();                
      } catch (error) {
        console.error(error);
      }     
    }
  };

  const handleModalCryptoOpen = () => {    
    setModalCryptoOpen(true);
  };

  const handleModalTransferOpen = () => {    
    setModalTransferOpen(true);
  };

  const handleModalClose = () => {
    setModalTransferOpen(false);
    setModalCryptoOpen(false);
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
            <button className="btn btn-pry" onClick={() => handleModalCryptoOpen()}>+ Add crypto</button>
          </div>
          <div className="table-wallet-container">
            {dataWallet.length > 0 ? (
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
                    {dataWallet.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell align='center'>{row.id}</TableCell>
                        <TableCell align='center'><Chip className="chip-table" icon={<img src={row.url_icon}/>} label={row.name} /></TableCell>
                        <TableCell align='center'>
                          <div className="holdings">
                            <p>US{(row.price_usd * row.quantity).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>
                            <p className="quantity">{row.quantity} {row.asset_id}</p>
                          </div>                        
                        </TableCell>
                        <TableCell align='center'>
                          <label className={`${(((row.volume_1hrs_usd - row.volume_1day_usd) / (row.volume_1day_usd)) >= 0) ? "positive" : "negative"}`}>
                            {((row.volume_1hrs_usd - row.volume_1day_usd) / (row.volume_1day_usd)) >= 0 ? 
                              `+${(((row.volume_1hrs_usd - row.volume_1day_usd) / row.volume_1day_usd)).toFixed(2)}` : 
                                  (((row.volume_1hrs_usd - row.volume_1day_usd) / row.volume_1day_usd)).toFixed(2)}%
                          </label>
                        </TableCell>
                        <TableCell align='center'>
                          <button className="btn" onClick={() => transferCrypto(row.asset_id, row.name, row.url_icon)}>
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

          <div className="cards-list">
            {dataWallet.length > 0 ? (
              <div className="cards-wallet">
                {dataWallet.map((row) => (
                  <Card className="card-wallet"> 
                    <CardContent className="text">
                      <Chip className="chip-table" icon={<img src={row.url_icon}/>} label={row.name} />
                      <div className="holdings">
                        <p>Holdings</p>
                        <p>US{(row.price_usd * row.quantity).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>
                        <p className="quantity">{row.quantity} {row.asset_id}</p>
                      </div> 
                      <div className="change">
                        <p>change</p>
                        <label className={`${(((row.volume_1hrs_usd - row.volume_1day_usd) / (row.volume_1day_usd)) >= 0) ? "positive" : "negative"}`}>
                          {((row.volume_1hrs_usd - row.volume_1day_usd) / (row.volume_1day_usd)) >= 0 ? 
                            `+${(((row.volume_1hrs_usd - row.volume_1day_usd) / row.volume_1day_usd)).toFixed(2)}` : 
                                (((row.volume_1hrs_usd - row.volume_1day_usd) / row.volume_1day_usd)).toFixed(2)}%
                        </label>
                      </div> 
                    </CardContent> 
                    <CardActions>
                      <button className="btn btn-pry" onClick={() => transferCrypto(row.asset_id, row.name, row.url_icon)}>
                        Trade 
                      </button>
                    </CardActions>             
                  </Card>
                ))}
              </div>
            ) : (
              <div className="table-empty">
                <img src="assets/images/N.svg" />
                <h1>Nothing here yet...</h1>
                <h3>Add a crypto and start earning</h3>
              </div>            
            )}
          </div>
        </div>   
        <Modal
          open={modalCryptoOpen}
          onClose={handleModalClose}
          title="Modal Title"
          message="Modal Message"
          tertiaryButtonText="Add Crypto"
          tertiaryButtonAction={handleAdd}
          secondaryButtonText="Cancel"
          secondaryButtonAction={handleModalClose}
          type="crypto"
          options={options}
        />     

        <Modal
          open={modalTransferOpen}
          onClose={handleModalClose}
          title={nameCrypto}
          hidden={idCrypto}
          icon={iconCrypto}
          tertiaryButtonText="Add Crypto"
          tertiaryButtonAction={handleDelete}
          secondaryButtonText="Cancel"
          secondaryButtonAction={handleModalClose}
          type="transfer"
          options={optionsTransfer}
        />       
      </div> 
    </div>
  );
}