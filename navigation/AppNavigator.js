import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import AuthenticationNavigator from './AuthenticationNavigator'
import CalendarHomeScreen from '../screens/CalendarHomeScreen';
import HabitScreen from '../screens/HabitScreen';
import AddHabitScreen from '../screens/AddHabitScreen';
import MetricsHomeScreen from '../screens/MetricsHomeScreen';
import SettingsHomeScreen from '../screens/SettingsHomeScreen';

export default createAppContainer(createSwitchNavigator({
    //For development purposes, place your desired screen on top (rememeber to import the screen)
    //i.e. (Start: MetricsSpecificHabitScreen),
    //EditHabit: EditExistingHabit,
    Start: SettingsHomeScreen,
    Auth: AuthenticationNavigator,
    Main: MainTabNavigator,
}));