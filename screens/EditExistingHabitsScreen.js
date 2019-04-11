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
import SettingsHabitComponent from '../components/SettingsHabitComponent';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fonts from '../constants/Fonts';
import { withNavigation } from 'react-navigation'


const mapStateToProps = (state) => {
    return {
        currentHabits: Object.keys(state.settings.habitSettings),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // updateEmail: (email) => dispatch(updateEmail(email)),
        // updateFirebaseUser: (firebaseUser) => dispatch(updateFirebaseUser(firebaseUser))
    }
}

class EditExistingHabits extends React.Component {

    render() {
        return (
            <View>
                <View style={styles.backButtonContainer}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('SettingsHome')}
                    >
                        <Ionicons name='ios-arrow-back' size={30} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.logoutButtonText}>MODIFY SCREEN</Text>
                    <View style={styles.topSpacing}></View>
                    <SettingsHabitComponent habits={this.props.currentHabits}/>
                    {/* <Text style={styles.test}>{this.props.currentHabits[0]}</Text> */}
                    
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
        fontSize: 40,
        position: 'absolute',
        alignItems: 'center',
        marginTop: 30,
        left: 80,
        align: 'center'
    },
    backButtonContainer: {
        position: 'absolute',
        top: 20,
        left: 20
    },
    topSpacing: {
        marginTop:100,
    }

})

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(EditExistingHabits));
