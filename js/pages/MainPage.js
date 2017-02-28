/**
 * 首页页面
 * 主要包括搜索栏、轮播图区、功能区、产品区
 * @flow
 * Created by smk on 2017/2/23
 */

import React,{ Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Alert
} from 'react-native';

import Header from './Header';
import ViewPager from 'react-native-viewpager';
import MenuButton from '../common/MenuButton';

//定义一个常量数组，用于保存轮播图图片信息
const BANNER_IMGS=[
    require('../../res/images/1.jpg'),
    require('../../res/images/2.jpg'),
    require('../../res/images/3.jpg'),
    require('../../res/images/4.jpg')
];

export default class MainPage extends Component {

    constructor(props){
        super(props);
        //用于构建DataSource对象
        let dataSource=new ViewPager.DataSource({
            pageHasChanged:(p1,p2) => p1 !== p2,
        });
        //实际的DataSource存放在state中
        this.state={
            dataSource:dataSource.cloneWithPages(BANNER_IMGS)
        }
    }
    
    _renderPage(data,pageID){
        return (
            <Image
                source={data}
                style={styles.page} />
        );
    }
    //点击功能区按钮的提示
     _onMenuClick(title, tag) {
        Alert.alert('提示', '你点击了:' + title + " Tag:" + tag);
    }

    /**
     * dataSource:提供页面数据
     * renderPage:用于渲染页面视图，指定ViewPager每页的内容
     * autoPlay：为true将自动播放
     * isLoop:为true支持循环播放
     * locked:为true禁止触摸滚动
     * onChangePage:页面切换的回调函数
     * renderPageIndicator:渲染自定义的ViewPager indicator
     * animation:设置自定义效果的函数
     */
    render(){
        return (
            <View style={{flex:1}}>
                <Header />
                <View style={{height:130}}>
                    <ViewPager
                        style={{height:130}}
                        dataSource={this.state.dataSource}
                        renderPage={this._renderPage}
                        isLoop={true}
                        autoPlay={true} />
                </View>

                <View style={styles.menuView}>
                    <MenuButton renderIcon={require('../../res/images/home_icons/wdgz.png')}
                                showText={'我的关注'} tag={'wdgz'}
                                onClick={this._onMenuClick}/>
                    <MenuButton renderIcon={require('../../res/images/home_icons/wlcx.png')}
                                showText={'物流查询'} tag={'wlcx'}
                                onClick={this._onMenuClick}/>
                    <MenuButton renderIcon={require('../../res/images/home_icons/cz.png')}
                                showText={'充值'} tag={'cz'}
                                onClick={this._onMenuClick}/>
                    <MenuButton renderIcon={require('../../res/images/home_icons/dyp.png')}
                                showText={'电影票'} tag={'dyp'}
                                onClick={this._onMenuClick}/>
                </View>
                <View style={styles.menuView}>
                    <MenuButton renderIcon={require('../../res/images/home_icons/yxcz.png')}
                                showText={'游戏充值'} tag={'yxcz'}
                                onClick={this._onMenuClick}/>
                    <MenuButton renderIcon={require('../../res/images/home_icons/xjk.png')}
                                showText={'小金库'} tag={'xjk'}
                                onClick={this._onMenuClick}/>
                    <MenuButton renderIcon={require('../../res/images/home_icons/ljd.png')}
                                showText={'领京豆'} tag={'ljd'}
                                onClick={this._onMenuClick}/>
                    <MenuButton renderIcon={require('../../res/images/home_icons/gd.png')}
                                showText={'更多'} tag={'gd'}
                                onClick={this._onMenuClick}/>
                </View>
                <View style={{marginTop:15,borderWidth:0.5,borderColor:'#ccc'}}></View>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    page:{
        flex:1,
        height:130,
        resizeMode:'stretch'
    },
    menuView: {
        flexDirection: 'row',
        marginTop: 10
    },
});