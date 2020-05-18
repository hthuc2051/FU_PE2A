import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Constants from '../constants';
import { onLoading } from './actions';
import { viewCodeFiles } from './axios';
import './style.css';

class DuplicatedCodeDetailContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            scriptEdit: null,
            firstFiles: [],
            secondFiles: [],
            filesData: [],
            examCode: '',
            lineFirstFile: -1,
            lineSecondFile: -1,
            filesTokenArr: [],
            filesToken: "",
            lecturerToken: ''
        };
    }

    componentDidMount() {
        console.log(this.props);
        let { filesTokenArr, examCode } = this.props;
        this.setState({
            filesTokenArr: filesTokenArr,
            examCode: examCode,
        })

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(nextProps);
        let { filesData } = nextProps;
        let firstFiles, secondFiles;
        let count = 0;
        console.log(Object.entries(filesData));
        for (let [key, value] of Object.entries(filesData)) {
            if (count === 0) {
                firstFiles = {
                    fileName: key,
                    code: value
                }
            } else {
                secondFiles = {
                    fileName: key,
                    code: value
                }
            }
            count++;
        }
        return {
            firstFiles: firstFiles,
            secondFiles: secondFiles,
        }
    }

    onSelected = (selectedItem) => {
        let { examCode } = this.state;
        let obj = {
            examCode: examCode,
            filesToken: selectedItem,
            lecturerToken: "1",
        }
        this.props.onViewSubmissionFiles(obj);
        this.setState({
            filesToken: selectedItem,
        });

    }
    render() {
        let { firstFiles, secondFiles, filesTokenArr } = this.state;
        return (
            <div id="duplicated-code-page" className="scroll">

                <div className="form-group">
                    <label>List of pair methods are consider to similar:</label>
                    <select multiple className="form-control" >
                        {filesTokenArr ? this.renderFilesTokenArr(filesTokenArr) : ''}
                    </select>
                </div>
                <div className="card content">
                    <div className="container practical-exam-result">
                        <div className="row">
                            <div className="col-sm">
                                <div className="accordion">
                                    {firstFiles ? this.renderCodeView(firstFiles) : ''}
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="accordion">
                                    {secondFiles ? this.renderCodeView(secondFiles) : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderCodeView = (file) => {
        // SE63157_Cabinet.java_149-154   ~    SE63155_Jewelry.java_82-85
        // "Practical_Java_SE1269_20200902_SE63157_Cabinet.java"
        let { filesToken } = this.state;
        if (filesToken !== "") {
            let arr = filesToken.split("~");
            let startIndex = -1;
            let endIndex = -1;
            let label = file.fileName;
            let arrLabel = file.fileName.split("_");
            if (arrLabel && arrLabel.length > 0) {
                label = "Student code: " + arrLabel[4] + " - File: " + arrLabel[5];
            }

            if (typeof (file) !== 'undefined' && file != null) {
                if (arr != null && arr.length > 0) {
                    arr.forEach(item => {
                        let lastIndex = item.lastIndexOf("_");
                        let fileName = item.substring(0, lastIndex);
                        let fileToken = item.substring(lastIndex + 1);
                        if (file.fileName.includes(fileName)) {
                            let arrIndex = fileToken.split("-");
                            startIndex = arrIndex[0];
                            endIndex = arrIndex[1];
                            let arrTemp = endIndex.split(":");
                            if (arrTemp && arrTemp.length > 0) {
                                endIndex = arrTemp[0].trim();
                            }
                        }
                    });
                }
                return (
                    <div key={file.fileName} className="card">
                        <div className="card-header">
                            <h2 className="mb-0">
                                <button className="btn btn-link file-name" type="button">
                                    {label}
                                </button>
                            </h2>
                        </div>
                        <div className="collapse show" aria-labelledby="headingOne" >
                            <div className="card-body scroll">
                                <table className="highlight tab-size js-file-line-container" data-paste-markdown-skip>
                                    <tbody>
                                        {this.renderArrCode(file.code, startIndex, endIndex)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }

    renderArrCode = (arr, startIndex, endIndex) => {
        console.log(startIndex, endIndex);
        let result = [];
        if (typeof (arr) !== 'undefined' && arr != null) {
            result = arr.map((item, index) => {
                return (
                    <tr key={index} className={(index >= startIndex - 1 && index <= endIndex - 1) ? "code-duplicated" : ''}>
                        <td className="blob-num js-line-number" >{index + 1}</td>
                        <td className="blob-code blob-code-inner js-file-line">
                            <span className="pl-c">
                                {item}
                            </span>
                        </td>
                    </tr>
                )
            })
        }
        return result;
    }
    renderFilesTokenArr = (arr) => {
        let result = [];
        if (typeof (arr) !== 'undefined' && arr != null) {
            result = arr.map((item, index) => {
                let filesToken = item;
                let student1Code = "";
                let student2Code = "";
                let student1Label = "";
                let student2Label = "";

                if (filesToken !== "") {
                    let arr = filesToken.split("~");
                    if (arr != null && arr.length > 0) {
                        let stringStudent1 = arr[0];
                        let stringStudent2 = arr[1];

                        let arrTempStudent1 = stringStudent1.split("_");
                        let arrTempStudent2 = stringStudent2.split("_");

                        // SE62882 - LoginServlet.java - line (96-100)   &   SE62847 - LoginServlet.java - line (96-100)
                        if (arrTempStudent1 && arrTempStudent1.length > 0) {
                            student1Label = arrTempStudent1[0] + " - " + arrTempStudent1[1] + " - line (" + arrTempStudent1[2] + ")";
                        }
                        if (arrTempStudent2 && arrTempStudent2.length > 0) {
                            let arrPercent = arrTempStudent2[2].split(":");
                            student2Label = arrTempStudent2[0] + " - " + arrTempStudent2[1] + " - line (" + arrPercent[0] + ") - " + (arrPercent[1] * 100).toFixed(1) + "%";
                        }
                        console.log(student1Code, student2Code);
                    }
                }
                return (
                    <option key={index} onClick={() => this.onSelected(item)}
                        value={item}>
                        {student1Label + " & " + student2Label}
                    </option>

                )
            })
        }
        return result;
    }

}

const mapStateToProps = (state) => {
    return {
        isLoading: state.duplicatedCodePage.isLoading,
        statusCode: state.duplicatedCodePage.statusCode,
        message: state.duplicatedCodePage.message,
        error: state.duplicatedCodePage.error,
        filesData: state.duplicatedCodePage.filesData,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        // onLoading: () => {
        //     dispatch(onLoading(Constants.FETCH_PRACTICAL_EXAMS + Constants.PREFIX_LOADING));
        // },
        onViewSubmissionFiles: (token) => {
            viewCodeFiles(token, dispatch);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DuplicatedCodeDetailContainer);

