import Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

Blockly.Blocks['maze_if'] = {
     init: function () {
          this.appendDummyInput()
               .appendField(new Blockly.FieldLabelSerializable("if path"), "NAME_if")
               .appendField(new Blockly.FieldDropdown([["ahead", "path_ahead"], ["to left", "path_to_left"], ["to right", "path_to_right"]]), "DIR")
               .appendField(new Blockly.FieldLabelSerializable("exists"), "NAME_exists");
          this.appendStatementInput("DO")
               .setCheck(null);

          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour("#5CA699");
          this.setTooltip("");
          this.setHelpUrl("");
     }
};
javascriptGenerator['maze_if'] = function(block) {
     var statements_do = javascriptGenerator.statementToCode(block, 'DO');
     var code = `dbg_print('blockly_debug at block_id_${block.id}: ${block.getFieldValue('DIR')}'); if (${block.getFieldValue('DIR')}_exists()) {${statements_do}}\n`;
     return code;
};

Blockly.Blocks['maze_move'] = {
     init: function () {
          this
               .appendDummyInput()
               .appendField(new Blockly.FieldLabelSerializable("take step forward"), "NAME")
          this.setInputsInline(false);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour("#5CA699");
          this.setTooltip("");
          this.setHelpUrl("");
     }
};
javascriptGenerator['maze_move'] = function (block) {
     return `dbg_print('blockly_debug at block_id_${block.id}: move ');move();\n`;
}

Blockly.Blocks['maze_turn'] = {
     init: function () {
          this
               .appendDummyInput()
               .appendField(new Blockly.FieldLabelSerializable("turn"), "NAME")
               .appendField(new Blockly.FieldDropdown([["clockwise (the character's right)", "clockwise"], ["anti-clockwise (the character's left)", "anticlockwise"]]), "dir")
          this.setInputsInline(false);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour("#5CA699");
          this.setTooltip("");
          this.setHelpUrl("");
     }
};
javascriptGenerator['maze_turn'] = function (block) {
     return `dbg_print('blockly_debug at block_id_${block.id}: turn ${block.getFieldValue('dir')} ');updateHeading(("${block.getFieldValue('dir')}" == "clockwise" ? 1 : -1));\n`;
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
javascriptGenerator['console_dbg'] = function (block) {
     return `dbg_print('blockly_debug_function at block_id_${block.id}: ${block.getFieldValue('dbg_txt')} ');\n`;
}