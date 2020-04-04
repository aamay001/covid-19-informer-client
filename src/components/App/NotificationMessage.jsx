import React from 'react';
import PropTypes from 'prop-types';
import {
  MessageBar,
  MessageBarType,
} from 'office-ui-fabric-react';
import Fade from 'react-reveal/Fade';
import { theme } from '../../config';

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
              ? { icon: { color: theme.palette.black } }
              : {}),
            ...(type === MessageBarType.info
              ? {
                root: {
                  background: 'rgba(113, 175, 229, 0.2)',
                },
              }
              : {}),
          }}
        >
          {message}
        </MessageBar>
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
