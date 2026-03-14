import 'react-native-gesture-handler';
import React, { useState, createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppContext = createContext();

function SignInScreen() {
  const { setIsLoggedIn, setEmail } = useContext(AppContext);

  const [emailInput, setEmailInput] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Sign In</Text>

      <Text style={styles.label}>Email ID</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email here!"
        value={emailInput}
        onChangeText={setEmailInput}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password here!"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.forgot}>For got password?</Text>

      <TouchableOpacity
        style={styles.signInBtn}
        onPress={() => {
          setEmail(emailInput);
          setIsLoggedIn(true);
        }}
      >
        <Text style={styles.signText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.or}>Or sign in with</Text>

      <View style={styles.socialRow}>
        <View style={styles.googleBtn}>
          <Text>Google</Text>
        </View>

        <View style={styles.facebookBtn}>
          <Text style={{color:'#fff'}}>Facebook</Text>
        </View>
      </View>

      <Text style={styles.signup}>
        Not yet a member? <Text style={{color:'#ff9900'}}>Sign Up</Text>
      </Text>

    </View>
  );
}

function ExplorerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explorer</Text>

      <Text>Top Categories</Text>
      <Text>Pizza</Text>
      <Text>Burgers</Text>
      <Text>Steak</Text>

      <Text style={{marginTop:20}}>Popular Items</Text>
      <Text>Food 1 - $1</Text>
      <Text>Food 2 - $3</Text>
    </View>
  );
}

function AccountScreen() {
  const { setIsLoggedIn, email } = useContext(AppContext);

  const name = email.split('@')[0];

  return (
    <View style={styles.container}>

      <View style={styles.header}/>

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.role}>Mobile developer</Text>

      <Text style={styles.desc}>
        I have above 5 years of experience in native mobile apps development
      </Text>

      <TouchableOpacity
        style={styles.signOut}
        onPress={() => setIsLoggedIn(false)}
      >
        <Text style={{color:'#fff'}}>Sign Out</Text>
      </TouchableOpacity>

    </View>
  );
}

function MainTabs(){
  return(
    <Tab.Navigator>
      <Tab.Screen name="Explorer" component={ExplorerScreen}/>
      <Tab.Screen name="Account" component={AccountScreen}/>
    </Tab.Navigator>
  )
}

export default function App() {

  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [email,setEmail] = useState("")

  return(
    <AppContext.Provider value={{isLoggedIn,setIsLoggedIn,email,setEmail}}>

      <NavigationContainer>

        {isLoggedIn ? <MainTabs/> : <SignInScreen/>}

      </NavigationContainer>

    </AppContext.Provider>
  )
}

const styles = StyleSheet.create({

container:{
flex:1,
padding:20,
backgroundColor:'#fff'
},

title:{
fontSize:24,
fontWeight:'bold',
textAlign:'center',
marginBottom:30
},

label:{
marginBottom:5
},

input:{
borderWidth:1,
borderColor:'#ccc',
padding:12,
borderRadius:6,
marginBottom:15
},

forgot:{
color:'#ff9900',
textAlign:'right',
marginBottom:20
},

signInBtn:{
backgroundColor:'#ff9900',
padding:15,
borderRadius:6,
alignItems:'center'
},

signText:{
color:'#fff',
fontWeight:'bold'
},

or:{
textAlign:'center',
marginVertical:20
},

socialRow:{
flexDirection:'row',
justifyContent:'space-between'
},

googleBtn:{
borderWidth:1,
padding:12,
width:'48%',
alignItems:'center',
borderRadius:6
},

facebookBtn:{
backgroundColor:'#3b5998',
padding:12,
width:'48%',
alignItems:'center',
borderRadius:6
},

signup:{
textAlign:'center',
marginTop:20
},

header:{
height:120,
backgroundColor:'#3aa0c8',
marginBottom:20
},

name:{
fontSize:22,
fontWeight:'bold',
textAlign:'center'
},

role:{
color:'#3aa0c8',
textAlign:'center',
marginBottom:10
},

desc:{
textAlign:'center',
marginBottom:20
},

signOut:{
backgroundColor:'#ff9900',
padding:10,
alignItems:'center',
borderRadius:5,
alignSelf:'center'
}

})