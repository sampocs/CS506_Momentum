import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

import { createStore } from 'redux'
import { Provider } from 'react-redux';
import mainReducer from './reducers/mainReducer.js'
import {
    emailToFirebaseRef
} from './helpers/miscHelpers'
import firebase from '@firebase/app'
import '@firebase/database'
import '@firebase/auth'
import { firebaseConfig } from './firebaseConfig'
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const store = createStore(mainReducer)

store.subscribe(() => {
    let state = store.getState()
    let user = firebase.auth().currentUser
    if (user) {
        let emailRef = emailToFirebaseRef(user.email)
        firebase.database().ref('users/' + emailRef).set({
            history: state.history,
            settings: state.settings
        }).then(
            () => {},
            (error) => {
                console.log('Error updating firebase.')
                console.log(error)
            }
        );
    }
})

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
