/**
 * 个人信息页面
 * @flow
 * Created by smk on 2017/2/24
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
    TouchableHighlight
} from 'react-native';
//引入自定义NavigationBar组件
import NavigationBar from '../common/NavigationBar';
//引入其他链接页面的公共类
import {MORE_MENU} from '../common/MoreMenu';
//引入util包
import ViewUtil from '../util/ViewUtil';
import ThemeDao from "../expand/dao/ThemeDao";
//引入相关页面
import AboutMePage from "../pages/my/AboutMePage";
import AssetPage from "../pages/my/AssetPage";
import BalancePage from "../pages/my/BalancePage";
import BillPage from "../pages/my/BillPage";
import CustomProductPage from "../pages/my/CustomProductPage";
import EarningsPage from "../pages/my/EarningsPage";
import MySetUpPage from '../pages/my/MySetUp'

import CustomThemePage from "../pages/my/CustomThemePage";

//引入全局样式
import GlobalStyles from '../../res/styles/GlobalStyles';

export default class MyPage extends Component {

    constructor(props) {
        super(props);
        //this.themeDao = new ThemeDao();
        this.state = {
            customThemeViewVisible: false,
            theme: this.props.theme,
        };
    }

    componentDidMount() {
        this.props.homeComponent.addSubscriber(this.onSubscriber);
    }

    componentWillUnmount() {
        this.props.homeComponent.removeSubscriber(this.onSubscriber);
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
            case MORE_MENU.About_Me:
                TargetComponent = AboutMePage;
                break;
            case MORE_MENU.Asset:
                TargetComponent = AssetPage;
                break;
            case MORE_MENU.Balance:
                TargetComponent = BalancePage;
                break;
            case MORE_MENU.Bill:
                TargetComponent = BillPage;
                break;
            case MORE_MENU.Custom_Product:
                TargetComponent = CustomProductPage;
                break;
            case MORE_MENU.Earnings:
                TargetComponent = EarningsPage;
                break;
            case MORE_MENU.MySetUp:
                TargetComponent = MySetUpPage;
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
                    title='我的' />;
        return (
            <View style={GlobalStyles.listView_container}>
                {navigationBar}
                {/*ScrollView */}
                <ScrollView>
                    {/*个人信息,TouchableHighlight只能包含一个child，可以用view */}
                    <TouchableHighlight
                        onPress={ () => this.onClick(MORE_MENU.About_Me)}>
                        {/* 个人头像、名字*/}
                        <View style={[styles.item, {height: 90}]}>
                            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                <Image source={require('../../res/images/ic_main.png')}
                                        style={{width: 40, height: 40, marginRight: 10,tintColor:'#d74047'}}/>
                                <Text>Kiss灬LuckyStar</Text>
                            </View>
                            <Image source={require('../../res/images/ic_tiaozhuan.png')}
                                    style={[{
                                        opacity: 1,
                                        marginRight: 10,
                                        height: 22,
                                        width: 22,
                                        alignSelf: 'center',
                                        tintColor:'#d74047'
                                    },this.state.theme.styles.tabBarSelectedIcon]}/>
                        </View>
                    </TouchableHighlight>
                    <View style={GlobalStyles.line}/>

                    {/*资产信息*/}
                    <Text style={styles.groupTitle}>资产信息</Text>
                    {/*账单*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Bill, require('../../res/images/my/ic_custom_language.png'), '账单')}
                    {/*总资产*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Asset, require('../../res/images/my/ic_swap_vert.png'), '总资产')}
                    {/*余额*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Balance, require('../../res/images/my/ic_swap_vert.png'), '余额')}

                    {/*产品信息*/}
                    <Text style={styles.groupTitle}>产品信息</Text>
                    {/*我的产品*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Custom_Product, require('../../res/images/my/ic_custom_language.png'), '我的产品')}
                    {/*产品收益*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Earnings, require('../../res/images/my/ic_swap_vert.png'), '产品收益')}

                    {/*系统设置*/}
                    <Text style={styles.groupTitle}>系统设置</Text>
                    {/*我的产品*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.MySetUp, require('../../res/images/my/ic_custom_language.png'), '设置')}
                    
                    <View style={[{marginBottom: 60}]}/>
                </ScrollView>
                {this.renderCustomThemeView()}
            </View>
        )
    }
} 

const styles=StyleSheet.create({
    tabBarSelectedIcon:{
        tintColor:'#d74047'
    },
    item: {
        backgroundColor: 'white',
        padding: 10, height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    groupTitle: {
        // fontWeight:'500',
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
        color: 'gray'
    }
})