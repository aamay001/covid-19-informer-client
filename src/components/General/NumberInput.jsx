/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'office-ui-fabric-react';
import { theme } from '../../config';
import './NumberInput.css';

const NumberInput = ({
  value,
  onChange,
  label,
  description,
  placeHolder,
  settingName,
  disabled,
  required,
  error,
  errorMessage,
  min,
  max,
}) => (
  <div className="c19i-settings-number-input">
    <Text
      style={{
        color: disabled
          ? 'gray'
          : theme.palette.black,
      }}
    >
      <input
        id={`c19i-number-input-${settingName}`}
        value={value}
        onChange={({ currentTarget }) =>
          onChange(currentTarget.value, settingName)}
        min={min}
        max={max}
        type="tel"
        inputMode="tel"
        disabled={disabled}
        required={required}
        placeholder={placeHolder}
        style={{
          display: 'block',
          width: '100%',
          appearance: 'none',
          border: 'none',
          borderBottom: error
            ? '1px red solid'
            : '1px rgb(138, 136, 134) solid',
          height: 32,
          textAlign: 'right',
          paddingRight: '26%',
          backgroundColor: 'transparent',
          outline: 'none',
          color: disabled
            ? 'gray'
            : theme.palette.black,
        }}
      />
      <label
        htmlFor={`c19i-number-input-${settingName}`}
        style={{
          position: 'relative',
          bottom: 25,
          fontWeight: 'bold',
          paddingLeft: 5,
        }}
      >
        {label}
      </label>
      <i style={{ color: error ? 'red' : undefined }}>
        {(error && errorMessage) ||
          description}
      </i>
    </Text>
  </div>
);

NumberInput.defaultProps = {
  value: new Date(),
  description: '',
  error: false,
  errorMessage: '',
  min: undefined,
  max: undefined,
  placeHolder: undefined,
};

NumberInput.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  placeHolder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  settingName: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  min: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  max: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default NumberInput;
