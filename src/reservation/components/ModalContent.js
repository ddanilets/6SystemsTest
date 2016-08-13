import React from 'react';
const ModalContent = React.createClass({

    getInitialState(){
        return {
            isReserving: false,
            user: "",
            startTime: "",
            endTime: "",
            reason: "",
            comment: ""
        }
    },

    addReservation(){
        const {user, startTime, endTime, reason, comment} = this.state;

        if (user.length > 0 && startTime.length > 0 && endTime.length > 0 && reason.length > 0) {
            if (new Date("01.01.2016 " + startTime) < new Date("01.01.2016 " + endTime))
                if (new Date("01.01.2016 09:00") < new Date("01.01.2016 " + startTime) && new Date("01.01.2016 18:00") > new Date("01.01.2016 " + endTime)) {
                    this.props.reserve({
                        date: {
                            day: this.props.date.day,
                            month: this.props.date.month,
                            year: this.props.date.year
                        },
                        reservation: [{
                            user: user,
                            startTime: startTime,
                            endTime: endTime,
                            reason: reason,
                            comment: comment
                        }]
                    });
                }
                else
                    alert(this.props.translations.errors.timeError);
            else
                alert(this.props.translations.errors.timeError)
        }
        else
            alert(this.props.translations.errors.emptyFields)
    },

    changeUser(e){
        this.setState({user: e.target.value})
    },
    changeStartTime(e){
        this.setState({startTime: e.target.value})
    },
    changeEndTime(e){
        this.setState({endTime: e.target.value})
    },
    changeReason(e){
        this.setState({reason: e.target.value})
    },
    changeComment(e){
        this.setState({comment: e.target.value})
    },

    cancel(){
        this.setState(this.getInitialState())
    },

    render(){
        let data = [];
        if (this.props.data)
            data = this.props.data.reservation.map((el, key)=><tr key={key}>
                <td>{el.user}</td>
                <td>{el.startTime}</td>
                <td>{el.endTime}</td>
                <td>{el.reason}</td>
                <td>{el.comment}</td>
            </tr>);
        return <div>
            <div className="header">
                <h1>
                    {this.props.translations.modalHeader + (this.props.date.day > 9 ? this.props.date.day : "0" + this.props.date.day) + "." + (this.props.date.month > 9 ? this.props.date.month : "0" + this.props.date.month) + "." + this.props.date.year}
                </h1>
            </div>
            <div className="modal-close-btn" onClick={this.props.closeModal}></div>
            <table className="modal-table table table-striped">
                <thead>
                <tr>
                    <th>
                        {this.props.translations.user}
                    </th>
                    <th>
                        {this.props.translations.startTime}
                    </th>
                    <th>
                        {this.props.translations.endTime}
                    </th>
                    <th>
                        {this.props.translations.reason}
                    </th>
                    <th>
                        {this.props.translations.comment}
                    </th>
                </tr>
                </thead>
                <tbody>
                {this.props.data ? data : null}
                </tbody>
            </table>
            {this.props.isAddingAllowed ? <div className="add-group">
                <button className="btn btn-primary"
                        onClick={()=>this.setState({isReserving: true})}>{this.props.translations.reserve}</button>
                {this.state.isReserving ? <div>
                    <label htmlFor="user">{this.props.translations.user}</label>
                    <input className="form-control" type="text" id="user" onChange={this.changeUser}/>
                    <label htmlFor="startTime">{this.props.translations.startTime}</label>
                    <input className="form-control" type="text" id="startTime" onChange={this.changeStartTime}/>
                    <label htmlFor="endTime">{this.props.translations.endTime}</label>
                    <input className="form-control" type="text" id="endTime" onChange={this.changeEndTime}/>
                    <label htmlFor="reason">{this.props.translations.reason}</label>
                    <input className="form-control" type="text" id="reason" onChange={this.changeReason}/>
                    <label htmlFor="comment">{this.props.translations.comment}</label>
                    <input className="form-control" type="text" id="comment" onChange={this.changeComment}/>
                    <button className="btn btn-primary"
                            onClick={this.addReservation}>{this.props.translations.confirm}</button>
                    <button className="btn btn-danger cancelButton"
                            onClick={this.cancel}>{this.props.translations.cancel}</button>
                </div> : null}
            </div> : null}
        </div>
    }
});

export default ModalContent;