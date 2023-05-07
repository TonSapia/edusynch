import React from 'react';
import Modal from './Modal';

const LoginButtons: React.FC = () => {
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
    <div className='login-menu'>
      <button className="btn btn-link" onClick={() => handleModalOpen("login", "/dashboard")} >Sign in</button>
      <button className="btn btn-pry" onClick={() => handleModalOpen("register", "/dashboard")} >Sign up</button>     
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
    </div>
  );
}

export default LoginButtons;