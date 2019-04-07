import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native'
import { connect } from 'react-redux';
import Colors from '../constants/Colors.js';
import Ionicons from '@expo/vector-icons/Ionicons';

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    
    state = {
        username: null,
        password: null
    }

    login = () => {
        this.props.navigation.navigate('Main')
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
                        placeholder="Username"
                        textContentType="username"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        onChangeText={username => this.setState({ username })}
                        onSubmitEditing={() => this.refs.passwordInput.focus()}
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
        padding: 5
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
