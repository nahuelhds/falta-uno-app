import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from 'constants/Colors';

import AvailabilityScreen from 'screens/AvailabilityScreen';
import HomeScreen from 'screens/HomeScreen';
import MyMatchesScreen from 'screens/MyMatchesScreen';

export default TabNavigator(
  {
    Availability: {
      screen: AvailabilityScreen,
    },
    Home: {
      screen: HomeScreen,
    },
    MyMatches: {
      screen: MyMatchesScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Availability':
            iconName =
              Platform.OS === 'ios' ? `ios-hand${focused ? '' : '-outline'}` : 'md-hand';
            break;
          case 'Home':
            iconName =
              Platform.OS === 'ios'
                ? `ios-home${focused ? '' : '-outline'}`
                : 'md-home';
            break;
          case 'MyMatches':
            iconName = Platform.OS === 'ios' ? `ios-football${focused ? '' : '-outline'}` : 'md-football';
            break;
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
