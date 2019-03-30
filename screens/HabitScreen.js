import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput
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


const mapStateToProps = (state, ownProps) => {
    let props = ownProps.navigation.state.params
    return {
        date: props.date,
        habitName: props.habitName,
        dataOnDate: state.history[props.date][props.habitName],
        habitType: state.settings.habitSettings[props.habitName].type
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}


class HabitScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataOnDate: props.dataOnDate
        }
    }
    state = {
        //remove after redux implementation
        subtaskName: 'Subtask Name',
        completed: 'false',
        number: 30,
        habitName: '',
        habitDate: ''
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

    render() {
        return (

            <View style={styles.container}>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.habitNameText}>{this.props.habitName}</Text>
                    <Text style={styles.dateText}>{formatDate(this.props.date, "MMM D")}</Text>
                </View>
                <View>
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
                                //do redux stuff here
                            }}
                        />
                    </ScrollView>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        marginTop: 20,
        justifyContent: 'space-between'
    },
    habitNameText: {
        fontFamily: Fonts.AvenirNext,
        color: Colors.aqua,
        fontSize: 50,
    },
    dateText: {
        fontFamily: Fonts.AvenirNext,
        color: Colors.aqua,
        fontSize: 25,
        margin: 10
    },
    bottomNoteContainer: {
        backgroundColor: Colors.lightGrey,
        width: Layout.window.width - 20,
        height: 180,
        borderRadius: 5,
        borderColor: Colors.aqua,
        borderWidth: 5,
        backgroundColor: 'white',
        marginVertical: 10
    },
    bottomNoteText: {
        fontFamily: Fonts.Verdana,
        paddingHorizontal: 8
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(HabitScreen);
