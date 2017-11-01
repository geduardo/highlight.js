/*
Language: C# in XML
Requires: xml.js, vbscript.js
Author: Xinxin Zhou <xizhou@microsoft.com>
Description: VBScript in XML within <script runat="server"></script>
Category: scripting
*/

function(hljs) {
    return {
      subLanguage: 'xml',
      contains: [
        {
          begin: '<script runat="server">', end: '</script>',
          subLanguage: 'vbscript'
        }
      ]
    };
  }
  