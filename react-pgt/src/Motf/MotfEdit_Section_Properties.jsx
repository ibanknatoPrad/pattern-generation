import React from 'react';
//import ReactDOM from 'react-dom';

import {WgButton, WgButtonExpanding} from '../Wg/WgButton';
import WgCheckbox from '../Wg/WgCheckbox';

import MotfEdit_SubSec_mElem from './MotfEdit_SubSec_mElem';

//import scrollToComponent from 'react-scroll-to-component';
//var scrollToElement = require('scroll-to-element');

import closeIcon from './../asset/close-36.png';

class MotfEdit_Section_Properties extends React.PureComponent {

    constructor() {
	super();
	this.state = {
	    expandLevel: 1, // 0-none... 1-[Pos & Size] 2-[Appearance] 3-[Repetition] 4-[More]
	    expandCount: 0 // increment upon every change...
	};
	this.hofHandleSetExpandClick = this.hofHandleSetExpandClick.bind(this);
    }

    hofHandleSetExpandClick(expand_lvl){
	const TS = this;
	return function (){
	    TS.setState({
		expandLevel: expand_lvl,
		expandCount: TS.state.expandCount + 1
	    });
	};
    }


    componentDidUpdate(){

	/*
	const TS = this;


	const tesNode = ReactDOM.findDOMNode(this.refs[this.props.FS_UI.selectionUID]);
//	if (some_logic){
	    window.scrollTo(tesNode.offsetTop, 0);
//	}

	

	scrollToElement(this.refs[this.props.FS_UI.selectionUID], {
	    offset: 0,
	    ease: 'out-bounce',
	    duration: 1500
	});
*/

	/*
	setTimeout(function(){

	    scrollToComponent(TS.refs[TS.props.FS_UI.selectionUID], {
		//	    offset: 1000,
		align: 'top',
		duration: 500
	    });
	    console.log("componentDidUpdate", TS.props.FS_UI.selectionUID, TS.refs[TS.props.FS_UI.selectionUID]);


	}, 5000);
	*/
    }
    
    render(){
	this.refs = {a: 0};
	return (
	    <div>
	      <div className="properties">
		<div className="freezeHeading">
		  Motif Elements: Properties
		</div>
		<div className="scrollableContent">
		  
		  {this.props.Motf.Elements.map( (mElem, index) => {
		      return <MotfEdit_SubSec_mElem
				    key={mElem.PGTuid}
				    mElem={mElem}
				    addRef={(node)=>{this.refs[mElem.PGTuid]=node;}}
				    expand={this.state}
				    isFocus={mElem.PGTuid === this.props.FS_UI.selectionUID}
				    deleteElem={()=>{
					this.props.handleEditingMotfChange({
					    Elements: {$splice: [[index,1]]}
					});
				    }}
				    setSelectedMElem={(PGTuid)=>{
					const cnt = this.props.FS_UI.chgOrigin_Properties_count + 1;
					this.props.handleMotfUIStateChange(
					    {fabricSelection: {
						selectionUID: {$set: PGTuid},
						chgOrigin_Properties_count: {$set: cnt}
					    }}
					);
				    }}
				    modifyElem={(propKey, value)=>{
					const nValue = value;
					this.props.handleEditingMotfChange({
					    Elements: {
						[index]: {
						    [propKey]: {$set: nValue}
						}
					    }
					});
				    }}
			  />;
		  })}

		</div>
	      </div>



	      
	      {/* Underneath the Table - the Buttons section... */}
	      <div className="propertiesButtons">
		<WgButton
		   name="Contract All"
		   buttonStyle={"small"}
		   onClick={this.hofHandleSetExpandClick(0)}
		   />

		
		<WgButtonExpanding
		   name="Expand All"
		   className="expandAll"
		   onClick={this.hofHandleSetExpandClick(4)}
		   renderExpanded={ closeFn =>{
		       // inline function for the content of the expanded menu...
		       // neat - or bloated code??
		       const EXL = this.state.expandLevel;
		       const hofExpandClick = lvl => {
			   return this.hofHandleSetExpandClick(EXL >= lvl ? (lvl-1) : lvl);
		       };
		       return (
			   <div>
			     <div>
			       <h1>Groups shown:</h1>

			       <img className="closeIcon"
				    src={closeIcon}
				    alt=""
				    onClick={closeFn}/>

			       <WgCheckbox
				  name="Placement & Size"
				  value={EXL >= 1}
				  onChange={hofExpandClick(1)}/>

			       <WgCheckbox
				  name="Appearance"
				  value={EXL >= 2}
				  onChange={hofExpandClick(2)}/>

			       <WgCheckbox
				  name="Appearance"
				  value={EXL >= 3}
				  onChange={hofExpandClick(3)}/>

			       <WgCheckbox
				  name="More Properties"
				  value={EXL >= 4}
				  onChange={hofExpandClick(4)}/>
			       
			     </div>
			   </div>
		       );
		   }}/>

		<WgButton
		   name="Sweep"
		   buttonStyle={"small"}
		   />
		<WgButton
		   name="Render"
		   buttonStyle={"small"}
		   />
		<WgButton
		   name="Render ×10"
		   buttonStyle={"small"}
		   />
	      </div>
	    </div>
	);
    }
}

export default MotfEdit_Section_Properties;
