import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import './AreaTypeSelector.scss';
const AreaTypeSelector = () => {
  const [value, setValue] = React.useState('circle');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className='areatypeselector'>
      <FormControl component='div' className='radiogroup'>
        <FormLabel component='legend'>Select Search Area Type</FormLabel>
        <RadioGroup name='areatype' value={value} onChange={handleChange} row>
          <FormControlLabel
            value='circle'
            control={<Radio />}
            label='Circluar'
            Typography
          />
          <FormControlLabel
            value='rectangle'
            control={<Radio />}
            label='Rectangular'
          />
          <FormControlLabel
            value='accurate'
            control={<Radio />}
            label='Accurate'
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default AreaTypeSelector;
