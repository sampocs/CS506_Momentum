import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'

import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
    components = {
        Ionicons: Ionicons,
        FontAwesome: FontAwesome,
        MaterialCommunityIcons: MaterialCommunityIcons,
        Feather: Feather,
        AntDesign: AntDesign
    } 

    render() {
        const [family, iconName] = this.props.name.split('/')
        const IconFamilyName = this.components[family]

        return (
            <IconFamilyName
                name={iconName}
                size={26}
                style={{ marginBottom: -3 }}
                color={this.props.focused ? this.props.selectedColor : Colors.tabIconDefault}
            />
        );
    }
}