import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  Spinner,
  SpinnerSize,
} from 'office-ui-fabric-react';
import FullLogo from './FullLogo';
import { theme } from '../../config';

const LoadingModal = ({ show, text, error }) => (
  <Dialog
    hidden={!show}
    modalProps={{
      isBlocking: true,
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <FullLogo
        showCompanyName={false}
        style={{
          marginTop: 0,
          marginBottom: 10,
          width: 150,
        }}
      />
      {!error &&
        <Spinner
          label={text}
          ariaLive="assertive"
          size={SpinnerSize.large}
          labelPosition="bottom"
          styles={{ label: { fontSize: theme.fonts.medium.fontSize } }}
        />}
      {error &&
        <p style={{ color: 'red', textAlign: 'center' }}>
          User permissions could not be retrieved.
          <br />
          <br />
          Refresh application to try again. If problem persists, contact IS department.
        </p>}
    </div>
  </Dialog>
);

LoadingModal.defaultProps = {
  show: false,
  text: 'Loading...',
  error: false,
};

LoadingModal.propTypes = {
  show: PropTypes.bool,
  text: PropTypes.string,
  error: PropTypes.bool,
};

export default LoadingModal;
