/*
    DataTemplate lex scanner
 */
   
%namespace Gordic.General.ODataParser
%visibility internal
%option unicode nofiles
//%option caseInsensitive 

%{
#pragma warning disable 1591
%}

%%

"$metadata"               return (int)Tokens.ODataSignal_METADATA;
"$batch"                  return (int)Tokens.ODataSignal_BATCH;
"$skiptoken"              return (int)Tokens.ODataSignal_SKIPTOKEN;
"/$count"                 return (int)Tokens.ODataSignal_COUNT;

"/$links"                 return (int)Tokens.ODataSignal_COUNT;
"/$value"                 return (int)Tokens.ODataSignal_COUNT;
"$aggregate"                 return (int)Tokens.ODataSignal_COUNT;
"$groupby"                 return (int)Tokens.ODataSignal_COUNT;
"$expand"                 return (int)Tokens.ODataSignal_COUNT;

"$levels"                 return (int)Tokens.ODataSignal_COUNT;
"$filter"                 return (int)Tokens.ODataSignal_COUNT;
"$orderby"                 return (int)Tokens.ODataSignal_COUNT;

"$skip"                 return (int)Tokens.ODataSignal_COUNT;
"$top"                 return (int)Tokens.ODataSignal_COUNT;
"$format"                 return (int)Tokens.ODataSignal_COUNT;

"$nlinecount"                 return (int)Tokens.ODataSignal_COUNT;
"$select"                 return (int)Tokens.ODataSignal_COUNT;


"atom" return (int)Tokens.Atom_LLC;
"json" return (int)Tokens.Json_LLC;
"xml" return (int)Tokens.Xml_LLC;
"all" return (int)Tokens.All_LLC;
"allpages" return (int)Tokens.AllPages_LLC;
"none" return (int)Tokens.None_LLC;
"asc" return (int)Tokens.Asc_LLC;
"desc" return (int)Tokens.Desc_LLC;
"sum" return (int)Tokens.Sum_LLC;
"min" return (int)Tokens.Min_LLC;
"max" return (int)Tokens.Max_LLC;
"average" return (int)Tokens.Average_LLC;
"any" return (int)Tokens.Any_LLC;
"as" return (int)Tokens.As_LLC;

//"substringof" return (int)Tokens.SubStringOf_LLC;
"contains" return (int)Tokens.Contains_LLC;
"startswith" return (int)Tokens.StartsWith_LLC ;
"endswith" return (int)Tokens.EndsWith_LLC   ;
"length" return (int)Tokens.Length_LLC     ;
"indexof" return (int)Tokens.IndexOf_LLC;
"substring" return (int)Tokens.Substring_LLC;
"tolower" return (int)Tokens.ToLower_LLC;
"toupper" return (int)Tokens.ToUpper_LLC;
"trim" return (int)Tokens.Trim_LLC;
"concat" return (int)Tokens.Concat_LLC;
"year" return (int)Tokens.Year_LLC;
"month" return (int)Tokens.Month_LLC;
"day" return (int)Tokens.Day_LLC;
"days" return (int)Tokens.Days_LLC;
"hour" return (int)Tokens.Hour_LLC;
"hours" return (int)Tokens.Hour_LLC;
"minute" return (int)Tokens.Minute_LLC;
"minutes" return (int)Tokens.Minute_LLC;
"second" return (int)Tokens.Second_LLC;
"seconds" return (int)Tokens.Second_LLC;
"date" return (int)Tokens.Date_LLC;
"time" return (int)Tokens.Time_LLC;
"round" return (int)Tokens.Round_LLC;
"floor" return (int)Tokens.Floor_LLC;
"ceiling" return (int)Tokens.Ceiling_LLC;

"gettotaloffsetminutes" return (int)Tokens.GetTotalOffsetMinutes_LLC; 

"geo.distance" return (int)Tokens.GeoDotDistance_LLC;
"geo.length" return (int)Tokens.GeoLength_LLC;
"geo.intersects" return (int)Tokens.GeoDotIntersects_LLC ;

