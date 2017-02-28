/**
 * 欢迎页
 * 如果用户未登录，进入登录页面
 * 如果用户已登录，则进入主页
 */

import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    InteractionManager,
    Platform
} from 'react-native';

//import HomePage from './HomePage';//主页
import LoginPage from './LoginPage';//登录页
//react native 启动屏组件，用于加载启动动画
import SplashScreen from 'react-native-splash-screen';
//主题包
import ThemeDao from '../expand/dao/ThemeDao';

export default class WelcomePage extends Component {
    //在render之后执行，可以获取节点，发送ajax，与其他框架集成
    componentDidMount() {
        const {navigator} = this.props;
        new ThemeDao().getTheme().then((data=>{
            this.theme=data;
        }));
        this.timer = setTimeout(() => {
            InteractionManager.runAfterInteractions(() => {
                SplashScreen.hide();
                navigator.resetTo({   //默认进入登录页，未作判断
                    component: LoginPage,
                    name: 'LoginPage',
                    params:{
                        theme:this.theme
                    }
                });
            });
        }, 1000);
    }
    //在render之前执行
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
    //初始化渲染
    render() {
        return (
            <View style={styles.container}>
                <Image style={{flex:1,width:null}} resizeMode='contain' source={require('../../res/images/launch_screen.png')}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})