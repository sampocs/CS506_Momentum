import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux';
import Constants from '../constants/Constants'
import Colors from '../constants/Colors'
import TriToggle from '../components/TriToggle'
import ProgressCircle from 'react-native-progress-circle'
import { getPreviewMetrics, getCurrentStreak } from '../helpers/metricsOperations'
import Fonts from '../constants/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons'

const mapStateToProps = (state, ownProps) => {
    return {
        habitName: ownProps.navigation.state.params.habitName,
        history: state.history
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

class MetricsSpecificHabitScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            previewMetrics: {},
            currentStreak: 0,
            currentToggleSection: Constants.WEEKLY
        }
    }

    componentWillMount() {
        this.setState({
            previewMetrics: getPreviewMetrics(this.props.history, this.props.habitName),
            currentStreak: getCurrentStreak(this.props.history, this.props.habitName)
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.history != this.props.history) {
            this.setState({
                previewMetrics: getPreviewMetrics(this.props.history, this.props.habitName),
                currentStreak: getCurrentStreak(this.props.history, this.props.habitName)
            })
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
        let previewMetrics = {}
        if (this.state.currentToggleSection === Constants.WEEKLY) {
            previewMetrics = this.state.previewMetrics.weekly
        }
        else if (this.state.currentToggleSection === Constants.MONTHLY) {
            previewMetrics = this.state.previewMetrics.monthly
        }
        else {
            previewMetrics = this.state.previewMetrics.yearly
        }
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.backButtonContainer}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.pop()}
                    >
                        <Ionicons name='ios-arrow-back' size={30} />
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center', paddingVertical: 5 }}>
                    <Text style={styles.habitNameText}>{this.props.habitName}</Text>
                </View>

                <View style={styles.triToggleContainer}>
                    <TriToggle
                        labels={['Weekly', 'Monthly', 'Yearly']}
                        setParentState={this.setToggleState.bind(this)}
                    />
                </View>

                <View style={styles.topSection}>
                    <ProgressCircle
                        percent={parseInt(previewMetrics.percentage.slice(0, -1))}
                        radius={63}
                        borderWidth={8}
                        color={Colors.aqua}
                        shadowColor={Colors.lightGreyText}
                        bgColor='white'
                    >
                        <Text style={styles.percentText}>{previewMetrics.percentage}</Text>
                        <Text style={styles.daysCompletedText}>
                            {`(${previewMetrics.daysCompleted}/${previewMetrics.totalDays})`}
                        </Text>
                    </ProgressCircle>

                    <View style={styles.streakContainer}>
                        <Text style={styles.streakTextBig}> {this.state.currentStreak} </Text>
                        <Text style={styles.streakTextSmall}> in a row!</Text>
                    </View>
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
    backButtonContainer: {
        position: 'absolute',
        top: 70,
        left: 20
    },
    habitNameText: {
        fontFamily: Fonts.AvenirNext,
        color: Colors.aqua,
        fontSize: 50,
    },
    triToggleContainer: {
        paddingTop: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    topSection: {
        flexDirection: 'row',
        marginVertical: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: 30
    },
    percentText: {
        fontFamily: Fonts.AvenirNext,
        fontSize: 33,
        color: Colors.aqua
    },
    daysCompletedText: {
        fontFamily: Fonts.AvenirNext,
        fontSize: 15,
        color: Colors.aqua
    },
    streakContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    streakTextBig: {
        fontFamily: Fonts.AvenirNext,
        fontSize: 60,
        color: Colors.aqua
    },
    streakTextSmall: {
        fontFamily: Fonts.AvenirNext,
        fontSize: 20,
        color: Colors.aqua
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MetricsSpecificHabitScreen);
