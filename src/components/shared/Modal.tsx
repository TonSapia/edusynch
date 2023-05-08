import React, { useState } from 'react';
import { Modal, Box } from '@mui/material';
import NameInput from './inputs/NameInput';
import EmailInput from './inputs/EmailInput';
import PasswordInput from './inputs/PasswordInput';
import NumberInput from './inputs/NumberInput';
import SelectInput from './inputs/SelectInput';
import SingleCheckboxInput from './inputs/SingleCheckboxInput';
import { Close as CloseIcon } from '@material-ui/icons';
import { Option } from "../shared/inputs/SelectInput";
import Link from 'next/link';

interface IModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  hidden?: string;
  icon?: string;
  primaryButtonText?: string;
  primaryButtonAction?: string;
  secondaryButtonText?: string;
  secondaryButtonAction?: () => void;
  tertiaryButtonText?: string;
  tertiaryButtonAction?: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  quaternaryButtonText?: string;
  quaternaryButtonAction?: () => void;
  type: string;
  options?: Option[];
}

const SharedModal: React.FC<IModalProps> = ({
  open,
  onClose,
  title,
  message,
  hidden,
  icon,
  primaryButtonText,
  primaryButtonAction,
  secondaryButtonText,
  secondaryButtonAction,
  tertiaryButtonText,
  tertiaryButtonAction,  
  quaternaryButtonText,
  quaternaryButtonAction,
  type,
  options
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

        {((type == "login" && !typeModal && primaryButtonAction) || (typeModal == "login" && primaryButtonAction)) && 
          <div className="login-modal">
            <h5>Sign in to <span className="coin">Coin</span><span className="synch">Synch</span></h5> 
            <form>               
              <EmailInput required={true} /> 
              <PasswordInput passwordConfirm={false} required={true} />

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
            <form action="/dashboard">  
              <NameInput required={true} /> 
              <EmailInput required={true} /> 
              <PasswordInput passwordConfirm={true} required={true} />
              <SingleCheckboxInput required={true} label="I have read and accept the Privacy Policy and Terms of User Sign up." />
             
              <div className="form-group">                
                <button className="btn-pry submit" type="submit">Sign in</button>
              </div>    

              <div className="form-group">                
                <p>Already have an account? <a onClick={() => handleChangeModal("login")}><b>Sign in to <span className="coin">Coin</span><span className="synch">Synch</span></b></a></p>
              </div>        
            </form>
          </div>
        }   

        {(type == "crypto" && options) && 
          <div className="crypto-modal">
            <h5>Add Crypto</h5> 
            <form>  
              <SelectInput label="Crypto" options={options} required={true} /> 
              <NumberInput label="Value" required={true} />               
              
              <div className="form-group">                
                <button onClick={tertiaryButtonAction} className="btn-pry submit">Add Crypto</button>
              </div>  
            </form>
          </div>
        }    

        {(type == "transfer" && options && icon) && 
          <div className="transfer-modal">
            <h5>Transfer Crypto</h5> 
            <p><label>You are transfering</label><img src={icon}/><b>{title}</b></p>
            <form>  
              <SelectInput label="Select Transfer" options={options} required={true} /> 
              <NumberInput label="Quantity" required={true} />   
              <input className="id_crypto" type="hidden" value={hidden} />            
             
              <div className="form-group">                
                <button onClick={tertiaryButtonAction} className="btn-pry submit">Add Crypto</button>
              </div>  
            </form>
          </div>
        }     
      </Box>
    </Modal>
  );
};

export default SharedModal;