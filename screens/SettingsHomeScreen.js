import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux';
import {
    updateEmail,
    updateFirebaseUser
} from '../actions/actions'
import Colors from '../constants/Colors';
import firebase from '@firebase/app';
import '@firebase/auth'

const mapStateToProps = (state) => {
    return {
        user: state.settings.user,
        currentHabits: Object.keys(state.settings.habitSettings)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateEmail: (email) => dispatch(updateEmail(email)),
        updateFirebaseUser: (firebaseUser) => dispatch(updateFirebaseUser(firebaseUser))
    }
}

class SettingsHomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Settings',
        edit: 'EditExistingHabit'
    }

    signOut() {
        firebase.auth().signOut()
        console.log("Signed Out")
        this.props.updateEmail('')
        this.props.updateFirebaseUser({})
        this.props.navigation.navigate('Auth')
    }

    render() {
        return (
            <View style={styles.container}>
               
               <View style={styles.modifyButtonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                        this.props.navigation.navigate('HabitList')
                        }}
                    >
                        <Text style={styles.logoutButtonText}>
                        Modify/Remove Existing Habits
                        </Text>
                    </TouchableOpacity>
                </View> 
                <View style={styles.logoutButtonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            if (this.props.user.email === '') {
                                this.props.navigation.navigate('Auth')
                            }
                            else {
                                this.signOut()
                            }
                        }}
                    >
                        <Text style={styles.logoutButtonText}>
                        {this.props.user.email === '' ? 'Login/Sign Up' : 'Sign Out'}
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
    },
    modifyButtonContainer: {
        position: 'absolute',
        alignItems: 'center',
        marginTop: 50,
      //  borderBottom: 'black'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsHomeScreen);
