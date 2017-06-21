import React from 'react';

//libraries
import Draggable from 'react-draggable';


//custom
import TabStrip from './TabStrip'; // this needs to GO

import WgTabbedSection from './Wg/WgTabbedSection';

import MainTab_CpotView from './Cpot/MainTab_CpotView';
import MainTab_Grid from './Grid/MainTab_Grid';
import MainTab_Plot from './Plot/MainTab_Plot';


class Toolbox extends React.PureComponent {

    constructor() {
	super();
	this.state = {
	    toolboxSize: 1, /*options ae 1,2,3*/
	    selectedTabIndex: 4,//default Tab selection
	    tabsEnabled: true
	};
    }
    
    
    handleToolboxSizeChange(newSize){
	this.setState({
	    toolboxSize: newSize,
	    tabsEnabled: (newSize === 1) /* There may be other conditions for disabling main strip...*/
	});
    }

    
    render() {
	const toolboxDivClasses = "BeigeWindow Toolbox size-" + this.state.toolboxSize;
	return (
	    <Draggable handle=".handle">
	      <div className={toolboxDivClasses}>
		<div className="Title-Strip handle">
		  Re-Implementing the Toolbox in React...
		</div>



		<WgTabbedSection
		   className="previewOptions"
		   enabled={this.state.tabsEnabled}
		   tabSelectedIndex={this.state.selectedTabIndex}
		   // The function below is worth rewriting for every component instance
		   // it sets the specific state variable associated with the tab choice
		   onTabClick={ new_i => {
		       if (new_i === this.state.selectedTabIndex){return;}
		       this.setState({
			   selectedTabIndex: new_i
		       });
		   }}
		  items={
		      [
			  {// Tab 1 - Colour Pots
			      name: "Colour Pots",
			      renderJSX: ()=>{
				return (
				    <MainTab_CpotView					    
				       cpotArray={this.props.DataArrays['cpot']}
				       onCpotChange={(arg1, arg2)=>{this.props.onDataChange("cpot", arg1, arg2);}}
				      onToolboxSizeChange={this.handleToolboxSizeChange.bind(this)}
				      />
				);
			      }

			  },{// Tab 2 - Colouring Functions
			      name: "Colouring Functions",
			      renderJSX: ()=>{
				  return(
				      // Colouring Functions
				      <span> ere...  </span>
				  );
			      }

			  },{// Tab 3 - Motifs
			      name: "Motifs",
			      renderJSX: ()=>{
				  return(
				      <span> Motifs JSX to go here... </span>
				  );
			      }

			  },{// Tab 4 - Grids
			      name: "Grids",
			      renderJSX: ()=>{
				  return(
				    <MainTab_Grid
				       gridArray={this.props.DataArrays['grid']}
				       onGridChange={(arg1, arg2)=>{this.props.onDataChange("grid", arg1, arg2);}}
				      UI={this.props.UIState['grid']}
				      setGridUIState={($chg)=>{this.props.onUIStateChange({"grid": $chg});}}
				      />
				  );
			      }

			  },{// Tab 5 - Density Plots
			      name: "Density Plots",
			      renderJSX: ()=>{
				  return (
				      <MainTab_Plot
					 plotArray={this.props.DataArrays['plot']}
					 onPlotChange={(arg1, arg2)=>{this.props.onDataChange("plot", arg1, arg2);}}
					UI={this.props.UIState['plot']}
					setPlotUIState={($chg)=>{this.props.onUIStateChange({"plot": $chg});}}
					/>
				  );
			      }

			  },{// Tab 6 - Density Paintings
			      name: "Density Paintings",
			      renderJSX: ()=>{
				  return(
				      <span> Density Paintings JSX to go here... </span>
				  );
			      }

			  },{// Tab 7 - Patterns
			      name: "Patterns",
			      renderJSX: ()=>{
				  return(
				      <span> Patterns JSX to go here... </span>
				  );
			      }

			  },{// Tab 8 - Examples
			      name: "Examples",
			      renderJSX: ()=>{
				  return(
				      <span> Examples JSX to go here... </span>
				  );
			      }

			  },{// Tab 9 - Options
			      name: "Options",
			      renderJSX: ()=>{
				  return(
				      <span> Options JSX to go here... </span>
				  );
			      }

			  },{// Tab 10 - Tutorial
			      name: "Tutorial",
			      renderJSX: ()=>{
				  return(
				      <span> Tutorial JSX to go here... </span>
				  );
			      }
			  }
		      ]
		  }
		/>








		{/*
		
		<TabStrip items={
			      [
				  {a: "Colour Pots", i: 0},
				  {a: "Colouring Functions", i: 1},
				  {a: "Motifs", i: 2},
				  {a: "Grids", i: 3},
				  {a: "Density Plots", i: 4},
				  {a: "Density Paintings", i: 5},
				  {a: "Patterns", i: 6},
				  {a: "Examples", i: 7},
				  {a: "Options", i: 8},
				  {a: "Tutorial", i: 9}
			      ]
			  }
			  selected={this.state.selectedTabIndex}
			  enabled={this.state.tabsEnabled}
			  onTabSelect={(i) => {this.setState({
			      selectedTabIndex: i
		  });}}
		  />

		  <div className="Tab-Body">
		    {
			//Determine which tab body to show...
			(() => {
			    switch (this.state.selectedTabIndex) {

			    case 0:
				// Colour Pots
				return (
				    <MainTab_CpotView					    
				       cpotArray={this.props.DataArrays['cpot']}
				       onCpotChange={(arg1, arg2)=>{this.props.onDataChange("cpot", arg1, arg2);}}
				      onToolboxSizeChange={this.handleToolboxSizeChange.bind(this)}
				      />
				);
				
			    case 1:
				// Colouring Functions
				return <span> ere...  </span>;

			    case 2:
				// Motifs
				return <span> Motifs here...  </span>;

			    case 3:
				return (
				    <MainTab_Grid
				       gridArray={this.props.DataArrays['grid']}
				       onGridChange={(arg1, arg2)=>{this.props.onDataChange("grid", arg1, arg2);}}
				      UI={this.props.UIState['grid']}
				      setGridUIState={($chg)=>{this.props.onUIStateChange({"grid": $chg});}}
				      />
				);

			    case 4:
				// Density Plots
				return (
				    <MainTab_Plot
				       plotArray={this.props.DataArrays['plot']}
				       onPlotChange={(arg1, arg2)=>{this.props.onDataChange("plot", arg1, arg2);}}
				      UI={this.props.UIState['plot']}
				      setPlotUIState={($chg)=>{this.props.onUIStateChange({"plot": $chg});}}
				      />
				);

			    case 5:
				return <span> Density Paintings here...  </span>;

			    case 6:
				return <span> Patterns here...  </span>;
			    case 7:
				return <span> Examples here...  </span>;
			    case 8:
				return <span> Options here...  </span>;
			    case 9:
				return <span> Tutorial here...  </span>;
			    default:
				return <span> unhandled tab clicked in </span>;
				
			    }
			})()
		    }
	    </div>
*/}

	    </div>
	</Draggable>
	);
    }
}

export default Toolbox;
