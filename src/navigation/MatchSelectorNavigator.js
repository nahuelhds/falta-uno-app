import { StackNavigator } from 'react-navigation';

import MatchListScreen from 'screens/MatchListScreen';
import MatchAddScreen from 'screens/MatchAddScreen';

const MatchSelectorNavigator = StackNavigator(
  {
    MatchSelector: {
      screen: MatchListScreen
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
