import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux';
import Colors from '../constants/Colors';

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

class SettingsHomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Settings'
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoutButtonContainer}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Auth')}
                    >
                        <Text style={styles.logoutButtonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoutButtonContainer: {
        position: 'absolute',
        alignItems: 'center',
        width: '100%',
        bottom: 20,
        marginTop: 10
    },
    logoutButtonText: {
        color: Colors.aqua,
        fontSize: 20
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsHomeScreen);
