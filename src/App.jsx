import React from 'react';
import _ from 'lodash';

class App extends React.Component {
  constructor(){
    super();
    this.state = {      
      data: data, // array from the bottom of this script
      orderBy: "plant_name",
      order: "asc",
      dropdownActive: true
    };
    this.doOrderBy = this.doOrderBy.bind(this);
    this.doOrder = this.doOrder.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  toggle(e){
    e.preventDefault();
    let isActive = this.state.dropdownActive;
    isActive = !isActive;
    this.setState({dropdownActive: isActive});
  }
  doOrderBy(e){
    e.preventDefault();
    const newOrderBy = e.target.getAttribute('data-value');
    this.setState({orderBy : newOrderBy});
  }
  doOrder(e){
    e.preventDefault();
    const newOrder = e.target.getAttribute('data-value');
    this.setState({order : newOrder});
  }
  render() {    
    const orderBy = this.state.orderBy;
    const order = this.state.order;
    let sorted = this.state.data;
    
    sorted = _.orderBy(sorted, (item) => {
      return item[orderBy]
    }, order);     
    
    const items = sorted.map((item)=>{
      return <Plant data={ item } key={ item.id } orderBy={ this.state.orderBy } />
    }); 
    
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <h1 className="text-center">React - sortable list</h1>
            <div className="clearfix">
              <Dropdown toggle={ this.toggle } 
                dropdownActive={ this.state.dropdownActive } 
                doOrderBy={ this.doOrderBy }
                doOrder={ this.doOrder }
                orderBy={ this.state.orderBy }
                order={ this.state.order } />
            </div>
            { items } 
          </div>          
        </div>                
      </div>
    )
  }
}

class Dropdown extends React.Component {    
  // buttons not a dropdown
  render() { 
    
    const { dropdownActive, toggle, orderBy, order, doOrderBy, doOrder } = this.props;
    const checked = <span className="glyphicon glyphicon-ok"></span>;
    const input = names; // array from the bottom of this script
    const output = names.map((item)=>{
        return <li><a href="#" onClick={ doOrderBy }  data-value={ item[0]}>{item[1] } { orderBy === item[0] ? checked : null }</a></li>
    });      
          
    return (
      <div className={ dropdownActive ? "dropdown  pull-right open" : "dropdown pull-right " }>
        <a className="btn btn-info" onClick={ toggle } href="#">
          Sort items by
          <span className="caret"></span>
        </a>
        <ul className="dropdown-menu">
          { output }
          <li className="divider"></li>
          <li><a href="#" onClick={ doOrder } data-value="asc">ascendind { order === "asc" ? checked : null }</a></li>
          <li><a href="#" onClick={ doOrder } data-value="desc">descending { order === "desc" ? checked : null }</a></li>
        </ul>
      </div>  
   )   
  }
}

class Plant extends React.Component {
  render(){
    const { data, orderBy } = this.props;
    const input = categories; // array from the bottom of this script
    // const output = input.map((item)=>{
    //   return <div><small className={ orderBy === item ? "active" : null }>{item}:</small> {data[item] }</div>
    // });
    return (    
      <div className="media">
        <h4 className="media-heading">
          <span className={ orderBy === "plant_name" ? "active" : null }>{ data.plant_name } </span> 
          <span className={ orderBy === "plant_type" ? "active" : null }>{ data.plant_type }</span>
        </h4>      
        <div><small>location:</small> { data.location }</div>
      </div>     
    )
  }
}


const names = [["plant_name", "plant_name"],["plant_type", "plant_type"],["location","location"]]
const categories = ["plant_type","location"]
const data = [{"id":1, "plant_name": "banana", "plant_type": "berry", "location": "tree"},
{"id":2, "plant_name": "blueberry", "plant_type": "berry", "location": "bush"},
{"id":3, "plant_name": "carrot", "plant_type": "root/tuber", "location": "root"},
{"id":4, "plant_name": "apple", "plant_type": "fruit", "location": "tree"},
// {"id":5},
// {"id":6},
// {"id":7},
// {"id":8},
// {"id":9},
// {"id":10}
];

export default App;