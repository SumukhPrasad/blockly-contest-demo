<script>
     import "blockly/blocks";
     import "blockly/javascript";
     import En from "blockly/msg/en";
     import "blockly/blocks";
     import {javascriptGenerator} from 'blockly/javascript';
     import blocks from "$lib/blocks";
     import "$lib/blockDefs";
     export let data;
     import BlocklyComponent from "svelte-blockly";
     const en = {
          rtl: false,
          msg: { ...En },
     };

     import workspaceConfiguration from "$lib/workspaceConfig.js";
     import MazeBoard from "$lib/maze";

     import { browser } from '$app/environment';
     let acorn;
     if (browser) window.acorn = acorn;
     import('acorn').then((res) => {
          if (browser) window.acorn=res;
     });

     const maps = [
          // Level 1.
          [[0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 2, 1, 3, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0]],
          // Level 2.
          [[0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 1, 3, 0, 0, 0],
          [0, 0, 2, 1, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0]],
          // Level 3.
          [[0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 2, 1, 1, 1, 1, 3, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0]],
          // Level 4.
          /**
           * Note, the path continues past the start and the goal in both directions.
           * This is intentionally done so users see the maze is about getting from
           * the start to the goal and not necessarily about moving over every part of
           * the maze, 'mowing the lawn' as Neil calls it.
           */
          [[0, 0, 0, 0, 0, 0, 0, 1],
          [0, 0, 0, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 0, 3, 1, 0],
          [0, 0, 0, 0, 1, 1, 0, 0],
          [0, 0, 0, 1, 1, 0, 0, 0],
          [0, 0, 1, 1, 0, 0, 0, 0],
          [0, 2, 1, 0, 0, 0, 0, 0],
          [1, 1, 0, 0, 0, 0, 0, 0]],
          // Level 5.
          [[0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 3, 0, 0],
          [0, 0, 0, 0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0, 1, 0, 0],
          [0, 0, 0, 2, 1, 1, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0]],
          // Level 6.
          [[0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 1, 1, 1, 1, 1, 0, 0],
          [0, 1, 0, 0, 0, 1, 0, 0],
          [0, 1, 1, 3, 0, 1, 0, 0],
          [0, 0, 0, 0, 0, 1, 0, 0],
          [0, 2, 1, 1, 1, 1, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0]],
          // Level 7.
          [[0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 1, 1, 0],
          [0, 2, 1, 1, 1, 1, 0, 0],
          [0, 0, 0, 0, 0, 1, 1, 0],
          [0, 1, 1, 3, 0, 1, 0, 0],
          [0, 1, 0, 1, 0, 1, 0, 0],
          [0, 1, 1, 1, 1, 1, 1, 0],
          [0, 0, 0, 0, 0, 0, 0, 0]],
          // Level 8.
          [[0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 1, 1, 1, 1, 0, 0, 0],
          [0, 1, 0, 0, 1, 1, 0, 0],
          [0, 1, 1, 1, 0, 1, 0, 0],
          [0, 0, 0, 1, 0, 1, 0, 0],
          [0, 2, 1, 1, 0, 3, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0]],
          // Level 9.
          [[0, 0, 0, 0, 0, 0, 0, 0],
          [0, 1, 1, 1, 1, 1, 0, 0],
          [0, 0, 1, 0, 0, 0, 0, 0],
          [3, 1, 1, 1, 1, 1, 1, 0],
          [0, 1, 0, 1, 0, 1, 1, 0],
          [1, 1, 1, 1, 1, 0, 1, 0],
          [0, 1, 0, 1, 0, 2, 1, 0],
          [0, 0, 0, 0, 0, 0, 0, 0]],
          // Level 10.
          [[0, 0, 0, 0, 0, 0, 0, 0],
          [0, 1, 1, 0, 3, 0, 1, 0],
          [0, 1, 1, 0, 1, 1, 1, 0],
          [0, 1, 0, 1, 0, 1, 0, 0],
          [0, 1, 1, 1, 1, 1, 1, 0],
          [0, 0, 0, 1, 0, 0, 1, 0],
          [0, 2, 1, 1, 1, 0, 1, 0],
          [0, 0, 0, 0, 0, 0, 0, 0]],
     ];

     function drawCanvas() {
          var c = document.getElementById("maze-canvas");
          var ctx = c.getContext("2d");
          for (let i = 0; i < cmaze.__getBoard().length; i++) {
               const row = cmaze.__getBoard()[i];
               for (let j = 0; j < row.length; j++) {
                    const tile = row[j];
                    
                    ctx.fillStyle = [
                         "white", 
                         "grey", 
                         "grey", 
                         "lightgreen", 
                         "grey", 
                         "grey",
                         "white", 
                         "grey"][tile];
                    ctx.fillRect((j*50), (i*50), 50, 50);
                    if (tile==2) {
                         ctx.beginPath();
                         ctx.arc((j*50)+25, (i*50)+25, 10, 0, 2 * Math.PI, false);
                         ctx.fillStyle = 'gray';
                         ctx.fill();
                         ctx.lineWidth = 5;
                         ctx.strokeStyle = '#555';
                         ctx.stroke();
                    }
                    if (tile==4) {
                         ctx.beginPath();
                         ctx.arc((j*50)+25, (i*50)+25, 10, 0, 2 * Math.PI, false);
                         ctx.fillStyle = 'green';
                         ctx.fill();
                         ctx.lineWidth = 5;
                         ctx.strokeStyle = '#003300';
                         ctx.stroke();
                    }
                    if (tile==6) {
                         ctx.beginPath();
                         ctx.arc((j*50)+25, (i*50)+25, 10, 0, 2 * Math.PI, false);
                         ctx.fillStyle = '#faa';
                         ctx.fill();
                         ctx.lineWidth = 5;
                         ctx.strokeStyle = '#f55';
                         ctx.stroke();
                    }
                    if (tile==7) {
                         ctx.beginPath();
                         ctx.arc((j*50)+25, (i*50)+25, 10, 0, 2 * Math.PI, false);
                         ctx.fillStyle = 'lightgreen';
                         ctx.fill();
                         ctx.lineWidth = 5;
                         ctx.strokeStyle = 'green';
                         ctx.stroke();
                    }
               }
          }
          ctx.stroke();
     }

     import '../../vendor/JS-Interpreter/interpreter.js';
     var cmaze = new MazeBoard(maps[data.slug-1]);

     var btVal = cmaze.__getBoardText();
     var board = cmaze.__getBoard();
     cmaze.updateCallback = (function () {btVal = cmaze.__getBoardText(); board=cmaze.__getBoard(); if (browser) drawCanvas();});
     if (browser) drawCanvas();
     if (browser) window.globalMazeObject = cmaze;

     const toolbox = blocks;
     var config = workspaceConfiguration;
     config.toolbox = toolbox;
     let workspace;


     let code = "";
     javascriptGenerator.STATEMENT_PREFIX = 'window.highlightBlock(%1);\n';
     javascriptGenerator.addReservedWords('highlightBlock');
     javascriptGenerator.addReservedWords('code');
     if (browser) window.LoopTrap = 10;
     javascriptGenerator.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';

     function highlightBlock(id) {
          workspace.highlightBlock(id);
     }

     if (browser) window.highlightBlock = highlightBlock;

     function onChange() {
          try {
               code = javascriptGenerator.workspaceToCode(workspace);
               //var jsInterpreterObj = new acorn.Interpreter(code);
               //jsInterpreterObj.run();
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
               var jsInterpreterObj = new Interpreter(code, (interpreter, scope) => {
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

                    interpreter.setProperty(
                         scope, 'path_ahead_exists',
                              interpreter.createNativeFunction(val => {
                              return cmaze.doesPathExist(0);
                         })
                    );

                    interpreter.setProperty(
                         scope, 'path_to_right_exists',
                              interpreter.createNativeFunction(val => {
                              return cmaze.doesPathExist(1);
                         })
                    );

                    interpreter.setProperty(
                         scope, 'path_to_left_exists',
                              interpreter.createNativeFunction(val => {
                              return cmaze.doesPathExist(-1);
                         })
                    );

                    interpreter.setProperty(
                         scope, 'has_reached_destination',
                              interpreter.createNativeFunction(val => {
                              return cmaze.hasFinishedMaze();
                         })
                    );

                    
               });

               var intervalId = setInterval(() => {
                    running = true;
                    while (running) {
                         if (!jsInterpreterObj.step()) {
                              workspace.highlightBlock(lastBlockToHighlight);
                              clearInterval(intervalId);
                              setTimeout(() => {
                                   if (cmaze.hasFinishedMaze()) {
                                        alert("Finished the maze!")
                                   }
                              }, 100);
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
<div class="runnerWindow debug">
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
<div class="runnerWindow">
     <div class="monospace">
          <canvas id="maze-canvas" width="400px" height="400px"></canvas><br />
          <button class="run" on:click={() => execute()}>Run blocks</button>
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
     .debug
          opacity: 0.5

     .monospace
          font-family: monospace

     button
          background-color: red
          color: white
          font-weight: bold
          font-family: monospace
          margin-top: 20px
     .run
          padding: 10px 15px
          font-size: 18px
          border-radius: 16px
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
          border: 1px solid #200
          background-color: #f55
</style>
