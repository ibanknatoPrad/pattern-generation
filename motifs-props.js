var motifs_props = {

    //top-left cartesian by default...
    current_placement_style: [
	{ // Array - 0 
	    originX: 'left',
	    originY: 'left'
	},
	{ // Array - 1
	    originX: 'center',
	    originY: 'center'
	},
	{ // Array - 2
	    originX: 'center',
	    originY: 'center'
	},
    ],

    /*
      shape_type: rect, ellipse, triangle, hexagon, line, circle, square

     */
    AddShape: function(shape_type, props_TLWH){

	// create a rectangle object
	var new_shape = undefined;
	if(shape_type == "shap1"){//circle
	    new_shape = new fabric.Ellipse({
		left: props_TLWH.left,
		top: props_TLWH.top,
		fill: 'red',
		rx: (props_TLWH.width/2),
		ry: (props_TLWH.height/2)
	    });

	}else if(shape_type == "shap2"){//rectangle
	    new_shape = new fabric.Rect();

	}else if(shape_type == "shap3"){//triangle
	    new_shape = new fabric.Triangle();

	}else if(shape_type == "shap4"){//hexagon
	    new_shape = new fabric.Rect();

	}else if(shape_type == "shap5"){//line
	    new_shape = new fabric.Line();
	    new_shape.set({
		strokeWidth: 1,
		stroke: 'black'
	    });

	}

	if((shape_type == "shap2")||(shape_type == "shap3")||(shape_type == "shap5")){
	    new_shape.set({
		left: props_TLWH.left,
		top: props_TLWH.top,
		fill: 'blue',
		width: props_TLWH.width,
		height: props_TLWH.height
	    });
	}

	// "add" rectangle onto canvas
	var canvas = motifs_edit.Fabric_Canvas;
	canvas.add(new_shape);

	var new_uid = DM.Motif_newElement({
	    shape: shape_type,
	    left: new_shape.left,
	    top: new_shape.top,
	    width: new_shape.width,
	    height: new_shape.height,
	    fill: new_shape.fill,
	    stroke: new_shape.stroke,
	    rx: new_shape.rx,
	    ry: new_shape.ry,
	});

	new_shape.PGTuid = new_uid;

    },
    
    DeleteShape: function(){

    },
    
    OnScreenAdjust: function(){

    },
    
    ExternalAdjust: function(){},



    RenderMotif: function(){

    },
    
    DerenderMotif: function(){

    }

};
