
import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Button,
    Alert
} from 'react-native'
import {
    deleteHabitFromPast,
    deleteHabitFromFuture,
    deleteHabitFromSettings
} from '../actions/actions'
import Colors from '../constants/Colors'
import Fonts from '../constants/Fonts';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons'
import icons from '../constants/Icons'
import { withNavigation } from 'react-navigation'

const mapStateToProps = (state) => {
    return {
        currentHabits: state.settings.habitSettings,
        startDate: state.settings.user.startDate,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteHabitFromPast: (habitName, startDate) => dispatch(deleteHabitFromPast(habitName, startDate)),
        deleteHabitFromFuture: (habitName) => dispatch(deleteHabitFromFuture(habitName)),
        deleteHabitFromSettings:(habitName) => dispatch(deleteHabitFromSettings(habitName)),
    }
}
class SettingsEditableHabitComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataOnDate: props.dataOnDate,
            habits: this.props.habits
        }
    }
    _renderItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.container}
            onPress={() => {
               
            }}>
            <View style={styles.habitTextContainer}>
                <Text style={styles.habitText}>{item}</Text>
                {/* <Text>{icons.pencil}</Text>> */}
            </View>
            <View style={styles.metricContainer}>
                <Button  
                   onPress={() => {
                    this.props.navigation.navigate('EditHabit', {habitName: item, habitObject: this.props.currentHabits[item], habits: this.props.currentHabits })
                    console.log('item:' + item)
                    }}
                    title='Edit'
                    color='white'
                />
                <Button
                    onPress={() => {
                        Alert.alert(
                            'Delete Habit',
                            'Are you sure you want to delete this habit?',
                            [
                            {
                                text: 'Yes, stop future tracking of this habit',
                                onPress: () => { 
                                    this.props.deleteHabitFromFuture(item)
                                    this.props.deleteHabitFromSettings(item)
                                    // this causes errors in the past calendar
                                    },
                                style: 'cancel',
                            },
                            {   
                                text: 'Yes, delete all history of this habit', 
                                onPress: () => {
                                    this.props.deleteHabitFromFuture(item)
                                    this.props.deleteHabitFromPast(item, this.props.startDate) // how to get the date?
                                    this.props.deleteHabitFromSettings(item)
                                }
                            },
                            {
                                text: 'Cancel',
                                onPress: () => console.log(this.props.currentHabits[item].startTime),
                                style: 'cancel',
                            },
                            
                            ],
                            // {cancelable: false},
                        );
                    }}
                    title='Delete'
                    color='white'
                />
            </View>
        </TouchableOpacity>

    );

    render() {
        return (
            <FlatList
                data={this.props.habits}
                renderItem={this._renderItem}
            />
        );
    }
 }


const styles = StyleSheet.create({
    container: {
        height: 90,
        flexDirection: 'row',
        marginHorizontal: 10,
        borderColor: Colors.aqua,
        borderWidth: 5,
        borderRadius: 10,
        marginVertical: 4
    },
    habitTextContainer: {
        width: '70%',
        backgroundColor: Colors.aqua,
        justifyContent: 'center',
        paddingHorizontal: 15,
        borderColor: 'white',
        borderWidth: 0,
        borderRadius: 0
    },
    metricContainer: {
        width: '30%',
        backgroundColor: Colors.aqua,
        justifyContent: 'center',
        alignItems: 'center', 
    },
    habitText: {
        fontFamily: Fonts.AvenirNext,
        fontSize: 30,
        color: 'white',
        justifyContent: 'center',
    }
});

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(SettingsEditableHabitComponent));