import React from 'react';
import {
  ActivityIndicator,
  DatePickerAndroid,
  DatePickerIOS,
  Platform,
  StyleSheet,
  TimePickerAndroid,
  View,
} from 'react-native';
import { Text, FormLabel, FormInput, Button } from 'react-native-elements';

import * as Firebase from 'firebase';
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
      headerRight = <ActivityIndicator style={styles.headerActivityIndicator} />;
    }

    return {
      title: Lang.t('addMatch.title'),
      headerLeft: (<Text style={styles.headerButton} onPress={() => navigation.goBack()}>{Lang.t('action.close')}</Text>),
      headerRight: headerRight
    }
  }

  state = {
    name: null,
    place: null,
    date: new Date(),
    chosenDate: null,
    chosenTime: null,
  }

  componentDidMount() {
    // We can only set the function after the component has been initialized
    this.props.navigation.setParams({ handleSave: this._handleSave });
  }

  render() {
    let datePicker;
    if (Platform.OS === 'ios') {
      datePicker = (
        <DatePickerIOS
          date={this.state.date}
          minimumDate={new Date()}
          minuteInterval={15}
          onDateChange={(date) => this.setState({ date: date })}
        />
      )
    } else {
      datePicker = (
        <View>
          <Button title="Android DatePicker" onPress={() => this._handleAndroidDatePicker()} />
          <Button title="Android TimePicker" onPress={() => this._handleAndroidTimePicker()} />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <FormLabel>{Lang.t(`addMatch.nameLabel`)}</FormLabel>
        <FormInput onChangeText={(name) => this.setState({ name: name })} />
        <FormLabel>{Lang.t(`addMatch.placeLabel`)}</FormLabel>
        <FormInput onChangeText={(place) => this.setState({ place: place })} />
        <FormLabel>{Lang.t(`addMatch.dateLabel`)}</FormLabel>
        {datePicker}
      </View>
    )
  }

  _handleSave = () => {
    // Update state, show ActivityIndicator
    this.props.navigation.setParams({ isSaving: true });

    const uid = Firebase.auth().currentUser.uid;
    const db = Firebase.database();
    const key = db.ref().child('matches').push().key;
    const dateTimestamp = this.state.date.getTime()
    const match = {
      name: this.state.name,
      place: this.state.place,
      date: dateTimestamp,
      createdAt: Firebase.database.ServerValue.TIMESTAMP
    };

    let updates = {};
    updates['/matches/' + key] = match;
    updates['/users/' + uid + '/matches/' + key] = { date: dateTimestamp }

    db.ref().update(updates).then(() => {
      this.props.navigation.setParams({ isSaving: false });
      this.props.navigation.goBack();
    })
  }

  async _handleAndroidDatePicker() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: this.state.chosenDate
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }

  async _handleAndroidTimePicker() {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false, // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerActivityIndicator:{
    marginLeft: 15,
    marginRight: 15,
  },
  headerButton: {
    color: Colors.tintColor,
    fontSize: 16,
    marginLeft: 15,
    marginRight: 15,
  },
})
