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
    Alert,
    ScrollView,
    TouchableOpacity,
    ListView,
    Platform,
    TextInput
} from 'react-native';

import ViewPager from 'react-native-viewpager';
import MenuButton from '../common/MenuButton';
import ShortLine from '../component/ShortLine';

//引入全局样式
import GlobalStyles from '../../res/styles/GlobalStyles';

var {height, width} = Dimensions.get('window');
var item_width = (width-1)/2;



//定义一个常量数组，用于保存轮播图图片信息
const BANNER_IMGS=[
    require('../../res/images/1.jpg'),
    require('../../res/images/2.jpg'),
    require('../../res/images/3.jpg'),
    require('../../res/images/4.jpg')
];

const CENTER_IMGS = [
    require('../../res/images/ic_main_sale.png'),
    require('../../res/images/ic_main_recharge.png'),
    require('../../res/images/ic_main_comment.png'),
    require('../../res/images/ic_main_product.png')  
];

const PRODUCT_DATA={
    "api":"GetProductHistory",
    "v":"1.0",
    "code":"0",
    "msg":"success",
    "data":[{
        "id":1,
        "productName":"存金宝",
        "productStauts":1,
        "icon":"",
        "title":'1元“买”黄金，买卖0费率',
        "time":"2016-5-12 12:23",
        "price":100
    },{
        "id":2,
        "productName":"定期理财",
        "productStauts":1,
        "icon":"",
        "title":'产品期限12个月内，约定年化收益率4.0%起',
        "time":"2016-5-10 11:23",
        "price":1000
    }]
};

export default class MainPage extends Component {

