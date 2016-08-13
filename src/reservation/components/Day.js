import React from 'react';

const Day = React.createClass({

    render()
    {
        return <td
            onClick={()=>this.props.callback({day: this.props.day, month: this.props.month, year: this.props.year})}
            className={"day clickable " + (this.props.curMonth ? "curMonth ": "otherMonth ") + (this.props.reservationData ? "busy" : "free")}>
            <span className="dayNumber">{this.props.number}</span></td>
    }
});

export default Day;