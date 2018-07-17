import React from 'react'
import {
    Button,
    Dimmer,
    Form,
    Grid,
    Header,
    Loader,
    Message,
    Segment
} from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Validator as ReeValidate } from 'ree-validate'
import AuthService from '../../services'

//import PageHeader from '../../common/pageHeader'

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.validator = new ReeValidate({
            email: 'required|email',
            password: 'required|min:6'
        });

        this.state = {
            credentials: {
                email: '',
                password: ''
            },
            responseError: {
                isError: false,
                code: '',
                text: ''
            },
            isLoading: false,
            errors: this.validator.errorBag
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        const { credentials } = this.state;
        credentials[name] = value;
        this.validator.validate(name, value)
            .then(() => {
                const { errorBag } = this.validator;
                this.setState({ errors: errorBag, credentials })
            })
    }

    handleSubmit(event) {
        event.preventDefault();
        const { credentials } = this.state;
        this.validator.validateAll(credentials)
            .then(success => {
                if (success) {
                    this.setState({
                        isLoading: true
                    });
                    this.submit(credentials);
                }
            });
    }

    submit(credentials) {
        //console.log(credentials)
        this.props.dispatch(AuthService.login(credentials))
            .catch(({ error, statusCode }) => {
                const responseError = {
                    isError: true,
                    code: statusCode,
                    text: error
                };
                this.setState({ responseError });
                this.setState({
                    isLoading: false
                });
            })

    }


    componentDidMount() {
        this.setState({
            isLoading: false
        });
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { isAuthenticated } = this.props;

        if (isAuthenticated) {
            return (
                <Redirect to={from} />
            )
        }
        const { errors } = this.state;
        const maxWidth = { maxWidth: '450px' }
        const displayLoading = { display: this.state.isLoading ? 'block' : 'none' }
        return (
            <div>
                {/* <PageHeader heading="login" /> */}
                <Segment className='page-loader' style={displayLoading}>
                    <Dimmer active inverted>
                        <Loader size='large'>Authenticating...</Loader>
                    </Dimmer>
                </Segment>

                <Grid
                    textAlign='center'
                    verticalAlign='middle'
                    className='login-form'
                >
                    <Grid.Column style={maxWidth}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Login to your account
                        </Header>
                        {this.state.responseError.isError && <Message negative>
                            <Message.Content>
                                {this.state.responseError.text}
                            </Message.Content>
                        </Message>}
                        <Form size='large' error={errors.any()} >
                            <Segment stacked>


                                <Form.Input
                                    fluid
                                    icon='mail'
                                    iconPosition='left'
                                    name='email'
                                    placeholder='E-mail address'
                                    onChange={this.handleChange}
                                    error={errors.has('email')}
                                />
                                {errors.has('email') && <Message
                                    error
                                    content={errors.first('email')}
                                />}


                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    name='password'
                                    placeholder='Password'
                                    type='password'
                                    onChange={this.handleChange}
                                    error={errors.has('password')}
                                />
                                {errors.has('password') && <Message
                                    error
                                    content={errors.first('password')}
                                />}

                                <Button color='teal' fluid size='large' onClick={this.handleSubmit}>Login</Button>
                                <div className="ui divider"></div>

                                <Link to='/forgot-password' replace>Forgot your password?</Link>


                            </Segment>
                        </Form>
                        <Message>
                            New to us? <Link to='/register' replace>Register</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

Page.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default Page;
