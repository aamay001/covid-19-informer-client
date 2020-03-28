import React from 'react';
import PropTypes from 'prop-types';
import {
  Separator,
  Checkbox,
} from 'office-ui-fabric-react';
import { theme } from '../../config';
import { textEllipsis } from '../../helpers/ui.helper';

const separatorStyle = {
  root: [{
    selectors: {
      '::after': {
        background: theme.palette.themeDarkAlt,
      },
      '::before': {
        background: theme.palette.themeDarkAlt,
      },
    },
  }],
};

/**
 * @param {Array <Object>} filterOptions Options available for filtering. This array
 * of objects should be formatted like the following:
 *  [{
 *    text: string,
 *    key: string || number,
 *    selected: bool,
 *    options: [{ text, key, selected }]
 * }]
 * @param {Array <Number>} indexChain Array containing indexes that were changed.
 * @param {Boolean} status Value to set the selected property to: true || false.
 * @param {Function} callBack Call back function.
 */
const onFilterOptionsChanged = (filterOptions, indexChain, status, callBack) => {
  const options = filterOptions;
  if (indexChain.length > 1) {
    options[indexChain[0]].options[indexChain[1]].selected = status;
  } else {
    options[indexChain[0]].selected = status;
    if (status === false && options[indexChain[0]].options &&
      options[indexChain[0]].options.length > 0) {
      options[indexChain[0]].options = options[indexChain[0]].options
        .map(o => ({ ...o, selected: status }));
    }
  }
  callBack(options, indexChain);
};

/**
 * @name FilterPanel React component that can be used to filter
 * lists with two levels of depth.
 * @param {*} props React props passed to the component.
 * @description A side panel with selectable options
 * that reports selected options.
 */
const FilterPanel = ({
  title,
  options,
  onChange,
  width,
  onLeft,
}) => (
  <div
    style={{
      width,
      display: 'flex',
      flexDirection: 'row',
      minWidth: 200,
      marginBottom: 10,
      marginRight: onLeft
        ? 10
        : 0,
      marginLeft: !onLeft
        ? 10
        : 0,
    }}
  >
    {!onLeft &&
      <Separator
        vertical
        alignContent="center"
        styles={separatorStyle}
      />}
    <div style={{ width: '100%' }}>
      <h1
        style={{
          fontSize: theme.fonts.large.fontSize,
          marginBottom: 0,
          marginTop: 0,
          width: '100%',
          paddingLeft: 10,
          paddingRight: 10,
          textAlign: 'left',
        }}
      >
        {title}
      </h1>
      <Separator styles={separatorStyle} />
      {options.map((op, opIndex) => (
        <div
          key={op.key}
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: 10,
          }}
        >
          <Checkbox
            checked={op.selected}
            styles={{
              root: {
                fontSize: theme.fonts.medium.fontSize,
                marginBottom: op.selected &&
                  op.options && op.options.length > 0
                  ? 0
                  : 5,
                marginRight: onLeft
                  ? 10
                  : 0,
                justifyContent: 'flex-start',
                ...textEllipsis,
                maxWidth: '90%',
              },
            }}
            label={op.text}
            title={op.text}
            onChange={() =>
              onFilterOptionsChanged(
                options,
                [opIndex],
                !op.selected,
                onChange,
              )}
          />
          {op.selected && op.options &&
            <div
              style={{
                marginLeft: 7,
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Separator vertical styles={separatorStyle} />
              <div style={{ width: '80%', marginLeft: 10, marginTop: 5 }}>
                {op.options.map((childOp, childIndex) => (
                  <Checkbox
                    checked={childOp.selected}
                    key={childOp.key}
                    styles={{
                      root: {
                        fontSize: theme.fonts.medium.fontSize,
                        marginBottom: 5,
                        width: '90%',
                      },
                      text: {
                        width: '87%',
                        ...textEllipsis,
                      },
                    }}
                    label={childOp.text}
                    title={childOp.text}
                    onChange={() =>
                      onFilterOptionsChanged(
                        options,
                        [opIndex, childIndex],
                        !childOp.selected,
                        onChange,
                      )}
                  />
                ))}
              </div>
            </div>}
        </div>
      ))}
    </div>
    {onLeft &&
      <Separator
        vertical
        alignContent="center"
        styles={separatorStyle}
      />}
  </div>
);

FilterPanel.defaultProps = {
  title: 'Filter Options',
  width: '15%',
  onLeft: false,
};

FilterPanel.propTypes = {
  title: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.symbol,
    ]),
    selected: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      selected: PropTypes.bool,
    })),
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  width: PropTypes.string,
  onLeft: PropTypes.bool,
};

export default FilterPanel;

/*
sampleOptions: [
  {
    text: 'Option 1',
    selected: false,
    key: uuid(),
    options: [
      {
        text: 'Option 1.1',
        key: uuid(),
      },
      {
        text: 'Option 1.2',
        key: uuid(),
      },
      {
        text: 'Option 1.3',
        key: uuid(),
      },
      {
        text: 'Option 1.4',
        key: uuid(),
      },
    ],
  },
  {
    text: 'Option 2',
    selected: false,
    key: uuid(),
  },
  {
    text: 'Option 3',
    selected: false,
    key: uuid(),
  },
  {
    text: 'Option 4',
    key: uuid(),
    options: [
      {
        text: 'Option 4.1',
        key: uuid(),
      },
      {
        text: 'Option 4.2',
        key: uuid(),
      },
      {
        text: 'Option 4.4',
        key: uuid(),
      },
      {
        text: 'Option 4.4',
        key: uuid(),
      },
      {
        text: 'Really Long Option Text 4.5',
        key: uuid(),
      },
    ],
  },
],
*/
