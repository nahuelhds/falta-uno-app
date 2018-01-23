import React from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';

import WhatsAppNotifier from './WhatsAppNotifier';

export default class PlayerCard extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const player = this.props.player
        return (
            <Card>
                <Text> Hola {player.displayName} {player.photoURL}</Text>
                <WhatsAppNotifier player={player}/>
            </Card>
        )
    }
}
