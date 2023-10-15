import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import Api from '../Api';

import ExpendIcon from '../assets/chevron-down-solid.svg'
import NavPrevIcon from '../assets/chevron-left.svg';
import NavNextArea from '../assets/chevron-right .svg';


const Modal = styled.Modal``;

const ModalArea = styled.View`
    flex: 1;
    background-color: rgba(0,0,0, 0.5);
    justify-content: flex-end;
`;

const ModalBody = styled.View`
    background-color: #83D6E3;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    min-height: 300px;
    padding: 10px 20px 40px 20px;
`;
const CloseButton = styled.TouchableOpacity`
    widht: 40px;
    height: 40px;
`;

const ModalItem = styled.View`
    background-color: #FFFFFF;
    border-radius: 10px;
    margin-bottom: 15px;
    padding:10px;
`;

const UserInfo = styled.View`
    flex-direction: row;
    aling-items: center;
`;

const UserAvatar = styled.Image`
    width: 56px;
    height: 56px;
    border-radius: 20px;
    margin-right: 15px;
`;

const UserName = styled.Text`
    color: #000000;
    font-size: 18px;
    font-weight: bold;
`;

const ServiceInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const ServiceName = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

const ServicePrice = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;
const FinishButton = styled.TouchableOpacity`
    background-color: #268596;
    height: 60px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

const FinishiButtonText = styled.Text`
    color: #FFFFFF;
    font-size: 17px;
    font-weight: bold;
`;

const DateInfo = styled.View`
    flex-direction: row;
`;

const DatePrevArea = styled.TouchableOpacity`
    flex: 1;
    justify-content: flex-end;
    align-items: flex-end;
`;

const DateTitleArea = styled.View`
    width: 140px;
    justify-content: center;
    align-items: center;
`;

const DateTitle = styled.Text`
    font-size: 17px;
    font-weight: bold;
    color: #000000;
`;
 
const DateNextArea = styled.TouchableOpacity`
    flex: 1;
    align-items: flex-start;
`;

const DateList = styled.ScrollView``;

const DateItem = styled.TouchableOpacity`
    width: 45px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    align-items: center;
    padding-top: 5px;
    padding-bottom: 5px;
`;

const DateItemWeekDay = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

const DateItemNumber = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

const TimeList = styled.ScrollView``;

const TimeItem = styled.TouchableOpacity`
    width: 75px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

const TimeItemText = styled.Text`
    font-size: 16px;
`;


const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novenbro',
    'Dezembro'
];

