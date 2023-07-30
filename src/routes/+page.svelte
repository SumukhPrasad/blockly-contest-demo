<script>
     import "blockly/blocks";
     import "blockly/javascript";
     import En from "blockly/msg/en";
     import "blockly/blocks";
     import {javascriptGenerator} from 'blockly/javascript';

     import blocks from "../lib/blocks";
     import "../lib/blockDefs";

     import BlocklyComponent from "svelte-blockly";
     const en = {
          rtl: false,
          msg: { ...En },
     };

     import workspaceConfiguration from "../lib/workspaceConfig.js";
     import MazeBoard from "../lib/maze";

     var cmaze = new MazeBoard([[0, 0, 0, 0, 0, 0, 0, 0],
     [0, 1, 1, 0, 3, 0, 1, 0],
     [0, 1, 1, 0, 1, 1, 1, 0],
     [0, 1, 0, 1, 0, 1, 0, 0],
     [0, 1, 1, 1, 1, 1, 1, 0],
     [0, 0, 0, 1, 0, 0, 1, 0],
     [0, 2, 1, 1, 1, 0, 1, 0],
     [0, 0, 0, 0, 0, 0, 0, 0]]);

     var btVal = cmaze.__getBoardText();
     cmaze.updateCallback = (function () {btVal = cmaze.__getBoardText()})

     const toolbox = blocks;
     var config = workspaceConfiguration;
     config.toolbox = toolbox;
     let workspace;
     let code = "";

     function onChange() {
          try {
               code = javascriptGenerator.workspaceToCode(workspace);
          } catch (_err) {
               // Happens e.g. when deleting a function that is used somewhere.
               // Blockly will quickly recover from this, so it's not a big deal.
               // Just make sure the app doesn't crash until then.
               console.log(_err);
          }
     }
</script>

<head>
     <style lang="sass">
          body 
               border: 0
               margin: 0
               padding: 0
     </style>
</head>

<div class="editor">
     <BlocklyComponent
          {config}
          locale={en}
          bind:workspace
          on:change={onChange}
     />
</div>
<!--<pre>{code}</pre>-->
<div class="runnerWindow">
     <h2><i>Debug</i></h2>
     <div class="monospace">
     <b>board</b><br />
     -----<br />
          {@html btVal}
     -----<br />
     </div>
</div>

<style lang="sass">
     .editor 
          width: 100vw
          height: 100vh
          position: fixed
          z-index: 1

     .runnerWindow
          position: absolute
          z-index: 1000
          padding: 10px
          border-radius: 10px
          background-color: rgba(0, 0, 0, 0.5)
          bottom: 50px
          right: 50px
          color: white
          text-shadow: 0px 1px #000

     .monospace
          font-family: monospace
</style>
