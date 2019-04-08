import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback
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
import { updateNote } from '../actions/actions'


const mapStateToProps = (state, ownProps) => {
    let props = ownProps.navigation.state.params
    return {
        date: props.date,
        habitName: props.habitName,
        dataOnDate: state.history[props.date][props.habitName],
        habitType: state.settings.habitSettings[props.habitName].type,
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
            dataOnDate: props.dataOnDate
        }
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
        if (prevProps.dataOnDate != this.props.dataOnDate) {
            this.setState({ dataOnDate: this.props.dataOnDate })
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

                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.habitNameText}>{this.props.habitName}</Text>
                        <Text style={styles.dateText}>{formatDate(this.props.date, "MMM D")}</Text>
                    </View>

                    <View style={{ alignItems: 'center' }}>
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
                                    this.props.updateNote(this.props.habitName, this.props.date, this.state.dataOnDate.notes)
                                }}
                                onSubmitEditing={() => {
                                    this.props.updateNote(this.props.habitName, this.props.date, this.state.dataOnDate.notes)
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
