import React from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';

export default class PlayerCard extends React.Component {

    constructor(props) {
        super(props)
        console.log(this.props.player)
    }

    render() {
        return (
            <Card>
                <Text> Hola </Text>
            </Card>
        )
    }
}