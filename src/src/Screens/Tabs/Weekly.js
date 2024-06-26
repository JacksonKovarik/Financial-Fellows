import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  FlatList,
  LogBox,
} from 'react-native';

import { PieChart } from "react-native-chart-kit";
import background from "../../../assets/Bottom_Background.png"

// App utilities from the 'utils' folder
import { COLORS } from '../../utils/COLORS';
import Loading from '../../utils/loading';

// Redux
import { useSelector } from 'react-redux';

// FontAwesome icons
import { faAppleWhole, faBars, faGasPump, faGem, faHouse, faMoneyBill1Wave, faMoneyBillTransfer, faRefresh, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useIsFocused } from '@react-navigation/native';



export default function Weekly ({navigation}) {

    LogBox.ignoreAllLogs();

/*************************************************************************************/
//                      Variables/States for the Weekly tab
/*************************************************************************************/

    // Boolean telling whether the screen is in focus or not
    const isFocused = useIsFocused();

    // State from redux
    const {weekly} = useSelector(state => state.persistTransaction);

    // States for all of the information needed on the weekly display
    const [weeklyIncome, setWeeklyIncome] = useState(0);
    const [weeklyExpenses, setWeeklyExpenses] = useState(0);
    const [profit, setProfit] = useState(0);

    // States for all of the different budgets
    const [shopping, setShopping] = useState(0)
    const [food, setFood] = useState(0);
    const [rent, setRent] = useState(0);
    const [bills, setBills] = useState(0);
    const [fuel, setFuel] = useState(0);
    const [other, setOther] = useState(0);

    // Boolean Variable telling app if the refresh button is pressed
    const [refresh, setRefresh] = useState(false);

    // Data for the pie chart
    const record = [
        {
            name: "Shopping",
            amount: Number(shopping),
            color: "rgba(131, 167, 234, 1)",
            key: 'shopping',
            icon: faShoppingCart
        },
        {
            name: "Food & Drink",
            amount: Number(food),
            color: "#F00FFF",
            key: 'food',
            icon: faAppleWhole
        },
        {
            name: "Rent",
            amount: Number(rent),
            color: "red",
            key: 'rent',
            icon: faHouse
        },
        {
            name: "Bills",
            amount: Number(bills),
            color: "#fff000",
            key: 'bills',
            icon: faMoneyBillTransfer
        },
        {
            name: "Fuel",
            amount: Number(fuel),
            color: "rgb(0, 0, 255)",
            key: 'fuel',
            icon: faGasPump
        },
        {
            name: "Other",
            amount: Number(other),
            color: "rgb(150, 100, 255)",
            key: 'other',
            icon: faGem
        },
    ];

    // A state to let the app know if piechart should be visible
    const [pieChartVisible, setPieChartVisible] = useState(false)
    if (!pieChartVisible)  {
        for (i in record){
            if(record[i].amount > 0) {
                setPieChartVisible(true)
            }
        }
    }

/*************************************************************************************/
//                      Functions for the Weekly tab
/*************************************************************************************/

    // Retrieves needed weekly information from the transactions
    const fetchStats = () => {
        let shop = 0
        let gas = 0
        let bill = 0
        let ren = 0
        let foo = 0
        let oth = 0
        for(i in weekly){
            let Name = weekly[i].name
            let Amount = weekly[i].amount

            if('Shopping' == Name){
                shop -= Amount
                setShopping(shop)
            }else if('Fuel' == Name){
                gas -= Amount
                setFuel(gas)
            }else if('Rent' == Name){
                ren -= Amount
                setRent(ren)
            }else if('Bills' == Name){
                bill -= Amount
                setBills(bill)
            }else if('Food & Drink' == Name){
                foo -= Amount
                setFood(foo)
            }else if(('Other' || null) == Name){
                oth -= Amount
                weekly[i].name = 'Other'
                setOther(oth)
            }
        }

        //console.log(weekly)

        let prof = 0
        let inc = 0
        let exp = 0
        for(i in weekly) {
            prof += weekly[i].amount
            if (weekly[i].amount > 0) {
                inc += weekly[i].amount
            }else {
                exp -= weekly[i].amount
            }
        }
        setProfit(prof);        
        setWeeklyIncome(inc);
        setWeeklyExpenses(exp)
    }

    // Refreshes the screens to fetch new stats
    const onRefresh = () => {
        setRefresh(true);
        fetchStats();
        setTimeout ( () => {
            setRefresh(false)
        }, 500)
    }
    
    
    // Calls the 'fetchStats' function when the screen is focused
    useEffect(() => {
        if (isFocused) {
            fetchStats();
        }
            
    }, [isFocused])
    

    // Function to display the piechart legend
    function Legend({color, name}) {
        return (    
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'left', }}>
                <View style={{width: 10, height: 10, backgroundColor: color}}/>
    
                <Text style={{fontSize: 12, color: COLORS.black, }}>  {name}</Text>
            </View>
        )
    }
    
    return (
        <ImageBackground source={background} style={{flex:1, justifyContent: 'center'}}>
            <View style = {{flex: 1, alignItems: 'center'}}>
                <View style={styles.banner}> 
                    <Pressable style={{flex: .3, alignItems: 'center', marginLeft: -10}} onPress={navigation.toggleDrawer}>
                            <FontAwesomeIcon icon={faBars} size={30} color='white'/>
                    </Pressable>
                    <View style={{alignItems: 'center', justifyContent: 'center',flex: 1}}>
                        <Text style = {{color: COLORS.white, fontSize: 30, fontFamily: 'Judson-Bold'}}>
                            Weekly
                        </Text>
                    </View>
                    <Pressable style= {({pressed}) => [{flex: .3, alignItems: 'center', marginLeft: -10},]} onPress={onRefresh}>
                            <FontAwesomeIcon style={{}} icon={faRefresh} size={30} color= {refresh ? (COLORS.secondary) : ('white')}/>
                    </Pressable>
                </View>


                {/* Where the pie chart is displayed */}
                { pieChartVisible ? (
                    <View style = {styles.visual}>
                        <PieChart
                            data={record}
                            width={300}
                            height={150}
                            chartConfig={{
                                color: (opacity)=> '#000'
                            }}
                            accessor={"amount"}
                            backgroundColor={"transparent"}
                            paddingLeft='-10'
                            avoidFalseZero={true}
                            center={[17, -5]}
                            hasLegend={false}
                            absolute
                            style={{flex: 1.2}}
                            keyExtractor={item => item.id}       
                        />

                        {/* The circle making the pie chart a ring */}
                        <View style = {styles.circle}>
                            <Text style={{color: '#000'}}>Total Expenses:</Text>
                            <Text style={{color: '#000'}}>${weeklyExpenses}</Text>
                        </View>

                        {/* Pie chart Legend */}            
                        <View style={{flex: 1,  alignItems: 'left',}}>
                            {record.map(({name, color}) => {
                                return <Legend color = {color} name = {name} />
                            })}
                        </View>

                        <Text/>

                    </View>
                ) : (
                    <View style={[styles.visual, {flexDirection: 'column'}]}> 
                        <Text style = {{color: 'black', fontSize: 20, fontFamily: 'Judson-Regular'}}>An expense visual will show here</Text>
                        <Text style = {{color: 'black', fontSize: 20, fontFamily: 'Judson-Regular', textAlign: 'center'}}>There are no expense transactions for this week</Text>
                    </View>
                )
            }


                <FlatList 
                    style = {styles.list} 
                    data={weekly}
                    ListEmptyComponent={
                        <View style={{alignItems:'center', justifyContent: 'center', padding: 15}}>
                            <Text style={{fontSize: 18, fontFamily: 'Judson-Regular', color: 'black', textAlign: 'center', marginBottom: 15}}>No Weekly expenses to generate any Modules</Text>
                            <Loading/>
                        </View>  
                    }
                    key={item => item.key}
                    setWeeklyIncome={({item}) => { weeklyIncome + item.amount}}
                    renderItem={({item, key}) => {
                        return (
                            <View style={{flexDirection: 'row', height: 70, width: '100%', borderBottomColor: '#000', borderBottomWidth: .5, padding: 15}}>
                                <View style={{backgroundColor: '#fff', height: 40, width: 40, borderRadius: 40/2, marginRight: 15, alignItems: 'center', justifyContent: 'center'}}>
                                    <FontAwesomeIcon icon={item.name == "Income"  ? (faMoneyBill1Wave) : (
                                        record.find((records) => records.name == item.name).icon
                                    )} size={25}/>
                                </View>
                                <View style={{flexDirection: 'column', justifyContent: 'space-around', width: '60%' }}>
                                    <Text style={{fontFamily: 'Judson-Bold', fontSize: 21, color: '#000'}}>{item.name}</Text>
                                    <Text style={{fontFamily: 'Judson-regular', fontSize: 12, color: '#555'}}>{item.description}</Text>
                                </View>
                                <View style={{alignItems: 'center', justifyContent: 'center', width: '25%'}}>
                                    <Text style={{fontFamily: 'Judson-Bold', fontSize: 21, color: '#000'}}>${item.amount}</Text>
                                </View>
                            </View>
                        )
                    }}
                />

                    
                <View style = {[styles.profit, {top: 110}]}>
                    <Text style = {styles.income_text}>Weekly Income:</Text>
                    <Text style = {styles.income_text}>${weeklyIncome}</Text>
                </View>
                <View style = {[styles.profit, {top: 310}]}>
                    <Text style = {styles.income_text}>Total Profit:</Text>
                    <Text style = {styles.income_text}>${profit}</Text>
                    
                </View>

            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    banner: {
        flexDirection: 'row',
        height: '16%',
        width: '100%',
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    visual: {
        flexDirection: 'row',
        height: '25%',
        width: '85%',
        backgroundColor: COLORS.lightPrime,
        marginTop: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
        paddingBottom: 20,
    },
    list: {
        height: '55%',
        width: '85%',
        marginTop: 45,
        borderRadius: 20,
        backgroundColor: COLORS.lightPrime,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        flexDirection: 'column'
    },
    add: {
        height: '90%',
        width: '45%',
        backgroundColor: COLORS.lightSecondary,
        opacity: .6,
        borderRadius: 20,
    },
    view: {
        height: '75%',
        width: '100%',
        backgroundColor: COLORS.lightSecondary,
        opacity: .6,
        borderRadius: 20,
    },
    profit: {
        height: '7%',
        width: '80%',
        backgroundColor: COLORS.lightSecondary,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 30,

        flexDirection: 'row',
        paddingRight: 15,
        
        position: 'absolute',
    },
    income_text: {
        marginLeft: 15,
        fontFamily: 'Judson-Regular',
        color: COLORS.primary,
        fontSize: 24,
    },
    circle: {
        height: 100,
        width: 100,
        borderRadius: 100/2,
        backgroundColor: COLORS.lightPrime,
        position: 'absolute',
        right: 202,
        top: 45,

        padding: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    legend: {
        position: 'absolute',
    }
})