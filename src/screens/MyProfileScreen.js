import React from 'react';

import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { Avatar, List, ListItem, Slider, Text } from 'react-native-elements';
import { Location, Permissions } from 'expo';

import Lang from 'lang'
import Colors from 'constants/Colors';
import * as Firebase from 'firebase';

export default class MyProfileScreen extends React.Component {
  static navigationOptions = () => ({
    title: Lang.t('myProfile.title'),
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
    this._listenUserRef();
    this.setState({ loading: false });
  }

  _listenUserRef() {
    this.userRef.on('value', (snapshot) => {
      this.setState({ user: snapshot.val() })
    })
  }

  render() {
    if (this.state.loading) {
      return <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    }

    const user = this.state.user

    return (
      <View>
        <View style={styles.container}>
          <Avatar
            large
            rounded
            source={{ uri: user.photoURL }}
            containerStyle={styles.avatar}
          />
          <Text h4>{user.displayName}</Text>
          <Text style={styles.textMuted}>{user.email}</Text>
        </View>
        <List>
          <ListItem
            title={Lang.t('myProfile.available')}
            hideChevron
            switchButton
            switched={this.state.user.available}
            onSwitch={() => this._updateUser({ available: !user.available })}
          />
          <ListItem
            hideChevron
            title={Lang.t('myProfile.myLocation')}
            rightTitle={this._getLocationText()}
            rightTitleStyle={styles.locationText}
          />
          <ListItem
            title={Lang.t('myProfile.filterByDistance')}
            hideChevron
            switchButton
            switched={this.state.user.filterByDistance}
            onSwitch={() => this._updateUser({ filterByDistance: !user.filterByDistance })}
          />
          <ListItem
            disabled={!this.state.user.filterByDistance}
            hideChevron
            subtitle={Lang.t('myProfile.distance', { distance: user.distance })}
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
        <List containerStyle={styles.logoutContainer}>
          <ListItem
            title={Lang.t(`myProfile.logout`)}
            hideChevron
            titleStyle={styles.logout}
            containerStyle={styles.logoutWrapper}
            onPress={this._logOut}
          />
        </List>
      </View>
    )
  }

  _updateUser(userState) {
    const newUserState = Object.assign({}, this.state.user, userState)
    this.userRef.set(newUserState)
  }

  _logOut() {
    Firebase.auth().signOut().then(() => Alert.alert(Lang.t(`myProfile.logoutSuccess`)))
  }

  async _loadUserAsync() {
    // Get this data just one time
    await this.userRef.once('value', (snapshot) => {
      const newUserState = Object.assign({}, this.state.user, snapshot.val())
      this.setState({ user: newUserState })
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
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  sliderLabel: {
    color: Colors.muted,
    fontSize: 14,
    alignSelf: 'center'
  },
  locationText: {
    color: Colors.muted
  },
  textMuted: {
    color: Colors.muted,
  },
  logoutContainer: {
    borderTopColor: Colors.danger,
    marginTop: 40,
  },
  logoutWrapper: {
    borderBottomColor: Colors.danger,
  },
  logout: {
    color: Colors.danger,
    textAlign: 'center',
  },
})
