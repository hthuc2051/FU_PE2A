import React, { Component } from 'react';
import scriptObj from './sample.data.js';
import './style.css';
import { Variable } from '../index.js';
import * as Constant from '../../constants/AppConstants';
export default class Treeview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: scriptObj,
      editableNode: '',
      expectedResult: {
        type: 'String',
        value: 'admin',
        editMode: false,
      },
      appType: 'WEB'
    }
  }
  UNSAFE_componentWillMount() {
    let { appType } = this.props;
    this.setState({
      appType: appType,
    })
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
    this.setState({ parent });
  }

  makeEditable = (paramObj) => {
    this.setState({
      editableNode: JSON.parse(JSON.stringify(paramObj)),
    });
    paramObj.editMode = true;
    this.setState({ paramObj });
  }

  closeForm = (paramObj, parent, index) => {
    if (paramObj.name !== '' && paramObj.exportValue !== '') {
      paramObj.type = this.state.editableNode.type;
      paramObj.name = this.state.editableNode.name;
      paramObj.value = this.state.editableNode.value;

      paramObj.editMode = false;
      this.setState({ paramObj });
    }
    else {
      parent.splice(index, 1);
      this.setState({ parent });
    }
  }

  doneEdit = (paramObj) => {
    paramObj.editMode = false;
    this.setState({ paramObj });
  }

  toggleView = (ob) => {
    ob.showChildren = !ob.showChildren;
    this.setState({ ob });
  }

  addMember = (parent) => {
    let newChild = {
      type: '',
      name: '',
      value: '',
      showChildren: false,
      editMode: true,
      children: []
    }
    parent.push(newChild);
    this.setState({ parent });
  }

  addChild = (node) => {
    node.showChildren = true;
    node.children.push({
      type: '',
      name: '',
      value: '',
      showChildren: false,
      editMode: true,
      children: []
    });
    this.setState({ node });
  }

  nodeEditForm = (label, paramObj, parent, index) => {
    return (
      <div className="node node_edit" onClick={(e) => { e.stopPropagation() }}>
        <form className="node_edit_form">
          <Variable
            label={label}
            // paramObj={paramObj}
            appType='Web'
            parent={parent}
            index={index}
            doneEdit={this.doneEdit}
            closeForm={this.closeForm}
          />
        </form>
      </div>
    )
  }
  
  addChild = (node) => {
    node.showChildren = true;
    node.children.push({
      name: '',
      exportValue: '',
      showChildren: false,
      editMode: true,
      children: []
    });
    this.setState({ node });
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
              <i className="fa fa-plus" onClick={(e)=> { e.stopPropagation(); this.addChild('value') }}> </i>
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
        let normalMode = (
          <div className="node"><i className="fa fa-square-o"></i>{paramObj.type}-{paramObj.name}-{paramObj.value}
            <span className="actions">
              <i className="fa fa-pencil" onClick={(e) => { e.stopPropagation(); this.makeEditable(paramObj) }}></i>
              <i className="fa fa-close" onClick={(e) => { e.stopPropagation(); this.deleteNode(node, index) }}></i>
            </span>
          </div>
        );

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
            <i className="fa fa-plus" ></i>
            <span>Add New</span>
          </div>
        </li>
      </ul>
    );
  }

  getNodes = () => {
    if (typeof this.state.data.methodName === 'undefined') return null;
    let children = this.makeChildren(this.state.data.params);
    return children;
  }


  render() {
    let { expectedResult } = this.state;
    return (
      <div className="col-md-12 mb-4">
        <div className="group_dropdown_content">
          <div className="tree">
            <input type="text" className="form-control root" id="methodName" placeholder="Method's name" />
            <ul>
              <li>
                <div className="node"><i className="fa fa-minus-square-o"></i>Expected Result</div>
                <ul>
                  <li onClick={(e) => e.stopPropagation()}>
                    {(expectedResult.editMode) ? this.nodeEditForm(Constant.LABEL_EXPECTED_RESULT, expectedResult) : <div className="node">
                      <i className="fa fa-square-o"></i>
                      {expectedResult.type}-{expectedResult.value}
                      <span className="actions">
                        <i className="fa fa-pencil" onClick={(e) => { e.stopPropagation(); this.makeEditable(expectedResult) }}></i>
                      </span>
                    </div>}
                  </li>
                </ul>
              </li>
              {this.getNodes()}
            </ul>
          </div>
        </div>

      </div>
    );
  }
}