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
    AlertIOS,
    Modal,
    FlatList,
    Dimensions,
} from 'react-native'
import { connect } from 'react-redux';
import Colors from '../constants/Colors'
import Fonts from '../constants/Fonts'
import { CheckBox } from 'react-native-elements'
import DualToggle from '../components/DualToggle'
import DaysOfWeekToggle from '../components/DaysOfWeekToggle';
import {
    addHabitToHistory,
    addHabitToHabitSettings,
    addHabitToHabitOrder
} from '../actions/actions'
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../constants/Constants';
import { formatDate } from '../helpers/dateOperations';
import Icons from '../constants/Icons';
import HabitIcon from '../components/HabitIcon';

const NUM_COLUMNS = 4;
const { width } = Dimensions.get('window');

const mapStateToProps = (state) => {
    return {
        currentHabits: state.settings.habitOrder
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addHabitToHabitSettings: (habitName, habitSettings) => dispatch(addHabitToHabitSettings(habitName, habitSettings)),
        addHabitToHistory: (habitName, habitHistory, daysOfWeek, startTomorrow) => dispatch(addHabitToHistory(habitName, habitHistory, daysOfWeek, startTomorrow)),
        addHabitToHabitOrder: (habitName) => dispatch(addHabitToHabitOrder(habitName))
    }
}

class AddHabitScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            habitName: '',
            daysOfWeek: [true, true, true, true, true, true, true],
            timeRangeChecked: false,
            beginTime: new Date(),
            endTime: new Date(),
            goal: '',
            unit: '',
            includeMeasurementsChecked: false,
            includeSubtasksChecked: false,
            disappearWhenCompleted: false,
            subtasks: [],
            icon: 'spinner',
            modalVisible: false,
            iconChosen: false,
            addingHabit: false
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
        subtasks.splice(index, 1)
        this.setState({ subtasks })
    }

    subtasks = () => {
        return this.state.subtasks.map((task, i) => {
            return (
                <View
                    key={i}
                    style={styles.subtaskContainer}
                >
                    <Text style={styles.subtaskTitleText} ellipsizeMode={'tail'}>{task}</Text>
                    <TouchableOpacity
                        onPress={() => this.removeSubtask(i)}
                    >
                        <Ionicons size={30} color={Colors.calendarBlue} name={'ios-trash'} />
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
        this.setState({ addingHabit: true })
        if (!this.fieldsCompleted(alertUser = true)) {
            return;
        }

        let habitSettings = {
            startTime: formatDate(this.state.beginTime, "YYYY-MM-DD"),
            endTime: formatDate(this.state.endTime, "YYYY-MM-DD"),
            disappearWhenCompleted: this.state.disappearWhenCompleted,
            daysOfWeek: this.state.daysOfWeek,
            icon: this.state.icon
        }
        let habitHistory = {
            completed: false,
            notes: ''
        }
        if (this.state.includeMeasurementsChecked) {
            habitSettings.type = Constants.PROGRESS
            habitSettings.habitInfo = {
                unit: this.state.unit,
                goal: this.state.goal.indexOf('.') === 0 ? 0 : parseInt(this.state.goal)
            }

            habitHistory.type = Constants.PROGRESS
            habitHistory.habitInfo = {
                progress: 0,
                goal: this.state.goal.indexOf('.') === 0 ? 0 : parseInt(this.state.goal)
            }
        }
        else if (this.state.includeSubtasksChecked) {
            habitSettings.type = Constants.SUBTASK
            habitSettings.habitInfo = {
                subtasks: this.state.subtasks
            }
            habitHistory.type = Constants.SUBTASK
            habitHistory.habitInfo = {
                subtasks: this.state.subtasks.map((subtask) => [subtask, false])
            }
        }
        else {
            habitSettings.type = Constants.COMPLETE
            habitSettings.habitInfo = {}
            habitHistory.type = Constants.COMPLETE
            habitHistory.habitInfo = {}
        }
        this.props.addHabitToHabitSettings(this.state.habitName, habitSettings)
        this.props.addHabitToHabitOrder(this.state.habitName)
        this.props.addHabitToHistory(this.state.habitName, habitHistory, this.state.daysOfWeek, false)
        this.props.navigation.navigate('CalendarHome')
    }

    fieldsCompleted(alertUser = false) {
        if (this.state.habitName === '') {
            if (alertUser) {
                AlertIOS.alert(
                    '',
                    'Please enter a habit name!'
                )
            }
            return false
        }
        if (this.state.includeMeasurementsChecked && 
            (this.state.goal === '' || this.state.goal === '.' || this.state.goal.indexOf('.') === 0)) {
            if (alertUser) {
                AlertIOS.alert(
                    '',
                    'Please enter a measurable goal amount!'
                )
            }
            return false
        }
        if (this.state.includeMeasurementsChecked && this.state.goal.replace(/[^.]/g, "").length > 1) {
            if (alertUser) {
                AlertIOS.alert(
                    '',
                    'Please enter a valid goal amount!'
                )
            }
            return false
        }
        if (this.state.includeSubtasksChecked && this.state.subtasks.length === 0) {
            if (alertUser) {
                AlertIOS.alert(
                    '',
                    "Please enter at least one subtask!"
                )
            }
            return false
        }
        for (i in this.props.currentHabits) {
            let habit = this.props.currentHabits[i]
            if (this.state.habitName.toLowerCase() === habit.toLowerCase()) {
                if (alertUser) {
                    AlertIOS.alert(
                        "Duplicate Habit",
                        "You've already added this habit!"
                    )
                }
                return false
            }
        }
        return true;
    }

    renderSeparator = () => {
        return (
            <View style={styles.separatorComponent} />
        );
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
                            keyboardType={'ascii-capable'}
                            value={this.state.habitName}
                        />
                    </View>

                    {/*|||||||||||||||||||   DAYS OF WEEK    |||||||||||||||||*/}
                    <View style={styles.daysOfWeekToggle}>
                        <DaysOfWeekToggle
                            daysOfWeek={this.state.daysOfWeek}
                            setParentState={this.setDaysOfWeekToggle.bind(this)}
                            color={Colors.calendarBlue}
                        />
                    </View>

                    <View style={styles.optionsContainer}>

                        {/*||||||||||||||   TIME RANGE   |||||||||||||||||*/}
                        {
                            false &&
                            <View style={styles.timeRangeCheckbox}>
                                <CheckBox
                                    title={'Include a Time Range'}
                                    checked={this.state.timeRangeChecked}
                                    onPress={() => {
                                        this.setState({
                                            timeRangeChecked: !this.state.timeRangeChecked
                                        })
                                    }}
                                    containerStyle={styles.checkboxContainer}
                                    textStyle={styles.checkboxText}
                                    uncheckedColor={Colors.calendarBlue}
                                    checkedColor={Colors.calendarBlue}
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
                                                onDateChange={(time) => this.setState({ beginTime: time })}
                                                date={this.state.beginTime}
                                            />
                                        </View>
                                        <View style={styles.timeRangePickerContainer}>
                                            <Text style={styles.timeRangeFieldsText}>Before</Text>
                                            <DatePickerIOS
                                                mode={"time"}
                                                minuteInterval={10}
                                                onDateChange={(time) => this.setState({ endTime: time })}
                                                date={this.state.endTime}
                                            />
                                        </View>
                                    </View>
                                }
                            </View>
                        }

                        {/* ||||||||||||||    MEASUREMENTS   ||||||||||||||*/}
                        <View style={styles.measurementsCheckbox}>
                            <CheckBox
                                title={'Include a Measurements'}
                                checked={this.state.includeMeasurementsChecked}
                                onPress={() => {
                                    let checked = !this.state.includeMeasurementsChecked
                                    if (!checked) {
                                        this.setState({ goal: '', unit: '' })
                                    }
                                    this.setState({
                                        includeMeasurementsChecked: checked,
                                        includeSubtasksChecked: false,
                                        subtasks: []
                                    })
                                }}
                                containerStyle={styles.checkboxContainer}
                                textStyle={styles.checkboxText}
                                uncheckedColor={Colors.calendarBlue}
                                checkedColor={Colors.calendarBlue}
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
                                            this.setState({ unit: text })
                                        }}
                                        returnKeyType={'done'}
                                        autoCorrect={false}
                                        autoCapitalize={'none'}
                                        selectTextOnFocus={true}
                                        value={this.state.unit}
                                        keyboardType={'ascii-capable'}
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
                                            includeMeasurementsChecked: false,
                                            goal: '',
                                            unit: ''
                                        })
                                    }}
                                    containerStyle={styles.checkboxContainer}
                                    textStyle={styles.checkboxText}
                                    uncheckedColor={Colors.calendarBlue}
                                    checkedColor={Colors.calendarBlue}
                                    size={40}
                                />
                                {
                                    this.state.includeSubtasksChecked &&
                                    <TouchableOpacity
                                        onPress={() => this.addSubtask()}
                                    >
                                        <Octicons name={'plus'} color={Colors.calendarBlue} size={35} />
                                    </TouchableOpacity>
                                }
                            </View>
                            {this.state.includeSubtasksChecked && this.subtasks()}
                        </View>
                    </View>

                    {/*||||||||||||   COMPLETE ACTION   |||||||||||||||*/}
                    <View style={styles.completionActionToggle}>
                        <DualToggle
                            color={Colors.calendarBlue}
                            labels={['Change Color', 'Disappear']}
                            setParentState={this.setCompletionActionToggle.bind(this)}
                        />
                    </View>


                    {/*||||||||||||   ICON MODAL SCREEN   |||||||||||||||*/}
                    <View style={styles.chooseIconButtonContainer}>
                        <TouchableOpacity
                            style={styles.chooseIconButton}
                            onPress={() => this.setState({ modalVisible: true })}
                        >
                            {
                                this.state.iconChosen && <HabitIcon icon={this.state.icon} completed={false} color={'white'} />
                            }
                            {
                                !this.state.iconChosen && <Text style={styles.chooseIconText}>Choose Icon</Text>
                            }
                        </TouchableOpacity>
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <SafeAreaView style={styles.modalContainer}>
                            <View style={styles.cancelButtonContainer}>
                                <TouchableOpacity
                                    onPress={() => this.setState({ modalVisible: false })}
                                >
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.outsideScrollContainer}>
                                <ScrollView style={styles.iconScrollView}>
                                    <FlatList
                                        data={Object.keys(Icons)}
                                        renderItem={({ item, separators, index }) => (
                                            <View style={[styles.iconContainer, (index % NUM_COLUMNS != NUM_COLUMNS - 1) ? { borderRightColor: Colors.calendarBlue, borderRightWidth: 1 } : {}]}>
                                                <TouchableOpacity
                                                    onShowUnderlay={separators.highlight}
                                                    onHideUnderlay={separators.unhighlight}
                                                    onPress={() => { this.setState({ icon: item }); this.setState({ modalVisible: false }); this.setState({ iconChosen: true }) }}
                                                >
                                                    <HabitIcon icon={item} completed={false} color={(this.state.icon == item) ? Colors.calendarBlue : 'black'} />
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                        keyExtractor={(key) => key}
                                        horizontal={false}
                                        numColumns={NUM_COLUMNS}
                                        ItemSeparatorComponent={this.renderSeparator}
                                    />
                                </ScrollView>
                            </View>
                        </SafeAreaView>
                    </Modal>
                </ScrollView>

                {/*||||||||||||   ADD HABIT BUTTON   |||||||||||||||*/}
                <View style={styles.addButtonContainer}>
                    <TouchableOpacity
                        onPress={() => this.addHabit()}
                    >
                        <Text style={[styles.addButtonText, { color: this.fieldsCompleted() ? Colors.calendarBlue : Colors.lightGreyText }]}>Add Habit</Text>
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
        color: Colors.calendarBlue
    },
    scrollviewContainer: {
        flex: 1,
        alignContent: 'center'
    },
    habitNameContainer: {
        margin: 20,
        alignItems: 'center',
        borderBottomColor: Colors.calendarBlue,
        borderBottomWidth: 3,
        paddingBottom: 3
    },
    habitName: {
        color: Colors.calendarBlue,
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
        color: Colors.calendarBlue,
        fontFamily: Fonts.AvenirNext,
        fontSize: 20
    },
    daysOfWeekToggle: {
        marginVertical: 10,
        alignItems: 'center'
    },
    timeRangeFieldsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timeRangePickerContainer: {
        width: 150
    },
    timeRangeFieldsText: {
        fontSize: 18,
        color: Colors.calendarBlue
    },
    measurementFieldsContainer: {
        flexDirection: 'row',
        paddingVertical: 15
    },
    measurementFields: {
        alignItems: 'center',
        borderBottomColor: Colors.calendarBlue,
        borderBottomWidth: 3,
        paddingBottom: 3,
        marginRight: 10
    },
    fieldText: {
        color: Colors.calendarBlue,
        fontSize: 20,
        fontFamily: Fonts.AvenirNext,
        textAlign: 'center',
        minWidth: 70
    },
    subtasksCheckbox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 25
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
        color: Colors.calendarBlue
    },
    completionActionToggle: {
        alignSelf: 'center'
    },
    addButtonContainer: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowColor: '#444'
    },
    chooseIconButton: {
        marginVertical: 15,
        height: 60,
        width: 200,
        borderRadius: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.calendarBlue
    },
    addButtonText: {
        fontFamily: Fonts.AvenirNext,
        fontSize: 25
    },
    chooseIconButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    chooseIconText: {
        color: 'white',
        fontFamily: Fonts.AvenirNext,
        fontSize: 20
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center'
    },
    iconContainer: {
        width: width / NUM_COLUMNS,
        height: 75,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    separatorComponent: {
        height: 1,
        backgroundColor: Colors.calendarBlue,
        marginHorizontal: 5
    },
    iconScrollView: {
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
})

export default connect(mapStateToProps, mapDispatchToProps)(AddHabitScreen);