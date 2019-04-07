import React from 'react'
import {
    View,
    StyleSheet,
} from 'react-native'
import { connect } from 'react-redux';
import HabitComponent from '../components/HabitComponent';
import CalendarComponent from '../components/CalendarComponent';
import { ScrollView } from 'react-native-gesture-handler';
import Octicons from 'react-native-vector-icons/Octicons'
import Colors from '../constants/Colors'

const mapStateToProps = (state) => {
    let currentSelectedDate = state.calendarState.currentSelectedDate
    return {
        currentSelectedDate: currentSelectedDate,
        dataOnDate: state.history.hasOwnProperty(currentSelectedDate) ? state.history[currentSelectedDate] : {}
    }
}

class CalendarHomeScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Momentum',
        headerBackTitle: 'Calendar',
        headerRight: navigation.state.params ? navigation.state.params.headerRight : null
    })

    componentDidMount() {
        this.props.navigation.setParams({
            headerRight: (
                <Octicons
                    name={'plus'}
                    color={Colors.calendarBlue}
                    style={{ marginRight: 20 }}
                    size={35}
                    onPress={() => this.props.navigation.push('AddHabit')}
                />
            )
        })
    }

    render() {
        let index = 0;
        let habits = Object.keys(this.props.dataOnDate).map((habit) => {
            return (
                <HabitComponent key={index++} habitName={habit} date={this.props.currentSelectedDate} />
            )
        })
        return (
            <View style={styles.container}>
                <View style={styles.calendarContainer}>
                    <CalendarComponent />
                </View>

                <ScrollView style={styles.scrollContainer}>
                    {habits}
                </ScrollView>
            </View>
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
        paddingVertical: 2
    }
})

export default connect(mapStateToProps)(CalendarHomeScreen)