import React from 'react';
import { PixelRatio } from 'react-native';
import styled from 'styled-components';

export const Container = styled.SafeAreaView`
    background-color:#e0eff1;
    flex: 1;
    justify-content: center;
    align-items: center;
`;
export const InputArea = styled.View`
    width: 100%;
    padding: 40px;
`;
export const CustomButton = styled.TouchableOpacity`
    hight: 60px;
    padding: 20px;
    background-color:#319190;
    border-radius: 30px;
    justify-contente:center;
    align-items: center;
`;
export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #FFFFFF;
`;
export const SignMessageButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    margin-top: 50px;
    margi-bottonm: 20px;
`;
export const SignMessageButtonText = styled.Text`
    font-size: 16px;
    color: #268596;
`;
export const SignMessageButtonTextBold = styled.Text`
    font-size: 16px;
    color:#268596;
    font-weight: bold;
    margin-left:5px;
`;