const days = [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sab'
];
export default ({ show, setShow, user, service }) => {
    const navigation = useNavigation();

    //parte do calendario
    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedHour, setSelectedHour] = useState(null);
    const [listDays, setListDays] = useState([]);
    const [listHours, setListHours] = useState([]);

    useEffect(()=>{
        //console.log("user.available", user.available);
    


        if(user.available) {//roda essa parte do cód somente após encontrar o available
            let daysInMonth = new Date(selectedYear, selectedMonth+1, 0).getDate();//para saber quantos dias tem no mês
            let newListDays = [];//preenche cada dia 

            for(let i=1;i<=daysInMonth;i++) {//criando newlistday com dias e se tem disponibilidade na agenda no dia
                let d = new Date(selectedYear, selectedMonth, i);//dia selecionado e mes selecionado o dia é representado pelo"i"
                let year = d.getFullYear();//montando a data especifca
                let month = d.getMonth() + 1;//mes especifico o mes começa do 0 coloca o 1 para começar mes certo
                let day = d.getDate();//dia especifico
                month = month < 10 ? '0'+month : month;//verificação do mes
                day = day < 10 ? '0'+day : day;//verificação do dia
                let selDate = `${year}-${month}-${day}`;//data selecionada

                //verificando se tem disponibilidade no dia especifico na agenda é um filtro
                let availability = user.available.filter(e=>e.date === selDate);


                newListDays.push({
                    status: availability.length > 0 ? true : false,//se o barbeiro tem disponibilidade no dia
                    weekday: days[ d.getDay() ],//dia a semana especifico
                    number: i//numero do dia
                });
            }

            setListDays(newListDays);//lista de dias
            setSelectedDay(0);//zera os dias
            setListHours([]);//zera as horas
            setSelectedHour(0);//zera hora selecinada
        }
    }, [user, selectedMonth, selectedYear]);//monitora mes e ano

    useEffect(()=>{

        //console.log("user.available:", user.available);
        //console.log("selectedDay:", selectedDay);
        //console.log("selectedMonth:", selectedMonth);
        


        if(user.available && selectedDay > 0) {
            let d = new Date(selectedYear, selectedMonth, selectedDay);
            let year = d.getFullYear();
            let month = d.getMonth() + 1;
            let day = d.getDate();
            month = month < 10 ? '0'+month : month;
            day = day < 10 ? '0'+day : day;
            let selDate = `${year}-${month}-${day}`;

            let availability = user.available.filter(e=>e.date === selDate);

            //console.log("Availability for selected date:", availability);

            if(availability.length > 0) {
                setListHours( availability[0].hours );
            }
        }
        setSelectedHour(null);//zera hora quando busca outra data
    }, [user, selectedDay]);

    useEffect(()=>{
        let today = new Date();
        setSelectedYear( today.getFullYear() );
        setSelectedMonth( today.getMonth() );
        setSelectedDay( today.getDate() );
    }, []);

    const handleLeftDateClick = () => {
        let mountDate = new Date(selectedYear, selectedMonth, 1);
        mountDate.setMonth( mountDate.getMonth() - 1);
        setSelectedYear(mountDate.getFullYear());
        setSelectedMonth(mountDate.getMonth());
        setSelectedDay(0);
    }

    const handleRightDateClick = () => {
        let mountDate = new Date(selectedYear, selectedMonth, 1);
        mountDate.setMonth( mountDate.getMonth() + 1);
        setSelectedYear(mountDate.getFullYear());
        setSelectedMonth(mountDate.getMonth());
        setSelectedDay(0);
    }

    const handleCloseButton = () => {
        setShow(false);
    }

    const handleFinishClick = async ()=> {
        if(
            user.id &&
            service != null &&
            selectedYear > 0 && 
            selectedMonth > 0 &&
            selectedDay > 0 &&
            selectedHour != null
        ) {
          //alert("SERVICE: "+user.services[service].id); //pra ver o que está retornando em service
            //alert("MES: "+selectedMonth);//ve se está retornando o mes certo
           
            let res = await Api.setAppointment(
                user.id,
                user.services[service].id,
                selectedYear,
                selectedMonth + 1,
                selectedDay,
                selectedHour
            );
            if(res.error == '') {
                setShow(false);//fecha o modal e vai p/ tela do Appointments
                navigation.navigate('Appointments');//envia para tela de agendamentos 
            } else {
                alert(res.error);
            }
          
            //parte caso ñ tenha o Apppointments na Api
           // setShow(false);
           // navigation.native('Appointments');

        } else {
            alert("Preencha os dados");
        }
    }

    return (
        <Modal
            transparent={true}
            visible={show}
            animationType="slide"
        >
            <ModalArea>
                <ModalBody>
                    <CloseButton onPress={handleCloseButton}>
                        <ExpendIcon width="40" height="40" fill="#000000" />
                    </CloseButton>

                    <ModalItem>
                        <UserInfo>
                            <UserAvatar source={{uri: user.avatar}}/>
                            <UserName>{user.name}</UserName>
                        </UserInfo>
                    </ModalItem>

                    {service != null &&
                        <ModalItem>
                            <ServiceInfo>
                                <ServiceName>{user.services[service].name}</ServiceName>
                                <ServicePrice>R$ {user.services[service].price.toFixed(2)}</ServicePrice>
                            </ServiceInfo>
                        </ModalItem>
                    }

                    <ModalItem>
                        <DateInfo>
                            <DatePrevArea onPress={handleLeftDateClick}>
                                <NavPrevIcon width={35} height={35} fill="#000000" />
                            </DatePrevArea>

                            <DateTitleArea>
                                <DateTitle> {months[selectedMonth]} {selectedYear}</DateTitle>
                            </DateTitleArea>

                            <DateNextArea onPress={handleRightDateClick}>
                                <NavNextArea  width={35} height={35} fill="#000000" />
                            </DateNextArea>
                        </DateInfo>
                        <DateList horizontal={true} showsHorizontalScrollIndicator={false}>
                            {listDays.map((item, key)=>(//mostra o dia especifico
                                <DateItem//item especifico do dia
                                    key={key}
                                    onPress={()=>item.status ? setSelectedDay(item.number) : null}
                                    style={{
                                        opacity: item.status ? 1 : 0.5,
                                        backgroundColor: item.number === selectedDay ? '#4EADBE' : '#FFFFFF'
                                    }}
                                 >
                                    <DateItemWeekDay
                                        style={{
                                           color: item.number === selectedDay ? '#FFFFFF' : '#000000'     
                                        }}
                                    >{item.weekday}</DateItemWeekDay>
                                    <DateItemNumber
                                    style={{
                                        color: item.number === selectedDay ? '#FFFFFF' : '#000000'     
                                     }}
                                    >{item.number}</DateItemNumber>
                                </DateItem>
                            ))}
                        </DateList>
                    </ModalItem>

                     {selectedDay > 0 && listHours.length > 0 &&               
                            <ModalItem>
                                <TimeList horizontal={true} showsHorizontalScrollIndicator>
                                    {listHours.map((item, key)=>(
                                        <TimeItem
                                            key={key}
                                            onPress={()=>setSelectedHour(item)}
                                            style={{
                                                backgroundColor: item === selectedHour ? '#4EADBE' : '#FFFFFF'
                                            }}
                                        >
                                            <TimeItemText
                                                style={{
                                                    color: item === selectedHour ? '#FFFFFF' : '#000000',
                                                    fontWeight: item === selectedHour ? 'bold' : 'normal'
                                                }}
                                            >{item}</TimeItemText>
                                        </TimeItem>
                                    ))}
                                </TimeList>   
                            </ModalItem>
                    } 
                       <FinishButton onPress={handleFinishClick}>
                            <FinishiButtonText>Finalizar Agendamento</FinishiButtonText>
                       </FinishButton>
                </ModalBody>
            </ModalArea>

        </Modal>
    );
}