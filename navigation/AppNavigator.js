import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthenticationNavigator from './AuthenticationNavigator'
import CalendarHomeScreen from '../screens/CalendarHomeScreen';

export default createAppContainer(createSwitchNavigator({
    //For development purposes, place your desired screen on top (rememeber to import the screen)
    //i.e. (Start: MetricsSpecificHabitScreen)
    Start: CalendarHomeScreen,
    Auth: AuthenticationNavigator,
    Main: MainTabNavigator,
}));