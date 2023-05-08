import React, { useEffect } from 'react';
import NavItem from './NavItem';
import Modal from './Modal';

interface Props {
  navActive: boolean;
  hidden: string;
}

const Navbar = ({ navActive, hidden }: Props) => {
  useEffect(() => {
    if (navActive) document.body.style.overflow = 'hidden';
    if (!navActive) document.body.style.overflow = 'auto';
  }, [navActive]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [type, setType] = React.useState('');
  const [pathName, setPathName] = React.useState('');

  const handleModalOpen = (modal: string, pathName: string) => {
    setType(modal);
    setPathName(pathName);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <nav className='nav'>
      <div className={`${navActive ? 'active' : ''} nav-menu-list`}>
        <div className='nav-menu'>
          <ul className='nav-list'>            
            <li className={hidden}>
              <NavItem href="#" text="About us" />
            </li>   
            <li className={hidden}>
              <NavItem href="#table-section" text="Top Cryptos" />
            </li> 
            <li className={`login-hidden ${hidden}`}>
              <button className="btn btn-link" onClick={() => handleModalOpen("login", "/dashboard")} >Sign in</button>     
            </li> 
            <li className={`login-hidden ${hidden}`}>
              <button className="btn btn-pry" onClick={() => handleModalOpen("register", "/dashboard")} >Sign up</button> 
            </li>   
            <li className={`logout-hidden ${hidden}`}>
              <NavItem href="/" text="Logout" /> 
            </li>       
          </ul>
        </div>
      </div>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        title="Modal Title"
        message="Modal Message"
        primaryButtonText="OK"
        primaryButtonAction={pathName}
        secondaryButtonText="Cancel"
        secondaryButtonAction={handleModalClose}
        type={type}
      />   
    </nav>
  );
};

export default Navbar;
