import React from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    DatePickerIOS,
    TouchableOpacity,
    SafeAreaView,
    AlertIOS
} from 'react-native'
import { connect } from 'react-redux';
import Colors from '../constants/Colors'
import Fonts from '../constants/Fonts'
import { CheckBox } from 'react-native-elements'
import DualToggle from '../components/DualToggle'
import DaysOfWeekToggle from './DaysOfWeekToggle';
import Layout from '../constants/Layout';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            habitName: '',
            frequencyToggle: DAILY,
            daysOfWeek: [true, true, true, true, true, true, true],
            timeRangeChecked: false,
            beginTime: new Date(),
            endTime: new Date(),
            goal: '',
            units: '',
            includeMeasurementsChecked: false,
            includeSubtasksChecked: false,
            strictOrderChecked: false,
            disappearWhenCompleted: false,
            subtasks: [],
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
        if (sectionMapping[section] === WEEKLY) {
            this.setState({ daysOfWeek: [false, false, false, false, false, false, false] })

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

    removeSubtask = (index) => {
        var subtasks = this.state.subtasks;
        subtasks.splice(index,1)
        this.setState({ subtasks })
    }

    subtasks = () => {
        return this.state.subtasks.map((task, i) => {
            return (
                <View 
                    key={i}
                    style={styles.subtaskContainer}
                >
                    <Text style={styles.subtaskTitleText}>{task}</Text>
                    <TouchableOpacity
                        onPress={() => this.removeSubtask(i)}
                    >
                        <Ionicons size={30} color={Colors.aqua} name={'ios-trash'}/>
                    </TouchableOpacity>
                </View>
            )
        })
    }

    addSubtask = () => {
        AlertIOS.prompt('Enter a subtask name', null, (text) => {
            var subtasks = this.state.subtasks;
            subtasks.push(text)
            this.setState({ subtasks })
        });
    }

    addHabit = () => {
        this.props.navigation.navigate('CalendarHome')
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.cancelButtonContainer}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.pop()}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView 
                    style={styles.scrollviewContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {/*||||||||||||||   HABIT NAME   |||||||||||||||||*/}
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

                    {/*|||||||||||||||||||   DAYS     |||||||||||||||||*/}
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

                    <View style={styles.optionsContainer}>

                        {/*||||||||||||||   TIME RANGE   |||||||||||||||||*/}

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
                            {
                                this.state.timeRangeChecked &&
                                <View style={styles.timeRangeFieldsContainer}>
                                    <View style={styles.timeRangePickerContainer}>
                                        <Text style={styles.timeRangeFieldsText}>After</Text>
                                        <DatePickerIOS
                                            mode={"time"}
                                            minuteInterval={10}
                                            onDateChange={(time) => this.setState({beginTime: time})}
                                            date={this.state.beginTime}
                                        />
                                    </View>
                                    <View style={styles.timeRangePickerContainer}>
                                        <Text style={styles.timeRangeFieldsText}>Before</Text>
                                        <DatePickerIOS
                                            mode={"time"}
                                            minuteInterval={10}
                                            onDateChange={(time) => this.setState({endTime: time})}
                                            date={this.state.endTime}
                                        />
                                    </View>
                                </View>
                            }
                        </View>

                        {/* ||||||||||||||    MEASUREMENTS   ||||||||||||||*/}

                        <View style={styles.measurementsCheckbox}>
                            <CheckBox
                                title={'Include a Measurements'}
                                checked={this.state.includeMeasurementsChecked}
                                onPress={() => {
                                    let checked = !this.state.includeMeasurementsChecked
                                    if (!checked) {
                                        this.setState({ goal: '', units: '' })
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

                        {
                            this.state.includeMeasurementsChecked &&
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
                                        autoCorrect={false}
                                        autoCapitalize={'none'}
                                        selectTextOnFocus={true}
                                        value={this.state.units}
                                        editable={this.state.includeMeasurementsChecked}
                                    />
                                </View>
                            </View>
                        }

                        {/*||||||||||||||||   SUBTASKS   |||||||||||||||||*/}

                        <View style={styles.subtasksContainer}>
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
                                />
                                {
                                    this.state.includeSubtasksChecked &&
                                    <TouchableOpacity
                                        onPress={() => this.addSubtask()}
                                    >
                                        <Octicons name={'plus'} color={Colors.aqua} size={35}/>
                                    </TouchableOpacity>
                                }
                            </View>
                            {this.subtasks()}
                        </View>
                    </View>

                    {/*||||||||||||   COMPLETE ACTION   |||||||||||||||*/}

                    <View style={styles.completionActionToggle}>
                        <DualToggle
                            labels={['Change Color', 'Disappear']}
                            setParentState={this.setCompletionActionToggle.bind(this)}
                        />
                    </View>
                </ScrollView>
                <View style={styles.addButtonContainer}>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => this.addHabit()}
                        >
                            <Text style={styles.addButtonText}> ADD </Text>
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
    cancelButtonContainer: {
        margin: 10
    },
    cancelButtonText: {
        fontSize: 18,
        color: Colors.aqua
    },
    scrollviewContainer: {
        flex: 1,
        alignContent: 'center'
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
    optionsContainer: {
        alignContent: 'flex-start',
        marginVertical: 30
    },
    checkboxContainer: {
        backgroundColor: 'white',
        borderWidth: 0,
        padding: 0,
    },
    checkboxText: {
        color: Colors.aqua,
        fontFamily: Fonts.AvenirNext,
        fontSize: 20
    },
    dailyWeeklyToggle: {
        marginVertical: 10
    },
    daysOfWeekToggle: {
        marginVertical: 10,
        alignItems: 'center'
    },
    timeRangeCheckbox: {

    },
    timeRangeFieldsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    timeRangePickerContainer: {
        width: 150
    },
    timeRangeFieldsText: {
        fontSize: 18,
        color: Colors.aqua
    },
    measurementsCheckbox: {

    },
    measurementFieldsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    subtaskContainer: {
        marginHorizontal: 30,
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    subtaskTitleText: {
        fontSize: 20,
        fontWeight: '500',
        color: Colors.aqua
    },
    completionActionToggle: {

    },
    addButtonContainer: {
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
        shadowOffset: {width: 0, height: -5},
        shadowOpacity: 0.1,
        shadowColor: '#444'
    },
    addButton: {
        marginVertical: 15,
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
