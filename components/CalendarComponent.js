import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import { connect } from 'react-redux'
import { getNextDate, getPreviousDay, getCurrentDate } from '../helpers/dateOperations'
import { selectDate, selectToday, toggleMinimizeCal } from '../actions/actions'
import { Calendar } from 'react-native-calendars'

const mapStateToProps = (state) => {
    return {
        currentDate: state.calendarState.currentSelectedDate,
        minimized: state.calendarState.minimized,
        todaySelected: state.calendarState.currentSelectedDate === getCurrentDate()
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDayPress: (date) => dispatch(selectDate(date)),
        onTodayClick: () => dispatch(selectToday()),
        onMinimizeClick: () => dispatch(toggleMinimizeCal())
    }
}

class CalendarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minimized: props.minimized,
            todaySelected: props.todaySelected
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.minimized != this.props.minimized || prevProps.todaySelected != this.props.todaySelected) {
            this.setState({ minimized: this.props.minimized, todaySelected: this.props.currentDate === getCurrentDate() })
        }
    }

    render() {
        let currDate = this.props.currentDate
        let markedDates = {}
        markedDates[currDate] = { selected: true, selectedColor: Colors.calendarBlue }

        let nextDate = getNextDate(currDate)
        let previousDate = getPreviousDay(currDate)

        return (
            <View style={{width: Layout.window.width}}>
                <View style={styles.calendarContainer}>
                    {this.props.minimized ?
                        <Calendar
                            current={currDate}
                            markedDates={markedDates}
                            style={{ height: 40 }}
                            monthFormat={"MMM d"}
                            onDayPress={(date) => { this.props.onDayPress(date.dateString) }}
                            hideExtraDays={true}
                            disableMonthChange={true}
                            firstDay={0}
                            onPressArrowLeft={() => { this.props.onDayPress(previousDate) }}
                            onPressArrowRight={() => { this.props.onDayPress(nextDate) }}
                        />
                        :
                        <Calendar
                            current={currDate}
                            markedDates={markedDates}
                            monthFormat={"MMMM yyyy"}
                            onDayPress={(date) => { this.props.onDayPress(date.dateString) }}
                            hideExtraDays={true}
                            disableMonthChange={true}
                            firstDay={0}
                        />}
                </View>
                <View style={styles.toggleButtonsContainer}>
                    <View style={[
                        styles.buttonContainer,
                        this.state.minimized ? styles.toggleButtonOn : styles.toggleButtonOff]}>
                        <TouchableOpacity onPress={this.props.onMinimizeClick}>
                            <Text style={[
                                styles.buttonText,
                                this.state.minimized ? styles.toggleTextOn : styles.toggleTextOff]}> Minimize </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[
                        styles.buttonContainer,
                        this.state.todaySelected ? styles.toggleButtonOn : styles.toggleButtonOff]}>
                        <TouchableOpacity onPress={this.props.onTodayClick}>
                            <Text style={[
                                styles.buttonText,
                                this.state.todaySelected ? styles.toggleTextOn : styles.toggleTextOff]}>Today</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    calendarContainer: {
        width: '100%',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.lightGreyText
    },
    toggleButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        height: 37,
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: Colors.lightGreyText,
        paddingHorizontal: 15
    },
    buttonContainer: {
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        paddingHorizontal: 10,
        paddingVertical: 3
    },
    toggleButtonOn: {
        backgroundColor: Colors.calendarBlue,
    },
    toggleTextOn: {
        color: 'white'
    },
    toggleButtonOff: {
        backgroundColor: 'white',
    },
    toggleTextOff: {
        color: Colors.calendarBlue
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(CalendarComponent)

