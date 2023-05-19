import React from 'react';
import { Text, View , TouchableOpacity , StyleSheet} from 'react-native';

export default class DailyPicScreen extends React.Component {
  render(){
    return(
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Daily Pic Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});