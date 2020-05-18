import React, { Component } from 'react';
import './style.css';
import { connect } from 'react-redux';
import * as Constants from '../constants';
import { onFinishing } from '../AdminPage/actions';
import { getListParams, getListSubjects, getListParamTypesBySubject, createAction } from '../AdminPage/axios';

class CodePageContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            actionParams: [],
            action: {
                randId: '',
                name: '',
                code: '',
                actionParams: [],
                adminId: 1,
                subject: {
                    id: '',
                    name: '',
                    code: '',
                }
            },
            isSubjectChanged: false,
            listSubjects: [],
            listParams: [],
            listParamTypes: [],
        };
    }

    leftBracket = '{';
    rightBracket = '}';

    componentDidMount() {
        this.props.getListSubjects();
        this.props.getListParams();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps === prevState) {
            return null;
        }
        return {
            listParams: nextProps.listParams,
            listSubjects: nextProps.listSubjects,
            listParamTypes: nextProps.listParamTypes,
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        let {listSubjects} = nextProps;
        let {isSubjectChanged, action} = this.state;
        if (listSubjects !== null && listSubjects.length > 0 && !isSubjectChanged) {
            this.props.getListParamTypesBySubject(listSubjects[0].id);
            isSubjectChanged = true;
            action.subject = listSubjects[0];
            this.setState({isSubjectChanged, action});
        }
        return true;
    }

    changeSubject = (e) => {
        let { listSubjects, action, actionParams } = this.state;
        let subjectId = e.target.value;
        if (subjectId !== '') {
            let subject = listSubjects.find(s => s.id.toString() === subjectId);
            if (subject !== null && typeof (subject) !== 'undefined') {
                action.subject = subject;
                actionParams = [];
                this.setState({action, actionParams});
            }
            this.props.getListParamTypesBySubject(subjectId);
        }
    }

    saveAction = () => {
        let { actionParams, action } = this.state;

        action.actionParams = actionParams;
        let formatedCode = action.code.replace(/\r?\n|\r/g, '');
        
        action.code = formatedCode;

        this.setState({ action });
        console.log(action)
        //this.props.createAction(action);
    }

    addMoreParam = (e) => {
        e.preventDefault();
        let { actionParams, listParamTypes, listParams } = this.state;
        let randId = (+new Date).toString(36);
        if (listParamTypes !== null && listParams !== null && listParamTypes.length > 0 && listParams.length > 0) {
            let parameter = listParams[0];
            let paramType = listParamTypes[0];
            actionParams.push({
                randId: randId,
                param: {
                    id: parameter.id,
                    name: parameter.name,
                    active: true
                },
                paramType: {
                    id: paramType.id,
                    name: paramType.name,
                    subjectCode: paramType.subjectCode,
                    active: true
                }
            });
            
            this.setState({
                actionParams: actionParams
            });
        }
    }

    onActionNameChangeHandler = (e, actionName) => {
        e.preventDefault();
        let { action } = this.state;
        actionName = e.target.value;
        action.name = actionName;
        this.setState({
            action
        });
    }

    onParamChangeHandler = (e, index) => {
        let { actionParams, listParams, listParamTypes } = this.state;

        let name = e.target.name;
        const value = e.target.value;
        if (name === 'param-type') {
            let paramTypeIndex = listParamTypes.findIndex(x => x.name === value);
            if (paramTypeIndex !== null && typeof (paramTypeIndex) !== 'undefined') {
                const paramType = listParamTypes[paramTypeIndex];
                actionParams[index].paramType.subjectCode = paramType.subjectCode;
                actionParams[index].paramType.id = paramType.id;
                actionParams[index].paramType.name = paramType.name;
            }
        }
        if (name === 'parameter') {
            let paramIndex = listParams.findIndex(x => x.name === value);
            if (paramIndex !== null && typeof (paramIndex) !== 'undefined') {
                const parameter = listParams[paramIndex];
                actionParams[index].param.name = parameter.name;
                actionParams[index].param.id = parameter.id;
            }
        }
        this.setState({
            actionParams,
        });
    }

    renderParameter = (listParams) => {
        let result = [];
        if (listParams !== null && typeof(listParams) !== 'undefined') {
            result = listParams.map((item, index) => {
                return (
                    <option id={item.id} value={item.name} key={index}>{item.name}</option>
                );
            });
        }
        return result;
    }

    renderParameterType = (listParamTypes) => {
        let result = [];
        if (listParamTypes !== null && typeof(listParamTypes) !== 'undefined') {
            result = listParamTypes.map((item, index) => {
                return (
                    <option id={item.id} value={item.name} key={index}>{item.name}</option>
                );
            });
        }
        return result;
    }

    renderParameters = (params) => {
        let result = [];
        let {listParamTypes, listParams} = this.state;
        result = params.map((item, index) => {
            return (
                <div className='form-group row params' key={index}>
                    <select className="custom-select subject-list col-3 mr-3" name="parameter" onChange={(e) => this.onParamChangeHandler(e, index)}>
                        {listParams ? this.renderParameter(listParams) : ''}
                    </select>
                    <select className="custom-select subject-list col-3" name="param-type" onChange={(e) => this.onParamChangeHandler(e, index)}>
                        {listParamTypes ? this.renderParameterType(listParamTypes) : ''}
                    </select>
                    <button className="btn btn-danger" onClick={() => this.removeParam(item.randId)}>
                        <i className="fa fa-minus" /> Remove
                    </button>
                </div>
            );
        });
        return result;
    }

    removeParam = (id) => {
        let { actionParams } = this.state;
        var removeIndex = actionParams.map(function (item) { return item.randId; }).indexOf(id);

        if (removeIndex !== null && removeIndex >= 0) {
            actionParams.splice(removeIndex, 1);
        }

        this.setState({actionParams});
    }

    onCodeChangeHandler = (e, code) => {
        e.preventDefault();
        let { action } = this.state;
        code = e.target.value;
        action.code = code;
        this.setState({
            action
        });
    }

    renderCodeSnippet = (code) => {
        return (
            <div className="col-xl-5">
                <div className="code-block">
                    <div className="code-container">
                        <div id="highlighter_548907" className="syntaxhighlighter nogutter">
                            <div className="container">
                                <div>
                                    <code className="keyword" placeholder='actionName'>{this.state.action.name} </code>
                                    <code className="plain">{this.leftBracket}</code>
                                </div>

                                <div className="line code-snippet">
                                    <span className="plain">{code}</span>
                                </div>

                                <div>
                                    <code className="plain">{this.rightBracket}</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderSubjects = (listSubjects) => {
        let result = [];
        if (listSubjects !== null && typeof(listSubjects) !== 'undefined') {
            result = listSubjects.map((item, index) => {
                return (
                    <option value={item.id} key={index}>{item.name}</option>
                );
            });
        }
        return result;
    }

    render() {
        let {listSubjects} = this.state;
        return (
            <div id="content-wrapper" >
                <div className="card content">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label >Action name:</label>
                                    <input type="text" className="form-control" onChange={(e) => this.onActionNameChangeHandler(e, this, this.state.action.name)} />
                                </div>

                                <div className='form-group'>
                                    <div>
                                        <label>Subject:</label>
                                    </div>
                                    <select className="custom-select subject-list col-6" id="inputGroupSelect02" onChange={(e) => this.changeSubject(e)}>
                                        {listSubjects ? this.renderSubjects(listSubjects) : ''}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label >Code Snippet:</label>
                                    <textarea className="form-control" onChange={(e) => this.onCodeChangeHandler(e, this.state.action.code)} />
                                </div>

                                <div className="form-group">
                                    <label>Parameter:</label>
                                    <div>
                                        <button className="btn btn-success" onClick={this.addMoreParam}>
                                            <i className="fa fa-plus" /> Add Parameter
                                        </button>
                                    </div>
                                </div>

                                <div className="form-group" id="paramRoot" >
                                    {this.renderParameters(this.state.actionParams)}
                                </div>

                                <br />
                                <div className=''>
                                    <button type="button" onClick={this.saveAction} className="btn btn-success">Save</button>
                                        &nbsp;
                                        <button type="reset" className="btn btn-danger">Clear</button>
                                </div>
                            </div>

                            <div className="vl" style={{ marginRight: '15px' }} ></div>

                            {this.renderCodeSnippet(this.state.action.code)}


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        listParams: state.listActionsPage.listParams,
        listSubjects: state.listActionsPage.listSubjects,
        listParamTypes: state.listActionsPage.listParamTypes,
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getListParams: () => {
            getListParams(dispatch);
        },
        getListSubjects: () => {
            getListSubjects(dispatch);
        },
        getListParamTypesBySubject: (id) => {
            getListParamTypesBySubject(id, dispatch);
        },
        createAction: (action) => {
            createAction(action, dispatch);
        },
        onFinishing: () => {
            dispatch(onFinishing(Constants.RESET_ACTION_STATUS));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CodePageContainer);
