import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    FlatList
} from 'react-native'
import { connect } from 'react-redux';
import Constants from '../constants/Constants'
import Colors from '../constants/Colors'
import TriToggle from '../components/TriToggle'
import ProgressCircle from 'react-native-progress-circle'
import { getPreviewMetrics, getCurrentStreak, getBarChart, getHistory } from '../helpers/metricsOperations'
import Fonts from '../constants/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts'
import * as scale from 'd3-scale'
import { formatDate } from '../helpers/dateOperations';

const mapStateToProps = (state, ownProps) => {
    let habitName = ownProps.navigation.state.params.habitName
    return {
        habitName: habitName,
        habitType: state.settings.habitSettings[habitName].type,
        history: state.history,
        settings: state.settings
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const data = [50, 10, 40, 100, 4,
    50, 10, 40, 100, 4,
    50, 10, 40, 100, 4,
    50, 10, 40, 100, 4,
    50, 10, 40, 100, 4,
    50, 10, 40, 100, 4,
    50, 10,
]

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
            currentStreak: getCurrentStreak(this.props.history, this.props.habitName),
            barChart: getBarChart(this.props.history, this.props.habitType, this.props.habitName),
            history: getHistory(this.props.history, this.props.habitName)
        })
        if (this.props.settings.habitSettings[this.props.habitName].hasOwnProperty("habitInfo")) {
            this.setState({ habitUnit: this.props.settings.habitSettings[this.props.habitName].habitInfo.unit })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.history != this.props.history) {
            this.setState({
                previewMetrics: getPreviewMetrics(this.props.history, this.props.habitName),
                currentStreak: getCurrentStreak(this.props.history, this.props.habitName),
                barChart: getBarChart(this.props.history, this.props.habitType, this.props.habitName),
                history: getHistory(this.props.history, this.props.habitName)
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

    renderItem = ({ item, separators, index }) => {
        var completedSubtasks = 0;
        var totalSubtasks = 0;
        //get completed amount for subtask habit
        if (this.props.history[item][this.props.habitName].type == Constants.SUBTASK) {
            var subtasks = this.props.history[item][this.props.habitName].habitInfo.subtasks;
            var totalSubtasks = subtasks.length;
            for (var i = 0; i < totalSubtasks; i++) {
                if (subtasks[i][1]) {
                    completedSubtasks += 1;
                }
            }
        }
        return (
            <View key={index} style={styles.habitPreview}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Habit', {
                            date: item,
                            habitName: this.props.habitName
                        })
                    }}
                    style={[styles.habitPreviewButton, { backgroundColor: this.props.history[item][this.props.habitName].completed ? Colors.aqua : Colors.lightRed }]}
                >
                    <View style={styles.habitPreviewTopRow}>
                        <Text style={styles.habitPreviewText}>{formatDate(item, "MMM D")}</Text>
                        {
                            (this.props.history[item][this.props.habitName].type == Constants.PROGRESS) &&
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.habitPreviewText}>{this.props.history[item][this.props.habitName].habitInfo.progress}</Text>
                                <Text style={{ color: 'white' }}>/{this.props.history[item][this.props.habitName].habitInfo.goal}</Text>
                                <Text style={{ color: 'white' }}>{' ' + this.state.habitUnit}</Text>
                            </View>
                        }
                        {
                            (this.props.history[item][this.props.habitName].type == Constants.SUBTASK) &&
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.habitPreviewText}>{completedSubtasks}</Text>
                                <Text style={{ color: 'white' }}>/{totalSubtasks}</Text>
                                <Text style={{ color: 'white' }}>{' tasks'}</Text>
                            </View>
                        }
                    </View>
                    <Text
                        style={styles.habitPreviewNotesText}
                        numberOfLines={2}
                        ellipsizeMode={'tail'}
                    >
                        {this.props.history[item][this.props.habitName].notes}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        let previewMetrics = {}
        let barChart = {}
        let history = this.state.history.reverse()
        if (this.state.currentToggleSection === Constants.WEEKLY) {
            previewMetrics = this.state.previewMetrics.weekly
            barChart = this.state.barChart.weekly
        }
        else if (this.state.currentToggleSection === Constants.MONTHLY) {
            previewMetrics = this.state.previewMetrics.monthly
            barChart = this.state.barChart.monthly
        }
        else {
            previewMetrics = this.state.previewMetrics.yearly
            barChart = this.state.barChart.yearly
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

                <View style={styles.barChartContainer}>
                    <YAxis
                        style={{ marginBottom: 12 }}
                        data={data}
                        svg={{
                            fill: 'grey',
                            fontSize: 10,
                        }}
                        numberOfTicks={this.props.habitType === Constants.COMPLETE
                            ? 1 : (this.props.habitType === Constants.SUBTASK ? 5 : 10)}
                        contentInset={{ top: 5, bottom: 5 }}
                        formatLabel={value => `${value}`}
                        min={0}
                        max={barChart.yMax}
                    />
                    <View style={styles.barChartNoYAxis}>
                        <BarChart
                            style={{ height: 170, width: '100%' }}
                            data={barChart.data}
                            gridMin={0}
                            gridMax={barChart.yMax}
                            svg={{ fill: Colors.aqua }}
                            contentInset={{ top: 5, bottom: 5, left: 5, right: 5 }}
                        >
                            <Grid />
                        </BarChart>
                        <XAxis
                            style={{ marginTop: 2, width: '100%', height: 10 }}
                            data={barChart.data}
                            scale={scale.scaleBand}
                            formatLabel={(value, index) => {
                                if (this.state.currentToggleSection === Constants.MONTHLY) {
                                    return index % 5 === 0 ? barChart.xLabels[index] : null
                                }
                                return barChart.xLabels[index]
                            }}
                            contentInset={{ left: 5, right: 5 }}
                            svg={{ fontSize: 10, fill: 'grey' }}
                        />
                    </View>
                </View>
                <View style={styles.habitPreviewContainer}>
                    <FlatList
                        data={history}
                        renderItem={this.renderItem}
                        keyExtractor={(key) => key}
                    />
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
    },
    barChartContainer: {
        width: '90%',
        flexDirection: 'row'
    },
    barChartNoYAxis: {
        width: '100%'
    },
    habitPreviewContainer: {
        width: '100%',
        marginTop: 10,
        marginHorizontal: 5,
        flex: 1
    },
    habitPreview: {
        marginVertical: 2,
    },
    habitPreviewText: {
        color: 'white',
        fontSize: 20,
        fontFamily: Fonts.AvenirNext
    },
    habitPreviewButton: {
        justifyContent: 'center',
        borderRadius: 5,
        marginHorizontal: 7,
        paddingHorizontal: 10
    },
    habitPreviewTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    habitPreviewNotesText: {
        color: 'white',
        marginBottom: 5
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MetricsSpecificHabitScreen);
