import React from 'react';
import '../asset/css/content.css'

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className='detailsContent'>
                <h2>我是详情页</h2>
            </div>
        );
    }
}

export default Details;