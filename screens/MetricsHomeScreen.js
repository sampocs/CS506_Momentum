import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux';
import MetricsHabitPreview from '../components/MetricsHabitPreview';
import TriToggle from '../components/TriToggle'
import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';
import Constants from '../constants/Constants'


const mapStateToProps = (state) => {
    return {
        habits: state.settings.habitOrder
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

class MetricsHomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            currentToggleSection: Constants.WEEKLY
        }
    }

    setToggleState(section) {
        let mapping = {
            LEFT: Constants.WEEKLY,
            MIDDLE: Constants.MONTHLY,
            RIGHT: Constants.YEARLY
        }
        this.setState({ currentToggleSection: mapping[section] })
    }

    render() {
        let index = 0
        let habits = this.props.habits.map((habit) => {
            return (
                <MetricsHabitPreview key={index++} habitName={habit} currentToggleSection={this.state.currentToggleSection} />
            )
        })
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.triToggleContainer}>
                    <TriToggle
                        labels={['Weekly', 'Monthly', 'Yearly']}
                        setParentState={this.setToggleState.bind(this)}
                    />
                </View>
                {
                    habits.length != 0 &&
                    <View style={styles.previewContainer}>
                        <ScrollView
                            style={styles.scrollContainer}
                            scrollEnabled={habits.length != 0}
                        >
                            {habits.length != 0 && habits}
                        </ScrollView>
                    </View>
                }
                {
                    habits.length == 0 &&
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                            style={styles.addHabitButton}
                            onPress={() => this.props.navigation.navigate('AddHabit')}>
                            <Text style={styles.addHabitText}> Add Habit </Text>
                        </TouchableOpacity>
                    </View>
                }
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    triToggleContainer: {
        height: 100,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    previewContainer: {
        flex: 1,
        alignItems: 'center',
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
        paddingVertical: 2,
    },
    addHabitButton: {
        height: 60,
        width: 200,
        borderRadius: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.aqua
    },
    addHabitText: {
        color: 'white',
        fontFamily: Fonts.AvenirMedium,
        fontSize: 18
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MetricsHomeScreen);
