import React, { useState, useEffect } from 'react';
import Menu, { MenuProps } from '@mui/material/Menu';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { getUserAPI } from '../../pages/api/usersAPI';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,    
  },
}));

interface User {
  id: number;
  name: string;
  email: string;
  img: string;
}

export default function AvatarMenu() { 
  const [user, setUser] = useState<User>({id: 0, name: '', email: '', img: ''});
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    loadUser();
  }, []);

  /** Carrega as informações do usuário */
  const loadUser = async () => {
    try {      
      const response = await getUserAPI(1);
      setUser(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="login-menu">
      <div className="avatar">
        <Avatar src={user.img} />
        <button className="btn" onClick={handleClick}>
          {user.name} <KeyboardArrowDownIcon />
        </button>
      </div>
           
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem className="menu-item" onClick={handleClose} disableRipple>
          <Link href='/' className="menu-link">
            <LogoutIcon /> 
            Logout   
          </Link>   
        </MenuItem>       
      </StyledMenu>
    </div>
  );
};