import React from 'react';
import { TextField } from '@material-ui/core';
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@material-ui/icons';

interface State {
  password: string;
  showPassword: boolean;
  confirmPassword?: string;
  passwordError: string;
  confirmPasswordError: string;
}

interface Props {
  passwordConfirm: boolean;
}

class PasswordInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      password: '',
      showPassword: false,
      confirmPassword: '',
      passwordError: '',
      confirmPasswordError: '',
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
  }

  handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    const password = event.target.value;
    const isValidPassword = password.length >= 8;

    if (!isValidPassword) {
      this.setState({ passwordError: 'Invalid password (minimum 8 characters)' });
    } else {
      this.setState({ passwordError: '' });
    }

    this.setState({ password });
  }

  handleClickShowPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  }

  handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }

  handleConfirmPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    const confirmPassword = event.target.value;

    if (confirmPassword !== this.state.password) {
      this.setState({ confirmPasswordError: 'As senhas não correspondem' });
    } else {
      this.setState({ confirmPasswordError: '' });
    }

    this.setState({ confirmPassword });
  }

  toggleShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  render() {
    const { password, showPassword, passwordError, confirmPassword, confirmPasswordError } = this.state;

    return (
      <>
        <div className="form-group">
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={this.handlePasswordChange}
            error={!!passwordError}
            helperText={passwordError}
            InputProps={{            
              endAdornment: (
                <button
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                  style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </button>
              ),
            }}
            variant="outlined"
          />
        </div>

        {this.props.passwordConfirm && (
          <div className="form-group">
            <TextField
              label="Confirm password"
              value={confirmPassword}
              onChange={this.handleConfirmPasswordChange}
              type={showPassword ? 'text' : 'password'}
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}              
              variant="outlined"
            />
          </div>      
        )}  
      </>        
    );
  }
}

export default PasswordInput;