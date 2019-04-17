import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import TabBarLabel from '../components/TabBarLabel';

import CalendarHomeScreen from '../screens/CalendarHomeScreen';
import MetricsHomeScreen from '../screens/MetricsHomeScreen';
import SettingsHomeScreen from '../screens/SettingsHomeScreen';
import HabitScreen from '../screens/HabitScreen';
import AddHabitScreen from '../screens/AddHabitScreen';
import MetricsSpecificHabitScreen from '../screens/MetricsSpecificHabitScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Colors from '../constants/Colors';
import EditHabitScreen from '../screens/EditHabitScreen';

const CalendarStack = createStackNavigator({
    CalendarHome: CalendarHomeScreen,
    Habit: HabitScreen,
    AddHabit: AddHabitScreen
});

CalendarStack.navigationOptions = {
    tabBarLabel: ({focused}) => (
        <TabBarLabel 
            focused={focused}
            selectedColor={Colors.calendarBlue}
            title={'Calendar'}
        />
    ),  
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={'FontAwesome/calendar'}
            selectedColor={Colors.calendarBlue}
        />
    ),
    
};

const MetricsStack = createStackNavigator({
    MetricsHome: MetricsHomeScreen,
    MetricsSpecificHabit: MetricsSpecificHabitScreen,
    Habit: HabitScreen,
});

MetricsStack.navigationOptions = {
    tabBarLabel: ({focused}) => (
        <TabBarLabel 
            focused={focused}
            selectedColor={Colors.aqua}
            title={'Metrics'}
        />
    ),  
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={'Ionicons/ios-pulse'}
            selectedColor={Colors.aqua}
        />
    ),
};

const SettingsStack = createStackNavigator({
    SettingsHome: SettingsHomeScreen,
    Profile: ProfileScreen,
    EditHabit: EditHabitScreen
});

SettingsStack.navigationOptions = {
    tabBarLabel: ({focused}) => (
        <TabBarLabel 
            focused={focused}
            selectedColor={Colors.darkBlue}
            title={'Settings'}
        />
    ),  
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={'Ionicons/ios-settings'}
            selectedColor={Colors.darkBlue}
        />
    ),
};

export default createBottomTabNavigator({
    CalendarStack,
    MetricsStack,
    SettingsStack
});
