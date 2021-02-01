import React, { Component } from 'react';
import './side-calendar.css';

const monthName = [
  'January', 'February', 'March',
  'April', 'May', 'June',
  'July', 'August', 'September',
  'October', 'November', 'December'
];

class DrawMonth extends Component {
  constructor(props) {
    super(props);
    var postDateObj = props.postDate;
    this.monthDays = postDateObj.days;
    this.postDate = parseInt(postDateObj.date, 10);
    this.blanks = postDateObj.blanks;
    this.year = postDateObj.year;
    this.month = monthName[postDateObj.month-1];
    this.category = postDateObj.category;
  }

  generateHeader() {
    return (<div className="month-header">
             <div className="month-name">{this.month} {this.year}</div>
             <div className="weekdays-header">
               <div>S</div>
               <div>M</div>
               <div>T</div>
               <div>W</div>
               <div>T</div>
               <div>F</div>
               <div>S</div>
             </div>
            </div>
   ); 
  }

  drawDate(date) {
    var dateClass = date.selected ? `date-selected date-selected-${date.category}` : 'date-unselected';
    return <div key={date.ndx} className="date-cell">
             <div className="date">{date.dt}</div>
             <div className={dateClass}></div>
           </div>
  }

  buildMonthRowArray(dates) {
    var nRows = Math.ceil(dates.length / 7);
    var rows = [];
    for (let i = 0; i < nRows; i++) { rows.push([]); }
    var rowNdx = 0;
    dates.forEach((d, ndx) => {
      var selected = d === this.postDate;
      if (ndx > 0 && ndx % 7 === 0) rowNdx++;
      rows[rowNdx].push((d === -1 ? { ndx: ndx, dt: '' } : { ndx: ndx, dt: d, selected: selected, category: this.category } ));
    });
    return rows;
  }

  monthRows(dates) {
    var rows = this.buildMonthRowArray(dates);
    return <div className="month-grid">
             {rows.map((row, key) => {
               return <div key={key} className="month-row">
                      {row.map(date => { return this.drawDate(date); })}
                      </div>
             })}
           </div>
    
  }

  generateCalendar() {
    var blanks = this.blanks;
    var monthDays = this.monthDays;
    var dates = [];
    for (let i = 0; i < blanks; i++) dates.push(-1);
    for (let i = 1; i <= monthDays; i++) dates.push(i);
    var html = this.monthRows(dates);
    return html;

  }

  render() {
    return <div className="month-wrapper">
	     <div className="draw-month">
             {this.generateHeader()}
             {this.generateCalendar()}
             </div>
           </div>
  }
}

export default DrawMonth;

