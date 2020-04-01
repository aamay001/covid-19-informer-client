import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MessageBarType } from 'office-ui-fabric-react';
import NotificationMessage from './NotificationMessage';
import { ROUTES, STRINGS } from '../../config/constants';
import { lsHelper, generalHelper } from '../../helpers';

const prevLocation = lsHelper.getItem(STRINGS.LS.DERIVED_LOCATION);
const { getLocationString } = generalHelper;

const TopNotifications = ({
  currentRoute,
}) => {
  const [notificationStates, setNotificationStates] =
    useState({ existingLocation: !!prevLocation });
  return (
    <div style={{ position: 'fixed', top: 55, width: '100%' }}>
      {notificationStates.existingLocation &&
        <NotificationMessage
          show={currentRoute === ROUTES.HOME.NAME}
          message={`Using previously saved location: ${getLocationString(prevLocation)}`}
          type={MessageBarType.info}
          onDismiss={() =>
            setNotificationStates({ ...notificationStates, existingLocation: false })}
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
