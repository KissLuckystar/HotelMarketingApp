/**
 * APP Login View
 * Created by smk on 2017/2/13
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';

var Dimensions=require('Dimensions');
//获取屏幕宽度
var screenWidth=Dimensions.get('window').width;

import SecondLoginPage from './SecondLoginPage';

//登录页面
export default class LoginPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            theme: this.props.theme
        };
    }
    _pressButton() {
        const { navigator } = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        if(navigator) {
            navigator.push({
                name: 'SecondLoginPage',
                component: SecondLoginPage,
                params:{
                    theme:this.state.theme
                }
            })
        }
    }

    render(){
        return(
            <View style={styles.container}>
                {/**上半部区域，放置Logo */}
                <View style={styles.topViewContainer}>
                    <Image source={require('../../res/images/login_large_logo.png')} 
                        style={styles.topImageStyle}/>
                </View>
            
                {/**下半部区域，放置相关的Button */}
                <View style={styles.bottomViewContainer}>
                    {/*手机号登录*/}
                    <TouchableOpacity onPress={this._pressButton.bind(this)}>
                        <View style={styles.loginByPhoneBtnContainer}>
                            <Text style={styles.loginByPhoneBtnTitle}>手机号登录</Text>
                        </View>
                    </TouchableOpacity>
                    
                    {/*立即注册*/}
                    <View style={styles.registerBtnContainer}>
                        <Text style={styles.registerBtnTitle}>立即注册</Text>
                    </View>
                    {/*其它注册方式*/}
                    <View style={styles.loginByOtherContainer}>
                        {/*其他登录方式*/}
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <View style={styles.loginByOtherLine}></View>
                            <Text style={styles.otherLoginHintLabel}>其他方式登录</Text>
                            <View style={styles.loginByOtherLine}></View>
                        </View>
                        {/*第三方登录*/}
                        <View style={styles.socialLoginBtnContainer}>
                            <Image source={require('../../res/images/qq_login_ic_normal.png')} 
                                   style={styles.socialLoginBtnStyle} />
                            <Image source={require('../../res/images/weixin_login_ic_normal.png')}
                                   style={styles.socialLoginBtnStyle} />
                            <Image source={require('../../res/images/weibo_login_ic_normal.png')}
                                   style={styles.socialLoginBtnStyle} />
                            <Image source={require('../../res/images/tencent_login_ic_normal.png')}
                                   style={styles.socialLoginBtnStyle} />
                            <Image source={require('../../res/images/renren_login_ic_normal.png')}
                                   style={styles.socialLoginBtnStyle} />
                        </View>
                    </View>
                </View>
            </View>         
        );
    }
}

/**
 * 定义样式
 */
const styles=StyleSheet.create({

    container:{
        backgroundColor:'#fafafa',
        flex:1
    },

    topViewContainer:{
        flex:3,
        marginTop:22,
        alignItems:'center',
        justifyContent:'center'
    },
    topImageStyle:{
        width:screenWidth * 0.3,
        height:screenWidth * 0.3,
        resizeMode: 'contain',
        tintColor:'#fe3232',
    },

    bottomViewContainer:{
        flex:2,
        justifyContent:'flex-start',
        alignItems:'center'
    },
    //手机号登录容器样式
    loginByPhoneBtnContainer:{
        backgroundColor:'#fe3232',
        width:screenWidth * 0.5,
        height:35,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5
    },
    loginByPhoneBtnTitle:{
        color:'white',
        fontSize:18
    },

    //立即注册按钮容器样式
    registerBtnContainer:{
        width:screenWidth * 0.5,
        height:35,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        borderColor:'#fe3232',
        borderWidth:0.5,
        marginTop:10
    },
    registerBtnTitle:{
        color:'#fe3232',
        fontSize:18
    },

    //其他登录方式的容器样式
    loginByOtherContainer:{
        width:screenWidth,
        position:'absolute',
        bottom:20,
        alignItems:'center',
        justifyContent:'center'
    },
    //横线
    loginByOtherLine:{
        backgroundColor:"#999999",
        height:1,
        width:screenWidth * 0.25,
        marginLeft:10,
        marginRight:10
    },
    //其他登录方式提示
    otherLoginHintLabel:{
        color:'#505050',
        fontSize:13
    },
    //第三方登录按钮容器
    socialLoginBtnContainer:{
        flexDirection:'row',
        marginTop:10
    },
    //第三方登录按钮的样式
    socialLoginBtnStyle:{
        width:40,
        height:40,
        margin:5
    }
});