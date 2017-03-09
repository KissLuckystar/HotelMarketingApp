/**
 * MainPage首页导航的头部搜索框
 * @flow
 * Created by smk on 2017/2/23
 */

import React,{ Component } from 'react';
import {
    Image,
    TextInput,
    View,
    StyleSheet,
    Platform
} from 'react-native';

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: this.props.theme,
        };
    }
    componentDidMount() {
        this.props.homeComponent.addSubscriber(this.onSubscriber);   //用于设置主题颜色
    }

    componentWillUnmount() {
        this.props.homeComponent.removeSubscriber(this.onSubscriber);   //用于设置主题颜色
    }

    onSubscriber = (preTab, currentTab)=> {                           //用于设置主题颜色
        var changedValues = this.props.homeComponent.changedValues;   
        if (changedValues.my.themeChange && preTab.styles) {
            this.setState({
                theme: preTab
            })
            return;
        }
    }

    render(){
        return (
            <View style={[styles.container,this.state.theme.styles.navBar]}>
                <Image source={require('../../res/images/ic_main_logo.png')}
                       style={styles.headerLogo} />
                <View style={styles.searchBox}>
                    <Image source={require('../../res/images/ic_search.png')}
                           style={styles.searchIcon} />
                    <TextInput
                        keyboardType='web-search'
                        placeholder='搜索营销/产品信息'
                        style={styles.inputText} underlineColorAndroid="transparent" />
                    <Image source={require('../../res/images/ic_voice.png')}
                           style={styles.voiceIcon} />
                </View>
                <Image source={require('../../res/images/ic_scan.png')}
                       style={styles.scanIcon} />
            </View>        
        )
    }
} 

const styles = StyleSheet.create({
    container:{
        flexDirection:'row', //水平排布
        paddingLeft:10,
        paddingRight:10,
        paddingTop:Platform.OS === 'ios' ? 20:0,//处理ios状态栏
        height:Platform.OS === 'ios' ? 68 : 48,
        backgroundColor:'#d74047',
        alignItems:'center'  //使元素垂直居中排布，当flexDirection为column时，元素为水平居中
    },
    headerLogo:{
        height:24,
        width:64,
        resizeMode:'stretch' //不维持宽高比，宽高填满容器
    },
    searchBox:{
        flex:1,  // 类似于android中的layout_weight,设置为1即自动拉伸填充
        height:30,
        flexDirection:'row',
        borderRadius:5,  //设置圆角
        backgroundColor:'white',
        alignItems:'center',
        marginLeft:8,
        marginRight:12
    },
    searchIcon:{
        marginLeft:6,
        marginRight:6,
        width:16.7,
        height:16.7,
        resizeMode:'stretch'
    },
    inputText:{
        flex:1,
        padding:0,
        backgroundColor:'transparent',
        fontSize:12
    },
    voiceIcon:{
        marginLeft:5,
        marginRight:8,
        width:15,
        height:20,
        resizeMode:'stretch'
    },
    scanIcon:{
        height:26.7,
        width:26.7,
        resizeMode:'stretch'
    },
})