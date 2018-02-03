import React from 'react';

import { View, StyleSheet, Alert, Text } from 'react-native';
import { Button } from 'react-native-elements';

import Lang from 'lang'
import Colors from 'constants/Colors';

import MyMatchesList from 'components/MyMatchesList';

export default class MatchListScreen extends React.Component {
  // Dynamic definition so we can get the actual Lang locale
  static navigationOptions = ({ navigation }) => ({
    title: Lang.t('myMatches.title'),
    headerRight: (
      <Text style={styles.headerButton} onPress={() => navigation.navigate('AddMatch')}>
        {Lang.t('action.add')}
      </Text>
    )
  })

  render() {
    return (
      <MyMatchesList onPress={(match) => Alert.alert(`Edit ${match.name}`)} />
    )
  }
}

const styles = StyleSheet.create({
  headerButton: {
    color: Colors.tintColor,
    fontSize: 16,
    marginLeft: 15,
    marginRight: 15,
  },
})
