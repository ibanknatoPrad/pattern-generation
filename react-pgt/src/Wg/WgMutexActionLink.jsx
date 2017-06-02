import React from 'react';

import WgActionLink from '../Wg/WgActionLink';



class WgMutexActionLink extends React.PureComponent {

    constructor(props) {
	super(props);
	this.state = {
	    enabledArray: props.initalEnabledArray
	};
    }

    defaultHandleEnabledClickUpdate(indexClicked){
	if(this.props.equityTestingForEnabled !== undefined){return;}
	const qtyActs = this.props.actions.length;

	this.setState({
	    enabledArray: Array(qtyActs).fill(null).map( (el, i)=>{return i !== indexClicked;})
	});
    }

    render() {
	
	let enabledArray = this.state.enabledArray;
	if(this.props.equityTestingForEnabled){
	    const eTest = this.props.equityTestingForEnabled;
	    enabledArray = eTest.representedValuesArray.map( (el)=>{return el !== eTest.currentValue;});
	}

	return (
	    <div className={"WgMutexActionLink " + this.props.className}>
	      {this.props.name}
	      {
		  this.props.actions.map( (action, i) => {
		      return (
			  <WgActionLink
			     key={i}
			     name={action.name}
			     onClick={() => {
				 action.cb();
				 this.defaultHandleEnabledClickUpdate(i);
			    }}
			    enabled={enabledArray[i]}
			    />
		      );
		  })
	      }
	    </div>
	);
    }
}


export default WgMutexActionLink;
