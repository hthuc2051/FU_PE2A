import React, { Component } from 'react';
import './style.css';
import { Variable } from '../index.js';
import ModalConnection from './../../containers/HeadLecturerPage/modals/ModalConnection';
import * as Constant from '../../constants/AppConstants';

class TreeViewWeb extends Component {

  constructor(props) {
    super(props);
    this.txtMethodName = React.createRef();
    this.state = {
      data: '',
      editableNode: '',
      eventData: null,
      param_type: null,
      listInputParam: '',
      global_variable: null,
      listStep: '',
      question: {
        testcase: 'question1',
        code: '',
        point: 0,
      },
      selectTemplate: '',
      selectedTab: 0,
      isCreate: false,
      isOpenForm: false,
      isShowPublicString: false,
      isRequireOrder: true,
      template_arr: [],
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.question !== null) {
      if (document.getElementById('txtMethodName') !== null) {
        document.getElementById('txtMethodName').value = nextProps.question.data.methodName;
      }
      return {
        data: nextProps.question.data,
        question: nextProps.question,
        selectedTab: nextProps.selectedTab,
        selectTemplate: nextProps.question.data.template,
        global_variable: nextProps.global_variable,
        listStep: nextProps.question.data.params[0].children,
        eventData: nextProps.eventData,
        param_type: nextProps.param_type,
        isShowPublicString: nextProps.isShowPublicString,
        isRequireOrder: nextProps.isRequireOrder,
        template_arr: nextProps.template_arr
      }
    }
    // Ngược lại nếu có bất kì props nào thay đổi thì set lại state;
    return { eventData: nextProps.eventData }

  }

  addRoot = () => {
    let root = {
      name: '',
      exportValue: '',
      showChildren: true,
      editMode: true,
      children: []
    }

    this.setState({
      data: root
    });
  }

  handleEditChange = (e, paramObj) => {
    paramObj[e.target.name] = e.target.paramObj;
    this.setState({ paramObj });
  }

  deleteNode = (parent, index) => {
    parent.splice(index, 1);
    this.setState({ parent }, () => { this.saveTestCase(); this.saveGlobalVariable(); });
  }

  makeEditable = (paramObj) => {
    this.setState({
      editableNode: JSON.parse(JSON.stringify(paramObj)),
    });
    paramObj.editMode = true;
    this.setState({ paramObj });
  }

  closeForm = (paramObj, parent, index) => {
    let { isCreate } = this.state;
    if (typeof (paramObj) === undefined) { return; }
    paramObj.editMode = false;
    if (isCreate) {
      parent.splice(index, 1);

    }
    this.setState({ parent, isCreate: false });
    // }
  }

  doneEdit = (paramObj) => {
    let isEmpty = false;
    if (paramObj.label === Constant.LABEL_STEP) {
      let array = paramObj.params;
      array.forEach(element => {
        if (element.value == '') {
          isEmpty = true;
        }
      });
      if (isEmpty) {
        window.alert("Please Insert All The Input Fields")
      } else {
        paramObj.editMode = false;
        this.setState({ paramObj, isCreate: false }, () => { this.saveTestCase(); });
      }
    }
    else if (paramObj.label === Constant.LABEL_PARAM) {
      if (paramObj.value == '') {
        isEmpty = true;
      }
      else if (paramObj.name == '') {
        isEmpty = true;
      }

      if (isEmpty) {
        window.alert("Please Insert All The Input Fields")
      } else {
        paramObj.editMode = false;
        this.setState({ paramObj, isCreate: false }, () => { this.saveGlobalVariable(); });
      }
    }
  }

  saveGlobalVariable = () => {
    let getCode = document.getElementById('global_variable');
    if (getCode != null) {
      let code = getCode.textContent;
      let { global_variable } = this.state;
      global_variable.code = code;
      this.setState({ global_variable });
      this.props.onSaveGlobalVariable(global_variable);
    }
  }

  toggleView = (ob) => {
    ob.showChildren = !ob.showChildren;
    this.setState({ ob });
  }

  addMember = (parent, paramObj) => {
    console.log(parent)
    let newChild = null;
    if (parent[0].label === Constant.LABEL_STEP) {
      let sampleData = this.state.eventData[0];
      if (sampleData !== null && typeof (sampleData) !== 'undefined') {
        sampleData.params.forEach(element => {
          element.value = element.name;
        });
        newChild = {
          label: parent[0].label,
          name: sampleData.name,
          code: sampleData.code,
          params: JSON.parse(JSON.stringify(sampleData.params)),
          showChildren: false,
          editMode: true,
          children: []
        }
      }
    } else if (parent[0].label === Constant.LABEL_PARAM) {
      newChild = {
        label: parent[0].label,
        type: 'String',
        name: 'name',
        value: 'value',
        showChildren: false,
        editMode: true,
        children: []
      }
    }
    if(paramObj !== null && typeof(paramObj) !== 'undefined'){
       let index = parent.indexOf(paramObj);
        parent.splice(index + 1 ,0,newChild);
    }else{
      parent.push(newChild);
    }
    this.setState({ parent, isCreate: true });
  }


  nodeEditForm = (label, paramObj, parent, index) => {
    let { eventData, param_type } = this.state;
    return (
      <div className="node node_edit" onClick={(e) => { e.stopPropagation() }}>
        <form className="node_edit_form">
          <Variable
            label={label}
            paramObj={paramObj}
            appType='Web'
            parent={parent}
            index={index}
            eventData={eventData}
            param_type={param_type}
            doneEdit={this.doneEdit}
            closeForm={this.closeForm}
          />
        </form>
      </div>
    )
  }

  shortenNodeValue = (nodeValue) => {
    let newValue = '';
    if (nodeValue.length > 20) {
      newValue = nodeValue.substring(0, 20) + Constant.ETC;
    } else {
      newValue = nodeValue;
    }
    return newValue;
  }

  addChild = (node) => {
    node.showChildren = true;
    let newChild = null;
    if (node.label === Constant.LABEL_STEP) {
      let sampleData = this.state.eventData[0];
      if (sampleData !== null && typeof (sampleData) !== 'undefined') {
        sampleData.params.forEach(element => {
          element.value = element.name;
        });
        newChild = {
          label: node.label,
          name: sampleData.name,
          code: sampleData.code,
          params: sampleData.params,
          showChildren: false,
          editMode: true,
          children: []
        }
      }
    } else if (node.label === Constant.LABEL_PARAM) {
      newChild = {
        label: node.label,
        type: 'String',
        name: 'name',
        value: 'value',
        showChildren: false,
        editMode: true,
        children: []
      }
    }
    node.children.push(newChild);
    this.setState({ node, isCreate: true });
  }
  makeChildren = (node) => {
    if (typeof node === 'undefined' || node.length === 0) return null;
    let children;
    children = node.map((paramObj, index) => {

      let item = null;

      // A node has children and want to show her children
      if (paramObj.children.length > 0 && paramObj.showChildren) {
        let babies = this.makeChildren(paramObj.children);
        let normalMode = (
          <div className="node">
            <i className="fa fa-minus-square-o"></i>{paramObj.name}
            <span className="actions">
              <i className="fa fa-pencil" onClick={(e) => { e.stopPropagation(); this.makeEditable(paramObj) }}></i>
              <i className="fa fa-close" onClick={(e) => { e.stopPropagation(); this.deleteNode(node, index) }}></i>
            </span>
          </div>
        )
        item = (
          <li key={index} onClick={(e) => { e.stopPropagation(); this.toggleView(paramObj) }}>
            {(paramObj.editMode) ? this.nodeEditForm(Constant.LABEL_PARAM, paramObj, node, index) : normalMode}
            {babies}
          </li>
        )
      }
      // A node has children but don't want to showing her children
      else if (paramObj.children.length > 0 && !paramObj.showChildren) {
        item = (
          <li key={index} onClick={(e) => { e.stopPropagation(); this.toggleView(paramObj) }}>
            <div className="node"><i className="fa fa-plus-square-o"></i>{paramObj.name}</div>
          </li>
        );
      }

      // A node has no children 
      else if (paramObj.children.length === 0) {
        let normalMode = null;
        if (paramObj.code !== null && typeof (paramObj.code) !== 'undefined') {
          // Allow to add children
          if (paramObj.code.indexOf(Constant.BODY_POSITION) > -1) {
            normalMode = (
              <div className="node"><i className="fa fa-square-o"></i>
                {paramObj.label === Constant.LABEL_STEP ?
                  //paramObj.type  +" - " + paramObj.params +" - " + paramObj.value
                  this.renderParam(paramObj)
                  :
                  paramObj.type + " - " + paramObj.name + " - " + this.shortenNodeValue(paramObj.value)
                }
                <span className="actions">
                  <i className="fa fa-angle-down" onClick={(e) => { e.stopPropagation(); this.addChild(paramObj) }}> </i>
                  <i className="fa fa-plus" onClick={(e) => { e.stopPropagation(); this.addMember(node,paramObj) }}> </i>
                  <i className="fa fa-pencil" onClick={(e) => { e.stopPropagation(); this.makeEditable(paramObj) }}></i>
                  <i className="fa fa-close" onClick={(e) => { e.stopPropagation(); this.deleteNode(node, index) }}></i>
                </span>
              </div>
            );
          } else { // NOT allow to add children
            normalMode = (
              <div className="node"><i className="fa fa-square-o"></i>
                {paramObj.label === Constant.LABEL_STEP ?
                  //paramObj.type  +" - " + paramObj.params +" - " + paramObj.value
                  this.renderParam(paramObj)
                  :
                  paramObj.type + " - " + paramObj.name + " - " + this.shortenNodeValue(paramObj.value)
                }

                <span className="actions">
                  <i className="fa fa-plus" onClick={(e) => { e.stopPropagation(); this.addMember(node,paramObj) }}> </i>
                  <i className="fa fa-pencil" onClick={(e) => { e.stopPropagation(); this.makeEditable(paramObj) }}></i>
                  <i className="fa fa-close" onClick={(e) => { e.stopPropagation(); this.deleteNode(node, index) }}></i>
                </span>
              </div>
            );
          }

        }
        item = (
          <li key={index} onClick={(e) => e.stopPropagation()}>
            {(paramObj.editMode) ? this.nodeEditForm(Constant.LABEL_PARAM, paramObj, node, index) : normalMode}
          </li>
        );
      }
      return item;
    });

    return (
      <ul className="child-ul">
        {children}
        <li>
          <div className="node add_node" onClick={(e) => { e.stopPropagation(); this.addMember(node) }}>
            <i className="fa fa-plus add-sibling" ></i>
            <span>Add New</span>
          </div>
        </li>
      </ul>
    );
  }


  getChildCode(step, spaceIndex, indexCount) {
    let baseSpace = 20;
    let code = step.code;
    let child = step.children;
    let tempCode = step.code;
    let margin = baseSpace * spaceIndex;
    let children = null;
    if (child === null && typeof (child) === 'undefined') return;
    children = child.map((element, index) => {
      let item = '';
      if (element.children.length > 0) {
        let babies = this.getChildCode(element, spaceIndex + 1);
        item = babies;
      }
      else {

        item = (<span key={index} style={{ marginLeft: baseSpace * (spaceIndex + 1) }} >{element.code}<br /></span>);
      }
      return item;
    });
    if (tempCode.indexOf(Constant.BODY_POSITION) > -1) {
      let temp = tempCode.split(Constant.BODY_POSITION);
      if (spaceIndex === 1) {
        code = (<span key={indexCount} style={{ marginLeft: margin }}>
          {temp[0]}<br />
          {children}
          <span style={{ marginLeft: margin }}>{temp[1]}</span>
        </span>);
      } else {
        code = (<span key={indexCount} style={{ marginLeft: margin }}>
          {temp[0]}<br />
          {children}
          <span style={{ marginLeft: margin }}>{temp[1]}</span><br />
        </span>);
      }
    }
    else {
      code = (<span key={indexCount} style={{ marginLeft: baseSpace * spaceIndex }} >{tempCode}</span>);
    }

    if (code !== null && typeof (code) !== 'undefined') {
      return code;
    }
  }

  renderParam(paramObject) {
    let strReturn = paramObject.name;
    let paramArr = paramObject.params;
    if (paramArr !== null && typeof (paramArr) !== 'undefined') {
      paramArr.map((item, index) => {
        strReturn += " - " + this.shortenNodeValue(item.value);
      })
    }
    return strReturn;
  }

  getNodes = (param) => {
    if (typeof this.state.data.methodName === 'undefined') return null;
    let children = this.makeChildren(param);
    return children;
  }

  editMethodName = (e) => {
    let method = e.target.value.replace(/\s/g, '').trim();
    let { data } = this.state;
    if (method !== '') {
      data.methodName = method;
      this.setState({ data }, () => { this.saveTestCase(); });
    }
  }

  createParam = (item, index) => {
    if (item !== null && typeof (item) !== 'undefined') {
      let param = item.value;
      // type = string
      if (item.type.toLowerCase() === Constant.PARAM_TYPE_STRING) {
        param = '"' + param + '"';
      }
      return (
        <span key={index} >{item.type} {item.name} = <span className="codeParam">{param};</span><br /></span>
      )
    }
  }

