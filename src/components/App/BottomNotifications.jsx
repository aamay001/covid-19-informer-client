import React, { useState } from 'react';
import { MessageBarType, MessageBarButton } from 'office-ui-fabric-react';
import NotificationMessage from './NotificationMessage';
import { STRINGS } from '../../config/constants';
import { lsHelper } from '../../helpers';

const cookiesAccepted = lsHelper.getItem(STRINGS.LS.COOKIES_ACCEPTED);

const BottomNotifications = () => {
  const [notificationStates, setNotificationStates] =
    useState({ cookies: !cookiesAccepted });
  return (
    <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
      {notificationStates.cookies &&
        <NotificationMessage
          show={notificationStates.cookies}
          message="This website uses cookies to improve your experience."
          type={MessageBarType.info}
          direction="up"
          actions={
            <div>
              <MessageBarButton
                onClick={() => {
                  lsHelper.setItem(STRINGS.LS.COOKIES_ACCEPTED, true);
                  setNotificationStates({ ...notificationStates, cookies: false });
                }}
              >
                OK
              </MessageBarButton>
            </div>
          }
        />}
    </div>
  );
};

export default BottomNotifications;
