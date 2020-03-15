/*
 Language: SQL Syntax
 Contributors: Duncan Mackenzie (duncanma@duncanmackenzie.net)
 Category: common
 */

function(hljs) {
  var COMMENT_MODE = hljs.COMMENT('--', '$');
  var VAR = {
      className: 'variable',
      begin: /[a-z]*_[a-z]*/
  };
  var KEYWORD = {
    className: 'keyword',
    begin: /[A-Z]+/
  };
  var LITERAL = {
    className: 'literal',
    beginKeywords: "ON OFF TRUE FALSE"
  };
var PLACEHOLDER =
  {
    // Match command line parameters (-p, -u)
    className: 'parameter',
    begin: /</, end: />/,
    relevance: 0
  };

  var QUOTE_STRING = {
      className: 'string',
      begin: /"/, end: /"/,
      contains: [
        hljs.BACKSLASH_ESCAPE
      ]
  };
  var APOS_STRING = {
      className: 'string',
      begin: /'/,
      end: /'/
  };
  var OPERATOR = {
    className: "control",
    begin: /::=/
  }

return {
  aliases: ["syntaxsql"],
  case_insensitive: false,
    contains: [
    hljs.NUMBER_MODE,
    PLACEHOLDER,
    COMMENT_MODE,
    QUOTE_STRING,
    APOS_STRING,
    VAR,
    LITERAL,
    KEYWORD,
    OPERATOR
  ]
};
}