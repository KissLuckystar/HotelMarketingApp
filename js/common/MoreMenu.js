/**
 * 更多菜单
 * @flow
 * Created by smk on 2017/2/24
 */
import React, {Component,PropTypes} from 'react'
import {
    ListView,
    StyleSheet,
    RefreshControl,
    TouchableHighlight,
    Text,
    Image,
    Linking,
    View,
} from 'react-native'
import Popover from "../common/Popover";
//引入相关页面
import AboutMePage from "../pages/my/AboutMePage";
import AssetPage from "../pages/my/AssetPage";
import BalancePage from "../pages/my/BalancePage";
import BillPage from "../pages/my/BillPage";
import CustomProductPage from "../pages/my/CustomProductPage";
import EarningsPage from "../pages/my/EarningsPage";

//个人信息页面项
export const MORE_MENU = {
    About_Me:'About Me',
    Assert:'Assert',
    Balance:'Balance',
    Bill:'Bill',
    Custom_Product:'Custom Product',
    Earnings:'Earnings',
    MySetUp:'MySetUp',
    //About Me页面
    MyInfo:'My Personal Info',
    BankCard:'My BankCard',
    QRCode:'My QRCode',
    Message:'My Message',
    CustomerService:'My Customer Service',
    //My Set Up页面
    AccountsSecurity:'Accounts And Security',
    PasswordSetting:'Password Setting',
    MessageNotify:'Message Notify',
    ThemeSetting:'Theme Setting',
    AboutSystem:'About System',
    //About Sytem页面
    CheckUpdate:'Check Update',
    VersionDesc:'Vession Description',
    FeedBack:'FeedBack',

/*    Custom_Language:'Custom Language',
    Sort_Language:'Sort Language',
    Custom_Theme:'Custom Theme',
    Custom_Key:'Custom Key',
    Sort_Key:'Sort Key',
    Remove_Key:'Remove Key',
    About_Author:'About Author',
    About:'About',
    Website:'Website',
    Feedback:'Feedback',*/
}

export default class MoreMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            buttonRect: {},
        }
    }

    static propTypes = {
        contentStyle: View.propTypes.style,
        menus:PropTypes.array,
    }

    open() {
        this.showPopover();
    }

    showPopover() {
        if (!this.props.anchorView)return;
        let anchorView=this.props.anchorView;
        if(anchorView instanceof FavoritePage){
            anchorView=anchorView.refs.moreMenuButton;
        }
        anchorView.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width: width, height: height}
            });
        });
    }

    closePopover() {
        this.setState({
            isVisible: false,
        });
        if (typeof(this.props.onClose) == 'function')this.props.onClose();
    }

    onMoreMenuSelect(tab) {
        this.closePopover();
        if (typeof(this.props.onMoreMenuSelect) == 'function')this.props.onMoreMenuSelect(tab);
        let TargetComponent, params={...this.props,menuType:tab};
        switch (tab) {
            case MORE_MENU.About_Me:
                TargetComponent = AboutMePage;
                //params.flag=FLAG_LANGUAGE.flag_key;
                break;
            case MORE_MENU.Assert:
                TargetComponent = AssetPage;
                //params.flag=FLAG_LANGUAGE.flag_key;
                break;
            case MORE_MENU.Balance:
                TargetComponent = BalancePage;
                //params.flag=FLAG_LANGUAGE.flag_key;
                break;
            case MORE_MENU.Bill:
                TargetComponent = BillPage;
                //params.flag=FLAG_LANGUAGE.flag_language;
                break;
            case MORE_MENU.Custom_Product:
                TargetComponent = CustomProductPage;
                //params.flag=FLAG_LANGUAGE.flag_language;
                break;
            case MORE_MENU.Earnings:
                TargetComponent = EarningsPage;
                //params.flag=FLAG_LANGUAGE.flag_language;
                break;          
            /*case MORE_MENU.Feedback:
                Linking.openURL('mailto:crazycodeboy@gmail.com');
                break;*/

        }
        if (TargetComponent) {
            this.props.navigator.push({
                component: TargetComponent,
                params: params,
            });
        }
    }

    renderMoreView() {
        let view = <Popover
            isVisible={this.state.isVisible}
            fromRect={this.state.buttonRect}
            placement="bottom"
            onClose={()=>this.closePopover()}
            contentStyle={{opacity:0.82,backgroundColor:'#343434'}}
            contentMarginRight={20}
        >
            <View style={{alignItems: 'center',}}>
                {this.props.menus.map((result, i, arr) => {
                    return <TouchableHighlight key={i} onPress={()=>this.onMoreMenuSelect(arr[i])}
                                               underlayColor='transparent'>
                        <Text
                            style={{fontSize: 18,color:'white', padding: 8, fontWeight: '400'}}>
                            {arr[i]}
                        </Text>
                    </TouchableHighlight>
                })
                }

            </View>
        </Popover>;
        return view;
    }

    render() {
        return (this.renderMoreView());
    }

}