import React from 'react';

import { ScrollView, View, StyleSheet } from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';

import * as Firebase from 'firebase';
import moment from 'moment'

import Lang from 'lang'
import Colors from 'constants/Colors';

export default class MyMatchesList extends React.Component {

  state = {
    matches: {}
  }

  componentDidMount() {
    // Get user matches
    const uid = Firebase.auth().currentUser.uid
    const db = Firebase.database()
    const matchesRef = db.ref('matches')
    db.ref(`users/${uid}/matches`).orderByChild('date').on('child_added', (userMatch) => {
      matchesRef.child(userMatch.key).once('value', (matchSnap) => {
        let match = {
          [matchSnap.key]: matchSnap.val()
        }
        const matches = Object.assign({}, this.state.matches, match)
        this.setState({ matches })
      })
    })
  }

  render() {
    const matches = this.state.matches
    const matchesKeys = Object.keys(matches)

    if (!matchesKeys.length) {
      return (
        <View style={styles.emptyMacthesContainer}>
          <Text style={styles.emptyMatchesText}>{Lang.t(`matchSelector.noMatchesAvailable`)}</Text>
        </View>
      )
    }
    return (
      <ScrollView>
        {this.props.player ? <Text style={styles.label}>{Lang.t(`matchSelector.label`, this.props.player)}</Text> : null}
        <List>
          {matchesKeys.map((key) => {
            const match = matches[key]
            return (
              <ListItem
                key={key}
                title={match.name}
                subtitle={match.place}
                rightTitle={moment(match.date).calendar()}
                onPress={() => this.props.onPress(match)}
              />
            )
          })}
        </List>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  emptyMacthesContainer: {
    flex: 1,
    marginBottom: 60,
    justifyContent: 'center',
  },
  emptyMatchesText: {
    alignSelf: 'center',
    fontSize: 24,
    color: Colors.muted
  },
  label: {
    textAlign: 'center',
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    fontSize: 16,
  },
  addMatchButtonContainer: {
    bottom: 0,
    marginLeft: 0,
    position: 'absolute',
    width: '100%',
  }
})
