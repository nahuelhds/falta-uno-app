import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, FormLabel, FormInput } from 'react-native-elements';

import Lang from 'lang'
import Colors from 'constants/Colors';


export default class AddMatchScreen extends React.Component {
  // Dynamic definition so we can get the actual Lang locale
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    let headerRight = (
      <Text style={styles.headerButton} onPress={params.handleSave ? (params.handleSave) : () => null}>
        {Lang.t('action.add')}
      </Text>
    )

    if (params.isSaving) {
      headerRight = <ActivityIndicator style={styles.headerButton} />;
    }

    return {
      title: Lang.t('addMatch.title'),
      headerLeft: (<Text style={styles.headerButton} onPress={() => navigation.goBack()}>{Lang.t('action.close')}</Text>),
      headerRight: headerRight
    }
  }

  state = {
    match: {}
  }

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ handleSave: this._handleSave });
  }

  render() {
    return (
      <View style={styles.container}>
        <FormLabel>{Lang.t(`addMatch.name`)}</FormLabel>
        <FormInput onChangeText={() => { }} />
        <FormLabel>{Lang.t(`addMatch.place`)}</FormLabel>
        <FormInput onChangeText={() => { }} />
      </View>
    )
  }

  _handleSave = () => {
    // Update state, show ActivityIndicator
    this.props.navigation.setParams({ isSaving: true });

    // Fictional function to save information in a store somewhere
    /*addMatch().then(() => {
      this.props.navigation.setParams({ isSaving: false });
    })*/
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButton: {
    color: Colors.tintColor,
    fontSize: 16,
    marginLeft: 15,
    marginRight: 15,
  },
})
