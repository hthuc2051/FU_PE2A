import React, { Component } from 'react';
class ModalEditPracticalExam extends Component {

    // code: 'public void testcase(){Driver.findViewById("txtUsername").clear();Driver.findViewById("txtUsername") .sendKey("NguyenVanA");Driver.findViewById("txtPassword").clear();Driver.findViewById("txtPassword") .sendKey("p4ssw0rd");assertEquals("admin",question1("NguyenVanA","p4ssw0rd"));}'

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            statusCode: false,
            editObj: null,
            database: null,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps === prevState) {
            return null;
        }
        return {
            isOpenForm: nextProps.isOpenForm,
            editObj: nextProps.editObj,
        }
    }

    onCloseDetails = () => {
        let { editObj, database } = this.state;
        this.props.onCloseDetails(editObj, database);
    }

    isOpenForm = (state) => {
        this.props.isOpenForm(state);
    }

    handelChange = (e) => {
        let name = e.target.name;
        let targetName = name.split('_');
        let value = e.target.value;
        let { editObj } = this.state;
        editObj[targetName[0]][targetName[1]] = value;
        console.log(editObj);
        this.setState({ editObj });
    }

    handelChangeDataBase = (e) => {
        this.setState({ [e.target.name]: e.target.files[0] });
        console.log(this.state.database);
    }

    render() {
        let { isOpenForm, editObj } = this.state;
        let { database } = this.props;
        let modalClass = isOpenForm ? "modal" : "modal fade";
        let modalStyle = isOpenForm ? "block" : "";
        return (
            <div className={modalClass} style={{ display: modalStyle }} id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">


                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">
                                Database Connection
                         </h5>
                            <button onClick={(e) => { e.preventDefault(); this.isOpenForm(false) }} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        {editObj ?
                            <div className="modal-body">

                                <form>
                                    <h3><span className="badge badge-info">Online</span></h3>
                                    <div className="form-group">
                                        <input type="text" name="online_url" value={editObj.online.url} className="form-control" onChange={(e) => { e.preventDefault(); this.handelChange(e) }} placeholder="Database connection string..." />
                                    </div>
                                    <div className="form-row">
                                        <div className="col-7">
                                            <input type="text" name="online_username" value={editObj.online.username} className="form-control" placeholder="Username" onChange={(e) => { e.preventDefault(); this.handelChange(e) }} />
                                        </div>
                                        <div className="col">
                                            <input type="password" name="online_password" value={editObj.online.password} className="form-control" placeholder="Password" onChange={(e) => { e.preventDefault(); this.handelChange(e) }} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            :
                            ''
                        }
                        {editObj ?
                            <div className="modal-body">
                                <form>
                                    <h3><span className="badge badge-info">Offline</span></h3>
                                    <div className="form-group">
                                        <input type="text" onChange={(e) => { e.preventDefault(); this.handelChange(e) }} name="offline_url" value={editObj.offline.url} className="form-control" id="txtPracticalExamCode" placeholder="Database connection string..." />
                                    </div>
                                    <div className="form-row">
                                        <div className="col-7">
                                            <input type="text" onChange={(e) => { e.preventDefault(); this.handelChange(e) }} name="offline_username" value={editObj.offline.username} className="form-control" placeholder="Username" />
                                        </div>
                                        <div className="col">
                                            <input type="password" onChange={(e) => { e.preventDefault(); this.handelChange(e) }} name="offline_password" value={editObj.offline.password} className="form-control" placeholder="Password" />
                                        </div>
                                    </div>
                                </form>

                                <div className="form-group" style={{marginTop:10}}>
                                    <label htmlFor="txtPracticalExamCode"><span className="badge badge-info">Database Script</span>{database ? <span className="badge badge-warning">{database.name}</span> : ''}</label>
                                    <input type="file" name="database" className="form-control-file border" onChange={(e) => { e.preventDefault(); this.handelChangeDataBase(e) }} />
                                </div>
                            </div>
                            :
                            ''
                        }
                        <div className="modal-footer">
                            <button type="button" onClick={(e) => { e.preventDefault(); this.onCloseDetails() }} className="btn btn-success">Save</button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default ModalEditPracticalExam;

