import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    SafeAreaView
} from 'react-native'
import { connect } from 'react-redux';
import Subtask from '../components/Subtask';
import Progress from '../components/Progress';
import Complete from '../components/Complete';
import SwitchType from '../constants/Constants';
import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';
import { formatDate } from '../helpers/dateOperations';
import Layout from '../constants/Layout';
import { updateNote } from '../actions/actions';
import Ionicons from 'react-native-vector-icons/Ionicons'


const mapStateToProps = (state, ownProps) => {
    let props = ownProps.navigation.state.params
    return {
        date: props.date,
        habitName: props.habitName,
        notes: state.history[props.date][props.habitName].notes,
        habitType: state.history[props.date][props.habitName].type
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNote: (habitName, date, notes) => dispatch(updateNote(habitName, date, notes))
    }
}


class HabitScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: props.notes,
        }
    }

    static navigationOptions = {
        header: null
    }

    renderType(habitType) {
        switch (habitType) {
            case SwitchType.COMPLETE:
                return <Complete date={this.props.date} habitName={this.props.habitName} />;
            case SwitchType.PROGRESS:
                return <Progress date={this.props.date} habitName={this.props.habitName} />;
            case SwitchType.SUBTASK:
                return <Subtask date={this.props.date} habitName={this.props.habitName} />;
        }
    }

    scrollDown() {
        this.scroller.scrollTo({ x: 0, y: 0, animated: true })
    }

    scrollUp() {
        this.scroller.scrollTo({ x: 0, y: 250, animated: true })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.notes != this.props.notes) {
            this.setState({ notes: this.props.notes })
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => {
                this.scrollDown();
                Keyboard.dismiss();
            }}>
                <ScrollView
                    style={styles.scrollContainer}
                    scrollEnabled={false}
                    contentContainerStyle={styles.scrollContentContainer}
                    ref={(scroller) => this.scroller = scroller}>

                    <View style={styles.backButtonContainer}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.pop()}
                            style={styles.backButtonTouch}
                        >
                            <Ionicons name='ios-arrow-back' size={40} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: 'center', paddingTop: 30 }}>
                        <Text style={styles.habitNameText}>{this.props.habitName}</Text>
                        <Text style={styles.dateText}>{formatDate(this.props.date, "MMM D")}</Text>
                    </View>

                    <View style={{ alignItems: 'center', flex:1, width:'100%', justifyContent: 'center' }}>
                        {this.renderType(this.props.habitType)}
                    </View>

                    <View style={[styles.bottomNoteContainer]}>
                        <ScrollView
                            contentContainerStyle={{ flexGrow: 1, }}
                            keyboardShouldPersistTaps='handled'
                        >
                            <TextInput
                                style={[
                                    styles.bottomNoteText,
                                ]}
                                placeholder={"Notes"}
                                placeholderTextColor={Colors.greyBack}
                                onChangeText={(text) => this.setState({ notes: text })}
                                multiline={true}
                                spellCheck={false}
                                value={this.state.notes}
                                onEndEditing={() => {
                                    this.props.updateNote(this.props.habitName, this.props.date, this.state.notes)
                                }}
                                onSubmitEditing={() => {
                                    this.props.updateNote(this.props.habitName, this.props.date, this.state.notes)
                                }}
                                onFocus={() => this.scrollUp()}
                            />
                        </ScrollView>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        paddingTop: 20,
    },
    scrollContentContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%'
    },
    backButtonContainer: {
        position: 'absolute',
        top: 40,
        left: 10,
    },
    backButtonTouch: {
        alignItems: 'center',
        width: 50,
        height: 50
    },
    habitNameText: {
        fontFamily: Fonts.AvenirNext,
        color: Colors.calendarBlue,
        fontSize: 50,
    },
    dateText: {
        fontFamily: Fonts.AvenirNext,
        color: Colors.calendarBlue,
        fontSize: 25,
        margin: 10
    },
    bottomNoteContainer: {
        backgroundColor: Colors.lightGrey,
        width: Layout.window.width - 20,
        height: 200,
        borderRadius: 5,
        borderColor: Colors.calendarBlue,
        borderWidth: 5,
        backgroundColor: 'white',
        marginVertical: 10,
    },
    bottomNoteText: {
        fontFamily: Fonts.Verdana,
        paddingHorizontal: 8
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(HabitScreen);
