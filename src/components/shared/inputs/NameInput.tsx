import React from 'react';
import { TextField } from '@material-ui/core';
import { Person as PersonIcon } from '@material-ui/icons';

interface State {
  name: string;
  nameError: string;
}

class NameInput extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      name: '',
      nameError: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.value;

    if (!name) {
      this.setState({ nameError: 'Enter the name' });
    } else {
      this.setState({ nameError: '' });
    }

    this.setState({ name });
  }

  render() {
    const { name, nameError } = this.state;

    return (
      <div className="form-group">
        <TextField
          label="Name"
          value={name}
          onChange={this.handleNameChange}
          error={!!nameError}
          helperText={nameError}
          InputProps={{
            endAdornment: <PersonIcon />,
          }}
          variant="outlined"
        />
      </div>      
    );
  }
}

export default NameInput;