import React from 'react';
import { MenuItem, TextField } from '@material-ui/core';

export interface Option {
  value: string;
  label: string;
  icon:  string;
}

interface State {
  selectValue: string;
  selectError: string;
}

interface Props {
  options: Option[];
  required?: boolean;
  label: string;
}

class SelectInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectValue: '',
      selectError: '',
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectValue = event.target.value;

    if (!selectValue) {
      this.setState({ selectError: 'Select an option' });
    } else {
      this.setState({ selectError: '' });
    }

    this.setState({ selectValue });
  }

  render() {
    const { options } = this.props;
    const { selectValue, selectError } = this.state;

    return (
      <div className="form-group">
        <TextField
          select
          label={this.props.label}
          required={this.props.required}
          value={selectValue}
          onChange={this.handleSelectChange}
          error={!!selectError}
          helperText={selectError}          
          variant="outlined"
          className="selectInput"
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <p className="selectOption"> {option.icon && <img src={option.icon} alt="" />} <label>{option.label}</label></p>
            </MenuItem>
          ))}
        </TextField>
      </div>      
    );
  }
}

export default SelectInput;