/*
Language: OData
Author: Stanislaw Swierc <stanislaw.swierc@gmail.com>
Description: Language definition for Open Data Protocol (OData) query language.
Website: http://www.odata.org/
Category: common
*/

function(hljs) {
  return {
    case_insensitive: false,
    contains: [
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'title',
        begin: 'http(s)?://[^?]*',
      },
      hljs.C_LINE_COMMENT_MODE,
      {
        className: 'string',
        begin: '\'',
        end: '\'',
        contains: [ 
          {
             begin: '\'\'' 
          } 
        ],
        relevance: 0
      },
      {
        // Literal values represented as string (e.g. binary'T0RhdGE')
        className: 'string',
        begin: '[a-zA-Z_][a-zA-Z0-9_.]*\'',
        end: '\''
      },
      {
        // Constants 
        className: 'literal',
        begin: 'true|false|null|INF',
        relevance: 0
      },
      {
        // Guid
        className: 'literal',
        begin: '\\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\\b',
        relevance: 0
      },
      {
        // Date
        className: 'literal',
        begin: "\\b([0-9]{4}-[0-9]{2}-[0-9]{2})\\b",
        relevance: 0
      },
      {
        // DateTimeOffset
        className: 'literal',
        begin: "\\b([0-9]{4}-[0-9]{2}-[0-9]{2}(T[0-9][0-9]:[0-9][0-9](:[0-9][0-9](\\.[0-9]+)?)?)?([zZ]|([+-]|%2B)([01][0-9]|2[0-3]):?([0-5][0-9])?))\\b",
        relevance: 10
      },
      hljs.C_NUMBER_MODE,
      {
        // Query options
        className: 'keyword',
        begin: '\\$(apply|count|filter|orderby|select|skip|top|expand|it|root|count)\\b',
        relevance: 10
      },
      {
        className: "built_in",
        begin: '\\b('+ 
          // Built-in functions
          'concat|contains|endswith|indexof|length|startswith|substring|tolower|toupper|trim|date|day|fractionalseconds|hour|' +
          'maxdatetime|mindatetime|minute|month|now|second|time|totaloffsetminutes|totalseconds|year|ceiling|floor|round|cast|' +
          'isof|geo\\.distance|geo\\.intersects|geo\\.length|'+
          // Lambda operators
          'any|all|' +
          // Aggregation methods
          'sum|min|max|average|countdistinct|'+
          // Aggregation transformations
          'aggregate|topcount|topsum|toppercent|bottomcount|bottomsum|bottompercent|identity|concat|groupby|filter|expand' +
          ')\\b',
      },
      {
        // Operators should have no markup
        begin: '\\b(and|or|add|div|eq|ge|gt|le|lt|mod|mul|ne|not|sub|with|as)\\b',
        relevance: 0
      },
      {
        className: 'symbol',
        begin: '[a-zA-Z_][a-zA-Z0-9_]*',
        relevance: 0,
      },
    ]
  };
}
