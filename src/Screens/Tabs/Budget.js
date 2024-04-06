import background from "../../../assets/Bottom_Background.png"
import React, { useEffect, useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet,
    ImageBackground,
    Pressable,
    Modal,
    Alert,
    FlatList,
    LogBox
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useIsFocused } from "@react-navigation/native";

// App utilities from the 'utils' folder
import { COLORS } from "../../utils/COLORS";
import CustomInput from "../../utils/CustomInput";
import Loading from "../../utils/loading";

// Firebase Databse
import { addDoc, deleteDoc, doc, getDocs, orderBy, query, where } from "firebase/firestore";
import { budgetRef, db } from "../../../config/firebase";

// React-Hook-Form
import { useForm } from "react-hook-form";

// FontAwesome icons
import { faAppleWhole, faBars, faDollarSign, faGasPump, faGem, faHouse, faMoneyBillTransfer, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setTargets } from "../../redux/slices/user_budgets";


export default function Budget ({navigation}) {

    LogBox.ignoreAllLogs();

    // Variable telling if the screen is focused
    const isFocused = useIsFocused();

    // React-Hook-Form controls
    const {control, handleSubmit} = useForm();

    const [loading, setLoading] = useState(false)

    // Global variables that remember their values from the last use using Redux
    const {user} = useSelector(state => state.user)
    const {monthly} = useSelector(state => state.persistTransaction)
    const {targets} = useSelector(state => state.persistTarget)
    const dispatch = useDispatch()


    // Variables for all of the amounts paid towards a budgets 
    const [shopping, setShopping] = useState(0)
    const [food, setFood] = useState(0);
    const [rent, setRent] = useState(0);
    const [bills, setBills] = useState(0);
    const [fuel, setFuel] = useState(0);
    const [other, setOther] = useState(0);

    // Variables for all of the budget targets
    const [targetShop, setTargetShop] = useState(0)
    const [targetFood, setTargetFood] = useState(0);
    const [targetRent, setTargetRent] = useState(0);
    const [targetBills, setTargetBills] = useState(0);
    const [targetFuel, setTargetFuel] = useState(0);
    const [targetOther, setTargetOther] = useState(0);


    // States for the dropdown in the 'Add Budget' modal
    const [open, setOpen] = useState(false)
    const [budget, setBudget] = useState(null)
    const [items, setItems] = useState([
        {label: null, value: null},
        {label: 'Shopping', value: 'Shopping'},
        {label: 'Fuel', value: 'Fuel'},
        {label: 'Rent', value: 'Rent'},
        {label: 'Food & Drink', value: 'Food & Drink'},
        {label: 'Bills', value: 'Bills'},
        {label: 'Other', value: 'Other'}
    ])

    // Handles whether or not the 'Add Budget' modal is visible
    const [modalVisible, setModalVisible] = useState(false)
    const handleAddBudget = () => {
        setModalVisible(true)
    }

    // Handles if a budget transaction needs to be deleted from the database
    const removeFromFirestore = async (val) => {
        const docRef = (doc(db, 'budgets', val.id));
        console.log(val.id)
        try {
          await deleteDoc(docRef)
          console.log("Entire Document has been deleted successfully.");
          
        } catch(ex) {
          console.log(ex); 
        }
    }


    // Handles when a budget transaction is added to the database
    const handleAdd = async(target) => {
        try{
            let doc = await addDoc( budgetRef, {
                name: budget,
                target: Number(target),
                userID: user.uid
            });
            setLoading(false);
            if(doc && doc.id){
                setModalVisible(false)
            }
        }catch(err) {
            console.log(err)
            Alert.alert("Error:", "Something went wrong")
            setModalVisible(false)
            setLoading(false);

        }
    }
    const handlePress = async (data) => {
        setLoading(true);
        let exists = false;
        let target = data.amount
        let previous = targets.find(item => item.name == budget)
        if (previous == null) {
            console.log(true)
            handleAdd(target)
        }else {
            console.log(false)
            Alert.alert("Error", "Already have this budget, would you like to update?", [
                {
                  text: 'No',
                  onPress: () => { exists = true; setModalVisible(false)},
                  style: 'cancel',
                },
                {
                    text: 'OK', 
                    onPress: () => { exists = true, removeFromFirestore(previous); handleAdd(target);}  
                },
            ]);
        }

        setLoading(false);
    }


    //Retrieves the budget data from the databse
    const fetchBudgets = async () => {

        const q = query(budgetRef, where("userID", "==", user.uid), orderBy('name', 'desc'));
        const querySnapshot = await getDocs(q);
        let data = []
        querySnapshot.forEach(doc => {
            data.push({...doc.data(), id: doc.id, })
        });
        dispatch(setTargets(data))
        //console.log(targets)

        
        if (targets.length > 0){
            for(i in targets) {
                Name = targets[i].name;
                Amount = targets[i].target;
    
                if('Shopping' == Name){
                    setTargetShop(Amount);
                }else if('Fuel' == Name){
                    setTargetFuel(Amount);
                }else if('Rent' == Name){
                    setTargetRent(Amount);
                }else if('Bills' == Name){
                    setTargetBills(Amount);
                }else if('Food & Drink' == Name){
                    setTargetFood(Amount);
                }else if('Other' == Name){
                    setTargetOther(Amount);
                };
            }
        }else {
            setTargetShop(0);  
            setTargetFuel(0);
            setTargetRent(0);
            setTargetBills(0);
            setTargetFood(0);
            setTargetOther(0);
        }
        

        let shop = 0
        let gas = 0
        let bill = 0
        let ren = 0
        let foo = 0
        let oth = 0

        for(i in monthly) {
            Name = monthly[i].name;
            Amount = monthly[i].amount;

            if('Shopping' == Name){
                shop -= Amount;
                setShopping(shop);
            }else if('Fuel' == Name){
                gas -= Amount;
                setFuel(gas);
            }else if('Rent' == Name){
                ren -= Amount;
                setRent(ren);
            }else if('Bills' == Name){
                bill -= Amount;
                setBills(bill);
            }else if('Food & Drink' == Name){
                foo -= Amount;
                setFood(foo);
            }else if(('Other' || null) == Name){
                oth -= Amount;
                monthly[i].name = 'Other';
                setOther(oth);
            };
            
        }
    };

    
    // Array of all the budget information needed for the screen
    const budgets = [
        {
            name: "Shopping",
            amount: Number(shopping),
            target: Number(targetShop),
            percent: `${(shopping/targetShop)*100}%`,
            key: 'shopping',
            icon: faShoppingCart,
        },

        {
            name: "Rent",
            amount: Number(rent),
            target: Number(targetRent),
            percent: `${(rent/targetRent)*100}%`,
            key: 'rent',
            icon: faHouse,
        },
        {
            name: "Food & Drink",
            amount: Number(food),
            target: Number(targetFood),
            percent: `${(food/targetFood)*100}%`,
            key: 'food',
            icon: faAppleWhole, 
        },
        {
            name: "Bills",
            amount: Number(bills),
            target: Number(targetBills),
            percent: `${(bills/targetBills)*100}%`,
            key: 'bills',
            icon: faMoneyBillTransfer,
        },
        {
            name: "Fuel",
            amount: Number(fuel),
            target: Number(targetFuel),
            percent: `${(fuel/targetFuel)*100}%`,
            key: 'fuel',
            icon: faGasPump,
        },
        {
            name: "Other",
            amount: Number(other),
            target: Number(targetOther), 
            percent: `${(other/targetOther)*100}%`,
            key: 'other',
            icon: faGem,
        },  
    ]


    // Calls fetchBudget() when the screen comes into focus
    useEffect (() => {
        if (isFocused) {
            fetchBudgets();
        }
        
    }, [isFocused])


    // Component for displaying the budgets amount left
    function Legend({name, amount, target}) {
        const [left, setLeft] = useState(target - amount);
        const [val, setVal] = useState('left')
        if(left < 0) {
            setLeft(-left);
            setVal('over');
        }
        return (    
            <View style={{flexDirection: 'row', alignItems: 'left', width: '50%', justifyContent: 'center', marginTop: 15}}>
                <Text style={{fontSize: 17, color: COLORS.black, fontFamily: 'Judson-Bold'}}>{name}: </Text><Text style={[{fontSize: 15, fontFamily: 'Judson-Regular'}, val == 'over' ? ({color: 'red',}) : ({color: 'rgb(0,180,0)',})]}>${left} {val}</Text>
            </View>
        )
    }

    return (
        <ImageBackground source={background} style={{flex:1, justifyContent: 'center'}}>
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
                
            >
                <Pressable style={styles.centeredView} onPress={(event) => event.target == event.currentTarget && setModalVisible(false)}>
                    <View style={styles.modalView}>

                        <Text style={styles.modalText}>Choose a Category!</Text>
                        <DropDownPicker 
                            value={budget}
                            //stickyHeader={true}
                            items={items}
                            setItems={setItems}
                            setValue={setBudget}
                            placeholder='Select Budget'
                            containerStyle={{height: 60}}
                            style={{backgroundColor: '#fff'}}
                            setOpen={setOpen}
                            open={open}  
                                
                        />     

                        <Text style={styles.modalText}>Budget Amount?</Text>
                        <CustomInput 
                            name = "amount"
                            placeholder='0.00'
                            control={control}
                            rules={{
                                required: 'An Amount is required', 
                            }}
                            extraStyle={styles.iconInput} 
                            icon={faDollarSign}     
                            color={'rgb(220,0,0)'}                              
                        />

                        
                        {
                            loading ? (
                                <Loading color={COLORS.secondary}/>
                            ) : (
                                <Pressable
                                    style= {( {pressed} ) =>[styles.button, pressed ? {opacity: .8}:{opacity: 1}]}
                                    onPress={handleSubmit(handlePress)}
                                >
                                    <Text style={styles.textStyle}>Submit</Text>
                                </Pressable>
                            )
                        }
                        
                    </View>
                </Pressable>
            </Modal>

            <View style = {{flex: 1, alignItems: 'center'}} >
                <View style={styles.banner}> 
                    <Pressable style={{flex: .3, alignItems: 'center', marginLeft: -10}} onPress={navigation.toggleDrawer}>
                            <FontAwesomeIcon icon={faBars} size={30} color='white'/>
                    </Pressable>
                    <View style={{alignItems: 'center', justifyContent: 'center',flex: 1, paddingRight: 60}}>
                        <Text style = {{color: COLORS.white, fontSize: 30, fontFamily: 'Judson-Bold'}}>
                            Budgets
                        </Text>
                    </View>
                </View>
            
            
                <View style = {[styles.visual, {justifyContent: 'space-around', flexWrap: 'wrap'}]}>
                        {budgets.map(({name, amount, target}) => {
                            return <Legend name = {name} amount = {amount} target = {target} />
                        })}                    
                </View>

                
                <Pressable 
                    style={{ height: 60, width: '70%', backgroundColor: COLORS.lightSecondary, alignItems: 'center', justifyContent: 'space-between', borderRadius: 30, margin: 20, justifyContent: 'center'}}
                    onPress={handleAddBudget}
                >
                    <Text style={{fontSize: 17, color: COLORS.black, fontFamily: 'Judson-Bold'}}>Add/Edit Budget</Text>
                </Pressable>
                

                <FlatList 
                    style = {styles.list} 
                    data={budgets}
                    ListEmptyComponent={<Loading/>}
                    keyExtractor={item => item.id}
                    setWeeklyIncome={({item}) => { weeklyIncome + item.amount}}
                    renderItem={({item}) => {
                        return (
                            <View style={{flexDirection: 'row', height: 70, width: '100%', borderBottomColor: '#000', borderBottomWidth: .5, padding: 15}}>
                                <View style={{backgroundColor: 'white', height: 40, width: 40, borderRadius: 40/2, marginRight: 15, alignItems: 'center', justifyContent: 'center'}}>
                                            <FontAwesomeIcon icon = {item.icon} size={25}/> 
                                </View>
                                <View style={{flexDirection: 'column', justifyContent: 'space-around'}}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '90%'}}>

                                        <View style={{flexDirection: 'column', justifyContent: 'space-around', width: 'auto' }}>
                                            <Text style={{fontFamily: 'Judson-Bold', fontSize: 21, color: '#000'}}>{item.name}</Text>
                                            <Text/>
                                        </View>

                                        <View style={{alignItems: 'center', justifyContent: 'center', width: 'auto'}}>
                                            <Text style={{fontFamily: 'Judson-Bold', fontSize: 16, color: '#888'}}>${item.amount} of ${item.target}</Text>
                                        </View>

                                        
                                    </View>

                                    <View style={styles.bar}>
                                        <View style={[{flex: 1, backgroundColor: COLORS.lightSecondary }, item.amount >= item.target ? ({width: '100%'}) : ({width: item.percent})]}/>
                                    </View>
                                </View> 
                            </View>
                        )
                    }}
                />


                <View style = {[styles.profit, {top: 110}]}>
                    <Text style = {styles.profit_text}>Monthly Budgets</Text>
                </View>
                
            </View>

        </ImageBackground>
    )
}


