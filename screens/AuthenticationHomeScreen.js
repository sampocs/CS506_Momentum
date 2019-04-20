import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import {
    restoreHistoryFromFirebase,
    restoreSettingsFromFirebase
} from '../actions/actions'
import { connect } from 'react-redux';
import Colors from '../constants/Colors.js'
import { ALL_DATES_LIST } from '../constants/Constants'
import { emailToFirebaseRef } from '../helpers/miscHelpers'
import firebase from '@firebase/app';
import '@firebase/auth'

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        restoreData: (history, settings) => {
            dispatch(restoreHistoryFromFirebase(history));
            dispatch(restoreSettingsFromFirebase(settings))
        }
    }
}

class AuthenticationHomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            checkingLoggedIn: true
        }
    }

    componentDidMount() {
        this.checkIfLoggedIn()
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    checkIfLoggedIn() {
        this.unsubscribe = firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    let emailRef = emailToFirebaseRef(user.email)

                    firebase.database().ref('users/' + emailRef).once('value').then(
                        (snapshot) => {
                            let userData = snapshot.val()
                            let history = userData.hasOwnProperty('history') ? userData.history : {}
                            let settings = userData.hasOwnProperty('settings') ? userData.settings : {}

                            let startDate = settings.user.startDate
                            let lastDate = settings.user.lastDate
                            let dateRange = ALL_DATES_LIST.filter((date) => (date >= startDate && date <= lastDate))

                            for (i in dateRange) {
                                let date = dateRange[i]
                                history[date] = history.hasOwnProperty(date) ? history[date] : {}
                            }

                            settings.habitSettings = settings.hasOwnProperty('habitSettings') ? settings.habitSettings : {}
                            settings.habitOrder = settings.hasOwnProperty('habitOrder') ? settings.habitOrder : []

                            this.props.restoreData(history, settings)
                            console.log('Data restored.')
                        }
                    )
                    this.props.navigation.navigate('Main')
                }
                else {
                    this.setState({ checkingLoggedIn: false })
                }
            }
        )
    }

    render() {
        if (this.state.checkingLoggedIn) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('SignUp')}>
                    <Text style={styles.buttonText}> Sign Up </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.buttonText}> Login </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.skipButton}
                    onPress={() => this.props.navigation.navigate('Main')}>
                    <Text style={styles.skipButtonText}> Skip </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: 200,
        height: 50,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: Colors.aqua
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '300',
        color: "white"
    },
    skipButton: {
        bottom: 50,
        position: "absolute"
    },
    skipButtonText: {
        fontSize: 18,
        color: Colors.aqua
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationHomeScreen);
