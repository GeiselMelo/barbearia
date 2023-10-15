import React, { useState }from 'react';
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';
import { 
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
 } from './styles';

import SignInput from '../../components/SignInput';

import Api from '../../Api';

import BarberLogo from '../../assets/images_1.svg';
import EmailIcon from '../../assets/o-email (1).svg';
import LockIcon from '../../assets/cadeado.svg';
import UserIcon from '../../assets/user.svg';
import { Alert } from 'react-native';

export default () => {

    const navigation = useNavigation();

    const [nameField, setNameField] = useState('');
    const [emailFiel, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
   
    const handleSignClick = async () => {
       
        createUserWithEmailAndPassword(auth, emailFiel, passwordField);
        if(nameField != '' && emailFiel != '' && passwordField != '') {
            let res = await Api.signUp(nameField, emailFiel, passwordField);
            console.log(res);
            if(res.token) {
                alert("Tudo Ok");
            } else {
                alert("Erro: "+res.error);
            }
        } else {
            Alert("Preencha os campos");
        }
    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SignIn'}]
        });
    }

    return (
        <Container>
           <BarberLogo width="100%" height="160" />

           <InputArea>
             <SignInput 
                IconSvg={UserIcon} 
                placeholder={"Digite seu nome"}
                value={nameField}
                onChangeText={t=>setNameField(t)}
             />

             <SignInput 
                IconSvg={EmailIcon} 
                placeholder={"Digite seu e-mail"}
                value={emailFiel}
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
                     <CustomButtonText>CADASTRAR</CustomButtonText>
                </CustomButton>
           </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
            </SignMessageButton>

        </Container>
    );
}