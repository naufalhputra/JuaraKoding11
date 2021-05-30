  
import React, { Component } from 'react'
import { View, Text, TouchableOpacity,StyleSheet, Image } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { LoginAction } from '../Redux/Action'

class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.state={
            
        }
    }

    componentDidMount(){
        if(!this.props.dataRedux.isLogin){
            this.props.navigation.navigate('Home')
        }
    }

    handleSignOut(){
        alert("Anda berhasil sign out")
        this.props.LoginAction(false,"isLogin")
        this.props.navigation.navigate("Home")
    }

    render() {
        return (
            <View style={styles.viewStyle}>
                <TouchableOpacity style={styles.buttonStyle} onPress={()=>{this.props.navigation.navigate('DataJodoh')}}>
                    <Text style={styles.textStyle}>Data Jodoh</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle} onPress={()=>{this.props.navigation.navigate('CariJodoh')}}>
                    <Text style={styles.textStyle}>Cari Jodoh</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonStyle} onPress={()=>{this.handleSignOut()}}>
                    <Text style={styles.textStyle}>Sign Out</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    dataRedux:state.LoginReducer
})

const mapDispatchToProps = {
    LoginAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu)

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