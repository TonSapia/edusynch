import React, { useEffect } from 'react';
import NavItem from './NavItem';

const MENU_LIST = [
  { text: 'About us', href: 'about' },
  { text: 'Top Cryptos', href: 'locations' }  
];

const Navbar = ({ navActive }: { navActive: boolean }) => {
  useEffect(() => {
    if (navActive) document.body.style.overflow = 'hidden';
    if (!navActive) document.body.style.overflow = 'auto';
  }, [navActive]);

  return (
    <nav className='nav'>
      <div className={`${navActive ? 'active' : ''} nav-menu-list`}>
        <div className='nav-menu'>
          <ul className='nav-list'>
            {MENU_LIST.map((menu) => (
              <li key={menu.text}>
                <NavItem {...menu} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
