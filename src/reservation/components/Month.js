import React from 'react';
import Week from './Week';

const Month = React.createClass({

        render(){
            let weeks = [];
            for (let i = -1; i < 5; i++)
                weeks.push(<Week reservationData={this.props.reservationData} key={i} translations={this.props.translations} locale={this.props.locale} callback={this.props.callback} number={i} data={this.props.data ? this.props.data : null} month={this.props.number} year={this.props.year}/>)
            
            return <table className="month">
                <thead>
                <tr>
                    <th className="monthName" colSpan="7">{this.props.translations[this.props.locale].monthes[this.props.number-1]} {this.props.year}</th>
                </tr>
                <tr className="week weekName">
                    <th className="dayName day">{this.props.translations[this.props.locale].monday}</th>
                    <th className="dayName day">{this.props.translations[this.props.locale].tuesday}</th>
                    <th className="dayName day">{this.props.translations[this.props.locale].wednesday}</th>
                    <th className="dayName day">{this.props.translations[this.props.locale].thursday}</th>
                    <th className="dayName day">{this.props.translations[this.props.locale].friday}</th>
                    <th className="dayName day">{this.props.translations[this.props.locale].saturday}</th>
                    <th className="dayName day">{this.props.translations[this.props.locale].sunday}</th>
                </tr>
                </thead>
                <tbody>
                {weeks}
                </tbody>
            </table>
        }
    });

export default Month;