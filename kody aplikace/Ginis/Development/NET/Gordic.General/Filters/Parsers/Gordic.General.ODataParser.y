%namespace Gordic.General.ODataParser
%visibility internal
%parsertype GODataFilterParser
%tokentype Tokens

%YYSTYPE GODataFilter.Tree

%{
    public GODataFilter.Tree Result;
%}

%start stat


%token ODataSignal_METADATA
%token ODataSignal_BATCH
%token ODataSignal_SKIPTOKEN
%token ODataSignal_COUNT

%token Infinity_LUC
%token NotANumber_LXC
%token All_LUC
%token Json_LLC
%token Floor_LLC
%token Xml_LLC
%token Year_LLC
%token Round_LLC
%token GeoLength_LLC
%token GeoDotIntersects_LLC
%token GeoDotDistance_LLC
%token GetTotalOffsetMinutes_LLC
%token Length_LLC
%token Now_LLC
%token None_LLC
%token IndexOf_LLC
%token Sum_LLC
%token Substring_LLC
//%token SubStringOf_LLC
%token Contains_LLC
%token StartsWith_LLC
%token Second_LLC
%token Second_LLC
%token Hour_LLC
%token Hour_LLC
%token Concat_LLC
%token Ceiling_LLC
%token Day_LLC
%token Days_LLC
%token Date_LLC
%token Desc_LLC
%token As_LLC
%token Average_LLC
%token All_LLC
%token AllPages_LLC
%token Any_LLC
%token Asc_LLC
%token Atom_LLC
%token Trim_LLC
%token ToLower_LLC
%token ToUpper_LLC
%token Time_LLC
%token EndsWith_LLC
%token Month_LLC
%token Min_LLC
%token Minute_LLC
%token Minute_LLC
%token MinDateTime_LLC
%token Max_LLC
%token MaxDateTime_LLC


%token And_LLC Or_LLC
%token Eq_LLC Ne_LLC Lt_LLC Le_LLC Gt_LLC Ge_LLC
%token In_LLC Has_LLC
%token Add_LLC Sub_LLC Mul_LLC Div_LLC Mod_LLC
%token Not_LLC
%token IsOf_LLC Cast_LLC
%token Null_LLC True_LLC False_LLC

%token <Value> TextConstant
%token <Value> NumberConstant
%token <Value> DateConstant
%token ID

%token ',' '(' ')'
%token '+' '-' '*' '/'
%token '[' ']'

%%

stat    :   expr { Result=$1; }
        |   EOF  { Result=null; }
        ;

/* ----------------------------------------------------------------------------
 * 6. Literal Data Values
 * ----------------------------------------------------------------------------
 */

primitiveLiteral : null_symbol 
                 |NumberConstant //| decimal 
                 //| single 
                 //| double_symbol 
                 //| sbyte 
                 //| byte_symbol 
                 //| int16 
                 //| int32 
                 //| int64 
                 //| binary 
                 |DateConstant//| date
                 //| dateTimeOffset 
                 //| duration
                 //| guid 
                 |TextConstant //| aString 
                 //| timeOfDay 
                 | boolean_symbol 
/*
                 | enum_symbol
                 | geographyCollection 
                 | geographyLineString 
                 | geographyMultiLineString 
                 | geographyMultiPoint 
                 | geographyMultiPolygon 
                 | geographyPoint 
                 | geographyPolygon 
                 | geometryCollection 
                 | geometryLineString 
                 | geometryMultiLineString 
                 | geometryMultiPoint 
                 | geometryMultiPolygon 
                 | geometryPoint 
                 | geometryPolygon
*/
                 ;

null_symbol : Null_LLC { $$ =  GODataFilter.Null(); };
//null_symbol : Null_LLC ( SQ qualifiedTypeName SQ )?;
       // The optional qualifiedTypeName is used to specify what type this null value should be considered. 
       // Knowing the type is useful for function overload resolution purposes 
                                              
//binary  : (X_LUC|Binary_LAC) SQ (HEXDIG1 HEXDIG1)* SQ; // Note: 'X' is case sensitive, "binary" is not
boolean_symbol : True_LLC { $$ =  GODataFilter.True(); } | False_LLC { $$ =  GODataFilter.False(); };

