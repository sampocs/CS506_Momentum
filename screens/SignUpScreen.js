import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    AlertIOS,
    KeyboardAvoidingView
} from 'react-native'
import { connect } from 'react-redux';
import Colors from '../constants/Colors.js';
import firebaseErrors from '../constants/FirebaseErrors'
import {
    updateEmail,
    updateFirebaseUser
} from '../actions/actions'
import Ionicons from '@expo/vector-icons/Ionicons';
import firebase from '@firebase/app';
import '@firebase/auth'

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateEmail: (email) => dispatch(updateEmail(email)),
        updateFirebaseUser: (firebaseUser) => dispatch(updateFirebaseUser(firebaseUser))
    }
}

class SignUpScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            repeatPassword: ''
        }
    }

    signUp() {
        if (this.confirmFields()) {
            this.signUpWithFirebase()
        }
    }

    signUpWithFirebase() {
        let strippedEmail = this.state.email.replace(/^\s+|\s+$/g, '').toLowerCase()
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(
            ({ user }) => {
                console.log("Successfully created an account.")

                this.props.updateEmail(strippedEmail)
                this.props.updateFirebaseUser(user)
                
                this.props.navigation.navigate('Main')
            },
            (error) => {
                console.log("Error occured while creating an account.")
                console.log(error)
                if (error.code === firebaseErrors.DuplicateEmail) {
                    AlertIOS.alert('', "The email address provided has an existing account.")
                    this.clearFields()
                }
                else if (error.code === firebaseErrors.InvalidEmail) {
                    AlertIOS.alert('', "Invalid email address.")
                    this.clearFields();
                }
                else if (error.code === firebaseErrors.WeakPassword) {
                    AlertIOS.alert('', "The password must be at least 6 characters.")
                    this.clearFields(passwordsOnly = true)
                }
            }
        )
    }

    confirmFields() {
        if (this.state.email === '') {
            AlertIOS.alert('', 'Please enter an email address!')
            return false;
        }
        if (this.state.password === '') {
            AlertIOS.alert('', "Please enter a password.")
            return false
        }
        if (this.state.repeatPassword === '') {
            AlertIOS.alert('', "Please re-enter your password.")
            return false
        }
        if (this.state.password != this.state.repeatPassword) {
            AlertIOS.alert("Passwords do not match.")
            return false
        }
        return true
    }

    clearFields(passwordsOnly = false) {
        if (passwordsOnly) {
            this.setState({ password: '', repeatPassword: '' })
        }
        else {
            this.setState({ email: '', password: '', repeatPassword: '' })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.backButtonContainer}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.pop()}
                    >
                        <Ionicons name='ios-arrow-back' size={30} />
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
                        keyboardType="email-address"
                        returnKeyType="next"
                        ref="emailInput"
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
                        returnKeyType="next"
                        onChangeText={password => this.setState({ password })}
                        onSubmitEditing={() => this.refs.repeatPasswordInput.focus()}
                        value={this.state.password}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Repeat Password"
                        textContentType="password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        ref="repeatPasswordInput"
                        returnKeyType="done"
                        onChangeText={repeatPassword => this.setState({ repeatPassword })}
                        onSubmitEditing={() => this.signUp()}
                        value={this.state.repeatPassword}

                    />
                </KeyboardAvoidingView>
                <TouchableOpacity
                    onPress={() => this.signUp()}
                    style={styles.loginButton}
                >
                    <Text style={styles.loginButtonText}>Sign Up</Text>
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
        left: 20
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
