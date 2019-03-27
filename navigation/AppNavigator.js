import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthenticationNavigator from './AuthenticationNavigator'

export default createAppContainer(createSwitchNavigator({
    Auth: AuthenticationNavigator,
    Main: MainTabNavigator,
}));