import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

class AuthenticationHomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text> Authentication Home Screen </Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('SignUp')}>
                    <Text> Sign Up </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Login')}>
                    <Text> Login </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Main')}>
                    <Text> Skip </Text>
                </TouchableOpacity>
            </View>
        )
    }5
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationHomeScreen);
