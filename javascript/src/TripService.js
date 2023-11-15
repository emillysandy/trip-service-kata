"use strict";

class TripService {
    getTripsByUser(user) {
        const loggedUser = UserSession.getLoggedUser();

        if (isUserLoggedIn()) {
            return getTripsIfUserIsFriend(user, loggedUser);
        } else {
            throw new Error('User not logged in.');
        }
    }
}

function isUserLoggedIn() {
    return UserSession.getLoggedUser() !== null;
}

function isUserFriend(user, loggedUser) {
    return user.getFriends().includes(loggedUser);
}

function getTripsIfUserIsFriend(user, loggedUser) {
    return isUserFriend(user, loggedUser) ? TripDAO.findTripsByUser(user) : [];
}

module.exports = TripService;
