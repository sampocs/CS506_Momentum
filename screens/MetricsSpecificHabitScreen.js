import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import {
    ContributionGraph,
} from 'react-native-chart-kit'
import { connect } from 'react-redux';
import Constants from '../constants/Constants'
import TriToggle from '../components/TriToggle';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import { getPreviewMetrics, getCompletedDates } from '../helpers/metricsOperations';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getCurrentDate } from '../helpers/dateOperations'


const { height, width } = Dimensions.get("window");

let count = 0

const mapStateToProps = (state) => {
    return {
        history: state.history,
        settings: state.settings
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const chartConfig = {
    backgroundGradientFrom: '#FFF',
    backgroundGradientTo: '#FFF',
    color: (opacity = 1) => `rgba(33, 173, 160, ${opacity})`,
    strokeWidth: 3, // optional, default 3
}

class MetricsSpecificHabitScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            currentToggleSection: Constants.WEEKLY,
            currentDate: getCurrentDate()
        }
    }

    componentWillMount() {
        let habitName = this.props.navigation.getParam('habitName');
        this.setState({
            habitName: habitName,
            metrics: getPreviewMetrics(this.props.history, habitName),
            completedDates: getCompletedDates(this.props.history, habitName)
        })
    }

    setToggleState(section) {
        let mapping = {
            LEFT: Constants.WEEKLY,
            MIDDLE: Constants.MONTHLY,
            RIGHT: Constants.YEARLY
        }
        this.setState({ currentToggleSection: mapping[section] })
    }

    renderContributionGraph() {
        console.log(this.state.completedDates)
        console.log(count)
        count++
        switch (this.state.currentToggleSection) {
            case Constants.WEEKLY:
                return (
                    <ContributionGraph
                        values={this.state.completedDates.weekly}
                        endDate={this.state.currentDate}
                        numDays={7}
                        width={100}
                        height={250}
                        chartConfig={chartConfig}
                        squareSize={25}
                    />
                );
            case Constants.MONTHLY:
                return (
                    <ContributionGraph
                        values={this.state.completedDates.monthly}
                        endDate={this.state.currentDate}
                        numDays={31}
                        width={200}
                        height={250}
                        chartConfig={chartConfig}
                        squareSize={25}
                    />
                );
            case Constants.YEARLY:
                return (
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentOffset={{ x: 1100, y: 0 }}
                    >
                        <ContributionGraph
                            values={this.state.completedDates.yearly}
                            endDate={this.state.currentDate}
                            numDays={365}
                            width={1500}
                            height={250}
                            chartConfig={chartConfig}
                            squareSize={25}
                        />
                    </ScrollView>
                );
        }
    }

    render() {
        let metrics = {}
        if (this.state.currentToggleSection === Constants.WEEKLY) {
            metrics = this.state.metrics.weekly
        }
        else if (this.state.currentToggleSection === Constants.MONTHLY) {
            metrics = this.state.metrics.monthly
        }
        else {
            metrics = this.state.metrics.yearly
        }
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerTextContainer}>
                        <View style={styles.backButtonContainer}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.pop()}
                            >
                                <Ionicons name='ios-arrow-back' size={30} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.headerText}>{this.state.habitName}</Text>
                    </View>
                    <View style={styles.triToggleContainer}>
                        <TriToggle
                            labels={['Weekly', 'Monthly', 'Yearly']}
                            setParentState={this.setToggleState.bind(this)}
                        />
                    </View>
                </View>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.progressMetricsContainer}>
                        <Text style={styles.metricText}>{metrics.percentage}</Text>
                        <Text style={styles.metricText}>
                            {`${metrics.daysCompleted}/${metrics.totalDays}`}
                        </Text>
                    </View>
                    <View style={styles.contributionGraphContainer}>
                        {this.renderContributionGraph()}
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    triToggleContainer: {
        height: 100,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backButtonContainer: {
        left: 20,
        position: 'absolute'
    },
    header: {
        width: '100%',
        justifyContent: 'center'
    },
    headerTextContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 30,
        fontFamily: Fonts.AvenirNext,
        color: Colors.aqua,
        alignSelf: 'center'
    },
    scrollView: {
        flex: 1,
        width: '100%'
    },
    contributionGraphContainer: {
        flex: 1,
        alignItems: 'center',
    },
    progressMetricsContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    metricText: {
        fontSize: 30,
        color: Colors.aqua,
        fontFamily: Fonts.AvenirNext
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MetricsSpecificHabitScreen);
