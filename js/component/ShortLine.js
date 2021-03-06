/**
 * 设置界面Item布局
 */
'use strict';
import React, {PropTypes} from 'react';
import{ 
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';

const ShortLine = () => (
    <View style={{backgroundColor:'white'}}>
        <Image source={require('../../res/images/ic_main_shortbar.png')} 
               style={styles.short_line}/>           
    </View>
);
const styles=StyleSheet.create({
    short_line:{
        marginLeft:10,
    },
});
export default ShortLine;