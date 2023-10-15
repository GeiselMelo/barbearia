import React, { useState, useContext } from 'react';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../services/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';



import { UserContext } from '../../contexts/UserContext';
import { 
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
 } from './styles';

import Api from '../../Api';


import SignInput from '../../components/SignInput';

import BarberLogo from '../../assets/images_1.svg';
import EmailIcon from '../../assets/o-email (1).svg';
import LockIcon from '../../assets/cadeado.svg';

export default () => {
    const { dispatch: userDispatch} = useContext(UserContext);

    const navigation = useNavigation();

    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    
 
    const handleSignClick = async () => {
   
        signInWithEmailAndPassword(auth, emailField, passwordField);
        
        if(emailField != '' && passwordField != '') {
            let res = await Api.signIn(emailField, passwordField);
            console.log(res);

            if(res.token) {
                await AsyncStorage.setItem('token', res.token);//salvando token no AyncStorage

                userDispatch({
                    type: 'setAvatar',
                    payload:{
                        avatar: res.data.avatar
                    }
                });

                navigation.reset({
                    routes:[{name: 'MainTab'}]
                });

                alert("Está ok");
            } else {
                alert('E-mail e/ ou senha inválido !');
            }
        } else{
            alert("Preencha os campos!!");
        }
    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SignUp'}]
        });
    }

    return (
        <Container>
           <BarberLogo width="100%" height="160" />

           <InputArea>
             <SignInput 
                IconSvg={EmailIcon} 
                placeholder={"Digite seu e-mail"}
                value={emailField}
                onChangeText={t=>setEmailField(t)}
             />
            
             <SignInput 
                IconSvg={LockIcon} 
                placeholder={"Insira sua senha"}
                value={passwordField}
                onChangeText={t=>setPasswordField(t)}
                password={true}
                />

                
                <CustomButton onPress={handleSignClick}>
                     <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>
           </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>

        </Container>
    );
}