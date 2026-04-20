/*
    DataTemplate lex scanner
 */
   
%namespace Gordic.General.DataTemplateParser
%visibility internal
%option unicode nofiles

%x REP
%x FORM
%x AGR
idchr1 [a-zA-Z_#]
idchr2 [a-zA-Z_0-9]

%{
#pragma warning disable 1591
%}


%%

<INITIAL>"{"     BEGIN(REP);return '{';
<INITIAL>[^{]+ if(yytext.Length==0) return (int)Tokens.EOF; yylval=new GDataTemplate.TemplateText(yytext);return (int)Tokens.Text;
<REP,FORM>"}"     BEGIN(INITIAL);return '}';
<REP>":"     BEGIN(FORM);return ':';
<REP>"sum(" | 
<REP>"min(" |
<REP>"max(" |
<REP>"avg(" |
<REP>"count(" |
<REP>"countnn(" |
<REP>"firstnn(" |
<REP>"lastnn(" BEGIN(AGR); yylval=new GDataTemplate.TemplateId(yytext.TrimEnd('(')+"!");
<AGR>")" BEGIN(REP);return (int)Tokens.ID;
<AGR>{idchr1}{idchr2}* ((GDataTemplate.TemplateId)yylval).AppendName(yytext);
<REP>{idchr1}{idchr2}* yylval=new GDataTemplate.TemplateId(yytext);return (int)Tokens.ID;
//<REP>\"[^"]*\" yylval=new GDataTemplate.TemplateLiteral(new GString(yytext.Substring(1,yytext.Length-2)));return (int)Tokens.TextConstant;
//<REP>\'[^']*\' yylval=new GDataTemplate.TemplateLiteral(new GString(yytext.Substring(1,yytext.Length-2)));return (int)Tokens.TextConstant;
<REP>[0-9]+ yylval=new GDataTemplate.TemplateNumber(yytext);return (int)Tokens.NumberConstant;
<REP>[ \t\n\r]+                  /* ignore whitespace */;
<REP>[(),+\-*/] return (int)yytext[0];
<REP>. { throw new ArgumentException("Invalid character input");}

<FORM>[^}]* yylval=new GDataTemplate.TemplateFormat(yytext);return (int)Tokens.Format;

%%

    public override void yyerror(string format, params object[] args)
    {
        throw new GException(21000008, 23230165, String.Format(format, args));
    }

