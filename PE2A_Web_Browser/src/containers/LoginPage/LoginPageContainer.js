import React, { Component } from 'react';
import { history } from './../../App';
import { login } from './axios';
import { connect } from 'react-redux';
import swal from 'sweetalert';

class LoginPageContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            txtUsername: '',
            txtPassword: '',
        };
    }
    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        this.setState({
            [name]: target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        let { txtUsername, txtPassword } = this.state;
        let userDetails = {
            username: txtUsername,
            password: txtPassword
        }
        //  localStorage.setItem('userInfo', JSON.stringify(userInfo));
        let id = 5;
        if (txtUsername === 'ThucNH') {
            history.push("/subjects/1/practical-exams");
        }
        else if (txtUsername === 'PhuongNC') {
            history.push("/lecturers/5");
        } else if (txtUsername === 'HaiNQ') {
            history.push("/lecturers/7");
        } else if (txtUsername === 'LamDV') {
            history.push("/lecturers/11");
        } else if (txtUsername === 'TruongLX') {
            history.push("/lecturers/12");
        }
        window.location.reload();
        // this.props.onLogin(userDetails);
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        // if (nextProps === prevState) {
        //     return null;
        // }
        // console.log(nextProps);
        // let { userDetails, statusCode } = nextProps;
        // switch (statusCode) {
        //     case 200:
        //         if (userDetails != null && typeof (userDetails) !== 'undefined') {
        //             localStorage.setItem("USER", JSON.stringify(userDetails));
        //             let id = userDetails.id;
        //             let role = userDetails.role;
        //             if (role === 'admin') {
        //             } else if (role === 'headlecturer') {
        //                 history.push("/subjects/1/practical-exams");
        //             } else {
        //                 history.push("/lecturers/" + id);
        //             }
        //             window.location.reload();
        //         }
        //         break;
        //     case 404:
        //     case 500:
        //     case 403:
        //     case 409:
        //         swal("Login failed", "Please input correct username and password", "error");
        //         break;
        // }
       
        return {
        }

    }

    render() {
        return (
            <form onSubmit={this.onSubmit} className="login-form">
                <input onChange={this.onChange} name="txtUsername" type="text" placeholder="Username" />
                <input onChange={this.onChange} name="txtPassword" type="password" placeholder="Password" />
                <button>login</button>
            </form>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isLoading: state.loginPage.isLoading,
        statusCode: state.loginPage.statusCode,
        userDetails: state.loginPage.userDetails,

    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        // onLoading: () => {
        //     dispatch(onLoading(Constants.FETCH_PRACTICAL_EXAMS + Constants.PREFIX_LOADING));
        // },
        onLogin: (userDetails) => {
            login(userDetails, dispatch);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer);
