import { StackNavigator } from 'react-navigation';

import MyProfileScreen from 'screens/MyProfileScreen';

const MyProfileNavigator = StackNavigator(
  {
    MyProfile: {
      screen: MyProfileScreen
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default MyProfileNavigator
