/**
 * 我的设置页面
 * 主要包括账户与安全、密码设置、新消息通知、主题设置、关于、退出登录
 * 子页面在mySetUp文件夹下，其中主题设置采用modal组件
 */
import React,{ Component } from 'react';
import {
    StyleSheet,
    Modal,
    Image,
    Platform,
    ScrollView,
    View,
    Text,
    Alert,
    TouchableHighlight,
    BackAndroid
} from 'react-native';


var Dimensions=require('Dimensions');
//获取屏幕宽度
var screenWidth=Dimensions.get('window').width;


//引入自定义NavigationBar组件
import NavigationBar from '../../common/NavigationBar';
//引入其他链接页面的公共类
import {MORE_MENU} from '../../common/MoreMenu';
import AboutCommon from './AboutCommon';  //物理返回键
//引入util包
import ViewUtil from '../../util/ViewUtil';
import ThemeDao from "../../expand/dao/ThemeDao";
//引入相关页面
import AccountsSecurityPage from "../mySetUp/AccountsSecurityPage";
import PasswordSettingPage from "../mySetUp/PasswordSettingPage";
import MessageNotifyPage from "../mySetUp/MessageNotifyPage";
import AboutSystemPage from "../mySetUp/AboutSystemPage";

import CustomThemePage from "./CustomThemePage";

//引入全局样式
import GlobalStyles from '../../../res/styles/GlobalStyles';

export default class MySetUp extends Component {

    constructor(props) {
        super(props);
        this.themeDao = new ThemeDao();//更换主题
        this.aboutCommon=new AboutCommon(props,(dic)=>this.updateState(dic));
        this.state = {
            customThemeViewVisible: false,  //主题是否更改参数
            theme: this.props.theme,
        };
    }
    
    componentDidMount() {
        this.props.homeComponent.addSubscriber(this.onSubscriber);
        this.aboutCommon.componentDidMount();  //处理物理返回键
    }
    componentWillUnmount(){
        this.props.homeComponent.removeSubscriber(this.onSubscriber);
        this.aboutCommon.componentWillUnmount();  //处理物理返回键
    }
    updateState(dic){
        this.setState(dic);  //处理物理返回键
    }
    onSubscriber = (preTab, currentTab)=> {
        var changedValues = this.props.homeComponent.changedValues;
        if (changedValues.my.themeChange && preTab.styles) {
            this.setState({
                theme: preTab
            })
            return;
        }
    }

    onClick(tab) {
        let TargetComponent, params = {...this.props, theme: this.state.theme, menuType: tab};
        switch (tab) {
            case MORE_MENU.AccountsSecurity:
                TargetComponent = AccountsSecurityPage;
                break;
            case MORE_MENU.PasswordSetting:
                TargetComponent = PasswordSettingPage;
                break;
            case MORE_MENU.MessageNotify:
                TargetComponent = MessageNotifyPage;
                break;
            case MORE_MENU.ThemeSetting:
                this.setState({customThemeViewVisible: true});
                break;
            case MORE_MENU.AboutSystem:
                TargetComponent = AboutSystemPage;
                break;
        }
        if (TargetComponent) {            
            this.props.navigator.push({
                component: TargetComponent,
                params: params,
            });
        }
    }

    getItem(tag, icon, text) {
        return ViewUtil.getSettingItem(()=>this.onClick(tag), icon, text, this.state.theme.styles.tabBarSelectedIcon);
    }

    renderCustomThemeView() {
        return (
            <CustomThemePage
                visible={this.state.customThemeViewVisible}
                {...this.props}
                onClose={()=> {
                    this.setState({customThemeViewVisible: false})
                }}/>
        )
    }

    render(){
        let navigationBar = 
                <NavigationBar
                    style={this.state.theme.styles.navBar}
                    leftButton={ViewUtil.getLeftButton(()=>this.props.navigator.pop())}
                    title='设置' />;
        return (
            <View style={GlobalStyles.listView_container}>
                {navigationBar}
                {/*ScrollView */}
                <ScrollView>                  
                    {/*账户与安全*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.AccountsSecurity, null, '账户与安全')}
                    {/*密码设置*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.PasswordSetting, null, '密码设置')}
                    

                    {/*系统设置*/}
                    <Text style={styles.groupTitle}></Text>
                    {/*新消息通知*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.MessageNotify, null, '新消息通知')}
                    {/*主题设置*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.ThemeSetting, null, '主题设置')}

                    {/*关于*/}
                    <Text style={styles.groupTitle}></Text>
                    {/*我的产品*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.AboutSystem, null, '关于')}
                    
                    {/*退出系统*/}
                    <Text style={styles.groupTitle}></Text>
                    <TouchableHighlight onPress={ () => Alert.alert(
                        '系统提示','您确定要退出系统吗？',
                        [
                            {text:'确定',onPress:() => BackAndroid.exitApp()},
                            {text:'取消',onPress:() => console.log('cancel')}
                        ]
                        )}>
                        <View style={[styles.item]}>
                            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                <Text style={styles.exitSystemBtnTitle}>退出系统</Text>
                            </View>
                        </View>
                    </TouchableHighlight>

                    <View style={[{marginBottom: 60}]}/>
                </ScrollView>
                {this.renderCustomThemeView()}
            </View>
        )
    }
} 

const styles=StyleSheet.create({
    item: {
        backgroundColor: '#fe3232',
        padding: 10, height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    groupTitle: {
        // fontWeight:'500',
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
        color: 'gray'
    },
    exitSystemBtnTitle:{
        color:'white',
        fontSize:18
    }
})