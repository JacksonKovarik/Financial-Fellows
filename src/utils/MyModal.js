import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { 
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native"
import CustomInput from "./CustomInput";
import Loading from "./loading";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { COLORS } from "./COLORS";
import DropDownPicker from "react-native-dropdown-picker";



const myModal = ({modalVisible, setModalVisible, handlePress}) => {
    const {control, handleSubmit} = useForm();
    const [loading, setLoading] = useState(false)

    return (
        <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
                
            >
                <Pressable style={styles.centeredView} onPress={(event) => event.target == event.currentTarget && setAddIncomeVisible(false)}>
                    <View style={styles.modalView}>

                        <Text style={styles.modalText}>Add Income!</Text> 
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
                                 
                            // {
                            //     ...addExpenseVisible==false ? (setValue(null)):(null)
                            // }                     
                        />    
                        <CustomInput 
                            name = "amount"
                            placeholder='0.00'
                            control={control}
                            rules={{
                                required: 'An Amount is required', 
                                minLength: {value: 3, message: 'Amount must be formatted like "0.00"'},
                            }}
                            extraStyle={styles.iconInput} 
                            icon={faDollarSign}     
                            color={'rgb(0,240,0)'}                              
                        />

                        <Text style={styles.modalText}>Add Description!</Text>
                        <CustomInput 
                            name = "description"
                            placeholder='Enter desciption...'
                            control={control}
                            rules={{
                               required: 'A description is required',
                            }}
                            extraStyle={styles.description}
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
    )
}

const styles = StyleSheet.create({
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

export default myModal;