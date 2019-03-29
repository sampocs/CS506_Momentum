import React from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    DatePickerIOS,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux';
import Colors from '../constants/Colors'
import Fonts from '../constants/Fonts'
import { CheckBox } from 'react-native-elements'
import DualToggle from '../components/DualToggle'
import DaysOfWeekToggle from './DaysOfWeekToggle';
import Layout from '../constants/Layout';

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const DAILY = 'DAILY'
const WEEKLY = 'WEEKLY'

class AddHabitScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            habitName: '',
            frequencyToggle: DAILY,
            daysOfWeek: [true, true, true, true, true, true, true],
            timeRangeChecked: false,
            beginTime: '',
            endTime: '',
            goal: '',
            units: '',
            includeMeasurementsChecked: false,
            includeSubtasksChecked: false,
            strictOrderChecked: false,
            disappearWhenCompleted: false
        }
    }

    setFrequencyToggle(section) {
        const sectionMapping = {
            LEFT: DAILY,
            RIGHT: WEEKLY
        }
        this.setState({ frequencyToggle: sectionMapping[section] })
        if (sectionMapping[section] === DAILY) {
            this.setState({ daysOfWeek: [true, true, true, true, true, true, true] })
        }
    }

    setDaysOfWeekToggle(daysOfWeek) {
        this.setState({ daysOfWeek: daysOfWeek })
    }

    setCompletionActionToggle(section) {
        const sectionMapping = {
            LEFT: false,
            RIGHT: true
        }
        this.setState({ disappearWhenCompleted: sectionMapping[section] })
    }

    render() {
        return (
            <View style={styles.container}>

                {/*//////////////////////////////////////////////
                ||||||||||||||   HABIT NAME   |||||||||||||||||
                /////////////////////////////////////////////*/}
                <View style={styles.habitNameContainer}>
                    <TextInput
                        style={styles.habitName}
                        placeholder={'Habit Name'}
                        placeholderTextColor={Colors.lightGreyText}
                        onChangeText={(text) => {
                            this.setState({ habitName: text })
                        }}
                        returnKeyType={'done'}
                        selectTextOnFocus={true}
                        value={this.state.habitName}
                    />
                </View>

                {/*//////////////////////////////////////////////
                |||||||||||||||||||   DAYS     |||||||||||||||||
                /////////////////////////////////////////////*/}

                <View style={styles.dailyWeeklyToggle}>
                    <DualToggle
                        labels={['Daily', 'Weekly']}
                        setParentState={this.setFrequencyToggle.bind(this)}
                    />
                </View>

                <View style={styles.daysOfWeekToggle}>
                    <DaysOfWeekToggle
                        daysOfWeek={this.state.daysOfWeek}
                        setParentState={this.setDaysOfWeekToggle.bind(this)}
                        clickable={this.state.frequencyToggle != DAILY}
                    />
                </View>

                {/*//////////////////////////////////////////////
                ||||||||||||||   TIME RANGE   |||||||||||||||||
                /////////////////////////////////////////////*/}

                <View style={styles.timeRangeCheckbox}>
                    <CheckBox
                        title={'Include a Time Range'}
                        checked={this.state.timeRangeChecked}
                        onPress={() => {
                            this.setState({
                                timeRangeChecked: !this.state.timeRangeChecked,
                            })
                        }}
                        containerStyle={styles.checkboxContainer}
                        textStyle={styles.checkboxText}
                        uncheckedColor={Colors.aqua}
                        checkedColor={Colors.aqua}
                        size={40}
                    >
                    </CheckBox>
                </View>

                <View style={styles.timeRangeFieldsContainer}>

                </View>

                {/*//////////////////////////////////////////////
                ||||||||||||||    MEASUREMENTS   ||||||||||||||
                /////////////////////////////////////////////*/}

                <View style={styles.measurementsCheckbox}>
                    <CheckBox
                        title={'Include a Measurements'}
                        checked={this.state.includeMeasurementsChecked}
                        onPress={() => {
                            let checked = !this.state.includeMeasurementsChecked
                            if (!checked) {
                                this.setState({ goal: '', units: ''})
                            }
                            this.setState({
                                includeMeasurementsChecked: checked,
                            })
                        }}
                        containerStyle={styles.checkboxContainer}
                        textStyle={styles.checkboxText}
                        uncheckedColor={Colors.aqua}
                        checkedColor={Colors.aqua}
                        size={40}
                    >
                    </CheckBox>
                </View>

                <View style={styles.measurementFieldsContainer}>
                    <View style={styles.measurementFields}>
                        <TextInput
                            style={styles.fieldText}
                            placeholder={'Goal'}
                            placeholderTextColor={Colors.lightGreyText}
                            onChangeText={(text) => {
                                this.setState({ goal: text })
                            }}
                            keyboardType={'numeric'}
                            maxLength={5}
                            returnKeyType={'done'}
                            selectTextOnFocus={true}
                            value={this.state.goal}
                            editable={this.state.includeMeasurementsChecked}
                        />
                    </View>
                    <View style={styles.measurementFields}>
                        <TextInput
                            style={styles.fieldText}
                            placeholder={'Units'}
                            placeholderTextColor={Colors.lightGreyText}
                            onChangeText={(text) => {
                                this.setState({ units: text })
                            }}
                            returnKeyType={'done'}
                            selectTextOnFocus={true}
                            value={this.state.units}
                            editable={this.state.includeMeasurementsChecked}
                        />
                    </View>
                </View>

                {/*//////////////////////////////////////////////
                ||||||||||||||||   SUBTASKS   |||||||||||||||||
                /////////////////////////////////////////////*/}

                <View style={styles.subtasksCheckbox}>
                    <CheckBox
                        title={'Include Subtasks'}
                        checked={this.state.includeSubtasksChecked}
                        onPress={() => {
                            this.setState({
                                includeSubtasksChecked: !this.state.includeSubtasksChecked,
                            })
                        }}
                        containerStyle={styles.checkboxContainer}
                        textStyle={styles.checkboxText}
                        uncheckedColor={Colors.aqua}
                        checkedColor={Colors.aqua}
                        size={40}
                    >
                    </CheckBox>
                </View>

                {/*//////////////////////////////////////////////
                ||||||||||||   COMPLETE ACTION   |||||||||||||||
                /////////////////////////////////////////////*/}

                <View style={styles.completionActionToggle}>
                    <DualToggle
                        labels={['Change Color', 'Disappear']}
                        setParentState={this.setCompletionActionToggle.bind(this)}
                    />
                </View>

                <TouchableOpacity
                    style={styles.addButton}>
                        <Text style={styles.addButtonText}> ADD </Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const maxWidth = 330

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 60
    },
    habitNameContainer: {
        margin: 20,
        alignItems: 'center',
        borderBottomColor: Colors.aqua,
        borderBottomWidth: 3,
        paddingBottom: 3
    },
    habitName: {
        color: Colors.aqua,
        fontSize: 27,
        fontFamily: Fonts.AvenirNext,
        textAlign: 'center',
        minWidth: 200
    },
    checkboxContainer: {
        backgroundColor: 'white',
        borderWidth: 0,
        height: 50,
        padding: 0,
        width: Layout.window.width - 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxText: {
        color: Colors.aqua,
        fontFamily: Fonts.AvenirNext,
        fontSize: 20
    },
    dailyWeeklyToggle: {

    },
    daysOfWeekToggle: {

    },
    timeRangeCheckbox: {

    },
    timeRangeFieldsContainer: {
        flexDirection: 'row'
    },
    measurementsCheckbox: {

    },
    measurementFieldsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    measurementFields: {
        alignItems: 'center',
        borderBottomColor: Colors.aqua,
        borderBottomWidth: 3,
        paddingBottom: 3,
        marginHorizontal: 10
    },
    fieldText: {
        color: Colors.aqua,
        fontSize: 20,
        fontFamily: Fonts.AvenirNext,
        textAlign: 'center',
        minWidth: 70
    },
    subtasksCheckbox: {

    },
    completionActionToggle: {

    },
    addButton: {
        backgroundColor: Colors.aqua,
        height: 60,
        width: 200,
        borderRadius: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonText: {
        color: 'white',
        fontFamily: Fonts.AvenirNext,
        fontSize: 20
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddHabitScreen);
