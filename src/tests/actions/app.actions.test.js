/* globals it, describe expect */
import faker from 'faker';
import * as actions from '../../actions/app.actions';

describe('app.actions.js', () => {
  describe('setCurrentRoute', () => {
    it('returns correct type and value', () => {
      const fakeRouteName = faker.random.word();
      const expectedActions = {
        type: actions.SET_CURRENT_ROUTE,
        currentRoute: fakeRouteName,
      };
      expect(actions.setCurrentRoute(fakeRouteName))
        .toEqual(expectedActions);
    });
  });

  describe('toggleMobileMenu', () => {
    it('returns correct type', () => {
      const expectedActions = {
        type: actions.TOGGLE_MOBILE_MENU,
      };
      expect(actions.toggleMobileMenu())
        .toEqual(expectedActions);
    });
  });

  describe('configUnpaidAccount', () => {
    it('returns correct type', () => {
      const expectedActions = {
        type: actions.CONFIG_UNPAID_ACCOUNT,
      };
      expect(actions.configUnpaidAccount())
        .toEqual(expectedActions);
    });
  });
});
