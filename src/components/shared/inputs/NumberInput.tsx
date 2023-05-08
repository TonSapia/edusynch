import React from 'react';
import { TextField } from '@material-ui/core';
import { LocalAtm as LocalAtmIcon } from '@material-ui/icons';

interface State {
  numberValue: number;
  numberError: string;
}

interface Props {
  required?: boolean;
  label: string;
}

class NumberInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      numberValue: 0,
      numberError: '',
    };
    this.handleNumberChange = this.handleNumberChange.bind(this);
  }

  /** Realiza verificação do input */
  handleNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
    const numberValue = parseInt(event.target.value);

    if (isNaN(numberValue)) {
      this.setState({ numberError: 'Enter a valid number' });
    } else if (numberValue < 0) {
      this.setState({ numberError: 'Enter a positive number' });
      this.setState({ numberValue: 0 });
    } else {
      this.setState({ numberError: '' });
    }

    this.setState({ numberValue });
  }

  render() {
    const { numberValue, numberError } = this.state;

    return (
      <div className="form-group">
        <TextField
          label={this.props.label}
          required={this.props.required}
          value={numberValue}
          onChange={this.handleNumberChange}
          error={!!numberError}
          helperText={numberError}
          type="number"
          className="numberInput"
          InputProps={{
            startAdornment: <LocalAtmIcon />,
          }}
          variant="outlined"
          inputProps={{ min: 0 }}
        />
      </div>      
    );
  }
}

export default NumberInput;