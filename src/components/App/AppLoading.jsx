import React from 'react';
import PropTypes from 'prop-types';
import { LoadingModalWithLogo } from '../General';
import { getDisplayError } from '../../helpers/general.helper';

const AppLoading = ({
  userPermissionError,
  gettingUserPermissions,
  errorGettingUserPermissions,
}) => (
  <LoadingModalWithLogo
    text={!errorGettingUserPermissions
      ? 'Getting user permissions... '
      : getDisplayError(userPermissionError)}
    error={errorGettingUserPermissions}
    show={errorGettingUserPermissions || gettingUserPermissions}
  />
);

AppLoading.defaultProps = {
  userPermissionError: '',
};

AppLoading.propTypes = {
  userPermissionError: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({}),
  ]),
  errorGettingUserPermissions: PropTypes.bool.isRequired,
  gettingUserPermissions: PropTypes.bool.isRequired,
};

export default AppLoading;
