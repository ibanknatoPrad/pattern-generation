import React from 'react';

// generic project widgets
import WgTable from '../Wg/WgTable';
import WgButton from '../Wg/WgButton';
import WgTabbedBoxie from '../Wg/WgTabbedBoxie';
import WgActionLink from '../Wg/WgActionLink';


import Plot_util from './plain-js/Plot_util';

//these two are for Thumbnail generation...
import Plot_render from './plain-js/Plot_render2';
import util from '.././plain-js/util';

import Plot_Popout from './Plot_Popout';
import Plot_Section_FormulaBar from './Plot_Section_FormulaBar';

import Plot_Section_Histogram from './Plot_Section_Histogram';
import Plot_Section_ZoomRotateTranslate from './Plot_Section_ZoomRotateTranslate';
import Plot_Section_PreviewOptions from './Plot_Section_PreviewOptions';
import Plot_Section_PointsetPreview from './Plot_Section_PointsetPreview';



class MainTab_Plot extends React.PureComponent {

    constructor() {
	super();
	//the state here is purely UI-display-state
	// than user-settings-state,  held at a higher level, gets different treatment...
	this.state = {
	    previewFeaturesTabSelected: 0,
	    showExtraWindow: null
	    /*
	     'showExtraWindow' - options
	     1 - Syntax & Inbuilt functions
	     2 - Formula Designer
	     3 - Zoom & Rotate -> More
	     */

	};
	//References to DOM elements:
	this.canvasEl_ThumbRefs={};	
    }

    componentDidMount(){
	// set state of parent component...
	this.props.fn.defaultUIStateConfiguration({
	    previewActive: false,
	    colouringFunction: 1,
	    plotResolution: 1,
	    pointsQuantity: 0,
	    pointsProminenceFactor: 2,
	    hideUnderlyingDensity: false,
	    showContours: false,
	    quantityContours: 6,
	    overlayAxesScale: false
	});
	this.plot_WgTable_rerenderAllThumbs();
    }

    componentDidUpdate(){
	this.plot_WgTable_rerenderAllThumbs();
    }
    
    rowClassingFn(Plot){
	const isComplex = Plot_util.check_eqn_type(Plot.formula) === "cplx";
	const isInvalid = Plot_util.check_eqn_type(Plot.formula) === "invalid";
	return (isComplex ? "pink" : "") + (isInvalid ? "invalid" : "");
    }

