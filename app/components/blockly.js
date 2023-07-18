"use client"


import { useState } from "react";
import { BlocklyWorkspace } from 'react-blockly';
import styles from '../../styles/blockly.module.sass'
import blocks from "../lib-internal/blocks";



function BlocklyEditor() {
  let [xml, setXml] = useState();

  let toolboxConfiguration = {
     "kind": "categoryToolbox",
     "contents": blocks
   };

   let workspaceConfiguration = {collapse : false, 
    comments : true, 
    disable : true, 
    maxBlocks : Infinity, 
    trashcan : true, 
    horizontalLayout : true, 
    toolboxPosition : 'end',
    renderer: "zelos",
    grid : {
      spacing : 20, 
      length : 3, 
      colour : '#ddd', 
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
      initialXml={xml}
      onXmlChange={setXml}
    />
  )
}

export default BlocklyEditor