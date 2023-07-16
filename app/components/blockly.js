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
   }

  return (
    <BlocklyWorkspace
      className={styles.editor} // you can use whatever classes are appropriate for your app's CSS
      toolboxConfiguration={toolboxConfiguration} // this must be a JSON toolbox definition
    />
  )
}

export default BlocklyEditor