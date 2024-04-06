import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; 
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import Top_Circle from "../../utils/Top_Circles";
import Bottom_Circle from "../../utils/Bottom_Circles";
import CustomInput from '../../utils/CustomInput';
import CustomButton from '../../utils/CustomButton';
import {useForm} from 'react-hook-form'
import { COLORS } from '../../utils/COLORS';


export default function NewPassword({navigation}) {
    
    const {control, handleSubmit} = useForm();

    const onSubmitPress = () => {
        console.warn('Sign In Pressed');
    }
    
    onBackPress = () => {
        navigation.navigate('Sign In');
    }
    const onResendCodePress = () => {
        console.warn('Resend Code Pressed');
    };
    
    return (
        <SafeAreaView style = {{flex:1,}}>
            <View style = {styles.body}>

                <Text style = {styles.title}>Financial</Text>
                <Text style = {styles.title}>Fellows</Text>
            
                <Text style = {{color: COLORS.black, fontSize: 30, fontFamily: 'Judson-Bold'}}>
                    Reset Password
                </Text>


                <CustomInput 
                    name="code"
                    placeholder='Enter Code'
                    control={control}
                    rules={{
                        required: 'Confirmation code is required', 
                    }}
                />
                <CustomInput
                    name="password"
                    placeholder='Enter New Password'
                    control={control}
                    rules={{
                        required: 'Password is required', 
                        minLength: {value: 3, message: 'Password should be minimum 3 characters long'},
                    }}
                    secureTextEntry
                />
                
                

                <CustomButton
                    onPress={handleSubmit(onSubmitPress)}
                    value = 'Submit'
                    type = 'PRIMARY'
                />
                <CustomButton
                    onPress={handleSubmit(onResendCodePress)}
                    value = 'Resend Code'
                    type = 'SECONDARY'
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
        backgroundColor: '#ffffff',
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