import React from 'react';
import { List, ListItem } from '@mui/material';

export default function SideMenu() {      
  const menuItens = [
    { "link": "assets/images/B.svg" },
    { "link": "assets/images/U.svg" },
    { "link": "assets/images/V.svg" },
    { "link": "assets/images/C.svg" }
  ];

  return (
    <div className="side-menu">
      <List>
        <ListItem>          
          <a>
            <img src="assets/images/A.svg" alt="" /> 
          </a>          
        </ListItem>
        <ListItem>    
          <a>     
            <img src="assets/images/D.svg" alt="" /> 
          </a>          
        </ListItem>
        <ListItem>   
         <a>      
            <img src="assets/images/E.svg" alt="" /> 
         </a>          
        </ListItem>
        <ListItem>   
         <a>      
            <img src="assets/images/F.svg" alt="" /> 
         </a>          
        </ListItem>
      </List>
    </div>
  );
}