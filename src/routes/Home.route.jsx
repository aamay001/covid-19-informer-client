/* globals navigator */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Checkbox } from 'office-ui-fabric-react';
import {
  RouteRootFlex,
  ConfirmDialog,
  LoadingModal,
} from '../components/General';
import { setCurrentRoute, getGeolocData } from '../actions/app.actions';
import { lsHelper, generalHelper } from '../helpers';
import { ROUTES, STRINGS } from '../config/constants';

const { getGeolocatedLocationString } = generalHelper;

class Home extends Component {
  constructor(props) {
    super(props);
    const askForLocPerms = lsHelper.getItem(STRINGS.LS.LOCATION_PERMS);
    this.state = {
      askForLocPerms: askForLocPerms === false
        ? askForLocPerms
        : true,
      errorGettingUserLocation: false,
      gettingUserLocation: false,
      locationConfirmed: false,
      locationNotAccepted: false,
      rememberLocation: false,
    };
    const { currentRoute, dispatch } = props;
    if (currentRoute !== ROUTES.HOME.NAME) {
      dispatch(setCurrentRoute(ROUTES.HOME.NAME));
    }
    this.getUserLocation = this.getUserLocation.bind(this);
    this.onConfirmUseLocation = this.onConfirmUseLocation.bind(this);
    this.onLocationConfirmed = this.onLocationConfirmed.bind(this);
    this.onDenyUseLocation = this.onDenyUseLocation.bind(this);
    this.onSuccessGettingUserLocation = this.onSuccessGettingUserLocation.bind(this);
    this.onErrorGettingUserLocation = this.onErrorGettingUserLocation.bind(this);
  }

  onConfirmUseLocation() {
    this.setState({
      askForLocPerms: false,
    }, this.getUserLocation);
  }

  onDenyUseLocation() {
    const { rememberLocation } = this.state;
    this.setState({
      askForLocPerms: false,
    });
    if (rememberLocation) {
      lsHelper.setItem(STRINGS.LS.LOCATION_PERMS, false);
    }
  }

  onSuccessGettingUserLocation(position) {
    const { dispatch } = this.props;
    const { latitude, longitude } = position.coords;
    this.setState({
      gettingUserLocation: false,
    }, () => dispatch(getGeolocData(latitude, longitude)));
  }

  onLocationConfirmed() {
    const { rememberLocation } = this.state;
    const { geolocationData } = this.props;
    this.setState({
      locationConfirmed: true,
    });
    if (rememberLocation) {
      lsHelper.setItem(STRINGS.LS.LOCATION_PERMS, false);
      lsHelper.setItem(STRINGS.LS.DERIVED_LOCATION, geolocationData);
    }
  }

  onErrorGettingUserLocation() {
    this.setState({
      errorGettingUserLocation: true,
      gettingUserLocation: false,
    });
  }

  getUserLocation() {
    this.setState({
      gettingUserLocation: true,
    }, () => {
      navigator.geolocation.getCurrentPosition(
        this.onSuccessGettingUserLocation,
        this.onErrorGettingUserLocation,
        { enableHighAccuracy: true },
      );
    });
  }

  render() {
    const {
      askForLocPerms,
      errorGettingUserLocation,
      gettingUserLocation,
      locationConfirmed,
      locationNotAccepted,
      rememberLocation,
    } = this.state;
    const {
      gettingGeolocationData,
      successGettingGeolocationData,
      errorGettingGeolocationData,
      geolocationData,
    } = this.props;
    return (
      <Fragment>
        <RouteRootFlex style={{ maxWidth: 550 }} id="c19i-home-route">
          {getGeolocatedLocationString(geolocationData)}
        </RouteRootFlex>
        <ConfirmDialog
          open={askForLocPerms}
          title="Use Location"
          subText="Use your location to load relevant data."
          onClickYes={this.onConfirmUseLocation}
          onClickNo={this.onDenyUseLocation}
        >
          Would you like to use your location?
          <Checkbox
            label="Don't ask again."
            checked={rememberLocation}
            styles={{ root: { marginTop: 15 } }}
            onChange={() =>
              this.setState({ rememberLocation: !rememberLocation })}
          />
        </ConfirmDialog>
        <ConfirmDialog
          open={errorGettingUserLocation || errorGettingGeolocationData}
          title="User Location"
          subText="It looks like the app could not determine your location!"
          showNoButton={false}
          confirmText="OK"
          onClickYes={() => this.setState({ errorGettingUserLocation: false })}
        >
          Search for a location manually instead.
        </ConfirmDialog>
        <ConfirmDialog
          open={successGettingGeolocationData &&
            !locationConfirmed && !locationNotAccepted}
          title="Confirm Location"
          subText="Is this your location?"
          subTextColor="black"
          onClickNo={() =>
            this.setState({ locationNotAccepted: true })}
          onClickYes={this.onLocationConfirmed}
        >
          <p style={{ color: 'dodgerblue' }}>
            {getGeolocatedLocationString(geolocationData)}
          </p>
          Hit No to find your location manually.
          <Checkbox
            label="Remember"
            checked={rememberLocation}
            styles={{ root: { marginTop: 15 } }}
            onChange={() =>
              this.setState({ rememberLocation: !rememberLocation })}
          />
        </ConfirmDialog>
        <LoadingModal
          show={gettingUserLocation || gettingGeolocationData}
          text="Getting user location..."
        />
      </Fragment>
    );
  }
}

Home.defaultProps = {
  dispatch: () => {},
  currentRoute: ROUTES.HOME.NAME,
  geolocationData: {},
};

Home.propTypes = {
  dispatch: PropTypes.func,
  currentRoute: PropTypes.string,
  gettingGeolocationData: PropTypes.bool.isRequired,
  successGettingGeolocationData: PropTypes.bool.isRequired,
  geolocationData: PropTypes.shape({
    country: PropTypes.string,
    county: PropTypes.string,
    state: PropTypes.string,
    city: PropTypes.string,
  }),
  errorGettingGeolocationData: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  currentRoute: state.app.currentRoute,
  gettingGeolocationData: state.app.gettingGeolocationData,
  successGettingGeolocationData: state.app.successGettingGeolocationData,
  geolocationData: state.app.geolocationData,
  errorGettingGeolocationData: state.app.errorGettingGeolocationData,
});

export default connect(mapStateToProps)(Home);
