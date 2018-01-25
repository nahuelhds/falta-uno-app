import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Card, Avatar, ListItem } from 'react-native-elements';

import WhatsAppNotifier from './WhatsAppNotifier';
import Lang from 'lang';

export default class PlayerCard extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const player = this.props.player
    return (
      <Card>
        <ListItem
          roundAvatar
          title={player.displayName}
          avatar={{ uri: player.photoURL }}
          subtitle={Lang.t(`playerCard.fromDistance`, { distance: this.props.distance })}
        />
        <WhatsAppNotifier player={player} />
      </Card>
    )
  }
}
