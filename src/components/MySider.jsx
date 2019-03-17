import React from 'react';
import { Menu } from 'antd';
import '../asset/css/sider.css'


class MySider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <div style={{ width: 300 }}>              
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub2','sub1']}
                    mode="inline"
                    theme="light"
                    inlineCollapsed={this.state.collapsed}
                >
                     <Menu.Item key="1">全部</Menu.Item>
                     <Menu.Item key="2">精华</Menu.Item>
                     <Menu.Item key="3">分享</Menu.Item>
                     <Menu.Item key="4">问答</Menu.Item>
                     <Menu.Item key="5">招聘</Menu.Item>
                     <Menu.Item key="6">客户端测试</Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default MySider;