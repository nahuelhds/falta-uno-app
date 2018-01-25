import React from 'react';
import { Linking, Alert } from 'react-native';
import { Button } from 'react-native-elements'
import Lang from 'lang'

import { format } from 'libphonenumber-js'
import Colors from 'constants/Colors';

export default class WhatsAppInvite extends React.Component {

  sendNotification() {
    const player = this.props.player
    // See: https://www.npmjs.com/package/libphonenumber-js#formatparsednumber-format-options
    let phone = format(player.phone, 'E.164')

    if (!phone) {
      return Alert.alert(
        Lang.t("invite.invalidPhoneNumberTitle"),
        Lang.t("invite.invalidPhoneNumber"),
        [{ text: 'OK' }, { cancelable: true }]
      )
    }

    let defaultText = Lang.t('invite.defaultText')
    let url = this.buildWhatsAppUrl(phone, defaultText)

    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        return Alert.alert(Lang.t(`whatsapp.urlNotSupported`, { url }));
      }
      return Linking.openURL(url);
    }).catch(err => Alert.alert(Lang.t(`whatsapp.urlUnkownError`, { err })));
  }

  buildWhatsAppUrl(phone, text) {
    // https://faq.whatsapp.com/es/android/26000030/?category=5245251
    return `https://api.whatsapp.com/send?text=${text}&phone=${phone}`;
  }

  render() {
    return (
      <Button
        small
        iconRight={{ name: 'logo-whatsapp', type: 'ionicon' }} // TODO ideally there should be a 'whatsapp' icon
        onPress={() => this.sendNotification()}
        backgroundColor={Colors.whatsapp}
        title={Lang.t(`whatsapp.buttonTitle`)}
        accessibilityLabel={Lang.t(`whatsapp.buttonTitle`)}
      />
    )
  }
}