// All styles for the Budget page
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
        height: 'auto',
        width: '85%',
        backgroundColor: COLORS.lightPrime,
        marginTop: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
        paddingBottom: 20,
    },
    totalView: {
        backgroundColor: COLORS.white, 
        width: 110, 
        height: 50, 
        borderRadius: 15, 
        opacity: .9, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    list: {
        height: '45%',
        width: '85%',
        borderRadius: 20,
        flexDirection: 'column',

        backgroundColor: COLORS.lightPrime,
    },
    add: {
        height: '90%',
        width: '45%',
        backgroundColor: COLORS.lightSecondary,
        opacity: .6,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
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
        justifyContent: 'center',
        borderRadius: 30,

        flexDirection: 'row',
        paddingRight: 15,
        
        position: 'absolute',
    },
    profit_text: {
        marginLeft: 15,
        fontFamily: 'Judson-Regular',
        color: COLORS.primary,
        fontSize: 24,
    },
    bar: {
        backgroundColor: 'white',
        height: 6,
        width: '90%'
    },





    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        
    },
    modalView: {
        height: 'auto',
        width: '85%',
        backgroundColor: COLORS.primary,
        
        margin: 20,
        padding: 25,
        
        borderRadius: 20,
        
        alignItems: 'left',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        
    },
    description: {
        height: 70,
        width: '108%',
        backgroundColor: 'white',

        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 15,

        fontWeight: 'bold',
        fontSize: 16,

        
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#2196F3'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 10,
        color: COLORS.black,
        fontSize: 20,
    },
    icon: {
        width: 40, 
        height: 40, 
        backgroundColor: 'white', 
        
        borderBottomLeftRadius: 10, 
        borderTopLeftRadius: 10, 
        borderWidth: 1,
        
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    iconInput: {
        width: '92%', 
        height: 40, 
        backgroundColor: 'white', 
  
        borderLeftColor: '#000', 
        borderLeftWidth: .5,
        borderBottomRightRadius: 10, 
        borderTopRightRadius: 10, 
        borderWidth: 1,
  
        marginBottom: 15, 
        paddingLeft: 10, 
  
        fontWeight: 'bold', 
        fontSize: 16,
    },
})