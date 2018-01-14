import React from 'react';

import Lang from 'lang'
import { ActivityIndicator, StyleSheet, View, Platform, Text } from 'react-native';
import { List, ListItem, Slider } from 'react-native-elements';
import { Constants, Location, Permissions } from 'expo';

import Colors from 'constants/Colors';
import * as Firebase from 'firebase';

export default class AvailabilityScreen extends React.Component {
  static navigationOptions = () => ({
    title: Lang.t('availability.title'),
  });

  state = {
    loading: true,
    user: {
      available: true,
      filterByDistance: true,
      distance: 15,
      location: {},
      position: {},
    },
    locationErrorMessage: null,
  }

  constructor(props) {
    super(props);
    const uid = Firebase.auth().currentUser.uid;
    this.userRef = Firebase.database().ref(`users/${uid}`)
  }

  async componentWillMount() {
    await this._loadUserAsync();
    await this._getLocationAsync();
    this._updateUser(this.state.user);
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    }

    return <View>
      <List>
        <ListItem
          title={Lang.t('availability.available')}
          hideChevron
          switchButton
          switched={this.state.user.available}
          onSwitch={() => this._updateUser({ available: !this.state.user.available })}
        />
        <ListItem
          hideChevron
          title={Lang.t('availability.myLocation')}
          rightTitle={this._getLocationText()}
          rightTitleStyle={styles.locationText}
        />
        <ListItem
          title={Lang.t('availability.filterByDistance')}
          hideChevron
          switchButton
          switched={this.state.user.filterByDistance}
          onSwitch={() => this._updateUser({ filterByDistance: !this.state.user.filterByDistance })}
        />
        <ListItem
          disabled={!this.state.user.filterByDistance}
          hideChevron
          subtitle={Lang.t('availability.distance', { distance: this.state.user.distance })}
          subtitleStyle={styles.sliderLabel}
          title={<Slider
            disabled={!this.state.user.filterByDistance}
            minimumTrackTintColor={Colors.primaryLight}
            minimumValue={1}
            maximumValue={30}
            onValueChange={(distance) => this._updateUser({ distance })}
            step={1}
            thumbTintColor={Colors.primary}
            value={this.state.user.distance}
          />}
        />
      </List>
    </View>
  }

  _updateUser(userState) {
    const newUserState = Object.assign({}, this.state.user, userState)
    this.userRef.set(newUserState)
  }

  async _loadUserAsync() {
    // Get this data just one time
    await this.userRef.once('value', (snapshot) => {
      this.setState({ user: snapshot.val() })
    })
  }

  async _getLocationAsync() {
    // Check for permission
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    // If not granted, show the message
    if (status !== 'granted') {
      this.setState({
        errorMessage: Lang.t('location.error.permissionDenied'),
      });
    }

    // Get the position and the reversegeolocation
    let position = await Location.getCurrentPositionAsync({});
    let locationCheck = await Location.reverseGeocodeAsync(position.coords);
    let location = locationCheck[0]

    // We don't send this directly to Firebase as we need to sync with the ref
    // to finish getting the current user data from the cloud
    const newUserState = Object.assign({}, this.state.user, { position, location })
    // So we prepare the info so be merged instead
    this.setState({ user: newUserState });
  }

  _getLocationText() {
    if (this.state.locationErrorMessage) {
      return this.state.locationErrorMessage;
    } else if (this.state.user.location) {
      const location = this.state.user.location
      return `${location.city}, ${location.country}`
    } else if (this.state.user.position) {
      const latlng = this.state.user.position.coords;
      const lat = latlng.latitude;
      const lng = latlng.longitude;
      return `${lat}, ${lng}`
    }

    return Lang.t('loading')
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  sliderLabel: {
    color: Colors.muted,
    fontSize: 14,
    alignSelf: 'center'
  },
  locationText: {
    color: Colors.muted
  }
})
