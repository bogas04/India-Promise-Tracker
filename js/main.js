'use strict'

function stringifyDate (timestamp) {
  var date = new Date(timestamp);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear();
}
var data = [
  {
    name: 'Completed Projects',
    data: [
      { startDate: Date.now() - 1000*60*60*24*106, endDate: Date.now(), title: "Fix bla 1", desc: "Lorem ipsum bla bla", url: "http://google.com" },
      { startDate: Date.now() - 1000*60*60*24*50, endDate: Date.now(), title: "Fix bla 2", desc: "Lorem ipsum bla bla", url: "http://google.com" },
      { startDate: Date.now() - 1000*60*60*24*103, endDate: Date.now(), title: "Fix bla 3", desc: "Lorem ipsum bla bla", url: "http://google.com" },
      { startDate: Date.now() - 1000*60*60*24*103, endDate: Date.now(), title: "Fix bla 4", desc: "Lorem ipsum bla bla", url: "http://google.com" },
      { startDate: Date.now() - 1000*60*60*24*103, endDate: Date.now(), title: "Fix bla 5", desc: "Lorem ipsum bla bla", url: "http://google.com" },
      { startDate: Date.now() - 1000*60*60*24*108, endDate: Date.now(), title: "Fix bla 6", desc: "Lorem ipsum bla bla", url: "http://google.com" },
    ]
  },
  {
    name: 'In Progress',
    data: [
      { startDate: Date.now() - 1000*60*60*24*95, title: "Fix this that 1", desc: "Lorem ipsum bla bla", url: "http://google.com" },
      { startDate: Date.now() - 1000*60*60*24*88, title: "Fix this that 2", desc: "Lorem ipsum bla bla", url: "http://google.com" },
      { startDate: Date.now() - 1000*60*60*24*97, title: "Fix this that 3", desc: "Lorem ipsum bla bla", url: "http://google.com" },
      { startDate: Date.now() - 1000*60*60*24*96, title: "Fix this that 4", desc: "Lorem ipsum bla bla", url: "http://google.com" },
    ]
  },
  {
    name: 'Yet to Start',
    data: [
      { title: "Fix this that and bla 1", desc: "Lorem ipsum bla bla", url: "http://google.com" },
      { title: "Fix this that and bla 2", desc: "Lorem ipsum bla bla", url: "http://google.com" },
      { title: "Fix this that and bla 3", desc: "Lorem ipsum bla bla", url: "http://google.com" },
      { title: "Fix this that and bla 4", desc: "Lorem ipsum bla bla", url: "http://google.com" },
    ]
  },
];

var Table = React.createClass({
  getInitialState: function () {
    return { keyword:  '' };
  },
  changeView: function(e) {
    this.setState({keyword: e.currentTarget.value});
  },
  byKeyword: function(d) {
    return d.title.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1 ||
      d.desc.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1 ||
        (d.startDate && stringifyDate(d.startDate).toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1) ||
          (d.endDate && stringifyDate(d.endDate).toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1);
  },
  render: function() {
    return (React.createElement('div', null
      ,React.createElement('input', { className: 'form-control', onChange: this.changeView, placeholder: 'Enter search keyword' })
      ,React.createElement('table', { className: 'table table-hover table-bordered' }
        ,React.createElement('thead', null
          ,React.createElement('tr', null
            ,React.createElement('th', null, 'Work')
            ,this.props.data[0].startDate && React.createElement('th', null, 'Start Date')
            ,this.props.data[0].endDate && React.createElement('th', null, 'End Date')))
        ,React.createElement('tbody', null
          ,this.props.data.filter(this.byKeyword).map(d => React.createElement('tr', { key : Math.random() }
            ,React.createElement('td', null, React.createElement('a', { href: d.url }, d.title), React.createElement('p', null, d.desc))
              ,d.startDate && React.createElement('td', null, stringifyDate(d.startDate))
              ,d.endDate && React.createElement('td', null, stringifyDate(d.endDate))))))));
  }
});

var Knob = React.createClass({
  render: function () {
    return (
      React.createElement('div', { className: 'col-md-4 text-center' }
      ,React.createElement('h3', { className: 'text-uppercase' }, this.props.text)
      ,React.createElement('input', { 
        className: 'knob', 
        type: 'text', 
        'data-readonly': 'true', 
        'data-min': this.props.min, 
        'data-max': this.props.max,
        'data-fgcolor': this.props.value > this.props.max/2 ? 'green' : this.props.value > this.props.max/3 ? 'orange' : 'red',
        value: this.props.value
      }))
    );
  }
});

React.render(
  React.createElement('div', { className: 'container-fluid' }
  ,React.createElement('div', null
   ,React.createElement(Knob, { text: 'Promises Fullfilled', min: 0, max: data.reduce((v, d) => v += d.data.length, 0), value: data[0].data.length })
   ,React.createElement(Knob, { text: 'Total Promises', min: 0, max: data.reduce((v, d) => v += d.data.length, 0), value: data.reduce((v, d) => v += d.data.length, 0)})
   ,React.createElement(Knob, { text: 'Promises in progress', min: 0, max: data.reduce((v, d) => v += d.data.length, 0), value: data[1].data.length })
   ,data.map(d => React.createElement('div', { className: 'col-md-' + 12/data.length }
     ,React.createElement('h1', null, d.name)
     ,React.createElement(Table, { data: d.data }))))),document.getElementById('react-app'));

$('.knob').knob();
