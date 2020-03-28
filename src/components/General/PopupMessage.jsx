import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  TeachingBubble,
  DirectionalHint,
  Spinner,
  SpinnerSize,
} from 'office-ui-fabric-react';
import { theme } from '../../config';

const PopupMessage = ({ header, message, loading }) => {
  const [showMessage, setShowState] = useState(false);
  const [ref, setRef] = useState(createRef());
  return (
    <div
      ref={(div) => { setRef(div); }}
      style={{
        marginLeft: 'auto',
        height: 35,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {!loading &&
        <Icon
          iconName="Info"
          styles={{
            root: {
              fontSize: 25,
              marginLeft: 10,
              marginTop: 5,
            },
          }}
          onClick={() => setShowState(true)}
        />}
      {loading &&
        <Spinner size={SpinnerSize.large} />}
      {showMessage && !loading &&
        <TeachingBubble
          target={ref}
          headline={header}
          hasCloseIcon
          calloutProps={{
            directionalHintFixed: false,
            directionalHint: DirectionalHint.topLeftEdge,
            isBeakVisible: false,
            calloutMaxWidth: '90vw',
            style: {
              border: `1px solid ${theme.palette.black}`,
            },
          }}
          styles={{
            subText: { color: 'white' },
            headline: { color: 'white' },
            root: {
              whiteSpace: 'pre-wrap',
            },
          }}
          onDismiss={() => setShowState(false)}
        >
          {message}
        </TeachingBubble>}
    </div>
  );
};

PopupMessage.defaultProps = {
  loading: false,
};

PopupMessage.propTypes = {
  message: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

export default PopupMessage;
