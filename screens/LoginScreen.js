import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    AlertIOS
} from 'react-native'
import { connect } from 'react-redux';
import Colors from '../constants/Colors.js';
import firebaseErrors from '../constants/FirebaseErrors'
import Ionicons from '@expo/vector-icons/Ionicons';
import {
    restoreHistoryFromFirebase,
    restoreSettingsFromFirebase
} from '../actions/actions'
import firebase from '@firebase/app';
import '@firebase/auth'
import { emailToFirebaseRef } from '../helpers/miscHelpers.js';
import { ALL_DATES_LIST } from '../constants/Constants.js';

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

class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    login() {
        if (this.confirmFields()) {
            this.loginWithFirebase()
        }
    }

    loginWithFirebase() {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(
            ({ user }) => {
                console.log("Successfully logged in.")

                //Navigate to profile screen as authenticated user
                this.props.navigation.navigate('Main')

                //Pull data from firebase
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

            },
            (error) => {
                console.log('Login failed.')
                if (error.code === firebaseErrors.UserNotFound) {
                    AlertIOS.alert('', `No user found with the email ${this.state.email}.`)
                    this.clearFields()
                }
                else if (error.code === firebaseErrors.WrongPassword) {
                    AlertIOS.alert('', `Incorrect password for ${this.state.email}.`)
                    this.clearFields(passwordsOnly = true)
                }
                else if (error.code === firebaseErrors.InvalidEmail) {
                    AlertIOS.alert('', "Invalid email address.")
                    this.clearFields();
                }
            }
        )
    }

    confirmFields() {
        if (this.state.email === '') {
            AlertIOS.alert('', "Please enter a email.")
            return false;
        }
        if (this.state.password === '') {
            AlertIOS.alert('', "Please enter a password.")
            return false
        }
        return true
    }

    clearFields(passwordsOnly = false) {
        if (passwordsOnly) {
            this.setState({ password: ''})
        }
        else {
            this.setState({ email: '', password: ''})
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.backButtonContainer}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.pop()}
                        style={styles.backButtonTouch}
                    >
                        <Ionicons name='ios-arrow-back' size={40} />
                    </TouchableOpacity>
                </View>
                <KeyboardAvoidingView
                    behavior="position"
                    style={{ height: 300, justifyContent: 'center' }}
                >
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        textContentType="emailAddress"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        onChangeText={text => this.setState({ email: text })}
                        onSubmitEditing={() => this.refs.passwordInput.focus()}
                        value={this.state.email}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Password"
                        textContentType="password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        ref="passwordInput"
                        returnKeyType="done"
                        onChangeText={password => this.setState({ password })}
                        onSubmitEditing={() => this.login()}
                        value={this.state.password}
                    />
                </KeyboardAvoidingView>
                <TouchableOpacity
                    onPress={() => this.login()}
                    style={styles.loginButton}
                >
                    <Text style={styles.loginButtonText}>Login</Text>
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
    backButtonContainer: {
        position: 'absolute',
        top: 70,
        left: 10,
    },
    backButtonTouch: {
        alignItems: 'center',
        width: 50,
        height: 50
    },
    loginButton: {
        position: 'absolute',
        bottom: 50
    },
    loginButtonText: {
        fontSize: 18,
        color: Colors.aqua
    },
    textInput: {
        borderBottomColor: Colors.aqua,
        borderBottomWidth: 1,
        width: 200,
        textAlign: 'center',
        margin: 10,
        padding: 5,
        color: Colors.aqua
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
