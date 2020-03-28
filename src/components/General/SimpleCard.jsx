import React from 'react';
import PropTypes from 'prop-types';
import { DefaultButton } from 'office-ui-fabric-react';
import SectionHeader from './SectionHeader';
import { boxShadow } from '../../helpers/ui.helper';
import { theme } from '../../config';

const SimpleCard = ({
  withActionButton,
  onActionClicked,
  buttonText,
  buttonIcon,
  content,
  headerText,
  headerSubText,
  headerIcon,
  style,
}) => (
  <section
    title={headerText}
    style={{
      boxShadow: boxShadow.slightRais,
      border: `1px solid ${theme.palette.themeSecondary}`,
      padding: '10px 15px 15px 15px',
      height: '100%',
      style,
      width: '100%',
    }}
  >
    <SectionHeader
      text={headerText}
      iconName={headerIcon}
      subText={headerSubText}
      useEllipses
    />
    <div
      style={{
        width: '100%',
        padding: 5,
        height: '65%',
        overflowY: 'hidden',
        borderBottom: withActionButton
          ? '1px solid lightgray'
          : undefined,
      }}
    >
      {content}
    </div>
    {withActionButton &&
      <div
        style={{
          width: '100%',
          height: '25%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 0,
        }}
      >
        <DefaultButton
          text={buttonText}
          iconProps={{ iconName: buttonIcon }}
          style={{ height: 30 }}
          styles={{ root: { width: '60%' } }}
          onClick={onActionClicked}
        />
      </div>}
  </section>
);

SimpleCard.defaultProps = {
  withActionButton: false,
  onActionClicked: undefined,
  buttonText: '',
  buttonIcon: undefined,
  content: undefined,
  headerText: '',
  headerIcon: undefined,
  headerSubText: '',
  style: {},
};

SimpleCard.propTypes = {
  withActionButton: PropTypes.bool,
  onActionClicked: PropTypes.func,
  buttonText: PropTypes.string,
  buttonIcon: PropTypes.string,
  content: PropTypes.node,
  headerText: PropTypes.string,
  headerIcon: PropTypes.string,
  headerSubText: PropTypes.string,
  style: PropTypes.shape({}),
};

export default SimpleCard;