    constructor(props){
        super(props);

        //用于构建DataSource对象
        let dataSource=new ViewPager.DataSource({
            pageHasChanged:(p1,p2) => p1 !== p2,
        });

        this.renderItem = this.renderItem.bind(this);
        //实际的DataSource存放在state中
        this.state={
            dataSource:dataSource.cloneWithPages(BANNER_IMGS),
            dataListSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            products :PRODUCT_DATA.data,

            theme: this.props.theme,
        }
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

    //进行渲染数据
    renderContent(dataSource) {
        return (
        <ListView
            initialListSize={1}
            dataSource={dataSource}
            renderRow={this.renderItem}
            style={{marginBottom:40}}
            onEndReachedThreshold={10}
            enableEmptySections={true}
        />
        );
    }
    //渲染每一项的数据
    renderItem(product) {
        return (
            <View>
                <View style={GlobalStyles.line}/>                
                <TouchableOpacity>
                    <View style={{backgroundColor:'white'}}>
                        {/*产品名*/}
                        <View style={styles.item_view_center}>
                            <Text style={{color:'#ff0000'}}>{product.productName}</Text>                    
                        </View>
                        <Image source={require('../../res/images/product/ic_product_heng.png')} style={{width:(width-20),marginLeft:10,marginRight:10}}/>
                        <View style={styles.item_view_center_msg}>
                            <Image source={require('../../res/images/product/ic_product_shop_icon.png')} style={styles.item_view_center_icon}/>
                            <View style={styles.item_view_center_title_img}>
                                    <Text style={styles.item_view_center_title}>{product.title}</Text>
                                    <Text style={styles.item_view_center_time}>{product.time}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
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
                {/*homeComponent用于传递页面*/}
                {/*<Header {...this.props} theme={this.state.theme} homeComponent={MainPage} />  */}


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

                {/* 首页展示区*/}
                <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                    <View style={{height:130}}>
                        <ViewPager
                            style={{height:130}}
                            dataSource={this.state.dataSource}
                            renderPage={this._renderPage}
                            isLoop={true}
                            autoPlay={true} />
                    </View>
                    <View style={styles.menuContainer}>
                        <View style={styles.menuView}>
                            <MenuButton renderIcon={require('../../res/images/home_icons/wdgz.png')}
                                        showText={'酒店'} tag={'wdgz'}
                                        onClick={this._onMenuClick}/>
                            <MenuButton renderIcon={require('../../res/images/home_icons/wlcx.png')}
                                        showText={'餐饮'} tag={'wlcx'}
                                        onClick={this._onMenuClick}/>
                            <MenuButton renderIcon={require('../../res/images/home_icons/cz.png')}
                                        showText={'充值'} tag={'cz'}
                                        onClick={this._onMenuClick}/>
                            <MenuButton renderIcon={require('../../res/images/home_icons/dyp.png')}
                                        showText={'付款'} tag={'dyp'}
                                        onClick={this._onMenuClick}/>
                        </View>
                        <View style={styles.menuView}>
                            <MenuButton renderIcon={require('../../res/images/home_icons/yxcz.png')}
                                        showText={'理财产品'} tag={'yxcz'}
                                        onClick={this._onMenuClick}/>
                            <MenuButton renderIcon={require('../../res/images/home_icons/xjk.png')}
                                        showText={'小金库'} tag={'xjk'}
                                        onClick={this._onMenuClick}/>
                            <MenuButton renderIcon={require('../../res/images/home_icons/ljd.png')}
                                        showText={'领积分'} tag={'ljd'}
                                        onClick={this._onMenuClick}/>
                            <MenuButton renderIcon={require('../../res/images/home_icons/gd.png')}
                                        showText={'更多'} tag={'gd'}
                                        onClick={this._onMenuClick}/>
                        </View>
                    </View>

                    {/* 推荐活动 */}
                    <View style={{marginTop:8,backgroundColor:'white'}}>
                        <View style={{height:40,justifyContent:'center',alignItems:'center'}}><Text>推荐活动</Text></View>
                        <View style={{flexDirection:'row',height:70}}>
                                <TouchableOpacity>
                                <View style={{flexDirection:'row',width:item_width,marginTop:5}}>
                                    <Image source={CENTER_IMGS[0]} style={{width:66,height:47,marginLeft:20}}/>
                                    <View style={{marginLeft:10}}>
                                        <Text>每日优惠</Text>
                                        <Text style={{color:'#999',fontSize:13,marginTop:5}}>优惠早知道</Text>
                                    </View>                                               
                                </View>
                                </TouchableOpacity>
                                <Image source={require('../../res/images/ic_main_shu.png')} style={{height:60,marginTop:10}}/>
                                <TouchableOpacity>
                                <View style={{flexDirection:'row',width:item_width,marginTop:8}}>
                                    <Image source={CENTER_IMGS[1]} style={{width:40,height:53,marginLeft:20}}/>
                                    <View style={{marginLeft:10}}>
                                        <Text>充值返现</Text>
                                        <Text style={{color:'#999',fontSize:13,marginTop:5}}>充100送50</Text>
                                    </View>                                   
                                </View>
                                </TouchableOpacity>
                        </View>
                        <View style={GlobalStyles.line}/>
                        <View style={{flexDirection:'row',height:70}}>
                                <View style={{flexDirection:'row',width:item_width,marginTop:3}}>
                                    <Image source={CENTER_IMGS[2]} style={{width:50,height:67,marginLeft:20}}/>
                                    <View style={{marginLeft:10,marginTop:8}}>
                                        <Text>评论送积分</Text>
                                        <Text style={{color:'#999',fontSize:13,marginTop:5}}>评价免费拿积分</Text>
                                    </View>                      
                                </View>
                                <Image source={require('../../res/images/ic_main_shu.png')} style={{height:60}}/>
                                <View style={{flexDirection:'row',width:item_width,marginTop:8}}>
                                    <Image source={CENTER_IMGS[3]} style={{width:40,height:40,marginLeft:20,marginTop:5}}/>
                                    <View style={{marginLeft:10}}>
                                        <Text>理财产品</Text>
                                        <Text style={{color:'#999',fontSize:13,marginTop:5}}>购买理财产品</Text>
                                    </View>               
                                </View>
                        </View>
                    </View>

                    {/*理财产品推荐*/}
                    <View style={{marginTop:8,backgroundColor:'white',marginBottom:8}}>
                        <View style={{height:40,justifyContent:'center',alignItems:'center'}}>
                            <Text>产品推荐</Text>
                        </View>
                        
                        {/*加载推荐的产品数据*/}
                        <View >
                            {this.renderContent(this.state.dataListSource.cloneWithRows(
                                this.state.products === undefined ? [] : this.state.products))}
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles=StyleSheet.create({   
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
    
    
    
    page:{
        flex:1,
        height:130,
        resizeMode:'stretch'
    },
    menuContainer:{
        backgroundColor:'white'
    },
    menuView: {
        flexDirection: 'row',
        marginTop: 10,      
    },
    item_view_center:{
        flexDirection:'row',
        height:40,
        marginLeft:10,
        alignItems:'center'
    },
    item_view_center_msg:{
        flexDirection:'row',
        height:90,
        alignItems:'center'
    },
    item_view_center_icon:{
        width:50,
        height:50,
        marginLeft:10
    },
    item_view_center_title_img:{
        flexDirection:'column',
        marginLeft:10
    },
    item_view_center_title:{
        fontSize:14,
        color:'black'
    },
    item_view_center_time:{
        color:'#777',
        fontSize:13
    },
});