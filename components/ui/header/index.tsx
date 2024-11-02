import { View, Text } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'

const Header = () => {
  return (
    <View style={{ margin: 6, flex: 1, flexDirection: 'row', padding: 5, alignItems: 'center', backgroundColor:'#1ad392' }}>
    <FontAwesome name="meetup" size={24} color="#FFFFFF" />
    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginLeft: 10 }}>Speye</Text>
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
      <FontAwesome name="bell" size={24} color="#FFFFFF" style={{ marginRight: 10 }} />
      <FontAwesome name="heart" size={24} color="#FFFFFF" />
    </View>
  </View>
  )
}

export default Header