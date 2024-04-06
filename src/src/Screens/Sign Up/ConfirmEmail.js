import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; 
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import Top_Circle from "../../utils/Top_Circles";
import Bottom_Circle from "../../utils/Bottom_Circles";
import CustomInput from '../../utils/CustomInput';
import CustomButton from '../../utils/CustomButton';
import { COLORS } from '../../utils/COLORS';

import {useForm} from 'react-hook-form'


export default function ConfirmEmail({navigation}) {
    
    const {control, handleSubmit} = useForm();

    const onSignInPress = (data) => {
        console.warn('Sign In Pressed');
        console.log(data);
    };
    const onResendCodePress = () => {
        console.warn('Resend Code Pressed');
    };
    onBackPress = () => {
        navigation.navigate('Sign Up');
    };
    
    return (
        <SafeAreaView style = {{flex:1,}}>
            <View style = {styles.body}>

                <Text style = {styles.title}>Financial</Text>
                <Text style = {styles.title}>Fellows</Text>
            
                <Text style = {{color: COLORS.black, fontSize: 30, fontFamily: 'Judson-Bold'}}>
                    Confirm Email
                </Text>


                <CustomInput
                    name="code"
                    placeholder='Enter Confirmation Code'
                    control={control}
                    rules={{
                        required: 'Confirmation code is required',
                    }}
                />


                <CustomButton
                    onPress={handleSubmit(onSignInPress)}
                    value = 'Confirm'
                    type = 'PRIMARY'
                />
                <CustomButton
                    onPress={onResendCodePress}
                    value='Resend Code'
                    type='SECONDARY'
                />
                <CustomButton
                    onPress={onBackPress}
                    value = 'Back to sign up'
                    type = 'TERTIARY'
                />
            </View>


            <View style = {{position: 'absolute'}}><Top_Circle/></View>
            <View><Bottom_Circle/></View>

            <View style = {styles.back}>
                <TouchableOpacity onPress={onBackPress}>
                    <FontAwesomeIcon icon={faArrowLeft} size={30}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create ({
    body: {
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
      },
      title: {
        fontSize: 35,
        fontFamily: 'Judson-Bold',
        color: COLORS.primary,
        marginTop: -25,
        marginBottom: 15,
      },
      text: {
        fontSize: 13,
        color: COLORS.black,
      },
      back: {
        position: 'absolute', 
        height: 5, 
        width: 30, 
        top: 80,
        left: 50,
    }

})