    //regenerate all plot thumbs upon update
    plot_WgTable_rerenderAllThumbs(){
	console.log("All thumbs regen...");
	const timer = new Date();
	const thumbElRefs = this.canvasEl_ThumbRefs;
	const plotArray = this.props.PGTobjArray;

	Object.keys(thumbElRefs).forEach(function(key, index) {
	    const plot_uid = Number(key); //the dictionary has keys of type Number
	    const canv_el = thumbElRefs[plot_uid];
	    const Plot = util.lookup(plotArray, "uid", plot_uid);
	    
	    const thumb_img = Plot_render.GenerateImageData(
		Plot.formula,
		55, //w
		55, //h
		1 // res
	    );

	    var ctx = canv_el.getContext('2d');
	    ctx.putImageData(thumb_img, 0, 0);
	});

	this.canvasEl_ThumbRefs = {};//reset for next time...
	console.log("Took:", (new Date() - timer));
    }

    
    plot_WgTableColumns(){
	return ([
	    {
		heading: "#",
		renderCellContents: (plot, i, rowIsSelected)=>{return (i+1);}
	    },{
		heading: "Formula",
		renderCellContents: (plot, i, rowIsSelected)=>{return (
		    <input className="blue-cell"
			   value={plot.formula} 
			   onChange={event =>{
			       this.props.fn.handleModifySelPGTobj(
				   {formula: {$set: event.target.value}}
			       );
		      }}
		      />);}
	    },{
		heading: "Thumb.",
		renderCellContents: (plot, i, rowIsSelected)=>{
		    return (		
			<canvas
			className={"plot-thumb uid-"+plot.uid}
			width={55}
			height={55}
			style={{background:"cyan"}}
			   ref={ (el) => {this.canvasEl_ThumbRefs[plot.uid] = el;}}
			  />
		    );}
	    },
	]);
    }

    
    render(){

	if(this.props.UI.selectedRowIndex === undefined){return null;}
	const Plot_i = this.props.PGTobjArray[this.props.UI.selectedRowIndex];

	return (

	    <div className="MainTab_Plot">

	      
	      {/* 1.  Formula Bar */}
	      <Plot_Section_FormulaBar
		 Plot_i={Plot_i}
		 handleSelPlotChange={this.props.fn.handleModifySelPGTobj}
		 rowClassingFn={this.rowClassingFn}
		 />


	      
	      {/* 2.  Table, and accompanying controls (i.e. buttons beneath) */}
	      <div className="tableWithButtonsZone">
		<WgTable
		   selectedRowIndex={this.props.UI.selectedRowIndex}
		   onRowSelectedChange={(i)=>{this.props.fn.handleRowSelectedChange(i);}}
		  rowRenderingData={this.props.PGTobjArray}
		  columnsRendering={this.plot_WgTableColumns()}
		  rowClassingFn={this.rowClassingFn}
		  />

		  <div className="mainButtons">		  
		    <WgActionLink
		       name={"Formula Designer"}
		       onClick={()=>{this.setState({showExtraWindow: "formulaDesigner"});}}
		      enabled={true}
		      />
		    
		    <WgButton
		       name="Add"
		       buttonStyle={"small"}
		       onClick={()=>{
			   const i = this.props.UI.selectedRowIndex;
			   const new_grid = Plot_util.newPlot();
			   this.props.onPGTobjArrayChange("add", {index: i, new_object: new_grid});
		       }}
		       enabled={true}
		      />
		      
		    <WgButton
		       name="Delete"
		       buttonStyle={"small"}
		       onClick={this.props.fn.handleDeleteSelPGTobj}
		       enabled={this.props.PGTobjArray.length > 1}
		       />
		  </div>
		  
	      </div>



	      
	      {/* 3.  Histogram */}
	      <Plot_Section_Histogram
		 />


	      
	      {/* 4.  Third Column */}
	      <div className="thirdColumnZone">		  

		
		{/* 4.1.  The Zoom + Rotate + Translate controls section... */}
		<Plot_Section_ZoomRotateTranslate
		   onClickMore={()=>{this.setState({showExtraWindow: "ZR-More"});}}
		  />

		  
		{/* 4.2.  Preview Features ( = 'preview options' & 'pointset preview'  */}
		<WgTabbedBoxie
		   className="PreviewFeatures"
		   tabbedBoxieStyle={"small"}
		   tabSelectedIndex={this.state.previewFeaturesTabSelected}
		   // The function below is worth rewriting for every component instance
		   // it sets the specific state variable associated with the tab choice
		   onTabClick={ new_i => {
		       if (new_i === this.state.previewFeaturesTabSelected){return;}
		       this.setState({
			   previewFeaturesTabSelected: new_i
		       });
		   }}
		  items={
		      [
			  {
			      name: "Preview Options",
			      renderJSX: ()=>{
				  return(
				      <Plot_Section_PreviewOptions
					 UI={this.props.UI}
					 handleUIStateChange={this.props.fn.handleUIStateChange}
					 />
				   );
			      }
			  },{
			      name: "Pointset Preview",
			      enabled: this.props.UI.previewActive,
			      renderJSX: ()=>{
				  return(
				      <Plot_Section_PointsetPreview
					 UI={this.props.UI}
					 handleUIStateChange={this.props.fn.handleUIStateChange}
					 />
				  );
			      }
			  }
		      ]
		  }
		/>
		
		</div>


		{/* 5.  Popout window (it will render conditionally).  */}
		{
		    this.state.showExtraWindow !== null &&
			<Plot_Popout
		    popoutType={this.state.showExtraWindow}
		    handleClose={()=>{this.setState({showExtraWindow: null});}}
			/>
		}
	      
	    </div>

	);
    }
    
}

export default MainTab_Plot;
