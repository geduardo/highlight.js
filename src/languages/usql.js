/*
 Language: U-SQL
 Author: Viktar Pakanechny <vityanchys@gmail.com>
 Category: common
 */

function(hljs) {
    return {
      aliases: ['usql'],
      case_insensitive: true,
      illegal: /[<>{}*]/,
      contains: [
        {
          endsWithParent: true,
          lexemes: /[\w\.]+/,
          keywords: 
            'ADD ADDITIONALFILES AGG ALGORITHM ALL|0 ALTER AND ANTISEMIJOIN ANY APPLY ARRAY AS ASC ASSEMBLY '+ 
            'BEGIN BETWEEN BIGINT BINARY BIT BROADCAST BROADCASTLEFT BROADCASTRIGHT BUCKETS BY CLUSTER CLUSTERED '+ 
            'COLSIZE COLUMN COLUMNGROUPS COLUMNSET COLUMNSTORE COMBINE CONST CONSTRAINT CREATE CREATED CREDENTIAL '+ 
            'CROSS CSHARP CURRENT DATA DATABASE DATETIME2 DECIMAL DECLARE DEFAULT DEPLOY DESC DIRECT DISTINCT '+ 
            'DISTINCTVALUE DISTRIBUTE DISTRIBUTED DONOTCOLLAPSE DONOTSPILL DROP ELSE ELSEIF END ERROR EXCEPT EXECUTE '+ 
            'EXISTS EXPLODE EXPLRULE EXTERNAL EXTRACT FETCH FILE FIRST FLOAT FOLLOWING FOR FORCE FROM FULL FULLCROSS '+ 
            'FULLSCAN FUNCTION GROUP HASH HAVING IDENTITY IGNORE IF IN INCREMENTAL INDEX INDEXLOOKUP INNER INSERT INT '+ 
            'INTEGRITY INTERSECT INTO IS JOIN KEEPPARTITION KEYS LCID LEFT LENGTH LOCATION LOOP LOWDISTINCTNESS MAP MAX '+ 
            'MAXBYTESPERSSSEXTRACTCOMBINEVERTEX|10 MAXDOP MERGE MODIFIED MONEY MOVE NAME|0 NEXT NONCLUSTERED NVARCHAR '+ 
            'NULL OFF OFFSET ON ONLY OR ORDER OPTION OUTER OUTPUT OVER PACKAGE PAIR PARTITION PARTITIONED PATTERN PIVOT '+ 
            'PRECEDING PRESORT PROCEDURE PROCESS PRODUCE RANGE READONLY REAL REBUILD REDUCE REFERENCE REQUIRED RESOURCE '+ 
            'RETURNS RETURN RIGHT ROBIN ROUND ROW ROWS ROWCOUNT ROWSIZE SAMPLE SCHEMA SCRIPT SELECT SEMIJOIN SERIAL SET '+ 
            'SKEWFACTOR SKEWJOIN SKIP SMALLINT SORTCOLUMNS SOURCE SQL STAGEBOUNDARYOUTPUT STATISTICS STATPATH STRUCT '+ 
            'SWITCH SYSTEM TABLE THEN TINYINT TRUNCATE TO|0 TOP TYPE UNBOUNDED UNIFORM UNION UNIQUE UNIQUEIDENTIFIER '+ 
            'UNIVERSE UNPIVOT UPDATE USE USERNAME USING VALUES VARBINARY VARCHAR VIEW VIOLATION WEIGHT WHERE WITH|0 '+ 
            'WITHIN WITHINDEX AUTHORIZATION BACKUP BREAK BROWSE BULK CASCADE CASE CHECK CHECKPOINT CLOSE COALESCE '+
            'COLLATE COMMIT COMPUTE CONTAINS CONTAINSTABLE CONTINUE CONVERT CURRENT_DATE CURRENT_TIME CURRENT_TIMESTAMP '+
            'CURRENT_USER CURSOR DBCC DEALLOCATE DELETE DENY DISK DUMP ERRLVL EXEC EXIT FILLFACTOR FOREIGN FREETEXT '+
            'FREETEXTTABLE GOTO GRANT HOLDLOCK IDENTITY_INSERT IDENTITYCOL KEY KILL LAST LINENO LOAD NATIONAL NOCHECK '+
            'NULLIF OF OFFSETS OPEN OPENDATASOURCE OPENQUERY OPENROWSET OPENXML PLAN PRECISION PRIMARY PRINT PUBLIC '+
            'RAISERROR READ READTEXT RECONFIGURE REFERENCES REPLICATION RESTORE RESTRICT REVERT REVOKE ROLLBACK '+
            'ROWGUIDCOL RULE SAVE SECURITYAUDIT SEMANTICKEYPHRASETABLE SEMANTICSIMILARITYDETAILSTABLE '+
            'SEMANTICSIMILARITYTABLE SESSION_USER SETUSER SHUTDOWN SOME SYSTEM_USER TABLESAMPLE TEXTSIZE TIME TIMES '+
            'TIMESTAMP TIMESTAMPS TIMESTAMPTZ TRAN TRANSACTION TRIGGER TRY_CONVERT TSEQUAL UPDATETEXT USER VARYING '+
            'WAITFOR WHEN WHILE WRITETEXT BIGINT BIGSERIAL BIT BOOLEAN BOX BYTEA CIDR CIRCLE DATE|0 DATETIME STRING '+
            'INET INT INTEGER LINE LSEG MACADDR MONEY OID PATH POINT POLYGON REAL SERIAL SMALLINT SYSDATE TEXT',
          contains: [ 
            {
              begin: /(^\x20+create(\x20+or\x20+replace)?)\x20+(aggregate|conversion|database|domain|function|group|unique\x20+index|index|language|operator\x20class|operator|rule|schema|sequence|table|tablespace|trigger|type|user|view)\x20+(['\"`]?)(\w+)\4/,
              keywords: 'create or replace aggregate conversion database domain function group unique index language operator class operator rule schema sequence table tablespace trigger type user view'
            },
            {
              className: 'keyword',
              begin: /^\x20+(drop)\x20+(aggregate|conversion|database|domain|function|group|index|language|operator\x20class|operator|rule|schema|sequence|table|tablespace|trigger|type|user|view)/
            },
            {
              className: 'keyword',
              begin: /^\x20+(alter)\x20+(aggregate|conversion|database|domain|function|group|index|language|operator\x20class|operator|rule|schema|sequence|table|tablespace|trigger|type|user|view)\b/
            },
            {
              className: 'keyword',
              begin: /\b(double\x20precision)\b/
            },
            {
              begin: /\b(bit\x20varying|character\x20(varying)?|tinyint|var\x20char|float|interval)(\(\d+\))/,
              end: /\./,
              keywords: 'bit varying character tinyint var char float interval',
              returnBegin: true,
              contains: [
                {
                  className: 'number',
                  begin: /\d+/,
                  endsParent: true
                }
              ]
            },
            {
              begin: /(times?|(timestamp)(s|tz)?)(\(\d+\))?(\x20with(out)?\x20time\x20zone)\b/,
              end: /\./,
              keywords: 'time times timestamp timestamps timestamptz',
              returnBegin: true,
              contains: [
                {
                  className: 'number',
                  begin: /\d+/
                },
                {
                  className: 'keyword',
                  begin: /with(out)?\x20time\x20zone/,
                  endsParent: true
                },
              ]
            },
            {
              begin: /\b(numeric|decimal)\b/,
              keywords: 'numeric decimal'
            },
            {
              className: 'keyword',
              begin: /\b(char|number|varchar\d?)\b/
            },
            {
              className: 'keyword',
              begin: /\b(on|off|((is\x20+)?not\x20+)?null)\b/
            },
            {
              className: 'keyword',
              begin: /\b(comment\x20+on\x20+(table|column|aggregate|constraint|database|domain|function|index|operator|rule|schema|sequence|trigger|type|view)\x20+.*?\x20+(is)\b)/
            },
            {
              className: 'meta-string',
              begin: /\b(CONCATENATE|CONVERT|LOWER|SUBSTRING|TRANSLATE|TRIM|UPPER)\b/
            },
            {
              begin: /\b(avg|count|max|min|sum)(\x20*\()/,
              keywords: 'avg count max min sum'
            },
            {
              className: 'keyword',
              begin: /\b(select(\x20+distinct)?|insert\x20+(ignore\x20+)?into|update|delete|from|set|where|group\x20by|or|like|and|union(\x20+all)?|having|order\x20by|limit|(inner|cross)\x20+join|join|straight_join|full\x20+outer\x20+join|(left|right)(\x20+outer)?\x20+join|natural(\x20+(left|right)(\x20+outer)?)?\x20+join)\b/
            },
            {
              begin: /\b((begin(\x20+work)?)|start\x20+transaction|commit(\x20+work)?|rollback(\x20+work)?)\b/,
              keywords: 'begin start transaction commit rollback'
            },
            {
              className: 'regexp',
              begin: /%r\{/,
              end: /\}/
            },
            {
              className: 'string',
              begin: /@\"/,
              end: /\"/
            },
            {
              className: 'attr',
              begin: /(@\w*)/
            },
            {
              className: 'string',
              begin: /%\{/,
              end: /\}/
            },
            {
              className: 'string',
              begin: '\'', end: '\'',
              contains: [hljs.BACKSLASH_ESCAPE, { begin: '\'\'' }]
            },
            {
              className: 'string',
              begin: '"', end: '"',
              contains: [hljs.BACKSLASH_ESCAPE, { begin: '\"\"' }]
            },
            {
              className: 'string',
              begin: '`', end: '`',
              contains: [hljs.BACKSLASH_ESCAPE]
            },
            hljs.C_NUMBER_MODE,
            hljs.C_BLOCK_COMMENT_MODE,
            hljs.C_LINE_COMMENT_MODE,
            hljs.HASH_COMMENT_MODE,
          ]
        },
        hljs.C_BLOCK_COMMENT_MODE,
        hljs.C_LINE_COMMENT_MODE,
        hljs.HASH_COMMENT_MODE
      ]
    };
}