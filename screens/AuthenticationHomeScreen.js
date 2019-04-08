import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux';
import Colors from '../constants/Colors.js'

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

        }
    }
    render() {
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
