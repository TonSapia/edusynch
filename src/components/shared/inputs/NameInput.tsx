import React from 'react';
import { TextField } from '@material-ui/core';
import { Person as PersonIcon } from '@material-ui/icons';

interface State {
  name: string;
  nameError: string;
}

interface Props {
  required: boolean;
}

class NameInput extends React.Component<Props, State> {
  constructor(props: Props) {
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
          required={this.props.required}
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