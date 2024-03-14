import React from 'react';
import PropTypes from 'prop-types';
import {
  MessageBar,
  MessageBarType,
} from 'office-ui-fabric-react';
import Fade from 'react-reveal/Fade';

const NotificationMessage = ({
  type,
  message,
  show,
  onClick,
  onDismiss,
  direction,
  actions,
}) => (
  <>
    {show &&
      <Fade down={direction === 'down'} up={direction === 'up'}>
        <MessageBar
          messageBarType={type}
          onClick={onClick}
          onDismiss={onDismiss}
          actions={actions}
          styles={{
            ...(type === MessageBarType.warning
              ? { icon: { color: 'black' } }
              : {}),
            ...(type === MessageBarType.info
              ? {
                root: {
                  background: 'rgb(198, 219, 239)',
                  color: 'black',
                },
                icon: {
                  color: 'black',
                },
                iconContainer: {
                  color: 'black',
                },
                actions: {
                  color: 'black',
                },
                dismissal: {
                  color: 'black !important',
                },
                dismissSingleLine: {
                  color: 'black',
                },
              }
              : {}),
          }}
        >
          {message}
        </MessageBar>
        <style>
          {`
          #root > div > div > div:nth-child(4) > div > div > div > div > button > span > i {
            color: black !important;
          }
          `}
        </style>
      </Fade>}
  </>
);

NotificationMessage.defaultProps = {
  onClick: undefined,
  onDismiss: undefined,
  type: undefined,
  direction: 'down',
  actions: undefined,
};

NotificationMessage.propTypes = {
  type: PropTypes.number,
  message: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  onDismiss: PropTypes.func,
  direction: PropTypes.oneOf([
    'up',
    'down',
  ]),
  actions: PropTypes.node,
};

export default NotificationMessage;
