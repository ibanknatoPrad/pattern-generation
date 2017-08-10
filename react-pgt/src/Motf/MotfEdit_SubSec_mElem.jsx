import React from 'react';

import Motf_lists from './plain-js/Motf_lists';
var _ = require('lodash');

import WgActionLink from '../Wg/WgActionLink';

import imgDustbin from './asset/dustbin-100.png';


function prop3cells(nameStr){

    return [
	(<td className="prop" key={nameStr+"prop"}>{nameStr}</td>),
	(<td className="valu" key={nameStr+"valu"}>val</td>),
	(<td className="more" key={nameStr+"more"}>...</td>)
    ];
}

function MotfEdit_SubSec_propsTable(props){

    const propsPairs = _.chunk( Motf_lists.GenericPropertyArrangement[props.groupKey], 2);

    return (
	<table><tbody>
	  {
	      propsPairs.map( (pair, i) => {
		  return (
		      <tr key={i}>
			{_.concat(prop3cells(pair[0]), prop3cells(pair[1]))}
		      </tr>
		  );
	      })
	  }
	</tbody></table>
    );


    
}

function MotfEdit_SubSec_mElemContracted(props) {
    return(
	<div className={"mElem MotfEdit_SubSec_mElemContracted" + (props.isFocus ? " focus" : "")}>
	  <div className="name">{props.ObjectTypeDetails.fullName + " " + props.mElem.PGTuid}</div>

	  <WgActionLink
	     name={"Expand"}
	     onClick={props.hofFnSetOvrExpanded(true)}
	     />

	  <WgActionLink
	     name={"Delete"}
	     onClick={props.deleteElem}
	     />

	</div>
    );
}


function MotfEdit_SubSec_mElemExpanded(props) {
    const expLvl = props.expandLevel;
    return(
	<div className={"mElem MotfEdit_SubSec_mElemExpanded" + (props.isFocus ? " focus" : "")}>
	  <div className="bg-gradient"></div>
	  <div className="content">
	    <div className="name">{props.ObjectTypeDetails.fullName + " " + props.mElem.PGTuid}</div>

	    <WgActionLink
	     name={expLvl < 4 ? "Expand" : "Contract"}
	     onClick={props.hofFnSetOvrExpanded(expLvl < 4)}
	     />

	  ...LeftSide: 
	  {props.mElem.left}

	  <img className="dustbin"
	       src={imgDustbin}
	       onClick={props.deleteElem}
	       alt=""/>

	    
	    {/* Table 1. Placement & Size */}
	    <div className="tableHeading pos_size">Placement & Size
	      <MotfEdit_SubSec_propsTable groupKey="pos_size" />
	    </div>

	    {/* Table 2. Appearance */}
	    {(expLvl >= 2) && <div className="tableHeading">Appearance
		   <MotfEdit_SubSec_propsTable groupKey="appearance" />
	    </div>}

	    {/* Table 3. Repetition */}
	    {(expLvl >= 3) && <div className="tableHeading">Repetition
		    <MotfEdit_SubSec_propsTable groupKey="repetition" />
	    </div>}

	    {/* Table 4. More Properties */}
	    {(expLvl >= 4) && <div className="tableHeading">More Properties
		    <MotfEdit_SubSec_propsTable groupKey="more" />
	    </div>}
	  </div>
	</div>
    );
}


class MotfEdit_SubSec_mElem extends React.PureComponent {


    constructor() {
	super();
	this.state = {
	    expandOverride: undefined // 'undefined' = no override, '0' - fully contracted, '4' - fully expanded
	};
	this.hofFnSetOvrExpanded = this.hofFnSetOvrExpanded.bind(this);
    }

    hofFnSetOvrExpanded(isExpanded){
	const TS = this;
	return function (){
	    TS.setState({
		expandOverride: isExpanded ? 4 : 0
	    });
	};
    };

    componentWillReceiveProps(nextProps){

	//clear any overridden expansion settings, if globally adjusted
	if(nextProps.expand.expandCount !== this.props.expand.expandCount){
	    this.setState({
		expandOverride: undefined
	    });
	}
    }
    
    render(){
	const mElem = this.props.mElem;
	const EO = this.state.expandOverride;
	const expandLevel = EO !== undefined ? EO : this.props.expand.expandLevel;
	const isFocus = this.props.isFocus;

	const ObjectTypeDetails = _.find(Motf_lists.ObjectTypes, function(o) { return o.DatH_name === mElem.shape;});

	const handleMElemClick = null;
	
	// Expanded M-Element
	if (expandLevel >= 1){
	    return (
		<MotfEdit_SubSec_mElemExpanded
		   ObjectTypeDetails={ObjectTypeDetails}
		   mElem={mElem}
		   deleteElem={this.props.deleteElem}
		   isFocus={isFocus}
		   onMElemClick={handleMElemClick}
		   expandLevel={expandLevel}
		   hofFnSetOvrExpanded={this.hofFnSetOvrExpanded}		       
		   />
	    );
	    // Contracted M-Element
	}else{
	    return (
		<MotfEdit_SubSec_mElemContracted
		   ObjectTypeDetails={ObjectTypeDetails}
		   mElem={mElem}
		   deleteElem={this.props.deleteElem}
		   isFocus={isFocus}
		   onMElemClick={handleMElemClick}
		   hofFnSetOvrExpanded={this.hofFnSetOvrExpanded}
		   />
	    );
	}
    }
}

export default MotfEdit_SubSec_mElem;
