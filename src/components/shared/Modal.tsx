import * as React from 'react';
import { Modal, Box } from '@mui/material';

interface IModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  primaryButtonText?: string;
  primaryButtonAction?: () => void;
  secondaryButtonText?: string;
  secondaryButtonAction?: () => void;
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
}) => {
  return (
    <Modal   
      className="modal"  
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box className="modal-box" sx={{ width: 400, bgcolor: 'background.paper', borderRadius: 2, p: 2 }}>
        <h5>Sign in to CoinSynch</h5> 
        <form>  
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" name="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Por favor, insira um endereço de e-mail válido." />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input type="password" id="password" name="password" required minlength="8" title="A senha deve ter pelo menos 8 caracteres." />
          </div>

          <div className="form-group">
            <a href="#">Forgot password?</a>
          </div>

          <div className="form-group">
            <button onClick={primaryButtonAction} type="submit">Entrar</button>
          </div>    

          <div className="form-group">
            <p>Don’t have an account? <b>Sign up to CoinSynch</b></p>
          </div>       
        </form> 
      </Box>
    </Modal>
  );
};

export default SharedModal;