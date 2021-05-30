  
import React, { Component } from 'react'
import { View, Text, TextInput,StyleSheet, Platform, Button, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

class Register extends Component {
 
    constructor(props){

        super(props)
        this.state = {
            username : "",
            name : "",
            gender : "",
            phone : "",
            age : "",
            image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            latitude : "",
            longitude : ""
        }

    }

    componentDidMount(){

        this.getPermission()
        this.getLocation()

    }

    async getPermission(){

        if(Platform.OS !== 'web'){
            const { status } = await ImagePicker.requestMediaLibraryPermissionAsync();
            if(status !== 'granted'){
                alert('Sorry, we need Camera Roll permission to complete your registration!')
            }
        }

    }

    async pickImage(){

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing : true,
            aspect : [4, 3],
            quality : 1
        })

        console.log(result)

        if(!result.cancelled){
            console.log(result.uri)
            this.setState({image : result.uri})
        }

    }

    async getLocation(){

        let { status } = await Location.requestForegroundPermissionAsync()
        if (status !== "granted"){
            return;
        }

        let location = await Location.getCurrentPositionAsync({})
        console.log("Your current location : " + JSON.stringify(location))

        this.setState({
            latitude : location.coords.latitude,
            longitude : location.coords.longitude
        })

    }

    handlerRegister(){

        let formData = new FormData();
        let filename = this.state.image;
        console.log("nama gambar "+ filename.split('/').pop())
        formData.append('data',JSON.stringify(this.state))
        formData.append('file',{
            uri: this.state.image, //Your Image File Path
            type: 'image/jpeg', 
            name: filename.split('/').pop(),
        })

        axios.post('http://192.168.1.7:8080/register/', formData, {
            headers : {
                'Content-Type': 'multipart/form-data'
            }
        })

        .then((response) =>{
            alert(response.data)
            this.props.navigation.navigate("Login")
        })
        .catch((error)=>{
            console.log(error)
        })
    }

  render() {

    return (
      <View style = {styles.viewStyle}>
        <Text> Username </Text>
        <TextInput placeholder="Insert your username " onChangeText={(value) => {this.setState({username : value})}}/>
        
        <Text> Name </Text>
        <TextInput placeholder="Insert your name " onChangeText={(value) => {this.setState({name : value})}}/>
        
        <Picker
            selectedValue = {this.state.gender}
            style = {{ height: 50, width: 300 }}
            onValueChange = {(itemValue) => this.setState({ gender : itemValue })}>
            <Picker.Item label="Gender"/>
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
        </Picker>
        
        <Text> Phone </Text>
        <TextInput placeholder="Insert your phone " onChangeText={(value) => {this.setState({phone : value})}}/>
        
        <Text> Age </Text>
        <TextInput placeholder="Insert your age " onChangeText={(value) => {this.setState({age : value})}}/>
      
        <Button title = "Pick an image " onPress = {() => {this.pickImage()}}/>
        <Image source = {{ uri : this.state.image}} style = {{ height : 200, width : 150, alignSelf : 'center' }}/>

        <TouchableOpacity style={styles.buttonStyle} onPress={() => {this.handlerRegister()}}><Text style={styles.textStyle}>Register</Text></TouchableOpacity>
      </View>
    )
  }

}

export default Register

const styles = StyleSheet.create({

    viewStyle:{
        margin:20,
    },

    buttonStyle:{
        borderWidth:10,
        borderColor:"red",
        margin:20
    },

    textStyle:{
        textAlign:'center',
    }

})