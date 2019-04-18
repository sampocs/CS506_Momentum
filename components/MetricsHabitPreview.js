import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation'
import { getPreviewMetrics } from '../helpers/metricsOperations'
import Constants from '../constants/Constants'

const mapStateToProps = (state) => {
    return {
        history: state.history
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

class MetricsHabitPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            metrics: {}
        }
    }

    componentWillMount() {
        this.setState({
            metrics: getPreviewMetrics(this.props.history, this.props.habitName),
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.history != this.props.history) {
            this.setState({
                metrics: getPreviewMetrics(this.props.history, this.props.habitName)
            })
        }
    }

    render() {
        let metrics = {}
        if (this.props.currentToggleSection === Constants.WEEKLY) {
            metrics = this.state.metrics.weekly
        }
        else if (this.props.currentToggleSection === Constants.MONTHLY) {
            metrics = this.state.metrics.monthly
        }
        else {
            metrics = this.state.metrics.yearly
        }
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => this.props.navigation.push('MetricsSpecificHabit', { habitName: this.props.habitName })}
            >
                <View style={styles.habitTextContainer}>
                    <Text style={styles.habitText}>{this.props.habitName}</Text>
                </View>
                <View style={styles.metricContainer}>
                    <Text style={styles.metricTopText}>{metrics.percentage}</Text>
                    <Text style={styles.metricBottomText}>
                        {`(${metrics.daysCompleted}/${metrics.totalDays})`}
                    </Text>
                </View>

            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        flexDirection: 'row',
        marginHorizontal: 10,
        borderColor: Colors.aqua,
        borderWidth: 5,
        borderRadius: 10,
        marginVertical: 4,
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
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    habitText: {
        fontFamily: Fonts.AvenirNext,
        fontSize: 30,
        color: 'white'
    },
    metricTopText: {
        fontFamily: Fonts.AvenirNext,
        fontSize: 35,
        color: Colors.aqua
    },
    metricBottomText: {
        fontFamily: Fonts.AvenirNext,
        fontSize: 15,
        color: Colors.aqua
    }
})

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(MetricsHabitPreview))
