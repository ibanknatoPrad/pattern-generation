import React from 'react';

import WgBoxie from '../Wg/WgBoxie';

class Plot_Section_Histogram extends React.PureComponent {
    
    render(){
	
	const handleUIStateChange = this.props.handleUIStateChange;
	
	return (
	    <WgBoxie className="Histogram" name="Histogram" boxieStyle={"small"} >

	      <div className="Hblock hist">d3 histogram</div>
	      <br/>
	      <div className="Hblock conv">mini graph</div>

	    </WgBoxie>
	);
    }
}

export default Plot_Section_Histogram;