//decimal     : decimalBody ( M )?;
//decimalBody : (SIGN)? ( Digit )+ (DOT ( Digit )+)?;
//double_symbol      : doubleBody ( D )?;
//doubleBody  : decimalBody ( E (SIGN)? ( Digit )+ )? // TODO: restrict range
//            | nanInfinity;
//single      : singleBody ( F )?;
//singleBody  : decimalBody ( E (SIGN)? ( Digit )+ )? // TODO: restrict range
//            | nanInfinity;
//nanInfinity : NotANumber_LXC | MINUS Infinity_LUC | Infinity_LUC;

//guid     : GUID_LAC SQ guidBody SQ;
//guidBody : HEXDIG8 MINUS HEXDIG4 MINUS HEXDIG4 MINUS HEXDIG4 MINUS HEXDIG12; 

//byte_symbol  : ( DIGIT3 )+; // numbers in the range from 0 to 255
//sbyte : (SIGN)? ( DIGIT3 )+; // numbers in the range from -128 to 127
//int16 : (SIGN)? ( DIGIT5 )+; // numbers in the range from -32768 to 32767        
//int32 : (SIGN)? ( DIGIT10 )+; // numbers in the range from -2147483648 to 2147483647
//int64 : int64Body (I64_POSTFIX)?;
//int64Body : (SIGN)? ( DIGIT19 )+; // numbers in the range from -9223372036854775808 to 9223372036854775807

