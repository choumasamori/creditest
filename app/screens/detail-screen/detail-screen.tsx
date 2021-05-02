import * as React from "react"
import { View, Image} from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import {Button,Container,Card, CardItem,Text, Body, Left, Thumbnail} from 'native-base'
import { captureScreen } from "react-native-view-shot";
import Share from 'react-native-share';

export interface DetailScreenProps extends NavigationInjectedProps<{}> {
    navigation:any
}

export const DetailScreen: React.FunctionComponent<DetailScreenProps> = props => {
    const [detail, setDetail] = React.useState({})
    
    //const { data } = route.params;
    React.useEffect(() => {
        setDetail(props.navigation.state.params.data)
        //console.log(props.navigation.state.params)
    }, [])
    
    
const share = () =>{
    captureScreen({
        format: "png",
        quality: 0.8,
        result:"base64"
      }).then(uri => {
        const shareOptions = {
            title: 'Share via',
            message: 'some message',
           // url: 'some share url',
            social: Share.Social.WHATSAPP,
            //whatsAppNumber: "6281210364897",  // country code + phone number
            url: 'data:image/png;base64,'+uri , // only for base64 file in Android
          };
          //console.log("Image saved to", uri);
          Share.shareSingle(shareOptions)
          .then((res) => { console.log(res) })
          .catch((err) => { err && console.log(err); });
    }
      ).catch(err=>console.log(err));
}
             
  return (
      <Container>
          <Card style={{padding:10}}>
             <CardItem style={{alignSelf:'center'}}>
             <Image style={{width:200,height:200}} source={{uri: props.navigation.state.params.data.picture.large}}/>
            </CardItem>
            <CardItem cardBody style={{padding:10}}>
                      <Body style={{padding:10}}>
                        <Text>Name : {props.navigation.state.params.data.name.title} {props.navigation.state.params.data.name.first} {props.navigation.state.params.data.name.last}</Text>
                        <Text>Email : {props.navigation.state.params.data.email}</Text>
                        <Text>Username : {props.navigation.state.params.data.login.username} </Text>
                        <Text>City : {props.navigation.state.params.data.location.city} </Text>
                        <Text>State : {props.navigation.state.params.data.location.state} </Text>
                        <Text>Country : {props.navigation.state.params.data.location.country} </Text>
                        <Text>Postcode : {props.navigation.state.params.data.location.postcode} </Text>
                        <Text>Age : {props.navigation.state.params.data.dob.age} </Text>
                      </Body>
            </CardItem>
            </Card>
            <Button style={{alignSelf:'center', marginTop:40}} onPress={()=>{share()}}><Text>Share to Whatsapp</Text></Button>
      </Container>
    
  )
}
