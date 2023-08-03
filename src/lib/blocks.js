let blocks = {
  "kind": "categoryToolbox",
  "contents": [
    {
      "kind": "category",
      "name": "Logic",
      "contents": [
        {
          "kind": "block",
          "type": "controls_if"
        },
        {
          "kind": "block",
          "type": "logic_operation"
        },
        {
          "kind": "block",
          "type": "logic_boolean"
        },
        {
          "kind": "block",
          "type": "logic_compare"
        },
        {
          "kind": "block",
          "type": "logic_negate"
        },
        {
          "kind": "block",
          "type": "logic_null",
        },
        {
          "kind": "block",
          "type": "logic_ternary"
        }
      ]
    },
    {
    "kind": "category",
    "name": "Control",
    "contents": [
      {
        "kind": "block",
        "type": "controls_repeat_ext"
      },
      {
        "kind": "block",
        "type": "controls_repeat",
      },
      {
        "kind": "block",
        "type": "controls_whileUntil"
      },
      {
        "kind": "block",
        "type": "controls_for"
      },
      {
        "kind": "block",
        "type": "controls_forEach"
      },
      {
        "kind": "block",
        "type": "controls_flow_statements"
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

      {
        "kind": "block",
        "type": "maze_if",
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