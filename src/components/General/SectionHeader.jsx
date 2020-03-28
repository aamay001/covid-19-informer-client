import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'office-ui-fabric-react';
import { theme } from '../../config';
import { textEllipsis } from '../../helpers/ui.helper';

const SectionHeader = ({
  text,
  subText,
  subTextColor,
  iconName,
  children,
  noBorder,
  useEllipses,
}) => (
  <div
    style={{
      width: '100%',
      borderBottom: noBorder
        ? undefined
        : '1px solid lightgray',
      paddingBottom: 5,
    }}
  >
    <h1
      style={{
        fontSize: 20,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 0,
      }}
    >
      {iconName &&
        <Icon
          iconName={iconName}
          style={{ marginTop: 5, marginRight: 5 }}
        />}
      <span
        style={{
          ...(
            useEllipses
              ? {
                ...textEllipsis,
                width: '90%',
              }
              : {}
          ),
        }}
      >
        {text}
      </span>
      {children}
    </h1>
    <p
      style={{
        color: subTextColor || theme.palette.themeSecondary,
        margin: 0,
        fontSize: theme.fonts.small.fontSize,
      }}
    >
      {subText}
    </p>
  </div>
);

SectionHeader.defaultProps = {
  children: undefined,
  subText: '',
  subTextColor: undefined,
  noBorder: false,
  useEllipses: false,
  iconName: undefined,
};

SectionHeader.propTypes = {
  text: PropTypes.string.isRequired,
  subText: PropTypes.string,
  subTextColor: PropTypes.string,
  iconName: PropTypes.string,
  children: PropTypes.node,
  noBorder: PropTypes.bool,
  useEllipses: PropTypes.bool,
};

export default SectionHeader;
