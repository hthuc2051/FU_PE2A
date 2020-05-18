import React, { Component } from 'react';
import './style.css';
class GithubResultDetailContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            practicalExamCode: '',
            studentCode: '',
            listFile: [],
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(nextProps);
        if (nextProps === prevState) {
            return null;
        }
        return {
            isLoading: nextProps.isLoading,
            message: nextProps.message,
            action: nextProps.action,
            statusCode: nextProps.statusCode,
            listFile: nextProps.listFile
        }
    }

    colorPercent(percent) {
        let result = 'badge ';
        if (percent <= 30) {
            result += 'badge-success';
        }
        else if (percent <= 50) {
            result += 'badge-warning';
        }
        else {
            result += 'badge-danger';
        }
        return result;
    }

    goToGithub = (link) => {
        window.open(link, '_blank');
    }

    renderListFile = (listFile) => {
        let result = null;
        if (listFile !== null && typeof (listFile) !== 'undefined') {
           
                result = listFile.map((item, index) => {
                    return (
                        <tr className="table_row" key={index} onClick={(e) => {e.preventDefault(); this.goToGithub(item.html_url)}}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.name}</td>
                            {/* <td><h5><span className={this.colorPercent(item.percent)}>{item.percent.toFixed(0)}%</span></h5></td> */}
                        </tr>
                    );
                })
            
        }

        return result;
    }


    searchText = (e) => {
        let { listFile } = this.state;
        if (listFile.length === 0) return;
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (let i = 1; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td");
            if (td) {
                let flag = false;
                for (let j = 0; j < 2; j++) {
                    if (td[j]) {
                        txtValue = td[j].textContent || td[j].innerText;
                        if (txtValue.toUpperCase().indexOf(filter) > -1) {
                            flag = true
                        }
                    }
                }
                if (flag) {
                    tr[i].style.display = "";
                }
                else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    back = () => {
       this.props.backToListFile();
    }

    render() {
        let { studentCode } = this.props;
        let { listFile } = this.state;
        return (<div id="content-wrapper">
            <p>
                <button className="btn btn-success" onClick={(e) =>{e.preventDefault();this.back()}}><i className="fa fa-chevron-left"/></button>
            </p>
            <nav className="question-nav card_border_search">
                <div className="input-field">
                    <div className="icon-wrap">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={20} height={20} viewBox="0 0 20 20">
                            <path d="M18.869 19.162l-5.943-6.484c1.339-1.401 2.075-3.233 2.075-5.178 0-2.003-0.78-3.887-2.197-5.303s-3.3-2.197-5.303-2.197-3.887 0.78-5.303 2.197-2.197 3.3-2.197 5.303 0.78 3.887 2.197 5.303 3.3 2.197 5.303 2.197c1.726 0 3.362-0.579 4.688-1.645l5.943 6.483c0.099 0.108 0.233 0.162 0.369 0.162 0.121 0 0.242-0.043 0.338-0.131 0.204-0.187 0.217-0.503 0.031-0.706zM1 7.5c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5-2.916 6.5-6.5 6.5-6.5-2.916-6.5-6.5z" />
                        </svg>
                    </div>
                    <input id="myInput" onChange={(e) => { e.preventDefault(); this.searchText(e) }} type="text" placeholder="Search..." />
                </div>
            </nav>
            <br />
            <div className="card content card_border_search">
                <h2 className="github-button"><span className="badge badge-info">{studentCode}</span></h2>
                <table className="table table-hover" id="myTable">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Github File Name</th>
                            {/* <th scope="col">Similarity Percent</th> */}
                        </tr>
                    </thead>
                    <tbody>
                    {this.renderListFile(listFile)}
                    </tbody>
                </table>
            </div>
        </div>)
    }
}


export default GithubResultDetailContainer;