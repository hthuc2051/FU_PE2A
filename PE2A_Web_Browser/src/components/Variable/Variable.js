import React, { Component } from 'react';
import './style.css';
import * as AppConstant from '../../constants/AppConstants';
// import { connect } from 'react-redux';



class Variable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: "",
            paramObj: null,
            parent: null,
            index: 1,
            selectedType: 'String',
            txtName: "",
            txtValue: "",
            eventData: null,
            param_type: null,
            isCreate: false,
            backUpdParamObj: null,
            tempObject: null,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let { paramObj, parent, index, eventData,param_type } = nextProps;
        if (nextProps.eventData === prevState.eventData) {
            return null;
        }
        return {
            eventData: eventData,
            param_type: param_type,
            paramObj: paramObj,
            parent: parent,
            index: index,
            selectedType: paramObj.name,
            tempObject: JSON.parse(JSON.stringify(paramObj))
        }
    }

    componentDidMount() {
        let { backUpdParamObj, paramObj } = this.state;
        if (backUpdParamObj === null && paramObj !== null) {
            backUpdParamObj = this.iterationCopy(paramObj);
            this.setState({ backUpdParamObj });
        }
       
    }

    doneEdit = () => {
        let { paramObj, selectedType, eventData,tempObject } = this.state;
        if(!this.checkInput(tempObject)) return;
        paramObj.code =  tempObject.code;
        paramObj.params = tempObject.params;
        if(paramObj.label === AppConstant.LABEL_STEP){
            paramObj.name = selectedType;
            if (paramObj.label === AppConstant.LABEL_STEP) {
                eventData.forEach(element => {
                    if (element.name === selectedType) {
                        let code = element.code;
                        let codeReturn = this.renderCode(code, paramObj);
                        paramObj.code = codeReturn;
                    }
                });
    
            }
        }else if(paramObj.label == AppConstant.LABEL_PARAM){
            paramObj.value =  tempObject.value;
            paramObj.name =  tempObject.name;
            paramObj.type =  tempObject.type;
            paramObj.code = paramObj.type + "-"+paramObj.name+"-"+ paramObj.value;
        }
       
        this.props.doneEdit(paramObj);
    }

    checkInput(tempObject){
        if(tempObject === null || typeof(tempObject) === 'undefined') return false;
        let isEmpty = false;
        if (tempObject.label === AppConstant.LABEL_STEP) {
          let array = tempObject.params;
          array.forEach(element => {
            if (element.value == '') {
              isEmpty = true;
            }
          });
          if (isEmpty) {
            window.alert("Please Insert All The Input Fields")
          } else {
            return true;
          }
        }
        else if (tempObject.label === AppConstant.LABEL_PARAM) {
          if (tempObject.value == '') {
            isEmpty = true;
          }
          else if (tempObject.name == '') {
            isEmpty = true;
          }
    
          if (isEmpty) {
            window.alert("Please Insert All The Input Fields")
          } else {
            return true;
          }
        }
    }

    renderCode(code, paramObj) {
        // change here
            let arr = paramObj.params;
            if (paramObj != null && typeof (paramObj) !== 'undefined') {
                if (arr != null && typeof (arr) !== 'undefined' && arr.length > 0) {
                        arr.forEach(element => {
                            if(element.name === AppConstant.PARAM_TYPE_ARRAY){
                                let value = element.value;
                                let arrValue = value.split(',');
                                let variable = '';
                                for(let i = 0; i < arrValue.length; i++){
                                    if(i ==0){
                                        variable += this.checkParameterType( element.type,arrValue[i]);
                                    }else{
                                        variable += ',' + this.checkParameterType( element.type,arrValue[i]);
                                    }
                                }
                                code = code.split(element.name).join(variable);
                            }else{
                            code = code.split(element.name).join(this.checkParameterType( element.type,element.value));
                            }
                        });
                }
    
            }
        return code;
    }

    checkParameterType(type,value) {
        if (type !== null && type !== 'undefined' && value !== null && value !== 'undefined') {
            if(type. toLowerCase() === AppConstant.PARAM_TYPE_STRING){
                return '"' + value + '"';
            }else {
                return value;
            }
        }
        return "";
    }

    closeForm = () => {
        let { paramObj, parent, index } = this.state;
        this.props.closeForm(paramObj, parent, index);
    }
    render() {
        let {tempObject } = this.state;
        return (
            <div className="variable-item">
                <label>{tempObject.label}</label>
                <div className="d-flex justify-content-start">
                    <div className="input-group mb-3">
                        {/*  */}
                        {this.renderOptions(tempObject.label)}
                        {tempObject.label === AppConstant.LABEL_STEP ?
                            this.renderInput(tempObject) : ''}
        
                        {tempObject.label === AppConstant.LABEL_PARAM ?
                            <input name="name" className="form-control" placeholder="Name" value={tempObject.name} onChange={this.onChange}/>
                            : ''}

                        {tempObject.label === AppConstant.LABEL_PARAM ?
                            <input name="value" className="form-control" placeholder="Value" value={tempObject.value} onChange={this.onChange} />
                            : ''}
                        {/*  */}
                    </div>
                </div>
                <div className="action-tab">
                    <button type="button" className="btn btn-success" onClick={this.doneEdit} >Save</button>
                    <button type="button" className="btn btn-danger" onClick={this.closeForm}>Discard</button>
                </div>
            </div>
        );
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        let { tempObject } = this.state;
        if(tempObject.label === AppConstant.LABEL_STEP){
            tempObject.params[name].value = target.value;
        }else {
            tempObject[name] = target.value;
        }
        this.setState({ tempObject });
    }

    renderInput(tempObject) {
        if (tempObject.label !== AppConstant.LABEL_STEP) return;
        if(tempObject === null) return;
        let result = null;
        let arr = null;
        arr = tempObject.params;
        if (tempObject != null && typeof (tempObject) !== 'undefined') {
            if (arr != null && typeof (arr) !== 'undefined' && arr.length > 0) {
                result = arr.map((item, index) => {
                    return (<input name={index} key={index} className="form-control" placeholder={item.name}
                        value={item.value}
                        onChange={this.onChange}
                    />);
                })
            }

        }
        return result;
    }

    changeSelectType = (e) => {
        e.preventDefault();
        var target = e.target;
        var name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        });
        let { backUpdParamObj, tempObject, eventData } = this.state;
        if (value !== null && typeof (value) !== 'undefined' && backUpdParamObj !== null && typeof (backUpdParamObj) !== 'undefined') {
            if (value == backUpdParamObj.name) {
                tempObject = this.iterationCopy(backUpdParamObj);
            } else {
                eventData.forEach(element => {
                    if (element.name === value) {
                        let tempEvent = this.iterationCopy(element);
                        let arr = [];
                        element.params.forEach(param => {
                            let tempParam = this.iterationCopy(param);
                            tempParam.value = tempParam.name;
                            arr.push(tempParam);
                        });
                        tempObject.name = tempEvent.name;
                        tempObject.params = arr;
                        tempObject.code = tempEvent.code;
                        this.setState({ tempObject });
                    }
                });
            }
        }
    }

    iterationCopy(src) {
        let target = {};
        for (let prop in src) {
            if (src.hasOwnProperty(prop)) {
                // if the value is a nested object, recursively copy all it's properties
                if (this.isObject(src[prop])) {
                    target[prop] = this.iterationCopy(src[prop]);
                } else {
                    target[prop] = src[prop];
                }
            }
        }
        return target;
    }
    isObject(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };

    renderOptions = (label) => {      
        let { eventData,param_type } = this.state;
        if (eventData === null) {
            return;
        }
        if (param_type === null) {
            return;
        }
        let options;
        if (label == AppConstant.LABEL_STEP) {
            options = eventData.map((item, index) =>
                <option
                    key={index}
                    value={item.name}
                >
                    {item.name}
                </option>
            );
            return (
                <select name="selectedType" value={this.state.selectedType} className="custom-select" onChange={this.changeSelectType} autoFocus>
                    {options}
                    {/* Extends more later */}
                </select>
            )
        } else {
            options = param_type.map((data, index) =>
                <option
                    key={index}
                    value={data}
                >
                    {data}
                </option>
            );
            return (
                <select name="type" value={this.state.tempObject.type} className="custom-select" onChange={this.onChange} autoFocus>
                    {options}
                    {/* Extends more later */}
                </select>
            )
        }

    }
}


export default Variable;



