import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView
} from 'react-native'
import { connect } from 'react-redux';
import {
    updateEmail,
    updateFirebaseUser
} from '../actions/actions'
import Colors from '../constants/Colors';
import firebase from '@firebase/app';
import '@firebase/auth'
import SettingsEditableHabitComponent from '../components/SettingsEditableHabitComponent';
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

class EditableHabitsListScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.backButtonContainer}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.pop()}
                    >
                        <Ionicons name='ios-arrow-back' size={40} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.title}>Modify a Habit</Text>
                    <View style={styles.topSpacing}></View>
                    <SettingsEditableHabitComponent habits={this.props.currentHabits}/>
                    {/* <Text style={styles.test}>{this.props.currentHabits[0]}</Text> */}
                    
                </View>
           </SafeAreaView>
          
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    logoutButtonContainer: {
        position: 'absolute',
        alignItems: 'center',
        width: '100%',
        bottom: 20,
        marginTop: 10
    },
    title: {
        color: Colors.darkBlue,
        fontSize: 40,
        position: 'absolute',
        alignItems: 'center',
        marginTop: 30,
        left: 100,
        align: 'center',
        width: '100%',
    },
    backButtonContainer: {
        position: 'absolute',
        top: 70,
        left: 20
    },
    topSpacing: {
        marginTop:100,
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditableHabitsListScreen);
