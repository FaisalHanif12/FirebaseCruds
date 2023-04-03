import { View, Text, TouchableOpacity,Image, ScrollView } from 'react-native'
import React,{useState} from 'react'
import DocumentPicker from 'react-native-document-picker'
import storage from '@react-native-firebase/storage'

import { utils } from '@react-native-firebase/app';
export default function Imageupload() {

  
  const [imageData , SetImageData]  = useState(null);
  const [upload , Setupload]  = useState(false);
  const [FullImagePath , SetFullImagePath ] = useState("");
  const [ImageUrl , SetImageUrl ] = useState("");
  const ImagePicker = async ()=>{
     try {
      const response = await DocumentPicker.pickSingle({
        type : [DocumentPicker.types.images],
        copyTo : "cachesDirectory",
      })
       console.log(response);
      SetImageData(response);
     } catch (err) {
        console.log(err);
     }
  }
  const UploadImage = async ()=>{

    try {      

      const response =  storage().ref(`/Profile/${imageData.name}`);

      const put = await response.putFile(imageData.fileCopyUri);

      console.log(response);

      SetFullImagePath(put.metadata.fullPath);
    
      const url = await response.getDownloadURL();

      SetImageUrl(url);

      alert("Picture Uploaded")
     
    } catch (err) {
       console.log(err);
    }
 }

 const DeleteImage = async ()=>{

  try {      
      
    const response = await storage().ref(FullImagePath).delete();

    console.log(response);

    alert("Picture Deleted")
   
  } catch (err) {
     console.log(err);
  }
}

  return (
   
    <ScrollView>
    <View>

      {
        imageData ? <Image source={{uri: imageData.uri}}  
         style = {{height : 238 , width : 175 , marginLeft : 90, marginTop : 40}}
        /> : (<Text>No Image Found</Text>)
      }
        <TouchableOpacity
            onPress={ImagePicker}
            style = {{borderWidth : 1, width : 100, height : 100, borderColor: 'white', marginTop : 50, marginLeft : 21}}
        >
          <Text 
           style = {{marginLeft: 6, marginTop : 36}}
          >
            Select Image
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
            onPress={UploadImage}
            style = {{borderWidth : 1, width : 100, height : 100, borderColor: 'white', marginTop : -100, marginLeft : 129}}
        >
          <Text 
           style = {{marginLeft: 6, marginTop : 34}}
          >
            Upload Image
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
            onPress={DeleteImage}
            style = {{borderWidth : 1, width : 100, height : 100, borderColor: 'white', marginTop : -100, marginLeft : 235}}
        > 
          <Text 
           style = {{marginLeft: 6, marginTop : 34}}
          >
            Delete Image
          </Text>

        </TouchableOpacity>


        <View style = {{marginLeft : 100}}>
          <Text
            style = {{marginLeft: -50}} 
          >
            uri  = {ImageUrl.length > 0 ? ImageUrl : 'Not Founded'}
          </Text>
        </View>
      
    </View>

    </ScrollView>
  )
}