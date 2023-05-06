import React from 'react';
import Modal from './Modal';

export default function LoginButtons() {    
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className='login-buttons'>
      <button className="btn btn-link" onClick={handleModalOpen} >Sign in</button>
      <button className="btn btn-pry" onClick={handleModalOpen} >Sign up</button>     
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        title="Modal Title"
        message="Modal Message"
        primaryButtonText="OK"
        primaryButtonAction={handleModalClose}
        secondaryButtonText="Cancel"
        secondaryButtonAction={handleModalClose}
        type="login"
      />   
    </div>
  );
}