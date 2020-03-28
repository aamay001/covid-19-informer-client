import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  RouteRootFlex,
  RouteHeader,
} from '../components/General';
import { setCurrentRoute } from '../actions/app.actions';
import { constants } from '../config';

const { ROUTES } = constants;

class SampleRoute extends Component {
  componentDidMount() {
    const { currentRoute, dispatch } = this.props;
    if (currentRoute !== ROUTES.SAMPLE.NAME) {
      dispatch(setCurrentRoute(ROUTES.SAMPLE.NAME));
    }
  }

  render() {
    return (
      <RouteRootFlex id="c19i-sample-route">
        <RouteHeader
          text="Sample Route"
          iconName={ROUTES.SAMPLE.ICON}
        />
      </RouteRootFlex>
    );
  }
}

SampleRoute.propTypes = {
  currentRoute: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentRoute: state.app.currentRoute,
});

export default connect(mapStateToProps)(SampleRoute);
