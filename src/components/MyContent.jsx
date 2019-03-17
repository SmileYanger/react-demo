import React from 'react';
import '../asset/css/content.css'
import Axios from 'axios'
import { Pagination } from 'antd';
import { BrowserRouter as Router,  Link } from "react-router-dom";

class MyContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            page:1
        }
    }
    onChange = (pageNumber) => {
        console.log('Page: ', pageNumber);
        this.setState({
            page:pageNumber
        })
        // this.componentDidMount()
        console.log(this.state.page)
    }
    shouldComponentUpdate(){
        return true
    }
    componentDidMount() {
        var api = 'https://cnodejs.org/api/v1/topics'
        Axios.get(api, {
            params: {
                page: this.state.page,
                // tab:'ask',
                limit: 6,
                mdrender: true
            }
        })
            .then((res) => {
                console.log(res.data.data);
                this.setState({
                    list: res.data.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    render() {
        return (
            <div >
                {/* <ul className="myList">
                    {
                        this.state.list.map((value, key) => {
                            return (
                                <li key={key}>
                                    <div className='left'>
                                        <img src={value.author.avatar_url} alt="" />
                                        <span className='read'>
                                            <b>{value.reply_count}</b>/{value.visit_count}
                                    </span>
                                        <span className={value.top === true? 'budgut-hover' : 'budgut'}>{value.tab}</span>
                                        <span>{value.title}</span>
                                    </div>
                                    <div className="right">
                                        
                                        <span>{value.last_reply_at}</span>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul> */}
                <Pagination showQuickJumper defaultCurrent={1} total={500} onChange={this.onChange} />
                <Router>
                    <div>
                        <Link to='/details'>去详情页</Link>
                        <Router exact  path='/details' component={MyDetails}></Router>
                    </div>
                </Router>
            </div>
        );
    }
}

export default MyContent;