/*
aString           : SQ ( pCharNoSingleQuote | SingleQuoteEscapedInString | Unencoded )* SQ;
pCharNoSingleQuote  : Unreserved 
                    | PctEncoded 
                    | OtherDelims 
                    | DOLLAR 
                    | AMPERSAND 
                    | SEMI 
                    | EQ 
                    | COLON 
                    | AT_SIGN 
                    ; // also no percent-encoded single quote
SingleQuoteEscapedInString : SQ SQ;  // two quotes represent one within string literal
*/
/*
date     : Date_LAC SQ dateBody SQ;
dateBody : year MINUS month MINUS day;

dateTimeOffset     : DateTimeOffset_LAC SQ dateTimeOffsetBody SQ;
dateTimeOffsetBody : year MINUS month MINUS day T_LUC hour COLON minute ( COLON second ( DOT fractionalSeconds )? )? ( Z_LUC | SIGN hour COLON minute );
    // COMMENT_ANTLR: ISO 8601 says T and not [Tt] separating Date and Time in DateTime
    // COMMENT_ANTLR: ISO 8601 says Z and not [Zz] indicating UTC (Zulu time ie.)
*/
/*
duration     : Duration_LAC SQ durationBody SQ;
durationBody : ( SIGN )? P_LUC ( ( Digit )+ D_LUC )? ( T_LUC ( ( Digit )+ H_LUC )? ( ( Digit )+ M_LUC )? ( ( Digit )+ ( DOT ( Digit )+ )? S_LUC )? )?;
     // the above is an approximation of the rules for an xml dayTimeDuration.
     // see the lexical representation for dayTimeDuration in http://www.w3.org/TR/xmlschema11-2#dayTimeDuration for more information
     // COMMENT_ANTLR: ISO 8601 also PDTHMS indicators as uppercase

timeOfDay     : TimeOfDay_LAC SQ timeOfDayBody SQ; 

timeOfDayBody : hour COLON minute ( COLON second ( DOT fractionalSeconds )?)?;
 
year  : ( Digit ) ( Digit ) ( Digit ) ( Digit );

month : ZERO ONE_TO_NINE
        | ONE ZERO_TO_TWO;

day   : ZERO_TO_TWO ONE_TO_NINE
      | THREE ZERO_TO_ONE;

hour   : ZERO_TO_ONE ( Digit )
       | TWO ONE_TO_THREE; 

minute : ZERO_TO_FIFTY_NINE;

second : ZERO_TO_FIFTY_NINE;       
fractionalSeconds : ( Digit )+;
*/
/*
enum_symbol      : qualifiedEnumerationTypeName SQ enumBody SQ;

enumBody  : enumValue ( COMMA enumValue )*;

enumValue : enumerationMember | int64Body;

geographyCollection   : geographyPrefix fullCollectionLiteral SQ;
fullCollectionLiteral : sridLiteral collectionLiteral;
collectionLiteral     : CollectionOP_LAC geoLiteral ( COMMA geoLiteral )* CP;
geoLiteral            : collectionLiteral
                      | lineStringLiteral
                      | multiPointLiteral
                      | multiLineStringLiteral
                      | multiPolygonLiteral
                      | pointLiteral
                      | polygonLiteral;

geographyLineString   : geographyPrefix fullLineStringLiteral SQ;
fullLineStringLiteral : sridLiteral lineStringLiteral;
lineStringLiteral     : LineString_LAC lineStringData;
lineStringData        : OP positionLiteral ( COMMA positionLiteral )+ CP;

geographyMultiLineString   : geographyPrefix fullMultiLineStringLiteral SQ;
fullMultiLineStringLiteral : sridLiteral multiLineStringLiteral;

multiLineStringLiteral     : MultiLineStringOP_LAC ( lineStringData ( COMMA lineStringData )* )? CP;

geographyMultiPoint   : geographyPrefix fullMultiPointLiteral SQ;

fullMultiPointLiteral : sridLiteral multiPointLiteral;
multiPointLiteral     : MultiPointOP_LAC ( pointData *( COMMA pointData ) )? CP;

geographyMultiPolygon   : geographyPrefix fullMultiPolygonLiteral SQ;

fullMultiPolygonLiteral : sridLiteral multiPolygonLiteral;
multiPolygonLiteral     : MultiPolygonOP_LAC ( polygonData ( COMMA polygonData )* )? CP;

geographyPoint   : geographyPrefix fullPointLiteral SQ;
fullPointLiteral : sridLiteral pointLiteral;

sridLiteral      : SRID_LAC EQ ( DIGIT5 )+ SEMI;
pointLiteral     : Point_LAC pointData;
pointData        : OP positionLiteral CP;
positionLiteral  : double_symbol SP double_symbol;  // longitude, then latitude

geographyPolygon   : geographyPrefix fullPolygonLiteral SQ;
fullPolygonLiteral : sridLiteral polygonLiteral;

polygonLiteral     : Polygon_LAC polygonData;
polygonData        : OP ringLiteral   ( COMMA ringLiteral )* CP;
ringLiteral        : OP positionLiteral ( COMMA positionLiteral )* CP;

// Within each ringLiteral, the first and last positionLiteral elements MUST be an exact syntactic match to each other.
// Within the polygonData, the ringLiterals MUST specify their points in appropriate winding order. 
// In order of traversal, points to the left side of the ring are interpreted as being in the polygon.

geometryCollection      : geometryPrefix fullCollectionLiteral      SQ;

geometryLineString      : geometryPrefix fullLineStringLiteral      SQ;
geometryMultiLineString : geometryPrefix fullMultiLineStringLiteral SQ;
geometryMultiPoint      : geometryPrefix fullMultiPointLiteral      SQ;

geometryMultiPolygon    : geometryPrefix fullMultiPolygonLiteral    SQ;
geometryPoint           : geometryPrefix fullPointLiteral           SQ;

geometryPolygon         : geometryPrefix fullPolygonLiteral SQ;


geographyPrefix : Geography_LAC SQ;
geometryPrefix  : Geometry_LAC SQ;
*/


/*
;------------------------------------------------------------------------------
; 4. Expressions
;------------------------------------------------------------------------------
andExpr = RWS "and" RWS boolCommonExpr
orExpr  = RWS "or"  RWS boolCommonExpr

eqExpr = RWS "eq" RWS commonExpr     
neExpr = RWS "ne" RWS commonExpr
ltExpr = RWS "lt" RWS commonExpr
leExpr = RWS "le" RWS commonExpr
gtExpr = RWS "gt" RWS commonExpr
geExpr = RWS "ge" RWS commonExpr
inExpr = RWS "in" RWS commonExpr

hasExpr = RWS "has" RWS enum

addExpr   = RWS "add"   RWS commonExpr
subExpr   = RWS "sub"   RWS commonExpr
mulExpr   = RWS "mul"   RWS commonExpr
divExpr   = RWS "div"   RWS commonExpr
divbyExpr = RWS "divby" RWS commonExpr
modExpr   = RWS "mod"   RWS commonExpr

negateExpr = "-" BWS commonExpr

notExpr = "not" RWS boolCommonExpr

isofExpr = "isof" OPEN BWS [ commonExpr BWS COMMA BWS ] optionallyQualifiedTypeName BWS CLOSE
castExpr = "cast" OPEN BWS [ commonExpr BWS COMMA BWS ] optionallyQualifiedTypeName BWS CLOSE
*/


