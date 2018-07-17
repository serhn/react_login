import React from 'react'
import {
    Header,
    Segment,
    Button
} from 'semantic-ui-react'

import PageHeader from '../../common/pageHeader'
import * as actions from '../../store/actions'

class Page extends React.Component {
    //constructor(props) {
    //    super(props);
    //}
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event) {
        event.preventDefault();
        this.props.dispatch(actions.authLogout());
    }
    render() {
        return (
            <div>
                <PageHeader heading="Home" />
                <Segment vertical textAlign='center' style={{ minHeight: '100vh' }}>
                    <Header as='h1'>Home</Header>
                    <Button onClick={this.handleLogout}>Logout</Button>
                </Segment>
            </div>
        );
    }
}

export default Page;