  saveTestCase = () => {
    let getCode = document.getElementById('codevalue');
    if (getCode != null) {
      let code = getCode.textContent;
      let { question } = this.state;
      question.code = code;
      this.setState({ question });
      this.props.onSave(this.state.question);
    }
  }

  createStep(step, index) {
    let code = this.getChildCode(step, 1, index + 1);
    return (
      <code key={index} className="codeLine" id="temp">
        {code}<br />
      </code>
    );
  }


  handlePoint = (e) => {
    let point = e.target.value;
    let { question } = this.state;
    question.point = point;
    this.setState({ question })
  }

  handleOrder = (e) => {
    let order = e.target.value;
    let { question } = this.state;
    question.order = order;
    this.setState({ question })
  }

  changeTemplate = (e) => {
    var target = e.target;
    var name = target.name;
    this.setState({
      [name]: target.value
    });
    let { selectedTab } = this.state;
    this.props.onchangeTemplate(target.value, selectedTab);
  }

  renderTemplate = (template_arr) => {
    let { selectTemplate } = this.state;
    if (template_arr === null || typeof (template_arr) === 'undefined') return;
    if (template_arr.length > 0) {
      let result = (
        <select value={selectTemplate} name="selectTemplate" onChange={this.changeTemplate}>
          {template_arr.map((item, index) => {
            return (<option value={item} key={index}>{item}</option>)
          })}
        </select>)
      return result;
    }
  }

  render() {
    let { selectTemplate, question, data, global_variable, isShowPublicString, isRequireOrder, template_arr } = this.state;
    return (
      <div className="col-md-12">
        <div className="group_dropdown_content">
          <div className="tree">
            <form className="form-inline">
              {question.point === 0 ?
                <p> Point <input type="text" name="txtPoint" className="form-control" value='' onChange={(e) => this.handlePoint(e)} /></p>
                :
                <p> Point <input type="text" name="txtPoint" className="form-control" value={question.point} onChange={(e) => this.handlePoint(e)} /></p>
              }
              {isRequireOrder ?
                question.order === 0 ?
                  <p> Order <input type="text" name="txtOrder" className="form-control" value='' onChange={(e) => this.handleOrder(e)} /></p>
                  :
                  <p> Order <input type="text" name="txtOrder" className="form-control" value={question.order} onChange={(e) => this.handleOrder(e)} /></p>
                : ''}
            </form>
            <input type="text" id="txtMethodName" value={question.data.methodName} className="form-control root" placeholder="Method's name" onChange={(e) => { e.stopPropagation(); this.editMethodName(e) }} />
            <ul>
              <li onClick={(e) => { e.preventDefault(); this.toggleView(global_variable) }}>
                <div className="node">{global_variable ? <i className="fa fa-minus-square-o" /> : <i className="fa fa-plus-square-o" />}
                  {Constant.LABEL_GLOBAL_VARIABLE}
                  <span className="actions">
                    <i className="fa fa-plus" onClick={(e) => { e.stopPropagation(); this.addChild(global_variable) }}> </i>
                  </span>
                </div>
                {global_variable ? this.makeChildren(global_variable.children) : ''}
              </li>

              <li onClick={(e) => { e.preventDefault(); this.toggleView(data.params[0]) }}>
                <div className="node">{data.params[0].showChildren ? <i className="fa fa-minus-square-o" /> : <i className="fa fa-plus-square-o" />}
                  {Constant.LABEL_STEP}
                  <span className="actions">
                    <i className="fa fa-plus" onClick={(e) => { e.stopPropagation(); this.addChild(data.params[0]) }}> </i>
                  </span>
                </div>
                {data.params[0].showChildren ? this.makeChildren(data.params[0].children) : ''}
              </li>

              <li />
            </ul>
          </div>
          <div className="codePage" id="code" name="code" >
            <p>
              TEMPLATE:
                {this.renderTemplate(template_arr)}
            </p>
            <code className="codeLine" id="global_variable">
              <p>{global_variable ? global_variable.children.map((item, index) => this.createParam(item, index)) : ''}</p>
            </code>
            <code className="codeLine" id="codevalue">
              {isShowPublicString ? "public" : ''} void <span className="methodName">{this.state.data.methodName}</span>()&#123;<br />
              {this.state.listStep.map((item, index) => this.createStep(item, index))}
              &#125;
            </code>
          </div>

        </div>

      </div>
    );
  }

}


export default TreeViewWeb;