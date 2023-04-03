import { View, Text, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import database from '@react-native-firebase/database';
import Imageupload from './src/Imageupload';



const App = () => {

  const [mydata, setmydata] = useState(null);

  const [Name, SetName] = useState('');

  const [list, setList] = useState('Fa');

  const [selectcardindex , Setselectcardindex] = useState(null);

  //const [Profession , SetProfession] = useState('');

  const [Update , SetUpdate] = useState(false);

  useEffect(() => {
    getdata();
  }, [])


  const getdata = async ()=>{

    try {

    const data = await database().ref("Todo").on("value" ,tempData =>{
         
      setList(tempData.val());
      console.log(data);

    });

    } catch (err) {
      console.log(err);
    }

  }

  const HandleAddData = async () => {
    
    try {
        
      if(Name.length>0)
      {
      
          const index = list.length;
          const repoonse = await database().ref(`Todo/${index}`).set({
          value: Name,
          //value : Age,
          //value : Profession,
        })
      
        Alert.alert("Add Data Sucessfully")
  
        SetName('');
        
    }else 
    {
      alert("Please Enter the Name First")
    }

  
    } catch (err) {
      console.log(err);
    }

  }

  const HandlePress = (cardindex,cardvalue) => {
    try {
     SetUpdate(true);
     Setselectcardindex(cardindex);
     SetName(cardvalue);
    } catch (err) {
      console.log(err);
    }

  }

  const HandleUpdate = async () => {
    try {
      if(Name.length > 0)
      {
        const response = await database().ref(`Todo/${selectcardindex}`).update({
          value : Name,
        })
  
        console.log(response);
  
        Alert.alert("Data Has Been Updated Successfully")
        SetName('');
        SetUpdate(false);
      }
      else 
      {
        alert("Please Select Any Value for Update")
      }
    } catch (err) {
      console.log(err);
    }

  }

  const HandleDeletePress = (cardindex,cardvalue) => {
    try {
    //  SetUpdate(true);
    //  Setselectcardindex(cardindex);
    //  SetName(cardvalue);

    Alert.alert("Alert" , `Are You Sure to Delete ${cardvalue}`,[
      {
        text : "Cancel",
        onPress : () => {
          console.log("Cancel is Pressed")

        }
      },

      {
        text: "OK",
        onPress : async ()=> {
           try {
              const response = await database().ref(`Todo/${cardindex}`).remove();
              alert("Data Has Been Deleted Successfully")
              count--;
              console.log(count);

           } catch (err) {
             console.log(err)
           }
        }
      }
    ])
    } catch (err) {
      console.log(err);
    }

  }

  return (

    <View 
      style={{ flex: 1, backgroundColor: 'black' }}
    >

      <Text
        style={{ color: 'white', fontSize: 30, marginLeft: 81, marginTop: 20 }}
      >
        Todo List APP
      </Text>

      <View
        style={{ marginTop: 30, marginLeft: 30, width: '85%', borderWidth: 2, borderColor: 'white', borderRadius: 20 }}
      >
        <TextInput
          placeholder='Enter Your Name'
          placeholderTextColor='white'
          value={Name}
          onChangeText={(Name) => SetName(Name)}
          style={{ marginLeft: 65, fontSize: 18, color: 'white' }}
        />

      </View>


      <TouchableOpacity
        style={{ marginTop: 20, marginLeft: 30, width: '85%', borderWidth: 2, borderColor: 'white', borderRadius: 20, height: 50, backgroundColor: 'white' }}
        onPress={HandleAddData}
      >
        <Text
          style={{ color: 'black', fontSize: 20, fontWeight: 'bold', marginLeft: 120, marginTop: 7 }}
        >
          ADD
        </Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={{ marginTop: 20, marginLeft: 30, width: '85%', borderWidth: 2, borderColor: 'white', borderRadius: 20, height: 50, backgroundColor: 'white' }}
        onPress={HandleUpdate}
      >
        <Text
          style={{ color: 'black', fontSize: 20, fontWeight: 'bold', marginLeft: 110, marginTop: 7 }}
        >
          Update
        </Text>
      </TouchableOpacity>


      <Text
        style={{ color: 'white', fontSize: 30, marginTop: 10, marginLeft: 70 }}
      >
        Lists of Names
      </Text>


      <FlatList

        data={list}

        renderItem={item => {
          
        const cardindex = item.index;

          if( item.item !== null)
          {
            return (

              <TouchableOpacity
               
              onPress={()=>HandlePress(cardindex , item.item.value)}
               style = {{marginLeft : 120, marginTop : -5 ,}}

              onLongPress ={()=> HandleDeletePress(cardindex,item.item.value)}
              >
                <Text style = {{color : 'white', fontSize : 20}}>
                    {item.item.value}
                </Text>
              </TouchableOpacity>
            );
          }   
          
        }}

      />

    <Imageupload/>

    </View>
  )
}

export default App;