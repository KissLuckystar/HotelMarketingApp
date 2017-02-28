/**
 * 账单
 */
import React,{ Component } from 'react';
import {
    ListView,
    StyleSheet,
    RefreshControl,
    TouchableHighlight,
    Dimensions,
    View,
    Text,
    Image
} from 'react-native';

//引入自定义NavigationBar组件
import NavigationBar from '../../common/NavigationBar';
import ViewUtil from '../../util/ViewUtil';
import AboutCommon from "./AboutCommon";


var {height, width} = Dimensions.get('window');
var item_width = (width-1)/2;

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
    },{
        "id":3,
        "productName":"存金宝",
        "productStauts":1,
        "icon":"",
        "title":'1元“买”黄金，买卖0费率',
        "time":"2016-5-12 12:23",
        "price":100
    },{
        "id":4,
        "productName":"定期理财",
        "productStauts":1,
        "icon":"",
        "title":'产品期限12个月内，约定年化收益率4.0%起',
        "time":"2016-5-10 11:23",
        "price":1000
    },{
        "id":5,
        "productName":"存金宝",
        "productStauts":1,
        "icon":"",
        "title":'1元“买”黄金，买卖0费率',
        "time":"2016-5-12 12:23",
        "price":100
    },{
        "id":6,
        "productName":"定期理财",
        "productStauts":1,
        "icon":"",
        "title":'产品期限12个月内，约定年化收益率4.0%起',
        "time":"2016-5-10 11:23",
        "price":1000
    }]
};

export default class BillPage extends Component {
    constructor(props) {
        super(props);
        this.onPressItem=this.onPressItem.bind(this);
        this.renderItem = this.renderItem.bind(this); 
        this.aboutCommon=new AboutCommon(props,(dic)=>this.updateState(dic));
        this.state={
         dataSource: new ListView.DataSource({
           rowHasChanged: (row1, row2) => row1 !== row2,
         }),
         products :PRODUCT_DATA.data,

         theme: this.props.theme,
      }
    }

    componentDidMount() {
        this.props.homeComponent.addSubscriber(this.onSubscriber);   //用于设置主题颜色
        this.aboutCommon.componentDidMount(); 
    }

    componentWillUnmount() {
        this.props.homeComponent.removeSubscriber(this.onSubscriber);   //用于设置主题颜色
        this.aboutCommon.componentWillUnmount();  //处理物理返回键
    }
    updateState(dic){
        this.setState(dic);  //处理物理返回键
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





    //点击列表每一项响应按钮
    onPressItem(product){
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
                navigator.push({
                component: OrderSingle,
                name: 'OrderSingle',
                product
                });
            });
    }
    //进行渲染数据
    renderContent(dataSource) {
        return (
        <ListView
            initialListSize={1}
            dataSource={dataSource}
            renderRow={this.renderItem}
            style={{marginBottom:60}}
            onEndReachedThreshold={10}
            enableEmptySections={true}
        />
        );
    }
    //渲染每一项的数据
    renderItem(product) {
        return (
            <View>
                <View style={styles.item_view_zhanwei}></View>
                <TouchableHighlight onPress={()=>{this.onPressItem(product)}}>
                    <View style={{backgroundColor:'white'}}>
                        <View style={styles.item_view_center}>
                            <Text style={{color:'#ff0000'}}>{product.productName}</Text>
                            <Image source={require('../../../res/images/ic_tiaozhuan.png')}
                                    style={[styles.item_view_icon,this.state.theme.styles.tabBarSelectedIcon]}/>
                        </View>
                        <Image source={require('../../../res/images/product/ic_product_heng.png')} style={{width:(width-20),marginLeft:10,marginRight:10}}/>
                        <View style={styles.item_view_center_msg}>
                            <Image source={require('../../../res/images/product/ic_product_shop_icon.png')} style={styles.item_view_center_icon}/>
                            <View style={styles.item_view_center_title_img}>
                                    <Text style={styles.item_view_center_title}>{product.title}</Text>
                                    <Text style={styles.item_view_center_time}>{product.time}</Text>
                            </View>
                        </View>
                        <Image source={require('../../../res/images/product/ic_product_heng_shi.png')} style={{width:(width-20),marginLeft:10,marginRight:10}}/>
                        <View style={styles.item_view_bottom}>
                            <View style={styles.item_view_bottom_price_v}>
                                    <Text style={styles.item_view_bottom_price}>¥{product.price}</Text>
                                </View>
                            <Image source={require('../../../res/images/product/ic_product_shu.png')} style={{height:40}}/>
                            <View style={styles.item_view_bottom_again_v}>
                                    <Text style={styles.item_view_bottom_again}>已支付</Text>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }


    render(){
        let navigationBar = 
                <NavigationBar
                    style={this.state.theme.styles.navBar}
                    leftButton={ViewUtil.getLeftButton(()=>this.props.navigator.pop())}
                    title='账单' />;
        return (
            <View style={{flex:1}}>
                {navigationBar}

                {/*产品列表*/}
                <View style={{flex:1}}>
                   {this.renderContent(this.state.dataSource.cloneWithRows(
                         this.state.products === undefined ? [] : this.state.products))}
                </View> 
             </View>
        )
    }
}
const styles=StyleSheet.create({
    item_view_zhanwei:{
        backgroundColor:'#f5f5f5',
        height:8
    },
    item_view_center:{
        flexDirection:'row',
        height:40,
        marginLeft:10,
        alignItems:'center'
    },
    item_view_icon:{
        opacity: 1,
        marginRight: 10,
        height: 22,
        width: 22,
        alignSelf: 'center',
        tintColor:'#d74047'
    },
    item_view_center_status:{
        alignItems:'flex-end',
        flex:1,
        marginRight:10
    },
    item_view_center_status_tv_img:{
        height:20,
        width:62,
        justifyContent:'center',
        alignItems:"center"
    },
    item_view_center_status_tv:{
        color:'white',
        fontSize:10,
        backgroundColor:'#00000000'
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
    item_view_bottom:{
        flexDirection:'row',
        height:40
    },
    item_view_bottom_price_v:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    item_view_bottom_price:{
        color:'red',
        fontSize:14
    },
    item_view_bottom_again_v:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    item_view_bottom_again:{
        fontSize:14,
        color:'black'
    }
}); 