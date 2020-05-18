import React, { Component } from 'react';
import { LeftSideBar, TopNavBar } from './../components/index';
import { LecturerPageContainer } from './../containers/index';
import './style.css';
const CODE_PAGE_TITLE = 'Lecturer page';

let navArr = [
    {
        title: 'Invigilate request',
        type: 'nav-item',
        link: '/lecturer/1/invigilate-request'
    }
]



class LecturerPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navArr: null,
            id: null,
        };
    }

    componentDidMount() {
        let { id } = this.props.match.params;
        let navArr = [
            {
                title: 'Invigilate request',
                type: 'nav-item',
                link: '/lecturers/' + id
            }
        ]
        this.setState({
            navArr: navArr,
            id: id,
        })
    }

    createDropDownArr = (userId, subjects) => {
        // let result = [];
        // if (subjects && subjects.length > 0) {
        //     subjects.map((subject) => {
        //         result.push({
        //             title: subject.name,
        //             link: '/lecturer/' + userId + '/subjects/' + subject.id + '/' + subject.name
        //         })
        //     })
        // }
        // return result;
    }

    render() {
        let { navArr, id } = this.state;
        console.log(navArr);
        return (
            <div>
                <div>
                    {/* Top navigation */}
                    <TopNavBar pageTitle={CODE_PAGE_TITLE} />
                    <div id="wrapper">
                        {/* Sidebar */}
                        {navArr ? <LeftSideBar navArr={navArr} /> : ''}

                        {/* Container */}
                        {id ? <LecturerPageContainer id={id} /> : ''}
                        {/* <PracticalExamResult/> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default LecturerPage;
