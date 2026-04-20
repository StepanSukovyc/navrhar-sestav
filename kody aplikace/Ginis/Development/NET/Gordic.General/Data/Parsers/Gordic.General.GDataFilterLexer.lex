/*
    DataFilter lex scanner
 */
   
%namespace Gordic.General.DataFilterParser
%visibility internal
%option unicode nofiles caseinsensitive

%{
#pragma warning disable 1591
%}


%%

AND     return (int)Tokens.AND;
OR      return (int)Tokens.OR;
NOT     return (int)Tokens.NOT;
IN      return (int)Tokens.IN;
"LIKE"  return (int)Tokens.LIKE;
"RLIKE" return (int)Tokens.RLIKE;
","     return ',';
IS      return (int)Tokens.IS;
NULL    return (int)Tokens.NULL;
BETWEEN return (int)Tokens.BETWEEN;
=       return '=';
"<"     return '<';
">"     return '>';
==      return '=';
">="    return (int)Tokens.GE;
"<="    return (int)Tokens.LE;
"<>"    return (int)Tokens.NE;
"!="    return (int)Tokens.NE;
"("     return '(';
")"     return ')';
"+"     return '+';
"-"     return '-';
"*"     return '*';
"/"     return '/';
"["     return '[';
"]"     return ']';
[a-zA-Z_][a-zA-Z_0-9]* yylval=new GDataFilter.FilterTreeId(yytext);return (int)Tokens.ID;
\"[^"]*\" yylval=new GDataFilter.FilterLiteral(new GString(yytext.Substring(1,yytext.Length-2)));return (int)Tokens.TextConstant;
\'[^']*\' yylval=new GDataFilter.FilterLiteral(new GString(yytext.Substring(1,yytext.Length-2)));return (int)Tokens.TextConstant;
[\+\-]?[0-9]+          yylval=new GDataFilter.FilterLiteral(GInt32.Parse(yytext, System.Globalization.CultureInfo.InvariantCulture));return (int)Tokens.NumberConstant;
[\+\-]?[0-9]+"."[0-9]+ yylval=new GDataFilter.FilterLiteral(GDecimal.Parse(yytext, System.Globalization.CultureInfo.InvariantCulture));return (int)Tokens.NumberConstant;

[ \t\n\r]+                  /* ignore whitespace */;

%%

    public override void yyerror(string format, params object[] args)
    {
        throw new GException(23200353, 23230165, String.Format(format, args));
    }

