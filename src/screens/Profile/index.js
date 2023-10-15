import React from 'react';
import { Text, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Container } from './styles';
import Api from '../../Api';

export default () => {
    const navigtion = useNavigation();

    const handleLogoutClick = async () => {//botão de logout
        await Api.logout();
        navigation.reset({
            routes:[{name: 'SignIn'}]
        });
    }

    return (
        <Container>
           <Text></Text>
           <Button title="Sair" onPress={handleLogoutClick} />
        </Container>
    );
}
