import React from 'react';
import Month from './Month';

const Year = React.createClass({
    render(){
        if (!this.props.data)
            return null;
        let monthes = this.props.data.monthes.map((el, key)=><Month
            reservationData={this.props.reservationData ? this.props.reservationData.filter(month=>month.date.month == el.month) : null}
            locale={this.props.locale} translations={this.props.translations} key={key} number={el.month} data={el.days}
            total={el.total} callback={this.props.callback} year={this.props.year}/>);
        return <div>
            <div className="yearHeader"><i className="fa-chevron-left fa"
                                           onClick={this.props.prevYear}></i><h1>{this.props.year}</h1><i
                className="fa-chevron-right fa" onClick={this.props.nextYear}></i></div>
            {monthes}
        </div>
    }
});

export default Year;