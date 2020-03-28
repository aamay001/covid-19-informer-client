import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
} from 'office-ui-fabric-react';

const ConfirmDialog = ({
  open,
  title,
  subText,
  subTextColor,
  children,
  showYesButton,
  showNoButton,
  onClickYes,
  onClickNo,
  disableYesButton,
  disableNoButton,
  confirmText,
  denyText,
  denyButtonIcon,
  negativeAction,
}) => (
  <Dialog
    hidden={!open}
    styles={{
      main: {
        width: '90%',
      },
    }}
    dialogContentProps={{
      type: DialogType.normal,
      title,
      subText,
      styles: {
        main: {
          width: '90%',
        },
        subText: {
          color: subTextColor,
          paddingTop: 0,
        },
        title: {
          paddingBottom: 10,
        },
      },
    }}
    modalProps={{
      isBlocking: true,
      styles: {
        main: {
          padding: 0,
        },
      },
    }}
  >
    {children}
    <DialogFooter
      styles={{
        actionsRight: {
          marginRight: 0,
          marginLeft: 0,
        },
      }}
    >
      {showYesButton &&
        <PrimaryButton
          iconProps={{ iconName: 'CheckMark' }}
          type="submit"
          onClick={onClickYes}
          text={confirmText}
          disabled={disableYesButton}
          style={{ height: 35 }}
          styles={{
            root: {
              marginBottom: 10,
              color: 'white',
              backgroundColor: negativeAction
                ? 'crimson'
                : undefined,
            },
          }}
        />}
      {showNoButton &&
        <DefaultButton
          iconProps={{ iconName: denyButtonIcon }}
          onClick={onClickNo}
          text={denyText}
          disabled={disableNoButton}
          style={{
            height: 35,
          }}
        />}
    </DialogFooter>
  </Dialog>
);

ConfirmDialog.defaultProps = {
  showNoButton: true,
  showYesButton: true,
  disableYesButton: false,
  disableNoButton: false,
  subText: undefined,
  confirmText: 'Yes',
  denyText: 'No',
  denyButtonIcon: 'Cancel',
  subTextColor: undefined,
  negativeAction: false,
  onClickYes: undefined,
  onClickNo: undefined,
};

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  subText: PropTypes.string,
  negativeAction: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  showNoButton: PropTypes.bool,
  showYesButton: PropTypes.bool,
  onClickYes: PropTypes.func,
  onClickNo: PropTypes.func,
  disableYesButton: PropTypes.bool,
  disableNoButton: PropTypes.bool,
  confirmText: PropTypes.string,
  denyText: PropTypes.string,
  denyButtonIcon: PropTypes.string,
  subTextColor: PropTypes.string,
};

export default ConfirmDialog;
