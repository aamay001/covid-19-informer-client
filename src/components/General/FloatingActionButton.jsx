import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'office-ui-fabric-react';
import { theme } from '../../config';
import { boxShadow } from '../../helpers/ui.helper';

const FloatingActionButton = ({
  iconName,
  onClick,
  background,
  disabled,
  title,
  hide,
}) => (!hide &&
  <IconButton
    disabled={disabled}
    onClick={onClick}
    iconProps={{ iconName }}
    title={title}
    styles={{
      icon: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      root: {
        background,
        width: 75,
        height: 75,
        borderRadius: 360,
        border: '1px solid lightgray',
        position: 'fixed',
        bottom: 50,
        right: 25,
        boxShadow: boxShadow.slightRais,
        color: theme.palette.black,
      },
    }}
  />
);

FloatingActionButton.defaultProps = {
  disabled: false,
  background: theme.palette.white,
  title: '',
  hide: false,
};

FloatingActionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  iconName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  background: PropTypes.string,
  title: PropTypes.string,
  hide: PropTypes.bool,
};

export default FloatingActionButton;
