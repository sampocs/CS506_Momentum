import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView
} from 'react-native'
import { connect } from 'react-redux';
import { clearUserData, changeHabitOrder } from '../actions/actions'
import Colors from '../constants/Colors';
import Layout from '../constants/Layout'
import ModifyHabitComponent from '../components/ModifyHabitComponent'
import SortableList from 'react-native-sortable-list';
import firebase from '@firebase/app';
import '@firebase/auth'
import Fonts from '../constants/Fonts';

const mapStateToProps = (state) => {
    return {
        habitOrder: state.settings.habitOrder
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearUserData: () => dispatch(clearUserData()),
        changeHabitOrder: (prevOrder, nextOrder) => dispatch(changeHabitOrder(prevOrder, nextOrder))
    }
}

class SettingsHomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            order: Array(props.habitOrder.length).fill().map((x, i) => i.toString())
        }
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
            <SafeAreaView style={styles.container}>
                {this.props.habitOrder.length != 0 ?
                    <SortableList
                        style={styles.sortableList}
                        contentContainerStyle={styles.sortableListContent}
                        data={this.props.habitOrder}
                        onReleaseRow={(key, nextOrder) => {
                            this.props.changeHabitOrder(this.state.order, nextOrder)
                            this.setState({ order: nextOrder })
                        }}
                        renderRow={({ data, active }) => {
                            return <ModifyHabitComponent habitName={data} active={active} />
                        }}
                    />
                    :
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                            style={styles.addHabitButton}
                            onPress={() => this.props.navigation.navigate('AddHabit')}>
                            <Text style={styles.addHabitText}> Add Habit </Text>
                        </TouchableOpacity>
                    </View>}
                <View style={styles.authContainer}>
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
                        <Text style={styles.authText}>
                            {firebase.auth().currentUser ? 'Sign Out' : 'Link Account'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    sortableList: {
        flex: 1,
    },
    sortableListContent: {
        flex: 1,
        width: Layout.window.width,
        paddingTop: 5
    },
    authContainer: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowColor: '#444'
    },
    authText: {
        color: Colors.darkBlue,
        fontSize: 25,
        fontFamily: Fonts.AvenirNext
    },
    addHabitButton: {
        height: 60,
        width: 200,
        borderRadius: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.darkBlue
    },
    addHabitText: {
        color: 'white',
        fontFamily: Fonts.AvenirMedium,
        fontSize: 18
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsHomeScreen);
