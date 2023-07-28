const workspaceConfiguration = {
     collapse : false, 
     comments : true, 
     disable : true, 
     maxBlocks : Infinity, 
     trashcan : true, 
     horizontalLayout : true, 
     toolboxPosition : 'end',
     /*renderer: "zelos",*/
     grid : {
          spacing : 20, 
          length : 3, 
          colour : '#ddd', 
          snap : true
     }, 
     zoom : {
          controls : true, 
          wheel : true, 
          startScale : 1, 
          maxScale : 3, 
          minScale : 0.3, 
          scaleSpeed : 1.2
     }
};


export default workspaceConfiguration;