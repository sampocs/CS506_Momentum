import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import AuthenticationNavigator from './AuthenticationNavigator'
import HabitScreen from '../screens/HabitScreen';

export default createAppContainer(createSwitchNavigator({
    //For development purposes, place your desired screen on top (rememeber to import the screen)
    //i.e. (Start: MetricsSpecificHabitScreen)
    // start: my screen name (import it)
    Start: HabitScreen,
    Auth: AuthenticationNavigator,
    Main: MainTabNavigator,
}));