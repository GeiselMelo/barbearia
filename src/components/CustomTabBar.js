import React, { useContext } from 'react';
import styled from 'styled-components/native';

import { UserContext } from '../contexts/UserContext';

import HomeIcon from '../assets/homeIcon.svg';
import SearchIcon from '../assets/searchIcon.svg';
import CalendarIcon from '../assets/clendarIcon.svg';
import FavoritesIcon from '../assets/favoritesIcon.svg';
import UserIcon from '../assets/userIcon.svg';


const TabArea = styled.View`
    height: 60px;
    background-color: #4EADBE;
    flex-direction: row;
`;
const TabItem = styled.TouchableOpacity `
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const AvatarIcon = styled.Image`
    width: 34px;
    height: 34px;
    border-radius: 15px;
`;
const TabItemCenter = styled.TouchableOpacity`
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    border-radius: 35px;
    border: 3px solid #4EADBE;
    margin-top: -25px;
`;

export default ({ state, navigation}) => { //props
    const { state: user } = useContext(UserContext);
    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }

    return (
        <TabArea>
            <TabItem onPress={()=>goTo('Home')}>
                <HomeIcon style={{opacity: state.index===0? 1 : 0.5}} width="24" height="24" fill="#FFFFFF"/>
            </TabItem>

            <TabItem onPress={()=>goTo('Search')}>
                <SearchIcon style={{opacity: state.index===1? 1 : 0.5}} width="24" height="24" fill="#FFFFFF"/>
            </TabItem>

            <TabItemCenter onPress={()=>goTo('Appointments')}>
                <CalendarIcon  width="32" height="32" fill="#4EADBE"/>
            </TabItemCenter>

            <TabItem onPress={()=>goTo('Favorites')}>
                <FavoritesIcon style={{opacity: state.index===3? 1 : 0.5}} width="24" height="24" fill="#FFFFFF"/>
            </TabItem>

            <TabItem onPress={()=>goTo('Profile')}>
                {user. avatar != '' ?
                    <AvatarIcon source={{uri: user.avatar}} /> //caso a pessoa tenha uma imagem no cadastro
                    :
                    <UserIcon style={{opacity: state.index===4? 1 : 0.5}} width="24" height="24" fill="#FFFFFF"/>// caso a  pessoa ñ tenha irá apareceresse icon
            }    
            </TabItem>
        </TabArea>
    );
}