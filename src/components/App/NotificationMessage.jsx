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
}) => (
  <>
    {show &&
      <Fade down>
        <MessageBar
          messageBarType={type}
          onClick={onClick}
          onDismiss={onDismiss}
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
};

NotificationMessage.propTypes = {
  type: PropTypes.number,
  message: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  onDismiss: PropTypes.func,
};

export default NotificationMessage;
