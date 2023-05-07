import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

interface State {
  accepted: boolean;
}

interface Props {
  label: string;
  required: boolean;
}

class SingleCheckboxInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      accepted: false,
    };
    this.handleTermsChange = this.handleTermsChange.bind(this);
  }

  handleTermsChange(event: React.ChangeEvent<HTMLInputElement>) {
    const accepted = event.target.checked;
    this.setState({ accepted });
  }

  render() {
    const { accepted } = this.state;

    return (
      <div className="form-group">
        <FormControlLabel
          control={<Checkbox required={this.props.required} checked={accepted} onChange={this.handleTermsChange} />}
          label={this.props.label}
        />
      </div>      
    );
  }
}

export default SingleCheckboxInput;