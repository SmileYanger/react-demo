import React from 'react'
import { Menu, Icon,Input } from 'antd';
import '../asset/css/header.css'
const Search = Input.Search;
class MyHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'mail',
        };
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    render() {
        return (
            <div className='box'>
                <img src={require('../asset/images/logo.svg')} alt=""  className='logo'/>
                <Search
                    placeholder="请输入关键词..."
                    onSearch={value => console.log(value)}
                    className='search'
                />
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                    className='nav'
                >
                    <Menu.Item key="mail">
                        <Icon type="mail" />首页
                    </Menu.Item>
                    <Menu.Item key="app" >
                        <Icon type="appstore" />新手入门
                    </Menu.Item>
                    <Menu.Item key="app2" >
                        <Icon type="shop" />API
                    </Menu.Item>
                    <Menu.Item key="app3" >
                        <Icon type="shop" />关于
                    </Menu.Item>
                    <Menu.Item key="app4" >
                        <Icon type="shop" />注册
                    </Menu.Item>
                    <Menu.Item key="app5" >
                        <Icon type="shop" />登录
                    </Menu.Item>
                </Menu>
            </div>

        );
    }
}

export default MyHeader;