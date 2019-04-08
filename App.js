import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

import { createStore } from 'redux'
import { Provider } from 'react-redux';
import mainReducer from './reducers/mainReducer.js'

import firebase from 'firebase';
import { firebaseConfig } from './firebaseConfig'
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const store = createStore(mainReducer)

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                    <AppNavigator />
                </View>
            </Provider>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
