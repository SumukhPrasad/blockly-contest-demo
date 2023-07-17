"use client"


import { useState } from "react";
import { BlocklyWorkspace } from 'react-blockly';
import styles from '../../styles/blockly.module.sass'

function BlocklyEditor() {
  let [xml, setXml] = useState();

  let toolboxConfiguration = {
     "kind": "categoryToolbox",
     "contents": [
       {
         "kind": "category",
         "name": "Control",
         "contents": [
           {
             "kind": "block",
             "type": "controls_if"
           },
         ]
       },
       {
         "kind": "category",
         "name": "Logic",
         "contents": [
           {
             "kind": "block",
             "type": "logic_compare"
           },
           {
             "kind": "block",
             "type": "logic_operation"
           },
           {
             "kind": "block",
             "type": "logic_boolean"
           }
         ]
       }
     ]
   };

   let workspaceConfiguration = {collapse : false, 
    comments : true, 
    disable : true, 
    maxBlocks : Infinity, 
    trashcan : true, 
    horizontalLayout : true, 
    toolboxPosition : 'end',
    grid : {
      spacing : 20, 
      length : -30, 
      colour : '#555', 
      snap : false
    }, 
    zoom : {
      controls : true, 
      wheel : true, 
      startScale : 1, 
      maxScale : 3, 
      minScale : 0.3, 
      scaleSpeed : 1.2
    }
   }

  return (
    <BlocklyWorkspace
      className={styles.editor} // you can use whatever classes are appropriate for your app's CSS
      toolboxConfiguration={toolboxConfiguration} // this must be a JSON toolbox definition
      workspaceConfiguration={workspaceConfiguration}
    />
  )
}

export default BlocklyEditor