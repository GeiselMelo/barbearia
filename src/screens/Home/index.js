import React , { useState, useEffect } from 'react';
import { Platform, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

import Api from '../../Api';

import { 
    Container,
    Scroller,

    HeaderArea,
    HeaderTitle,
    SearchButton,

    LocationArea,
    LocationInput,
    LocationFinder,
    LoadingIcon,
    ListArea,
 } from './styles';

import BarberItem from '../../components/BarberItem';

import SearchIcon from '../../assets/searchIcon.svg';
import MyLocationIcon from '../../assets/location.svg';

export default () => {
    const navigation = useNavigation();

    const [locationText, setLocationText] = useState('');
    const [coords, setCoords] = useState(null);//salva as cordenadas
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);//lista de barbeiros
    const [refreshing, setRefreshing] = useState(false);

    const handleLocationFinder = async () => {//qnd usuário clicar na localização chama a função para armazenar
        setCoords(null);//zera qualquer coordenadar que estiver salva
        let result = await request(
           Platform.OS === 'ios' ? //pra saber qual sistema está rodando se é IOS ou Android
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE //para IOS
            :
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION //para Android
        );//pedindo permissão para pegar localização

        if(result == 'granted'){//usuário deu acesso
            setLoading(true);//joga loading antes de pedir permissão
            setLocationText('');//zera o texto que estiver no campo da localização 
            setList([]);//zera tudo

            Geolocation.getCurrentPosition((info)=>{
                //console.log(info);

                setCoords(info.coords);//coordenadas que vem de info
                getBarbers();//buscano barbeiros próximo a localização

            });

        }
    }
        const getBarbers = async () => {//função que peg a lista dos barbeiros e exibe na tela
            setLoading(true);//inicia o carregamento 
            setList([]);//vaza a lista de barbeiros completa

            let lat = null;//latitude 
            let lng = null;//longitude
            if(coords) {//verificando se o cliente passou alguma localização
                lat = coords.latitude;
                lng = coords.longitude;
            }

            let res = await Api.getBarbers(lat, lng, locationText);
            //console.log(res);
            if(res.error == '') {
                if(res.loc) {
                    setLocationText(res.loc);
                }
                setList(res.data);
            }else {
                alert("Erro: "+res.error);
            }

            setLoading(false);
        }
        useEffect(()=>{//ao abrir a tela pega a lista dos barbeiros
            getBarbers();
        }, []);
        
        const onRefresh = () => {//atualiza a pagina
            setRefreshing(false);
            getBarbers();
        }

        const handleLocationSearch = () => {//ao digitar a cidade na localização
            setCoords({});//esse campo zera as coordenadas caso tenha alguma cidade salva
            getBarbers();//esse busca a cidade que está digitando 
        }
    return (
        <Container>
            <Scroller  refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>

                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Encontre o Barbeiro de sua preferência!! </HeaderTitle>
                    <SearchButton onPress={()=>navigation.navigate('Search')}>
                        <SearchIcon width="26" height="26" fill="#FFFFFF"/>
                    </SearchButton>
                </HeaderArea>

                <LocationArea>
                    <LocationInput
                        placeholder='Qual sua loacalização?'
                        placeholderTextColor="#FFFFFF"
                        value={locationText}
                        onChangeText={t=>setLocationText(t)}
                        onEndEditing={handleLocationSearch}
                    />
                        <LocationFinder onPress={handleLocationFinder}>
                            <MyLocationIcon width="24" height="24" fill="#FFFFFF" />
                        </LocationFinder> 
                </LocationArea>

                {loading &&
                    <LoadingIcon size="large" color='#FFFFFF' />
                }

                <ListArea>
                    {list.map((item, k)=>(
                        <BarberItem key={k} data={item} />
                    ))}
                </ListArea>
                
            </Scroller>
        </Container>
    );
}
