import Blockly from 'blockly';
import {javascriptGenerator} from 'blockly/javascript';

Blockly.Blocks['maze_move'] = {
  init: function () {
     this
          .appendDummyInput()
          .appendField(new Blockly.FieldLabelSerializable("move"), "NAME")
          .appendField(new Blockly.FieldNumber(1, 1, 10), "steps")
          .appendField(new Blockly.FieldLabelSerializable("steps"), "NAME_END")
          .appendField(new Blockly.FieldDropdown([["forward","forward"], ["forward","backward"]]), "dir");
     this.setInputsInline(true);
     this.setColour("#5CA699");
     this.setTooltip("");
     this.setHelpUrl("");
  }
};

Blockly.Blocks['maze_turn'] = {
  init: function () {
     this
          .appendDummyInput()
          .appendField(new Blockly.FieldLabelSerializable("turn"), "NAME")
          .appendField(new Blockly.FieldDropdown([["clockwise","clockwise"], ["anti-clockwise","anticlockwise"]]), "dir")
     this.setInputsInline(false);
     this.setPreviousStatement(true, null);
     this.setNextStatement(true, null);
     this.setColour("#5CA699");
     this.setTooltip("");
     this.setHelpUrl("");
  }
};
javascriptGenerator['maze_turn'] = function(block) {
     return `console.log('blockly_debug at block_id_${block.id}: turn ${block.getFieldValue('dir')} ');\n`;
}

Blockly.Blocks['console_dbg'] = {
  init: function () {
     this
          .appendDummyInput()
          .appendField(new Blockly.FieldLabelSerializable("console_dbg"), "NAME")
          .appendField(new Blockly.FieldTextInput("debugger text..."), "dbg_txt")
     this.setInputsInline(false);
     this.setPreviousStatement(true, null);
     this.setNextStatement(true, null);
     this.setColour("#000000");
     this.setTooltip("");
     this.setHelpUrl("");
  }
};
javascriptGenerator['console_dbg'] = function(block) {
     return `console.log('blockly_internal_debug_function at block_id_${block.id}: ${block.getFieldValue('dbg_txt')} ');\n`;
}