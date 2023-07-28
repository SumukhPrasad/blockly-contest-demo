"use client"


import { useState } from "react";
import { BlocklyWorkspace } from 'react-blockly';
import styles from '../../styles/blockly.module.sass'

import blocks from "../lib-internal/blocks";
import "../lib-internal/blockDefs";
import workspaceConfiguration from "../lib-internal/workspaceConfig";



function BlocklyEditor() {
  let [xml, setXml] = useState();

  let toolboxConfiguration = blocks;

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