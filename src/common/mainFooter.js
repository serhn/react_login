/**
 * Created by Sumit-Yadav on 12-10-2017.
 */
import React from 'react'
import {
    Container,
    Grid,
    Header
} from 'semantic-ui-react'

class Footer extends React.Component {


    render() {
        return (

            <Container className="footer">
                <Grid columns="equal" verticalAlign="middle" className="foobar" stackable>
                    <Grid.Row>
                        <Grid.Column>
                            <Header textAlign="center" as="h5" >Sample footer @ 2018</Header>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default Footer;