import { StackNavigator } from 'react-navigation';

import MatchCreationScreen from 'screens/MatchCreationScreen';
import AddMatchScreen from 'screens/AddMatchScreen';

const MatchCreationNavigator = StackNavigator(
  {
    MatchCreation: {
      screen: MatchCreationScreen
    },
    CreateMatch: {
      screen: AddMatchScreen
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default MatchCreationNavigator
