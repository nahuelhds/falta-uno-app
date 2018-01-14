import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import Lang from 'lang';

export default class MyProfileScreen extends React.Component {
  static navigationOptions = () => ({
    title: Lang.t('myProfile.title'),
  });

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <ExpoConfigView />;
  }
}
