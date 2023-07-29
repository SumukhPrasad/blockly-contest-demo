let blocks = {
  "kind": "categoryToolbox",
  "contents": [{
   "kind": "category",
   "name": "Control",
   "contents": [
     {
       "kind": "block",
       "type": "controls_if"
     }
   ]
 },
 {
   "kind": "category",
   "name": "Logic",
   "contents": [
     {
       "kind": "block",
       "type": "logic_operation"
     },
     {
       "kind": "block",
       "type": "logic_boolean"
     }
   ]
 },
 {
   kind: "category",
   name: "Maze",
   colour: "#5CA699",
   contents: [
      {
        kind: "block",
        type: "maze_turn",
      },
      {
        kind: "block",
        type: "maze_move",
      },
    ],
 },
 {
  kind: "category",
  name: "dbg",
  colour: "#000000",
  contents: [
     {
       kind: "block",
       type: "console_dbg",
     },
   ],
}]
};

export default blocks