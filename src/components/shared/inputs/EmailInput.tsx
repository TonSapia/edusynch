import React from 'react';
import { TextField } from '@material-ui/core';
import { Email as EmailIcon } from '@material-ui/icons';
import validator from 'email-validator';

interface State {
  email: string;
  emailError: string;
}

interface Props {
  required: boolean;
}

class EmailInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      emailError: '',
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    const email = event.target.value;
    const isValidEmail = validator.validate(email);

    /** Realiza verificação do input */
    if (!isValidEmail) {
      this.setState({ emailError: 'Invalid email address' });
    } else {
      this.setState({ emailError: '' });
    }

    this.setState({ email });
  }

  render() {
    const { email, emailError } = this.state;

    return (
      <div className="form-group">
        <TextField
          required={this.props.required}
          label="E-mail"
          value={email}
          onChange={this.handleEmailChange}
          error={!!emailError}
          helperText={emailError}
          InputProps={{
            endAdornment: <EmailIcon />,
          }}
          variant="outlined"
        />
      </div>      
    );
  }
}

export default EmailInput;