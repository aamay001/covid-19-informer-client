import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MessageBarType } from 'office-ui-fabric-react';
import NotificationMessage from './NotificationMessage';
import { ROUTES } from '../../config/constants';

const TopNotifications = ({
  currentRoute,
}) => {
  const [notificationStates, setNotificationStates] =
    useState({ green: false, blue: false, red: true });
  return (
    <div style={{ position: 'fixed', top: 55, width: '100%' }}>
      {notificationStates.green &&
        <NotificationMessage
          show={currentRoute === ROUTES.HOME.NAME}
          type={MessageBarType.success}
          message="Show global notification from here! (src/components/App/TopNotifications)"
          onClick={() => alert('You touched the green notification!')}
          onDismiss={() => setNotificationStates({ ...notificationStates, green: false })}
        />}
      {notificationStates.blue &&
        <NotificationMessage
          show={currentRoute === ROUTES.HOME.NAME}
          message="Open the Menu and click on the APP name at the bottom to access the Status Page!"
          onClick={() => alert('You touched the blue notification!')}
          onDismiss={() => setNotificationStates({ ...notificationStates, blue: false })}
        />}
    </div>
  );
};

TopNotifications.defaultProps = {
  currentRoute: '',
};

TopNotifications.propTypes = {
  currentRoute: PropTypes.string,
};

const mapStateToProps = state => ({
  currentRoute: state.app.currentRoute,
});

export default connect(mapStateToProps)(TopNotifications);
