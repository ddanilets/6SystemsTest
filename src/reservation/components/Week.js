import React from 'react';
import Day from './Day';

const Week = React.createClass({

    render()
    {
        let days = [];
        for (let i = 0; i < 7; i++) {
            let n = new Date(this.props.year, this.props.month-1).getDay() == 0 ? 0 : 1;
            let day = ((this.props.number+n) * 7) - new Date(this.props.year, this.props.month-1).getDay() + i + 2;
            let date = new Date(this.props.year, this.props.month-1, day);
            days.push(<Day
                reservationData={this.props.reservationData ? this.props.reservationData.filter(el=>el.date.day == date.getDate())[0] : null}
                translations={this.props.translations}
                locale={this.props.locale}
                key={i}
                data={this.props.data.filter(el=>el.day==day)[0]}
                day={date.getDate()}
                number={date.getDate()} callback={this.props.callback} month={date.getMonth()+1}
                year={date.getFullYear()} curMonth={date.getMonth()+1==this.props.month}/>)
        }
        return <tr className="week">
            {days}
        </tr>
    }
});

export default Week;