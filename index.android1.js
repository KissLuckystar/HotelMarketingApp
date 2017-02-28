/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';

import LoginView from './ui/LoginView';

export default class HotelMarketingApp extends Component {
  render() {

    let defaultName='Login';

    return (
      <Navigator
        //初始化路由
        initialRoute={{
          id:defaultName,
          name:defaultName,
          component:LoginView   
        }}
        //配置场景动画
        configureScene={(route) => {
          return Navigator.SceneConfigs.VerticalDownSwipeJump;
        }}
        //渲染场景
        renderScene={(route, navigator) => {
          let Component = route.component;
          return <Component {...route.params} navigator={navigator} />
        }}
        //导航栏样式
        navigationBar={
          <Navigator.NavigationBar style={styles.navContainer}
              routeMapper={NavigationBarRouteMapper} />
        }
       />
    );
  }
}

//导航栏的Mapper
var NavigationBarRouteMapper={
  //左键
  //index属性表示当前页面的索引，通过判断index属性，获知栈内是否有其他页面，判断后退按钮是否显示，点击调用navigator.pop()出栈
  LeftButton(route,navigator,index,navState){
    if(index>0){
      return(
        <View style={styles.leftBackBtnContainer}>
          <TouchableOpacity onPress={()=>{if(index>0) {navigator.pop()}}}>
            <Image source={require('./images/left_back.png')} 
                   style={styles.leftBackBtnStyle} /> 
            {/*<Text style={styles.leftNavButton}>后退</Text>*/}
          </TouchableOpacity>
        </View>
      )
    } else{
      return null;
    }
  },
  //右键
  RightButton(route,navigator,index,navState){
    return null;
  },
  //标题
  Title(route,navigator,index,navState){
    //若路由id为login
    if(route.id === 'Login'){
      return null;
    } else {
      return(
        <View style={styles.navTitleContainer}>
          <Text style={styles.navTitleStyle}>
            登录
          </Text>
        </View>
      )
    }  
  }
}

const styles=StyleSheet.create({
  navContainer:{
    backgroundColor:'#fafafa'
  },
  leftBackBtnContainer:{
    marginTop:7,
  },
  leftBackBtnStyle:{
    width:40,
    height:40
  },
  navTitleContainer:{
    marginTop:10,  
  },
  navTitleStyle:{
    fontSize:25,
    color:'#000000'
  }
})


AppRegistry.registerComponent('HotelMarketingApp', () => HotelMarketingApp);
