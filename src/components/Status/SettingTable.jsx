/* globals window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';
import {
  ShimmeredDetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  Icon,
  IconButton,
  MessageBar,
  MessageBarType,
  Callout,
  DirectionalHint,
} from 'office-ui-fabric-react';
import { TableRow } from '../General';
import { theme } from '../../config';
import { boxShadow } from '../../helpers/ui.helper';

const onCopy = (value) => {
  copy(value);
};

const columns = [
  {
    key: 'c19i-status-setting-name-col',
    name: 'Setting',
    isIconOnly: false,
    data: 'string',
    isResizable: true,
    isPadded: false,
    isMultiline: false,
    fieldName: 'name',
    styles: {
      root: {
        marignTop: 0,
      },
    },
  },
  {
    key: 'c19i-status-setting-val-col',
    name: 'Value',
    isResizable: true,
    isMultiline: false,
    isPadded: false,
    minWidth: window.innerWidth <= 1000
      ? window.innerWidth * 0.60
      : window.innerWidth * 0.32,
    isIconOnly: false,
    fieldName: 'value',
  },
];

class SettingsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCalloutVisible: false,
      copyButtonRefs: new Map(),
      calloutTarget: undefined,
    };
    this.addCopyButtonRef = this.addCopyButtonRef.bind(this);
    this.setCalloutTarget = this.setCalloutTarget.bind(this);
  }

  setCalloutTarget(key) {
    const { copyButtonRefs } = this.state;
    this.setState({
      calloutTarget: copyButtonRefs.get(key),
      isCalloutVisible: true,
    });
  }

  addCopyButtonRef(ref, key) {
    const { copyButtonRefs } = this.state;
    copyButtonRefs.set(key, ref);
  }

  render() {
    const {
      header,
      headerIcon,
      settingItems,
      loading,
      error,
      errorMessage,
    } = this.props;
    const {
      isCalloutVisible,
      calloutTarget,
    } = this.state;
    return (
      <div
        style={{
          maxWidth: 900,
          width: '100%',
          color: theme.palette.black,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <h1 style={{ alignSelf: 'flex-start', marginBottom: 0 }}>
          <Icon
            iconName={headerIcon}
            styles={{
              root: {
                fontSize: 45,
                top: 10,
                marginRight: 5,
                position: 'relative',
              },
            }}
          />
          {header}
        </h1>
        <div
          style={{
            boxShadow: boxShadow.slightRais,
            marginTop: 10,
            border: `1px solid ${theme.palette.themeSecondary}`,
          }}
        >
          {!error &&
            <ShimmeredDetailsList
              compact
              enableShimmer={loading}
              items={settingItems}
              selectionMode={SelectionMode.none}
              layoutMode={DetailsListLayoutMode.justified}
              onRenderRow={row => <TableRow row={row} style={{ maxHeight: 32 }} />}
              onRenderItemColumn={(item, itemIndex, column) => {
                const { fieldName } = column;
                const value = item[fieldName];
                if (fieldName === 'value') {
                  return (
                    <>
                      <div
                        style={{
                          width: '90%',
                          margin: 0,
                          padding: 0,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          height: '100%',
                        }}
                        ref={ref =>
                          this.addCopyButtonRef(ref, `${fieldName}-${itemIndex}`)}
                      >
                        {item.truncate
                          ? `${String(value).substr(0, 35)}...`
                          : value}
                      </div>
                      {value &&
                        <IconButton
                          iconProps={{ iconName: 'Copy' }}
                          onClick={() => {
                            this.setCalloutTarget(`${fieldName}-${itemIndex}`);
                            onCopy(value);
                          }}
                          style={{ float: 'right', top: -33 }}
                        />}
                    </>
                  );
                }
                return <span>{value}</span>;
              }}
              columns={columns}
            />}
          {error &&
            <MessageBar
              messageBarType={MessageBarType.severeWarning}
              isMultiline
            >
              {`${errorMessage} | Issue communicating with the API!`}
            </MessageBar>}
          {isCalloutVisible &&
            <Callout
              target={calloutTarget}
              coverTarget
              onDismiss={() =>
                this.setState({ isCalloutVisible: false })}
              directionalHint={DirectionalHint.rightCenter}
            >
              <p
                style={{
                  padding: '0 10px 0 12px',
                  fontSize: theme.fonts.small.fontSize,
                }}
              >
                Value copied!
              </p>
            </Callout>}
        </div>
        <style>
          {`.ms-DetailsList-headerWrapper > .ms-DetailsHeader
            { padding-top: 0; }`}
        </style>
      </div>
    );
  }
}

SettingsTable.defaultProps = {
  loading: true,
  error: false,
  errorMessage: undefined,
};

SettingsTable.propTypes = {
  header: PropTypes.string.isRequired,
  headerIcon: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  settingItems: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
};

export default SettingsTable;
