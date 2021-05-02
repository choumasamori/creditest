import * as React from "react"
import { View, FlatList} from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import {Container,Card, CardItem,Text, Body, Left, Thumbnail} from 'native-base'
import { TouchableOpacity } from "react-native-gesture-handler"
import { observer } from 'mobx-react-lite'
import {store} from '../../models/user/'

export interface MainScreenProps extends NavigationInjectedProps<{}> {

}

export const MainScreen: React.FunctionComponent<MainScreenProps> = props => {
    const [list, setList] = React.useState([])
  const nextScreen = React.useMemo(() => (item) => props.navigation.navigate("detail", {data:item}), [
    props.navigation,
  ])
  React.useEffect(() => {
      fetch('https://randomuser.me/api/?results=100',{
          method:"GET"
        }).then((result)=>result.json()).then((data)=>{
          setList(data.results);
          store.saveJSON(data.results);
          //store.getJson();
        }).catch((err)=>console.log(err));
  }, [])
  return (
      <Container>
        <View style={{padding:20}}>
          <Text style={{alignSelf:'center', fontSize:40}}>User List</Text>
        </View>
          
          <FlatList 
        data={store.getJson()}
        ListEmptyComponent={()=>{return <View><Text>Empty</Text></View>}}
        renderItem={({item})=>{
          return (
              <TouchableOpacity onPress={()=>{nextScreen(item)}}>
                <View style={{padding:5, paddingLeft:15,paddingRight:15}}>
                  <Card>
                    <CardItem>
                      <Left>
                        <Thumbnail source={{uri: item.picture.thumbnail}}/>
                        <Body>
                          <Text style={{color:'black'}}>{item.name.title} {item.name.first} {item.name.last}</Text>
                          <Text style={{color:'black'}}>{item.email}</Text>
                        </Body>
                      </Left>
                    </CardItem>
                 </Card>
                </View>
                  
              </TouchableOpacity>
              
          )
        }}
        keyExtractor={(item, index)=>index.toString()}
        />
      </Container>
    
  )
}
