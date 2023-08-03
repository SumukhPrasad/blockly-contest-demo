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

     import { browser } from '$app/environment';
     let acorn;
     if (browser) window.acorn = acorn;
     import('acorn').then((res) => {
          if (browser) window.acorn=res;
     });

     import '../vendor/JS-Interpreter/interpreter.js';
     var cmaze = new MazeBoard([[0, 0, 0, 0, 0, 0, 0, 0],
     [0, 1, 1, 0, 3, 0, 1, 0],
     [0, 1, 1, 0, 1, 1, 1, 0],
     [0, 1, 0, 1, 0, 1, 0, 0],
     [0, 1, 1, 1, 1, 1, 1, 0],
     [0, 0, 0, 1, 0, 0, 1, 0],
     [0, 2, 1, 1, 1, 0, 1, 0],
     [0, 0, 0, 0, 0, 0, 0, 0]]);

     var btVal = cmaze.__getBoardText();
     cmaze.updateCallback = (function () {btVal = cmaze.__getBoardText()});

     if (browser) window.globalMazeObject = cmaze;

     const toolbox = blocks;
     var config = workspaceConfiguration;
     config.toolbox = toolbox;
     let workspace;


     let code = "";
     javascriptGenerator.STATEMENT_PREFIX = 'window.highlightBlock(%1);\n';
     javascriptGenerator.addReservedWords('highlightBlock');
     javascriptGenerator.addReservedWords('code');
     if (browser) window.LoopTrap = 1000;
     javascriptGenerator.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';

     function highlightBlock(id) {
          workspace.highlightBlock(id);
     }

     if (browser) window.highlightBlock = highlightBlock;

     function onChange() {
          try {
               code = javascriptGenerator.workspaceToCode(workspace);
               //var myInterpreter = new acorn.Interpreter(code);
               //myInterpreter.run();
          } catch (_err) {
               // Happens e.g. when deleting a function that is used somewhere.
               // Blockly will quickly recover from this, so it's not a big deal.
               // Just make sure the app doesn't crash until then.
               console.log(_err);
          }
     }

     function execute() {
          try {
               var running = false;
               workspace.highlightBlock(null);

               var lastBlockToHighlight = null;
               var myInterpreter = new Interpreter(code, (interpreter, scope) => {
               interpreter.setProperty(
                    scope, 'highlightBlock',
                         interpreter.createNativeFunction(id => {
                              id = id ? id.toString() : '';
                              running = false;
                              workspace.highlightBlock(lastBlockToHighlight);
                              lastBlockToHighlight = id;
                         })
                    );
                    interpreter.setProperty(
                         scope, 'dbg_print',
                              interpreter.createNativeFunction(val => {
                              val = val ? val.toString() : '';
                              console.log(val);
                              })
                    );
                    
                    //maze fns
                    interpreter.setProperty(
                         scope, 'updateHeading',
                              interpreter.createNativeFunction(val => {
                              val = val ? val : '';
                              cmaze.updateHeading(val);
                         })
                    );
                    interpreter.setProperty(
                         scope, 'move',
                              interpreter.createNativeFunction(val => {
                              cmaze.move(val);
                         })
                    );
               });

               var intervalId = setInterval(() => {
                    running = true;
                    while (running) {
                         if (!myInterpreter.step()) {
                              workspace.highlightBlock(lastBlockToHighlight);
                              clearInterval(intervalId);
                              setTimeout(() => {
                                   workspace.highlightBlock(null);
                              }, 1000);
                              return;
                         }
                    }
               }, 250);
          } catch (_err) {
               console.error(_err);
               window.alert('CATASTROPHIC ERROR!\n'+_err)
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
     <b>generated code</b><br />
     {code != "" ? code : "no generated code" }<br />
     <button on:click={() => execute()}>EXECUTE</button>
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
          top: 50px
          right: 50px
          color: white
          text-shadow: 0px 1px #000

     .monospace
          font-family: monospace

     button
          background-color: red
          color: white
          font-weight: bold
          font-family: monospace
          margin-top: 20px
</style>
