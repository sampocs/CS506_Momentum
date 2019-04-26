import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Easing,
    Alert,
} from 'react-native'
import {
    deleteHabitFromFuture,
    deleteHabitFromPast,
    deleteHabitFromHabitOrder,
    deleteHabitFromHabitSettings
} from '../actions/actions'
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation'
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons'

const mapStateToProps = (state) => {
    return {
        startDate: state.settings.user.startDate
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteHabitFromFuture: (habitName) => dispatch(deleteHabitFromFuture(habitName)),
        deleteHabitFromPast: (habitName, startDate) => dispatch(deleteHabitFromPast(habitName, startDate)),
        deleteHabitFromHabitOrder: (habitName) => dispatch(deleteHabitFromHabitOrder(habitName)),
        deleteHabitFromHabitSettings: (habitName) => dispatch(deleteHabitFromHabitSettings(habitName))
    }
}

class ModifyHabitComponent extends React.Component {
    constructor(props) {
        super(props);

        this._active = new Animated.Value(0);

        this._style = {
            transform: [{
                scale: this._active.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.1],
                }),
            }],
            shadowRadius: this._active.interpolate({
                inputRange: [0, 1],
                outputRange: [2, 10],
            }),
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.active !== nextProps.active) {
            Animated.timing(this._active, {
                duration: 300,
                easing: Easing.bounce,
                toValue: Number(nextProps.active),
            }).start();
        }
    }

    deleteHabit() {
        Alert.alert(
            'Delete Habit',
            'Are you sure you want to delete this habit?',
            [
            {
                text: 'Yes, but retain history',
                onPress: () => { 
                    this.props.deleteHabitFromFuture(this.props.habitName)
                    this.props.deleteHabitFromHabitOrder(this.props.habitName)
                    },
                style: 'cancel',
            },
            {   
                text: 'Yes, and delete all history', 
                onPress: () => {
                    this.props.deleteHabitFromFuture(this.props.habitName)
                    this.props.deleteHabitFromPast(this.props.habitName, this.props.startDate) 
                    this.props.deleteHabitFromHabitSettings(this.props.habitName)
                    this.props.deleteHabitFromHabitOrder(this.props.habitName)
                }
            },
            {
                text: 'Cancel',
                style: 'cancel',
            },
            ],
        );
    }

    render() {
        const { habitName, active } = this.props;

        return (
            <Animated.View style={[
                styles.container,
                this._style,
            ]}>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>
                        {habitName}
                    </Text>
                </View>
                <View style={styles.editContainer}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.push('EditHabit', { habitName: habitName })}
                    >
                        <Text style={styles.editText}>
                            Edit
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.deleteHabit()}>
                        <Text style={styles.editText}>
                            Delete
                    </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.dragContainer}>
                    <Ionicons name={'ios-menu'} color={'white'} size={30}/>
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        flexDirection: 'row',
        marginHorizontal: 10,
        backgroundColor: Colors.darkBlue,
        borderRadius: 10,
        marginVertical: 5,
        marginBottom: 7
    },
    nameContainer: {
        width: '65%',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingRight: 5
    },
    nameText: {
        fontFamily: Fonts.AvenirNext,
        fontSize: 30,
        color: 'white'
    },
    editContainer: {
        width: '20%',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    editText: {
        fontFamily: Fonts.AvenirMedium,
        fontSize: 20,
        color: 'white'
    },
    dragContainer: {
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ModifyHabitComponent))