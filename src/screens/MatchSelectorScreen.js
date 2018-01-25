import React from 'react';

import { ScrollView, View, StyleSheet } from 'react-native';
import { List, ListItem, Text, Button } from 'react-native-elements';

import Lang from 'lang'
import Colors from 'constants/Colors';


export default class MatchSelectorScreen extends React.Component {
  // Dynamic definition so we can get the actual Lang locale
  static navigationOptions = () => ({
    title: Lang.t('matchSelector.title'),
  })

  state = {
    matches: {}
  }

  render() {
    const matches = this.state.matches
    const matchesKeys = Object.keys(matches)
    return (
      <View style={styles.container}>
        {!matchesKeys.length ? (
          <View style={styles.emptyMacthesContainer}>
            <Text style={styles.emptyMatchesText}>{Lang.t(`matchSelector.noMatchesAvailable`)}</Text>
          </View>
        ) : (
            <ScrollView>
              <List>
                {matchesKeys.map((key) => {
                  const match = matches[key]
                  return (
                    <ListItem
                      key={key}
                      title={match.title}
                      subtitle={match.place}
                    // onPress={() => this.props.navigation.navigate('MatchSelector', { player })}
                    />
                  )
                })}
              </List>
            </ScrollView>
          )
        }
        <Button
          title={Lang.t(`matchSelector.addMatch`)}
          containerViewStyle={styles.addMatchButtonContainer}
          backgroundColor={Colors.primary}
          onPress={() => this.props.navigation.navigate('AddMatch')}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  addMatchButtonContainer: {
    bottom: 0,
    marginLeft: 0,
    position: 'absolute',
    width: '100%',
  }
})
