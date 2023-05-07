import React, { useState } from 'react';
import { Modal, Box } from '@mui/material';
import NameInput from './inputs/NameInput';
import EmailInput from './inputs/EmailInput';
import PasswordInput from './inputs/PasswordInput';
import SingleCheckboxInput from './inputs/SingleCheckboxInput';
import { Close as CloseIcon } from '@material-ui/icons';
import Link from 'next/link';

interface IModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  primaryButtonText?: string;
  primaryButtonAction: string;
  secondaryButtonText?: string;
  secondaryButtonAction?: () => void;
  type: string;
}

const SharedModal: React.FC<IModalProps> = ({
  open,
  onClose,
  title,
  message,
  primaryButtonText,
  primaryButtonAction,
  secondaryButtonText,
  secondaryButtonAction,
  type,
}) => {
  const [typeModal, setTypeModal] = useState<string>(type);

  const handleChangeModal = (modal: string) => {       
    setTypeModal(modal);
  };
 
  return (
    <Modal   
      className="modal"  
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box className="modal-box" sx={{ width: 400, bgcolor: 'background.paper', borderRadius: 2, p: 2 }}>

        <div className="close">
          <button onClick={secondaryButtonAction}>
            <CloseIcon />
          </button>
        </div>

        {((type == "login" && !typeModal) || typeModal == "login") && 
          <div className="login-modal">
            <h5>Sign in to <span className="coin">Coin</span><span className="synch">Synch</span></h5> 
            <form>               
              <EmailInput /> 
              <PasswordInput passwordConfirm={false} />

              <div className="form-group">
                <a href="#">Forgot password?</a>
              </div>

              <div className="form-group">
                <Link className="btn-pry submit" href={primaryButtonAction}>Sign in</Link>
              </div>    

              <div className="form-group">                
                <p>Don’t have an account? <a onClick={() => handleChangeModal("register")}><b>Sign up to <span className="coin">Coin</span><span className="synch">Synch</span></b></a></p>
              </div>       
            </form>
          </div>
        } 

        {((type == "register" && !typeModal) || typeModal == "register") && 
          <div className="register-modal">
            <h5>Sign up to <span className="coin">Coin</span><span className="synch">Synch</span></h5> 
            <form>  
              <NameInput /> 
              <EmailInput /> 
              <PasswordInput passwordConfirm={true} />
              <SingleCheckboxInput label="I have read and accept the Privacy Policy and Terms of User Sign up." />
             
              <div className="form-group">
                <Link className="btn-pry submit" href={primaryButtonAction}>Sign in</Link>
              </div>    

              <div className="form-group">                
                <p>Already have an account? <a onClick={() => handleChangeModal("login")}><b>Sign in to <span className="coin">Coin</span><span className="synch">Synch</span></b></a></p>
              </div>        
            </form>
          </div>
        }         
      </Box>
    </Modal>
  );
};

export default SharedModal;