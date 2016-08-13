import React from 'react';
import Year from './Year';

const Calendar = React.createClass({

    
    prevYear(){
        if (this.props.minYear < this.props.selectedYear)
            this.props.selectYear(this.props.selectedYear - 1)
    },

    nextYear(){
        if (this.props.maxYear > this.props.selectedYear)
            this.props.selectYear(this.props.selectedYear + 1)
    },

    render()
    {
        if (this.props.data)
            return <div className="calendar">
                <Year locale={this.props.locale} reservationData={this.props.reservationData ? this.props.reservationData.filter(el=>el.date.year==this.props.selectedYear) : null } callback={this.props.callback} translations={this.props.translations}
                      year={this.props.selectedYear} prevYear={this.prevYear}
                      nextYear={this.nextYear}
                      data={this.props.data.filter(el=>el.year == this.props.selectedYear)[0]}/>
            </div>;
        return null
    }
});

export default Calendar;