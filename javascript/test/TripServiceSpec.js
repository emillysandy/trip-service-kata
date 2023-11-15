"use strict";

const assert = require('assert');
const TripService = require('../src/TripService');
const UserSession = require('../src/UserSession');
const TripDAO = require('../src/TripDAO');

describe('TripService', () => {

    it('should return trips for a logged-in user who is a friend', () => {
        const user = {};
        const loggedUser = {};
        const tripService = new TripService();

        UserSession.getLoggedUser = () => loggedUser; 
        TripDAO.findTripsByUser = () => ['trip1', 'trip2'];

        const trips = tripService.getTripsByUser(user);

        assert.deepStrictEqual(trips, ['trip1', 'trip2']);
    });

    it('should return an empty array for a logged-in user who is not a friend', () => {
        const user = {};
        const loggedUser = {};
        const tripService = new TripService();

        UserSession.getLoggedUser = () => loggedUser;
        TripDAO.findTripsByUser = () => [];

        const trips = tripService.getTripsByUser(user);

        assert.deepStrictEqual(trips, []);
    });

    it('should throw an error for a user who is not logged in', () => {
        const user = {};
        const tripService = new TripService();

        UserSession.getLoggedUser = () => null;

        assert.throws(() => tripService.getTripsByUser(user), { message: 'User not logged in.' });
    });
});

