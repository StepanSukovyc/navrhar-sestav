%namespace Gordic.General.DataTemplateParser
%visibility internal
%parsertype TemplateParser

%YYSTYPE Gordic.General.GDataTemplate.TemplateTree

%{
    public Gordic.General.GDataTemplate.TemplateTree Result;
%}

%start stat

%token '{' '}' ':'
%left '/' '*'
%left '+' '-'
%left '='
%left NE "<>"
%left '>'
%left '<'
%left GE ">="
%left LE "<="
%left '+'
%left '-'
%left '*'
%left '/'

%token TextConstant //"string constant"
%token NumberConstant //numeric constant
%token ID
%token Text
%token Format

%%

stat    :   text { Result=$1; }
        ;

text1   :   Text
        |   '{' NumberConstant form '}' {$$=Gordic.General.GDataTemplate.TemplateFormat.Set($2,$3);}
        |   '{' expr form '}' {$$=Gordic.General.GDataTemplate.TemplateFormat.Set($2,$3);}
        |   '{' NumberConstant '}' {$$=new Gordic.General.GDataTemplate.TemplateColumnByIndex((Gordic.General.GDataTemplate.TemplateNumber)$2);}
        |   '{' expr '}' {$$=$2;}
		;
text    :   text1 {$$=new Gordic.General.GDataTemplate.TemplateTextList($1);}
        |   text1 text {$$=new Gordic.General.GDataTemplate.TemplateTextList($1,(Gordic.General.GDataTemplate.TemplateTextList)$2);}
		;

form    : ':' Format {$$=$2;}
		;

literal : TextConstant | NumberConstant 
        | '-' NumberConstant { $$ = Gordic.General.GDataTemplate.TemplateNumber.Negate((Gordic.General.GDataTemplate.TemplateNumber)$2); }
        ;

value  : expr|literal;

expr    : ID { $$ = new Gordic.General.GDataTemplate.TemplateColumn((Gordic.General.GDataTemplate.TemplateId)$1);}
        | ID '(' in_value_list ')' { $$ = new Gordic.General.GDataTemplate.TemplateFunc((Gordic.General.GDataTemplate.TemplateId)$1,$3);}
        | value '+' value { $$ = new Gordic.General.GDataTemplate.TemplateArithmetics($1,Gordic.General.GDataTemplate.ArithmeticOperator.Plus,$3); }
        | value '-' value { $$ = new Gordic.General.GDataTemplate.TemplateArithmetics($1,Gordic.General.GDataTemplate.ArithmeticOperator.Minus,$3); } 
        | value '*' value { $$ = new Gordic.General.GDataTemplate.TemplateArithmetics($1,Gordic.General.GDataTemplate.ArithmeticOperator.Multiply,$3); }
        | value '/' value { $$ = new Gordic.General.GDataTemplate.TemplateArithmetics($1,Gordic.General.GDataTemplate.ArithmeticOperator.Divide,$3); }
		| '(' value ')' { $$=$2; }
        ;

in_value_list
        : value  { $$ = new Gordic.General.GDataTemplate.TemplateValueList($1); }
    	| in_value_list ',' value { ((Gordic.General.GDataTemplate.TemplateValueList)$1).Add($3);$$=$1; }
        ;



%%
    public TemplateParser(string expression) : base(new Scanner()) { ((Scanner)Scanner).SetSource(expression,0); }


