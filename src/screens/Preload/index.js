import React , { useEffect, useContext } from 'react';
import { Container, LoadingIcon } from './styles.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";


import Api from '../../Api';

import BarberLogo from '../../assets/bar.svg';
import {UserContext} from '../../contexts/UserContext';
export default () => {

  const { dispatch: userDispatch } = useContext(UserContext);
  const navigation = useNavigation();
  useEffect(() => {
    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');//peg o teken salvo no app
        if(token) {
           let res = await Api.checkToken(token); // validar o token 
           if(res.token) {

              await AsyncStorage.setItem('token', res.token);

              userDispatch({
                type: 'setAvatar',
                payload:{
                  avatar: res.data.avatar
                }
              });

              navigation.reset({
                routes:[{name: 'MainTab'}]
              });
           }
        } else {
          navigation.navigate('SignIn');
        }
    }
    checkToken();

  }, []);

    return (
      <Container>
        <BarberLogo width="100%" height="160"/>
        <LoadingIcon size="large" color="FFFFFF"/>
      </Container>
    );
}
