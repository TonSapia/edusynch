import React, { useState } from 'react';
import { Tooltip, TooltipProps, styled } from '@mui/material';
import { List, ListItem } from '@mui/material';

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} arrow/>
))(({ theme }) => ({
  '& .MuiTooltip-arrow': {
    color: '#FBAB34',
  },
  '& .MuiTooltip-tooltip': {
    backgroundColor: '#FBAB34',
    color: '#fff',
    fontSize: theme.typography.pxToRem(12),
  },
}));

export default function SideMenu() {    
  const [tooltip, setTooltop] = useState<string>('open');
  const [expandMenu, setExpandMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    expandMenu ? setExpandMenu(false) : setExpandMenu(true);
    expandMenu ? setTooltop('Open') : setTooltop('Close');
  };
  
  return (
    <div className="side-menu">
      <List>
        <ListItem>      
          <CustomTooltip className="tooltip" disableHoverListener={expandMenu} title="Lorem Ipsum" placement="right">    
            <a href="#">
              <img src="assets/images/A.svg" alt="" /> 
              {expandMenu && <p className="menu-item-text">Lorem Ipsum</p>}
            </a>  
          </CustomTooltip>
        </ListItem>
        <ListItem>   
          <CustomTooltip className="tooltip" disableHoverListener={expandMenu} title="Lorem Ipsum" placement="right" arrow>     
            <a href="#">     
              <img src="assets/images/D.svg" alt="" />              
              {expandMenu && <p className="menu-item-text">Lorem Ipsum</p>}   
            </a>  
          </CustomTooltip>  
        </ListItem>
        <ListItem>   
          <CustomTooltip className="tooltip" disableHoverListener={expandMenu} title="Lorem Ipsum" placement="right" arrow>    
             <a href="#">      
              <img src="assets/images/E.svg" alt="" /> 
              {expandMenu && <p className="menu-item-text">Lorem Ipsum</p>}  
            </a>  
          </CustomTooltip>               
        </ListItem>
        <ListItem>  
          <CustomTooltip className="tooltip" disableHoverListener={expandMenu} title="Lorem Ipsum" placement="right" arrow>     
            <a href="#">       
                <img src="assets/images/F.svg" alt="" /> 
                {expandMenu && <p className="menu-item-text">Lorem Ipsum</p>}        
            </a>    
          </CustomTooltip>       
        </ListItem>
        <ListItem className="toggle-menu">  
          <CustomTooltip className="tooltip" title={tooltip} placement="right" arrow>     
            <a onClick={toggleMenu}>      
              {expandMenu ? <img src="assets/images/close-menu.svg" alt="" /> : <img src="assets/images/open-menu.svg" alt="" />}
            </a> 
          </CustomTooltip>       
        </ListItem>
      </List>
    </div>
  );
}