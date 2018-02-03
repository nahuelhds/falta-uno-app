import { StackNavigator } from 'react-navigation';

import MyMatchesScreen from 'screens/MyMatchesScreen';
import MatchAddScreen from 'screens/MatchAddScreen';

const MatchSelectorNavigator = StackNavigator(
  {
    MatchSelector: {
      screen: MyMatchesScreen
    },
    AddMatch: {
      screen: MatchAddScreen
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default MatchSelectorNavigator
