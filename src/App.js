import React, { Component } from 'react';
import '../src/asset/css/App.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'antd/dist/antd.css';
import MyHeader from './components/MyHeader'
import MySider from './components/MySider'
import MyContent from './components/MyContent'
import { Layout } from 'antd';
const {	Header, Footer, Sider, Content} = Layout;

class App extends Component {
	render() {
		return (
			<div className="App">
			
				<Layout>
					<Header style={{background:'#444'}}>
						<MyHeader></MyHeader>	
					</Header>
					<Layout style={{width:'1400px',margin:'10px auto'}}>
						<Sider width={'300px'}>
							<MySider></MySider>
						</Sider>
						<Content style={{marginLeft:'20px'}}>
							<MyContent></MyContent>
						</Content>
					</Layout>
					<Footer  style={{background:'#1890ff   '}}>我是底部</Footer>
				</Layout>
			</div>
		);
	}
}

export default App;
