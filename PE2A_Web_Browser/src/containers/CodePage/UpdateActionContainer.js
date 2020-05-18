import React, { Component } from 'react';
import './style.css';
import { connect } from 'react-redux';
import * as Constants from '../constants';
import { onFinishing } from '../AdminPage/actions';
import { getListParams, getListSubjects, getListParamTypesBySubject, updateAction } from '../AdminPage/axios';

class UpdateActionContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            actionParams: [],
            updateAction: {
                id: '',
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
            updateAction: nextProps.updateAction,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        let {updateAction, isSubjectChanged, actionParams} = this.state;
        console.log(this.state);
        if (updateAction !== null && typeof (updateAction) !== 'undefined' && !isSubjectChanged) {
            isSubjectChanged = true;
            this.props.getListParamTypesBySubject(updateAction.subject.id);
            actionParams = updateAction.actionParams;
            this.setState({isSubjectChanged, updateAction, actionParams});
        }
        return true;
    }

    saveAction = (e) => {
        e.preventDefault();
        let { actionParams, updateAction } = this.state;

        updateAction.actionParams = actionParams;
        let formatedCode = updateAction.code.replace(/\r?\n|\r/g, '');
        
        updateAction.code = formatedCode;

        this.setState({ updateAction });
        console.log(updateAction)
        this.props.updateActionDetails(updateAction);
    }

    addMoreParam = (e) => {
        e.preventDefault();
        let { actionParams, listParamTypes, listParams } = this.state;
        let randId = (+new Date).toString(36);
        if (listParamTypes !== null && listParams !== null && listParamTypes.length > 0 && listParams.length > 0) {
            let parameter = listParams[0];
            let paramType = listParamTypes[0];
            actionParams.push({
                id: randId,
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
        let { updateAction } = this.state;
        actionName = e.target.value;
        updateAction.name = actionName;
        this.setState({
            updateAction
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

    renderParameter = (listParams, index) => {
        let result = [];
        let {actionParams} = this.state;
        if (listParams !== null && typeof(listParams) !== 'undefined') {
            if (actionParams !== null && actionParams.length > 0) {
                let parameter = actionParams[index].param;
                result = listParams.map((item, index) => {                      
                    if (parameter.id === item.id) {
                        return <option id={item.id} value={item.name} key={index} selected>{item.name}</option>;
                    } else {
                        return <option id={item.id} value={item.name} key={index}>{item.name}</option>;
                    }
                });
            }
        }
        return result;
    }

    renderParameterType = (listParamTypes, index) => {
        let result = [];
        let {actionParams} = this.state;
        if (listParamTypes !== null && typeof(listParamTypes) !== 'undefined') {
            if (actionParams !== null && actionParams.length > 0) {
                let paramType = actionParams[index].paramType;
                result = listParamTypes.map((item, index) => {
                    if (paramType.id === item.id) {
                        return <option id={item.id} value={item.name} key={index} selected>{item.name}</option>;
                    } else {
                        return <option id={item.id} value={item.name} key={index}>{item.name}</option>;
                    }
                });
            }
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
                        {listParams ? this.renderParameter(listParams, index) : ''}
                    </select>
                    <select className="custom-select subject-list col-3" name="param-type" onChange={(e) => this.onParamChangeHandler(e, index)}>
                        {listParamTypes ? this.renderParameterType(listParamTypes, index) : ''}
                    </select>
                    <button className="btn btn-danger" onClick={() => this.removeParam(item.id)}>
                        <i className="fa fa-minus" /> Remove
                    </button>
                </div>
            );
        });
        return result;
    }

    removeParam = (id) => {
        let { actionParams } = this.state;
        var removeIndex = actionParams.map(function (item) { return item.id; }).indexOf(id);

        if (removeIndex !== null && removeIndex >= 0) {
            actionParams.splice(removeIndex, 1);
        }

        this.setState({actionParams});
    }

    onCodeChangeHandler = (e, code) => {
        e.preventDefault();
        let { updateAction } = this.state;
        code = e.target.value;
        updateAction.code = code;
        this.setState({
            updateAction
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
                                    <code className="keyword" placeholder='actionName'>{this.state.updateAction.name} </code>
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

    renderSubjects = (listSubjects, updateAction) => {
        let result = [];
        if (listSubjects !== null && typeof(listSubjects) !== 'undefined') {
            result = listSubjects.map((item, index) => {
                console.log(updateAction.subject.id);
                let subject = listSubjects.find(s => s.id === updateAction.subject.id)
                if (subject !== null) {
                    return (
                        <option value={subject.id} key={index} selected>{subject.name}</option>
                    );
                } else {
                    return (
                        <option value={item.id} key={index} >{item.name}</option>
                    );
                }
            });
        }
        return result;
    }

    render() {
        let {listSubjects, updateAction, actionParams} = this.state;
        return (
            <div id="content-wrapper" >
                <div className="card content">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label >Action name:</label>
                                    <input type="text" className="form-control" onChange={(e) => this.onActionNameChangeHandler(e, updateAction.name)} value={updateAction.name} />
                                </div>

                                <div className='form-group'>
                                    <div>
                                        <label>Subject:</label>
                                    </div>
                                    <select className="custom-select subject-list col-6" id="inputGroupSelect02" disabled>
                                        {listSubjects ? this.renderSubjects(listSubjects, updateAction) : ''}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label >Code Snippet:</label>
                                    <textarea className="form-control" onChange={(e) => this.onCodeChangeHandler(e, updateAction.code)} value={updateAction.code} />
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
                                    {this.renderParameters(actionParams)}
                                </div>

                                <br />
                                <div className=''>
                                    <button type="button" onClick={(e) => this.saveAction(e)} className="btn btn-success">Save</button>
                                        &nbsp;
                                        <button type="reset" className="btn btn-danger">Clear</button>
                                </div>
                            </div>

                            <div className="vl" style={{ marginRight: '15px' }} ></div>

                            {this.renderCodeSnippet(updateAction.code)}


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        listSubjects: state.listActionsPage.listSubjects,
        listParamTypes: state.listActionsPage.listParamTypes,
        listParams: state.listActionsPage.listParams,
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFinishing: () => {
            dispatch(onFinishing(Constants.RESET_ACTION_STATUS));
        },
        getListSubjects: () => {
            getListSubjects(dispatch);
        },
        getListParamTypesBySubject: (id) => {
            getListParamTypesBySubject(id, dispatch);
        },
        getListParams: () => {
            getListParams(dispatch);
        },
        updateActionDetails: (actionUpdate) => {
            updateAction(actionUpdate, dispatch);
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateActionContainer);
