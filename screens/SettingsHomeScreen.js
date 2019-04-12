import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux';
import { clearUserData } from '../actions/actions'
import Colors from '../constants/Colors';
import firebase from '@firebase/app';
import '@firebase/auth'

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearUserData: () => dispatch(clearUserData())
    }
}

class SettingsHomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Settings'
    }

    signOut() {
        firebase.auth().signOut().then(
            () => {
                console.log("Signed Out")

                //Reset data in redux
                this.props.clearUserData()
        
                this.props.navigation.navigate('Auth')
            },
            (error) => {
                console.log("Unable to sign out.")
                console.log(error)
            }

        )

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoutButtonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            if (firebase.auth().currentUser) {
                                this.signOut()
                            }
                            else {
                                this.props.navigation.navigate('Auth')
                            }
                        }}
                    >
                        <Text style={styles.logoutButtonText}>
                        {firebase.auth().currentUser ? 'Sign Out' : 'Link Account'}
                        </Text>
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
        color: Colors.darkBlue,
        fontSize: 40
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsHomeScreen);
