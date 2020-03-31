import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  Spinner,
  SpinnerSize,
} from 'office-ui-fabric-react';
import { theme } from '../../config';

const LoadingModal = ({ show, text }) => (
  <Dialog
    hidden={!show}
    styles={{
      main: {
        top: '-10%',
      },
    }}
    modalProps={{
      isBlocking: true,
    }}
  >
    <Spinner
      label={text}
      ariaLive="assertive"
      size={SpinnerSize.large}
      labelPosition="bottom"
      style={{
        height: 115,
      }}
      styles={{
        label: {
          fontSize: theme.fonts.medium.fontSize,
        },
      }}
    />
  </Dialog>
);

LoadingModal.defaultProps = {
  show: false,
  text: 'Loading...',
};

LoadingModal.propTypes = {
  show: PropTypes.bool,
  text: PropTypes.string,
};

export default LoadingModal;
