import React from 'react';
import update from 'immutability-helper';

// Underlying data
import DatH from './DatH/DatH';

import {CpotSampleData} from './DatH/SampleData_Cpot';
import {GridSampleData} from './DatH/SampleData_Grid';
import {PlotSampleData} from './DatH/SampleData_Plot';
import {MotfSampleData} from './DatH/SampleData_Motf';
import {PattSampleData} from './DatH/SampleData_Patt';
import {CfunSampleData} from './DatH/SampleData_Cfun';

//Custom Components
import Toolbox from './Toolbox';
import Background from './Back/Background';
import ToastManager from './ToastManager';

//Other utilities...
import Plot_CacheManager from './Plot/plain-js/Plot_CacheManager';


class PGT_App extends React.PureComponent {

    constructor() {
	super();
	this.state = {
	    PGTobjARRAYS: {
		"cpot": CpotSampleData.arr,
		"grid": GridSampleData.arr,
		"plot": PlotSampleData.arr,
		"motf": MotfSampleData.arr,
		"patt": PattSampleData.arr,
		"cfun": CfunSampleData.arr
	    },
	    UI: {
		"cpot": {},
		"grid": {},
		"plot": {},
		"motf": {},
		"patt": {},
		"opts": {}
	    },
	    DensityImgCache: {
		"paneCfg": {},
		"plot": {},
		"pain": {}
	    }
	};

	this.latestUI = this.state.UI;

	// these declarations seem to be recommended in React examples, but passing the bound function as a prop
	// directly also works...
	this.handleUIStateChange = this.handleUIStateChange.bind(this);
	this.handlePGTobjARRAYSChange = this.handlePGTobjARRAYSChange.bind(this);
	this.handlePlotCacheChange = this.handlePlotCacheChange.bind(this);
	this.handleToastMsg = this.handleToastMsg.bind(this);
    }

    handlePGTobjARRAYSChange(dataCategory, changeType, details){
	// dataCategory is the string "cpot", "grid", "plot" etc...

	const oldArrs = this.state.PGTobjARRAYS;

	// This function call returns an updated Array...
	const dataUpdate = DatH.immutUpdateAllArrays(oldArrs, dataCategory, changeType, details);
	this.setState({
	    PGTobjARRAYS: dataUpdate.newArrays
	});
	return dataUpdate.newPGTobjUid;
    }

    handleUIStateChange($update){

	/*
	 if I have this function 'handleUIStateChange' calculate new state as a function of 'this.state',
	 then after multiple calls (between the Component itself Updating), only the most recent call makes an impact.

	 Responses to events can seem to fail to occur in the Software.

	 This is due to the fact that 'this.state' only consolidates (i.e. actually changes) when the the component,
	 updates, so after the first call (within a response to handling one single event) stale state information
	 starts to be used.

	 to get round this, I am declaring some new 'member data' for the component/class, 'latestUI'. This will
	 accumulate all change requests. I cannot work out if doing this is somehow an anti-pattern for React.

	 */
	this.latestUI = update(this.latestUI, $update);
	this.setState({
	    UI: this.latestUI
	});
    }

    handlePlotCacheChange(event, data){


	if(event === "paneCfg"){
	    /*
	     data={
	       splitMode
	       paneDims
	       dims
	       paneDimsAR
	     }

	     if data["dims"] is changed, this is a window resize, scrap everything.

	     if data["splitMode"] is changed, a different pane config is selected right now, keep the old data
	     in this case, use paneDimsAR.

	     However, if data["paneDimsAR"] is different for the same data["splitMode"], scrap everthing? (different Drawing)

	     */
	    
	    this.setState({
		DensityImgCache: {paneCfg: {$set: data}}
	    });
	}

    }
    
    handleToastMsg(toastDetailsObj){
	const count = this.state.toastCount || 0;
	this.setState({
	    toastCount: count+1,
	    latestToast: toastDetailsObj
	});
    }
    
    render() {
	return (
	    <div className="PGT_App">
	      {/* 1. Backgrounds */}
	      <Background
		 PGTobjARRAYS={this.state.PGTobjARRAYS}
		 onPGTobjARRAYSChange={this.handlePGTobjARRAYSChange} // this will soon be GONE (plots uses, saturation vals)! 
		 UIState={this.state.UI}
		 onUIStateChange={this.handleUIStateChange} // this will soon be GONE (plots uses, timings/stats )! 
		 onPaneConfigChange={this.handlePlotCacheChange.bind(null,"paneCfg")}
		 />
	      
	      {/* 2. Floating (draggable) Toolbox */}
	      <Toolbox
		 PGTobjARRAYS={this.state.PGTobjARRAYS}
		 onPGTobjARRAYSChange={this.handlePGTobjARRAYSChange}
		 UIState={this.state.UI}
		 onUIStateChange={this.handleUIStateChange}
		 onToastMsg={this.handleToastMsg}
		 />
	      <ToastManager
		 latestToast={this.state.latestToast}
		 toastCount={this.state.toastCount}
		 />
	    </div>
	);
    }
}


export default PGT_App;
