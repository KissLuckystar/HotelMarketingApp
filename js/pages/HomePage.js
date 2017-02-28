/**
 * 主页
 * @flow
 * Created by smk on 2017/2/23
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    BackAndroid,
    ToastAndroid
} from 'react-native';
//react-native导航条组件
import TabNavigator from 'react-native-tab-navigator';
import MainPage from './MainPage';  //第一页主导航
import ProductPage from './ProductPage';  //第二页产品导航
import MyPage from './MyPage';  //第三页个人导航
//数组的静态方法类
import ArrayUtils from '../util/ArrayUtils';

export var FLAG_TAB = {
    flag_mainTab:'flag_mainTab',
    flag_productTab:'flag_productTab',
    flag_myTab:'flag_myTab'
}

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.subscribers = [];
        this.changedValues = {
            //favorite: {popularChange: false, trendingChange: false},
            my: {languageChange: false, keyChange: false, themeChange: false}
        };
        //设置默认选中的tab
        let selectedTab = this.props.selectedTab ? this.props.selectedTab : FLAG_TAB.flag_mainTab;
        this.state={
            selectedTab:selectedTab,
            theme: this.props.theme
        }
    }

    addSubscriber(subscriber) {
        ArrayUtils.add(this.subscribers, subscriber);
    }

    removeSubscriber(subscriber) {
        ArrayUtils.remove(this.subscribers, subscriber);
    }

    //监听Android物理设备返回键事件
    /*componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress',this.onBackAndroid);
    }
    ComponentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress',this.onBackAndroid);
    }
    onBackAndroid = () => {
        if( this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now() ) {
            //最近两秒内按过back键，可以退出应用
            return false;
        } else{
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
            //return true;
        }
        return true;        
    }*/

    onSelected(object) {
        // if (this.updateFavorite && 'popularTab' === object)this.updateFavorite(object);

        if (object !== this.state.selectedTab) {
            this.subscribers.forEach((item, index, arr)=> {
                if (typeof(item) == 'function')item(this.state.selectedTab, object);
            })
        }
        if(object===FLAG_TAB.flag_popularTab)this.changedValues.favorite.popularChange=false;
        if(object===FLAG_TAB.flag_trendingTab)this.changedValues.favorite.trendingChange=false;

        this.setState({
            selectedTab: object,
        })

    }
    onReStart(jumpToTab){
        this.props.navigator.resetTo({
            component: HomePage,
            name: 'HomePage',
            params: {
                ...this.props,
                theme:this.state.theme,
                selectedTab: jumpToTab,
            }
        });
    }
    onThemeChange(theme) {
        if (!theme)return;
        this.setState({
            theme: theme
        })
        this.changedValues.my.themeChange = true;
        this.subscribers.forEach((item, index, arr)=> {
            if (typeof(item) == 'function')item(theme);
        })
        this.changedValues.my.themeChange = false;
    }

    //定义Tab的内容和样式
    _renderTab(Component,selectedTab,title,renderIcon) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                title={ title }
                titleStyle={ styles.tabText }
                selectedTitleStyle={ this.state.theme.styles.selectedTitleStyle }
                renderIcon={ () => <Image style={styles.tabBarIcon} 
                                          source={renderIcon} /> }
                renderSelectedIcon={ () => <Image style={[styles.tabBarSelectedIcon, this.state.theme.styles.tabBarSelectedIcon]}
                                                source={renderIcon} />}
                onPress={ () => this.onSelected(selectedTab)} >
                <Component {...this.props} theme={this.state.theme} homeComponent={this} />
            </TabNavigator.Item>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <TabNavigator
                    tabBarStyle={{opacity: 0.9,}}
                    sceneStyle={{paddingBottom: 0}}
                >
                    {this._renderTab(MainPage, FLAG_TAB.flag_mainTab, '首页', require('../../res/images/ic_main.png'))}
                    {this._renderTab(ProductPage, FLAG_TAB.flag_productTab, '产品', require('../../res/images/ic_product.png'))}
                    {this._renderTab(MyPage, FLAG_TAB.flag_myTab, '我的', require('../../res/images/ic_my.png'))}
                </TabNavigator>
            </View>
        )
    }

    /*render() {
        return (
            <View style={styles.container}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === FLAG_TAB.flag_mainTab}
                        title="首页"
                        titleStyle={ styles.tabText }
                        selectedTitleStyle={ styles.selectedTabText }
                        renderIcon={ () => <Image style={styles.tabBarIcon} 
                                                source={require('../../res/images/ic_main.png')} /> }
                        renderSelectedIcon={ () => <Image style={styles.tabBarSelectedIcon}
                                                        source={require('../../res/images/ic_main.png')} />}
                        onPress={ () => this.setState({selectedTab:FLAG_TAB.flag_mainTab})} >
                        <MainPage navigator={this.props.navigator} />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === FLAG_TAB.flag_productTab}
                        title="产品"
                        titleStyle={ styles.tabText }
                        selectedTitleStyle={ styles.selectedTabText }
                        renderIcon={ () => <Image style={styles.tabBarIcon} 
                                                source={require('../../res/images/ic_product.png')} /> }
                        renderSelectedIcon={ () => <Image style={styles.tabBarSelectedIcon}
                                                        source={require('../../res/images/ic_product.png')} />}
                        onPress={ () => this.setState({selectedTab:FLAG_TAB.flag_productTab})} >
                        <ProductPage navigator={this.props.navigator} />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === FLAG_TAB.flag_myTab}
                        title="我的"
                        titleStyle={ styles.tabText }
                        selectedTitleStyle={ styles.selectedTabText }
                        renderIcon={ () => <Image style={styles.tabBarIcon} 
                                                source={require('../../res/images/ic_my.png')} /> }
                        renderSelectedIcon={ () => <Image style={styles.tabBarSelectedIcon}
                                                        source={require('../../res/images/ic_my.png')} />}
                        onPress={ () => this.setState({selectedTab:FLAG_TAB.flag_myTab})} >
                        <MyPage navigator={this.props.navigator} />
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        )
    }*/
}

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    tabText:{
        
    },
    selectedTabText:{
        color:'#3c78d8'
    },
    tabBarIcon:{
        width:26,height:26,
        resizeMode:'contain'
    },
    tabBarSelectedIcon:{
        width:26,height:26,
        resizeMode:'contain',
        tintColor:'#3c78d8'
    }
})