"mindatetime" return (int)Tokens.MinDateTime_LLC;
"maxdatetime" return (int)Tokens.MaxDateTime_LLC;
"now" return (int)Tokens.Now_LLC;

// --

"ALL" return (int)Tokens.All_LUC;

"NaN" return (int)Tokens.NotANumber_LXC;
"INF" return (int)Tokens.Infinity_LUC;


"and" return (int)Tokens.And_LLC;
"or" return (int)Tokens.Or_LLC;

"eq" return (int)Tokens.Eq_LLC;
"ne" return (int)Tokens.Ne_LLC;
"lt" return (int)Tokens.Lt_LLC;
"le" return (int)Tokens.Le_LLC;
"gt" return (int)Tokens.Gt_LLC;
"ge" return (int)Tokens.Ge_LLC;

"in" return (int)Tokens.In_LLC;
"has" return (int)Tokens.Has_LLC;

"add" return (int)Tokens.Add_LLC;
"sub" return (int)Tokens.Sub_LLC;
"mul" return (int)Tokens.Mul_LLC;
"div" return (int)Tokens.Div_LLC;
"mod" return (int)Tokens.Mod_LLC;

"not" return (int)Tokens.Not_LLC;

"isof" return (int)Tokens.IsOf_LLC;
"cast" return (int)Tokens.Cast_LLC;


"null" return (int)Tokens.Null_LLC;
"true" return (int)Tokens.True_LLC;
"false" return (int)Tokens.False_LLC;

[a-zA-Z_][a-zA-Z_0-9]* yylval=GODataFilter.Id(yytext);return (int)Tokens.ID;
\'([^']|\'\')*\' yylval=GODataFilter.TextConstant(yytext.Substring(1,yytext.Length-2));return (int)Tokens.TextConstant;

\-?[0-9]+ yylval=GODataFilter.NumberConstant(GInt32.Parse(yytext, System.Globalization.CultureInfo.InvariantCulture));return (int)Tokens.NumberConstant;
\-?[0-9]+\.[0-9]+ yylval=GODataFilter.NumberConstant(GDecimal.Parse(yytext, System.Globalization.CultureInfo.InvariantCulture));return (int)Tokens.NumberConstant;

"date"\'[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]\' yylval=GODataFilter.DateConstant(yytext.Substring(5,yytext.Length-6));return (int)Tokens.DateConstant;
"datetime"\'[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]T[0-9][0-9]:[0-9][0-9](:[0-9][0-9](\.[0-9]+)?)?(Z|[+\-][0-9][0-9]:[0-9][0-9])\' yylval=GODataFilter.DatetimeConstant(yytext.Substring(9,yytext.Length-10));return (int)Tokens.DateConstant;
"datetimeoffset"\'[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]T[0-9][0-9]:[0-9][0-9](:[0-9][0-9](\.[0-9]+)?)?(Z|[+\-][0-9][0-9]:[0-9][0-9])\' yylval=GODataFilter.DatetimeConstant(yytext.Substring(15,yytext.Length-16));return (int)Tokens.DateConstant;
[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9] yylval=GODataFilter.DateConstant(yytext);return (int)Tokens.DateConstant;
[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]T[0-9][0-9]:[0-9][0-9](:[0-9][0-9](\.[0-9]+)?)?(Z|[+\-][0-9][0-9]:[0-9][0-9]) yylval=GODataFilter.DatetimeConstant(yytext);return (int)Tokens.DateConstant;

","     return ',';
"("     return '(';
")"     return ')';
"+"     return '+';
"-"     return '-';
"*"     return '*';
"/"     return '/';
//"["     return '[';
//"]"     return ']';

[' \r\t\u000C\n']                 /* ignore whitespace */;
. yyerror("invalid character {0}", yytext); 

 
%%

    public override void yyerror(string format, params object[] args)
    {
        throw new GException(21000096, 23230165, String.Format(format, args));
    }