value   : ID { $$ = $1;}
        | primitiveLiteral
//        | value '+' value { throw new GNotImplementedException(); }
//        | value '-' value { throw new GNotImplementedException(); } 
//        | value '*' value { throw new GNotImplementedException(); }
//        | value '/' value { throw new GNotImplementedException(); }
		| '(' value ')' { $$=$2; }
        ;

expr    :   '(' expr ')' { $$ = $2; }
        |   expr Or_LLC nexpr
                { $$ = GODataFilter.Or($1,$3); }    
        |   expr And_LLC nexpr
                { $$ =  GODataFilter.And($1,$3); }
        | nexpr;

nexpr   :   Not_LLC sexpr
                { $$ = GODataFilter.Not($2); }
        |   Not_LLC '(' expr ')'
                { $$ = GODataFilter.Not($3); }
        | boolMethodCallExpr
        |   sexpr;

ve      : value {$$=$1;}
        | sexpr {$$=$1;}
        | '(' sexpr ')' { $$ = $2; }
        ;

sexpr   
//comparison_predicate
        :   value Eq_LLC ve
                { $$ = GODataFilter.Eq($1,$3); }
        |   value Gt_LLC ve
                { $$ = GODataFilter.Gt($1,$3); }
        |   value Lt_LLC ve
                { $$ = GODataFilter.Lt($1,$3); }
        |   value Le_LLC ve
                { $$ = GODataFilter.Le($1,$3); }
        |   value Ge_LLC ve
                { $$ = GODataFilter.Ge($1,$3); }
        |   value Ne_LLC ve
                { $$ = GODataFilter.Ne($1,$3); }
        |   value In_LLC '(' in_value_list ')'
                { $$ = GODataFilter.In($1,$4); }
;     

in_value_list
        : ve  { $$ = new GODataFilter.TreeValueList($1); }
    	| in_value_list ',' value { ((GODataFilter.TreeValueList)$1).Add($3);$$=$1; }
        ;


boolMethodCallExpr : endsWithMethodCallExpr 
                   | startsWithMethodCallExpr 
                   | containsMethodCallExpr
//                   | substringOfMethodCallExpr
//                   | intersectsMethodCallExpr
                   ; 
//substringOfMethodCallExpr : SubStringOf_LLC '('  value   ','  ve  ')' { $$ = GODataFilter.SubstringOf($3,$5); };
containsMethodCallExpr : Contains_LLC '('  value   ','  ve  ')' { $$ = GODataFilter.Contains($3,$5); };
startsWithMethodCallExpr  : StartsWith_LLC  '('  value   ','  ve  ')' { $$ = GODataFilter.StartsWith($3,$5); };
endsWithMethodCallExpr    : EndsWith_LLC    '('  value   ','  ve  ')' { $$ = GODataFilter.EndsWith($3,$5); };
//lengthMethodCallExpr      : Length_LLC      OP  ( XWS )* commonExpr  ( XWS )* CP;
//indexOfMethodCallExpr     : IndexOf_LLC     OP  ( XWS )* commonExpr  ( XWS )* COMMA  ( XWS )* commonExpr  ( XWS )* CP;
//substringMethodCallExpr   : Substring_LLC   OP  ( XWS )* commonExpr  ( XWS )* COMMA  ( XWS )* commonExpr (  ( XWS )* COMMA  ( XWS )* commonExpr  ( XWS )* )? CP;
//toLowerMethodCallExpr     : ToLower_LLC     OP  ( XWS )* commonExpr  ( XWS )* CP ;
//toUpperMethodCallExpr     : ToUpper_LLC     OP  ( XWS )* commonExpr  ( XWS )* CP ;
//trimMethodCallExpr        : Trim_LLC        OP  ( XWS )* commonExpr  ( XWS )* CP ;
//concatMethodCallExpr      : Concat_LLC      OP  ( XWS )* commonExpr  ( XWS )* COMMA  ( XWS )* commonExpr  ( XWS )* CP;


%%
    public GODataFilterParser(string expression) : base(new Scanner()) { ((Scanner)Scanner).SetSource(expression,0); }


