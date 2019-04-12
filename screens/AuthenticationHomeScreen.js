import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import {

} from '../actions/actions'
import { connect } from 'react-redux';
import Colors from '../constants/Colors.js'
import firebase from '@firebase/app';
import '@firebase/auth'

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

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
