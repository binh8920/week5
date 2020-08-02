import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Octicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';  

const Header = () => {
    return (
        <View style={styles.container}>
            <Octicons style={{marginRight: 90, paddingTop: 7}}name="three-bars" size={24} color="black" />
            <AntDesign  style={{marginRight: 10}} name="apple-o" size={35} color="black" />
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>News</Text>
            <Entypo style={{marginLeft: 90, marginRight: 10, paddingTop: 7}} name="globe" size={24} color="black" />
            <AntDesign style={{ paddingTop: 7}} name="search1" size={24} color="black" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 7,
        backgroundColor: '#f3f6fa',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center'
    },
});
export default Header;