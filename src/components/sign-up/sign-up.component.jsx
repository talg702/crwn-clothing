import React from 'react';
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component';
import { connect } from 'react-redux';
import './sign-up.styles.scss';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { signUpStart } from '../../redux/user/user.actions';
import { selectError } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        
        event.preventDefault();
        console.log("in handleSubmit!!! 1")
        const { signUpStart } = this.props;
        console.log("in handleSubmit!!! 2")
        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            return alert("passwords don't match")
        }
        console.log("in handleSubmit!!!!!! going to issue signupStart")
        signUpStart({displayName, email, password});
        console.log("in handleSubmit!!!!!! after signupStart")
        // try {
        //     const { user } = await auth.createUserWithEmailAndPassword(email, password);
        //     await createUserProfileDocument(user, { displayName });
        //     this.setState({
        //         displayName: '',
        //         email: '',
        //         password: '',
        //         confirmPassword: ''
        //     })
        // } catch (error) {
        //     console.log(error)
        // }
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState( { [name] : value});
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        const { error } = this.props;
        console.log(error);
        // if ( error && error.message ) {
        //     alert(`Failed to Sign Up ${error.message}`);
        //     // this.setState({error:null})
        // }
        return (
            <div className='sign-up'>
                <h2 className="title">I do not have an account </h2>
                <span>Sign up with your email and password</span>
                <form onSubmit={this.handleSubmit} className="sign-up-form">
                    <FormInput
                        type="text"
                        name="displayName"
                        value={displayName}
                        label="Display Name"
                        onChange={this.handleChange}
                        required
                    />                        
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        label="Email"
                        onChange={this.handleChange}
                        required
                    />                        
                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        label="Password"
                        onChange={this.handleChange}
                        required
                    />                        
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        label="Confirm Password"
                        onChange={this.handleChange}
                        required
                    />     
                    <CustomButton>Sign Up</CustomButton>                   
                </form>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    error: selectError
})

const mapDispatchToProps = dispatch => ({
    signUpStart: signUpInfo => dispatch(signUpStart(signUpInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)