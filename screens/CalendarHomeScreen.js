import React from 'react'
import {
    View,
    StyleSheet,
    SafeAreaView,
    Text,
    Dimensions
} from 'react-native'
import { connect } from 'react-redux';
import HabitComponent from '../components/HabitComponent';
import CalendarComponent from '../components/CalendarComponent';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Colors from '../constants/Colors'
import Fonts from '../constants/Fonts';

const {height} = Dimensions.get('window');

const mapStateToProps = (state) => {
    let currentSelectedDate = state.calendarState.currentSelectedDate
    return {
        currentSelectedDate: currentSelectedDate,
        habitSettings: state.settings.habitSettings,
        dataOnDate: state.history.hasOwnProperty(currentSelectedDate) ? state.history[currentSelectedDate] : {},
        habitOrder: state.settings.habitOrder
    }
}

class CalendarHomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    getCompletedIconSize(height) {
        if (height < 600) {
            return 100
        }
        if (height < 700) {
            return 200
        }
        if (height < 800) {
            return 240
        }
        return 270
    }

    render() {
        let index = 0;
        let habitsOnDate = Object.keys(this.props.dataOnDate)

        //Filter by habits that must be done today
        let habits = this.props.habitOrder.filter((habit) => habitsOnDate.includes(habit))
        let hasHabitsToday = (habits.length > 0)

        //Filter by habits that should still display and return the component
        habits = habits.filter((habit) => (
            !(this.props.dataOnDate[habit].completed && this.props.habitSettings[habit].disappearWhenCompleted)
        )).map((habit) => {
            return (
                <HabitComponent key={index++} habitName={habit} date={this.props.currentSelectedDate} />
            )
        })

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.calendarContainer}>
                    <CalendarComponent/>
                </View>

                <View style={styles.outsideScrollContainer}>
                    <ScrollView
                        style={styles.scrollContainer}
                        scrollEnabled={habits.length != 0}
                    >
                        {habits.length != 0 ?
                            habits :
                            <View style={styles.noHabitContainer}>
                                <Text style={styles.noHabitText}>
                                    {hasHabitsToday ? "All habits completed!" : "There are no habits for today!"}
                                </Text>
                                {hasHabitsToday ?
                                    <Ionicons
                                        name={'md-checkbox'}
                                        size={this.getCompletedIconSize(height)}
                                        color={Colors.aqua}>
                                    </Ionicons>
                                    : null}
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
        flex: 1,
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.3,
        shadowColor: '#444',
        marginTop: 5,
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