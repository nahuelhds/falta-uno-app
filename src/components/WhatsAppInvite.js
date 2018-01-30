import React from 'react';
import { Linking, Alert } from 'react-native';
import { Button } from 'react-native-elements'

import moment from 'moment'

import Lang from 'lang'

import { format } from 'libphonenumber-js'
import Colors from 'constants/Colors';
import GoogleMapsService from '../services/GoogleMapsService'

const googleMapsService = new GoogleMapsService();

const buildWhatsAppUrl = (phone, text) => {
  // https://faq.whatsapp.com/es/android/26000030/?category=5245251
  return `https://api.whatsapp.com/send?text=${text}&phone=${phone}`;
}

const buildText = (playerName, date, place, mapUrl) => {

  const dateFromNow = moment().calendar(date) + ' hs.';
  //TODO fetch from Lang
  return `Hola soy ${playerName} y te invito a un doparti el ${dateFromNow}, en ${place} ${mapUrl}
-------
Mensaje enviado desde Falta Uno App
<Pedí tu acceso de prueba $contacto>`
}

const generateLinkFromLocation = (place) => {
  return googleMapsService.geocodeFromAddress(place)
    .then((geocodeFromAddress) => {
      console.log("geocodefromaddress result", geocodeFromAddress)
      let targetLocation = geocodeFromAddress
      console.log("targetLocation ", targetLocation)
      let sourceLocation = {}
      console.log("targetLocation ", targetLocation)
      return googleMapsService.link({longitude: targetLocation.lng, latitude: targetLocation.lat}, {longitude: sourceLocation.lng, latitude: sourceLocation.lat})
    })
    .catch((err) => {
      console.error(`Error while geocoding ${place}`, err)
      return ""
    })
  
}

export default class WhatsAppInvite extends React.Component {

  sendNotification() {
    const player = this.props.player
    const match = this.props.match
    const date = match.date
    const place = match.place

    // See: https://www.npmjs.com/package/libphonenumber-js#formatparsednumber-format-options
    let phone = format(player.phone, 'E.164')

    if (!phone) {
      return Alert.alert(
        Lang.t("invite.invalidPhoneNumberTitle"),
        Lang.t("invite.invalidPhoneNumber"),
        [{ text: 'OK' }, { cancelable: true }]
      )
    }

    var text = Lang.t('invite.defaultText')

    console.log(`Place ${place} and date ${date}`)

    //TODO refactor this
    if(place && date){
      generateLinkFromLocation(place)
        .then((link) => {
          console.log(`Link is ${link}`)
          text = buildText(player.name, date, place, link)
          console.log(`Link is now ${link}`)
          return text;
        })
        .then((newText) => {
          console.log(`about to send new message ${newText}`)
          let url = buildWhatsAppUrl(phone, newText)
      
          Linking.canOpenURL(url).then(supported => {
            if (!supported) {
              return Alert.alert(Lang.t(`whatsapp.urlNotSupported`, { url }));
            }
            return Linking.openURL(url);
          }).catch(err => Alert.alert(Lang.t(`whatsapp.urlUnkownError`, { err })));
        })
    } else {
      console.log(`about to send message ${text}`)
      let url = buildWhatsAppUrl(phone, text)
  
      Linking.canOpenURL(url).then(supported => {
        if (!supported) {
          return Alert.alert(Lang.t(`whatsapp.urlNotSupported`, { url }));
        }
        return Linking.openURL(url);
      }).catch(err => Alert.alert(Lang.t(`whatsapp.urlUnkownError`, { err })));
    }
  }

  render() {
    return (
      <Button
        small
        iconRight={{ name: 'logo-whatsapp', type: 'ionicon' }}
        onPress={() => this.sendNotification()}
        backgroundColor={Colors.whatsapp}
        title={Lang.t(`whatsapp.buttonTitle`)}
        accessibilityLabel={Lang.t(`whatsapp.buttonTitle`)}
      />
    )
  }
}
