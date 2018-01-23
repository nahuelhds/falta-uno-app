import React from 'react';
import { Linking, Alert } from 'react-native';
import { Button } from 'react-native-elements'
import Lang from 'lang'

export default class PlayerCard extends React.Component {

    constructor(props) {
        super(props)
    }

    sendNotification() {
        
        const player = this.props.player
        let phone = player.phone
        console.log("Phone is " + phone);

        if(phone){
            let defaultText = Lang.t('invite.defaultText')
            let url = this.buildWhatsAppUrl(phone, defaultText)
            Linking.canOpenURL(url).then(supported => {
                if (!supported) {
                console.warn('Can\'t handle url: ' + url);
                } else {
                return Linking.openURL(url);
                }
            }).catch(err => console.error('An error occurred', err));
        } else {
            // Works on both iOS and Android
            Alert.alert(
                Lang.t("invite.invalidPhoneNumberTitle"),
                Lang.t("invite.invalidPhoneNumber"),
                [
                // {text: 'Save for later', onPress: () => console.log('Save for later pressed')},
                {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: true })
        }
    }

    buildWhatsAppUrl(phone, text){
        // From https://faq.whatsapp.com/es/android/26000030/?category=5245251
        // https://api.whatsapp.com/send?phone=numerodetelefonodewhatsapp&text=urldelmensaje
        return `https://api.whatsapp.com/send?text=${text}&phone=${phone}`;
    }

    render() {
        return (
            <Button
                small
                iconRight={{name: 'sms'}} // TODO ideally there should be a 'whatsapp' icon
                onPress={() => this.sendNotification()} // https://stackoverflow.com/questions/42329240/react-native-onpress-being-called-automatically
                // title="Text me"
                color="#841584"
                accessibilityLabel="Send WhatsApp to the player"
            />
        )
    }
}