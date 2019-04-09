import React from 'react'
import {
    View,
    StyleSheet,
    SafeAreaView,
    Text
} from 'react-native'
import { connect } from 'react-redux';
import HabitComponent from '../components/HabitComponent';
import CalendarComponent from '../components/CalendarComponent';
import { ScrollView } from 'react-native-gesture-handler';
import Octicons from 'react-native-vector-icons/Octicons'
import Colors from '../constants/Colors'
import Fonts from '../constants/Fonts';

const mapStateToProps = (state) => {
    let currentSelectedDate = state.calendarState.currentSelectedDate
    return {
        currentSelectedDate: currentSelectedDate,
        dataOnDate: state.history.hasOwnProperty(currentSelectedDate) ? state.history[currentSelectedDate] : {}
    }
}

class CalendarHomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    render() {
        let index = 0;
        let habits = Object.keys(this.props.dataOnDate).map((habit) => {
            return (
                <HabitComponent key={index++} habitName={habit} date={this.props.currentSelectedDate} />
            )
        })
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.calendarContainer}>
                    <CalendarComponent />
                </View>

                <View style={styles.outsideScrollContainer}>
                    <ScrollView
                        style={styles.scrollContainer}
                        scrollEnabled={habits.length != 0}
                        >
                        {habits.length != 0 ?
                            habits :
                            <View style={styles.noHabitContainer}>
                                <Text style={styles.noHabitText}>There are no habits for today!</Text>
                            </View>
                        }
                    </ScrollView>
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
    scrollContainer: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
        paddingVertical: 2,
    },
    outsideScrollContainer: {
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.3,
        shadowColor: '#444',
        marginVertical: 5,
        width: '100%',
        height: '100%',
    },
    noHabitContainer: {
        marginVertical: 25,
        alignItems: 'center',
    },
    noHabitText: {
        color: Colors.darkBlue,
        fontFamily: Fonts.AvenirMedium,
        fontSize: 22
    }
})

export default connect(mapStateToProps)(CalendarHomeScreen)