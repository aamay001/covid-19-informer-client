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
import {
  NoLocationSelected,
  LocationSearch,
  StatsPie,
} from '../components/Covid';
import {
  setCurrentRoute,
  routeToLanding,
  getGeolocData,
} from '../actions/app.actions';
import {
  loadCovidData,
} from '../actions/covid.actions';
import { history } from '../store';
import { lsHelper, generalHelper } from '../helpers';
import { theme } from '../config';
import { ROUTES, STRINGS } from '../config/constants';

const { getLocationString } = generalHelper;

class Home extends Component {
  constructor(props) {
    super(props);
    const {
      prevLocationExists,
      match,
    } = props;
    const { params: { location } } = match;
    const askForLocPerms = location
      ? false
      : lsHelper.getItem(STRINGS.LS.LOCATION_PERMS);
    this.state = {
      askForLocPerms: askForLocPerms === false
        ? askForLocPerms
        : true,
      errorGettingUserLocation: false,
      gettingUserLocation: false,
      locationConfirmed: prevLocationExists || !!location,
      pickFirst: prevLocationExists || !!location,
      locationNotAccepted: false,
      rememberLocation: false,
      selectedLocation: undefined,
    };
    const { currentRoute, dispatch } = props;
    if (currentRoute !== ROUTES.HOME.NAME) {
      if (location) {
        dispatch(setCurrentRoute(ROUTES.WITH_SELECTION.NAME));
      } else {
        dispatch(routeToLanding());
        dispatch(setCurrentRoute(ROUTES.HOME.NAME));
      }
    }
    this.getUserLocation = this.getUserLocation.bind(this);
    this.onConfirmUseLocation = this.onConfirmUseLocation.bind(this);
    this.onLocationConfirmed = this.onLocationConfirmed.bind(this);
    this.onDenyUseLocation = this.onDenyUseLocation.bind(this);
    this.onSuccessGettingUserLocation = this.onSuccessGettingUserLocation.bind(this);
    this.onErrorGettingUserLocation = this.onErrorGettingUserLocation.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadCovidData());
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
      locationNotAccepted: true,
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
      selectedLocation: geolocationData,
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
      selectedLocation,
      pickFirst,
    } = this.state;
    const {
      gettingGeolocationData,
      successGettingGeolocationData,
      errorGettingGeolocationData,
      geolocationData,
      gettingCovidData,
      match: { params: { location } },
    } = this.props;
    const locString = getLocationString(selectedLocation);
    return (
      <Fragment>
        <RouteRootFlex
          style={{ maxWidth: '100vw', paddingLeft: 20, paddingRight: 20 }}
          id="c19i-home-route"
        >
          <div style={{ maxWidth: 750, width: '95vw', paddingTop: 35 }}>
            {!gettingGeolocationData && !gettingCovidData &&
              (locationConfirmed || locationNotAccepted) &&
              <Fragment>
                <LocationSearch
                  pickFirst={pickFirst}
                  searchTerm={locationConfirmed
                    ? location || getLocationString(geolocationData)
                    : ''}
                  onSelection={(loc) => {
                    this.setState({ selectedLocation: loc, pickFirst: false });
                    if (!pickFirst) {
                      history.push(`/see/${getLocationString(loc)}`);
                    }
                  }}
                />
              </Fragment>}
          </div>
          <h1 style={{ marginBottom: 0 }}>
            {locString}
          </h1>
          {selectedLocation &&
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                alignItems: 'flex-start',
                width: '100%',
                marginTop: 25,
              }}
            >
              <StatsPie data={selectedLocation} />
            </div>}
          {!selectedLocation &&
            <NoLocationSelected />}
        </RouteRootFlex>
        <ConfirmDialog
          open={askForLocPerms && !gettingCovidData}
          title="Use Location"
          subText="Use your location to load relevant data."
          subTextColor={theme.palette.themeSecondary}
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
          subTextColor={theme.palette.black}
          showNoButton={false}
          confirmText="OK"
          onClickYes={() => this.setState({
            errorGettingUserLocation: false,
            locationConfirmed: true,
          })}
        >
          Search for a location manually instead.
        </ConfirmDialog>
        <ConfirmDialog
          open={successGettingGeolocationData &&
            !locationConfirmed && !locationNotAccepted}
          title="Confirm Location"
          subText="Is this your location?"
          subTextColor={theme.palette.black}
          onClickNo={() =>
            this.setState({ locationNotAccepted: true })}
          onClickYes={this.onLocationConfirmed}
        >
          <p style={{ color: 'dodgerblue' }}>
            {getLocationString(geolocationData)}
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
          show={gettingUserLocation || gettingGeolocationData || gettingCovidData}
          text={gettingCovidData
            ? 'Loading data from sources...'
            : 'Getting user location...'}
        />
      </Fragment>
    );
  }
}

Home.defaultProps = {
  dispatch: () => {},
  currentRoute: ROUTES.HOME.NAME,
  geolocationData: {},
  match: undefined,
};

Home.propTypes = {
  dispatch: PropTypes.func,
  currentRoute: PropTypes.string,
  gettingGeolocationData: PropTypes.bool.isRequired,
  successGettingGeolocationData: PropTypes.bool.isRequired,
  geolocationData: PropTypes.shape({
    country: PropTypes.string,
    county: PropTypes.string,
    province: PropTypes.string,
    state: PropTypes.string,
    city: PropTypes.string,
    stats: PropTypes.shape({}),
  }),
  errorGettingGeolocationData: PropTypes.bool.isRequired,
  gettingCovidData: PropTypes.bool.isRequired,
  prevLocationExists: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      location: PropTypes.string,
    }),
  }),
};

const mapStateToProps = state => ({
  currentRoute: state.app.currentRoute,
  gettingGeolocationData: state.app.gettingGeolocationData,
  successGettingGeolocationData: state.app.successGettingGeolocationData,
  geolocationData: state.app.geolocationData,
  errorGettingGeolocationData: state.app.errorGettingGeolocationData,
  gettingCovidData: state.covid.gettingData,
  prevLocationExists: state.app.prevLocationExists,
});

export default connect(mapStateToProps)(Home);
