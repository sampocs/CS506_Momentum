import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import CalendarHomeScreen from '../screens/CalendarHomeScreen';
import MetricsHomeScreen from '../screens/MetricsHomeScreen';
import SettingsHomeScreen from '../screens/SettingsHomeScreen';
import HabitScreen from '../screens/HabitScreen';
import AddHabitScreen from '../screens/AddHabitScreen';
import MetricsSpecificHabitScreen from '../screens/MetricsSpecificHabitScreen';
import ProfileScreen from '../screens/ProfileScreen';

const CalendarStack = createStackNavigator({
    CalendarHome: CalendarHomeScreen,
    Habit: HabitScreen,
    AddHabit: AddHabitScreen
});

CalendarStack.navigationOptions = {
    tabBarLabel: 'Calendar',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={'FontAwesome/calendar'}
        />
    ),
};

const MetricsStack = createStackNavigator({
    MetricsHome: MetricsHomeScreen,
    MetricsSpecificHabit: MetricsSpecificHabitScreen,
    Habit: HabitScreen
});

MetricsStack.navigationOptions = {
    tabBarLabel: 'Metrics',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={'Ionicons/ios-pulse'}
        />
    ),
};

const SettingsStack = createStackNavigator({
    SettingsHome: SettingsHomeScreen,
    Profile: ProfileScreen
});

SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={'Ionicons/ios-settings'}
        />
    ),
};

export default createBottomTabNavigator({
    CalendarStack,
    MetricsStack,
    SettingsStack,
});
