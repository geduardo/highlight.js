/*
 Language: Kusto
*/

function(hljs) {
    var COMMENT_MODE = hljs.COMMENT('//', '$');
    var CONTROL_COMMANDS_TOKENS = 
      'async data into ifnotexists whatif compressed monitoring metadata folder docstring '+
      'details hot records until as csv tsv json sql policy encoding retention merge policies update ingestiontime '+
      'caching querythrottling sharding callout querylimit restricted_view_access softdelete harddelete rowstore '+
      'rowstores seal writeaheadlog streamingingestion rowstore_references follower ';
    var CSL_COMMANDS_TOKENS = 'set let restrict access alias pattern declare query_parameters ';
    var CHART_RENDER_TYPES_TOKENS = 'columnchart barchart piechart timechart anomalychart linechart ladderchart pivotchart '+
      'areachart stackedareachart scatterchart timepivot timeline ';
    var CHART_RENDER_KIND_TOKENS = 'default stacked stacked100 unstacked ';
    var SUB_OPERATORS_TOKEN = 'like notlike contains notcontains !contains contains_cs !contains_cs startswith !startswith '+
      'has !has has_cs !has_cs hasprefix !hasprefix hassuffix !hassuffix matches regex in !in endswith !endswith between '+
      '!between extent database diagnostics admins basicauth cache capacity cluster databases extents journal memory '+
      'extentcontainers viewers unrestrictedviewers tags prettyname blockedprincipals operations password principal '+
      'principals settings schema table tables user users ingestors monitors version roles fabric locks services nodes '+
      'commands queries query function functions by|0 on of true false and or asc desc nulls last first with withsource '+
      'kind flags from to|0 step ingestion failures mapping mappings geneva eventhub source sources types application '+
      'period reason title ';
    var JOIN_KIND_TOKENS = 'anti inner innerunique fullouter leftanti leftantisemi leftouter leftsemi rightanti '+
      'rightantisemi rightsemi rightouter ';
    var OTHER_TOKENS = 'mining now ago datetime ingestion_time time timespan dynamic decimal todatetime between !between '+
      'row_number extent_id extent_tags pi pack_all rowstore_ordinal_range cluster database table iff iif range replace '+
      'translate series_iir bin_at bin_auto series_fill_const datetime_diff datetime_add connect filter fork facet range consume '+
      'find search print count countif dcount dcountif sum min max avg avgif any makelist makeset make_dictionary make_string stdev '+
      'stdevif varianceif variance buildschema hll hll_merge tdigest tdigest_merge percentile sumif percentilew arg_min '+
      'arg_max percentilesw_array percentilesw percentiles_array percentiles count countif dcount dcountif sum min max '+
      'avg any stdev stdevp variance variancep sumif autocluster diffpatterns basket extractcolumns ';
    var DATA_TYPES_TOKENS = 'date time timespan datetime int long real float string bool boolean double dynamic decimal ';
    var SINGLE_PARAM_FUNC_NO_DATE_TIME_TOKENS = 'strlen tostring toupper tolower typeof reverse parsejson parse_json parse_xml '+
      'tobool toboolean todynamic toobject toint tolong toguid todouble toreal totimespan tohex todecimal isempty isnotempty '+
      'isnull isnotnull isnan isinf isfinite dayofweek dayofmonth dayofyear weekofyear monthofyear sqrt rand log log10 log2 '+
      'exp exp2 exp10 absdegreesradianssign sin cos tan asin acos atancot getmonth getyear arraylength gettype cursor_after '+
      'cursor_current cursor_before_or_at estimate_data_size '+
      'gamma loggamma dcount_hll parse_ipv4 parse_url parse_path parse_version parse_urlquery url_encode url_decode binary_not '+
      'not toscalar materialize series_stats series_fit_line series_fit_2lines series_stats_dynamic series_fit_line_dynamic '+
      'series_add series_subtract series_multiply series_divide series_greater series_greater_equals series_less series_less_equals '+
      'series_equals series_not_equals series_seasonal series_decompose isascii isutf8 '+
      'series_fit_2lines_dynamic base64_encodestring base64_decodestring hash_sha256 ceiling current_principal '+
      'current_principal_details';
    var TWO_PARAM_FUNC_TOKENS = 'bin columnifexists floor countof hash round pow binary_and binary_or binary_xor '+
      'binary_shift_left binary_shift_right datepart datetime_part repeat series_outliers rank_tdigest percentrank_tdigest '+
      'trim trim_start trim_end startofdaystartofweek startofmonth startofyear endofday endofweek endofmonth endofyear '+
      'series_fill_backward  series_fill_forward atan2 format_datetime format_timespan strrep strcat_array parse_user_agentstrcmp '+
      'row_cumsum distance point';
    var MANY_PARAM_FUNC_TOKENS = 'extract extractjson extractall strcat strcat_delim substring indexof split case coalesce '+
      'max_of min_of percentile_tdigest zip pack pack_array array_concat welch_test series_fir series_periods_detect prev next '+
      'tdigest_merge hll_merge series_fill_linear series_periods_validate datatable make_datetime make_timespan '+
      'beta_inv beta_cdf beta_pdf';
    var KUSTO_KEYWORDS = CONTROL_COMMANDS_TOKENS+CSL_COMMANDS_TOKENS+CHART_RENDER_TYPES_TOKENS+CHART_RENDER_KIND_TOKENS+SUB_OPERATORS_TOKEN+
      JOIN_KIND_TOKENS+OTHER_TOKENS+DATA_TYPES_TOKENS+SINGLE_PARAM_FUNC_NO_DATE_TIME_TOKENS+TWO_PARAM_FUNC_TOKENS+MANY_PARAM_FUNC_TOKENS;
    return {
      contains: [
        {
          endsWithParent: true,
          illegal: /\\/,
          lexemes: /[\w\.]+/,
          keywords: {
            keyword: KUSTO_KEYWORDS
          },
          contains: [
            {
             className: 'keyword',
             begin: /\.(add|alter-merge|alter|attach|append|create-merge|create-set|create-or-alter|create|define|detach|delete|drop-pretend|drop|dup-next-ingest|dup-next-failed-ingest|ingest|export|load|move|purge-cleanup|purge|remove|replace|save|set-or-append|set-or-replace|set|show|rename)\b/
            },
            {
              className: 'title',
              begin: /\b(where|extend|join|limit|order|project-away|project-rename|project|render|sort|summarize|distinct|take|top-nested|top-hitters|top|union|mvexpand|reduce|evaluate|parse|sample-distinct|sample|make-series|getschema|serialize|invoke)\b/
            },
            {
              className: 'number',
              begin: /\bdatetime\(\d{4}-\d{2}-\d{2}(\s+\d{2}:\d{2}(:\d{2}(\.\d{0,3})?)?)?\)/,
            },
            {
              className: 'number',
              begin: /\btime\((\d+(s(ec(onds?)?)?|m(in(utes?)?)?|h(ours?)?|d(ays?)?)|(\s*(('[^']+')|("[^"]+"))\s*))\)/,
            },
            {
              className: 'number',
              begin: /\bguid\([\da-fA-F]{8}-[\da-fA-F]{4}-[\da-fA-F]{4}-[\da-fA-F]{4}-[\da-fA-F]{12}\)/,
            },
            {
              className: 'number',
              begin: /\btypeof\((int|string|date|datetime|time|long|real|boolean|bool)\)/,
            },
            {
              className: 'number',
              begin: /((^[$]+)|\s([$]+))([+-]*\d*(\.\d*)?)/,
              relevance: 0
            },
            {
              className: 'number',
              begin: /\b0[xX][0-9a-fA-F]*/,
              relevance: 0
            },
            {
              className: 'number',
              begin: /(((\s\.\d+)|^\.\d+)|\b(\d+(\.\d*)?)([eE][\-+]?\d+)?)/,
              relevance: 0
            },
            {
              className: 'string',
              begin: '(H|h)\'', end: '\'',
            },
            {
              className: 'string',
              begin: '\'', end: '\'',
              contains: [hljs.BACKSLASH_ESCAPE, {begin: '\'\''}]
            },
            {
              className: 'string',
              begin: '(H|h)"', end: '"',
            },
            {
              className: 'string',
              begin: '"', end: '"',
              contains: [hljs.BACKSLASH_ESCAPE, {begin: '""'}]
            },
            {
              className: 'string',
              begin: '`', end: '`',
              contains: [hljs.BACKSLASH_ESCAPE]
            },
            COMMENT_MODE,
          ]
        },
        COMMENT_MODE,
      ]
    };
  }
  
