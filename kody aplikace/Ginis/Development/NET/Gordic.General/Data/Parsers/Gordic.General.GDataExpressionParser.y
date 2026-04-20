%namespace Gordic.General.DataFilterParser
%visibility internal
%parsertype ExpressionParser
%tokentype Tokens2

%YYSTYPE Gordic.General.GDataFilter.FilterTree

%{
    public Gordic.General.GDataFilter.FilterTree Result;
%}

%start stat

%token '(' ')'
%left OR
%left AND
%right NOT
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

%token IN IS NULL BETWEEN LIKE

%token <Value> TextConstant //"string constant"
%token <Value> NumberConstant //"numeric constant"
%token <Name> ID

%%

stat    :   value { Result=$1; }
        |   EOF  { Result=null; }
        ;
literal : TextConstant | NumberConstant 
        | '-' NumberConstant { $$ = new Gordic.General.GDataFilter.FilterLiteral(new GInt32(-1 * ((GInt32)($2))));}
        ;

value   : ID { $$ = new Gordic.General.GDataFilter.FilterColumn($1);}
        | literal
        | ID '(' in_value_list ')' { $$ = new Gordic.General.GDataFilter.FilterFunc($1,$3);}
        | value '+' value { $$ = new Gordic.General.GDataFilter.FilterArithmetics($1,Gordic.General.GDataFilter.ArithmeticOperator.Plus,$3); }
        | value '-' value { $$ = new Gordic.General.GDataFilter.FilterArithmetics($1,Gordic.General.GDataFilter.ArithmeticOperator.Minus,$3); } 
        | value '*' value { $$ = new Gordic.General.GDataFilter.FilterArithmetics($1,Gordic.General.GDataFilter.ArithmeticOperator.Multiply,$3); }
        | value '/' value { $$ = new Gordic.General.GDataFilter.FilterArithmetics($1,Gordic.General.GDataFilter.ArithmeticOperator.Divide,$3); }
		| '(' value ')' { $$=$2; }
        ;

expr    :   '(' expr ')' { $$ = $2; }
        |   expr OR expr
                { $$ = new Gordic.General.GDataFilter.FilterTreeOr($1,$3); }    
        |   expr AND expr
                { $$ = new Gordic.General.GDataFilter.FilterTreeAnd($1,$3); }
        | nexpr;

nexpr   :   NOT sexpr
                { $$ = new Gordic.General.GDataFilter.FilterTreeNot($2); }
        |   NOT '(' expr ')'
                { $$ = new Gordic.General.GDataFilter.FilterTreeNot($3); }
        |   sexpr;

ve      : value {$$=$1;}
        | sexpr {$$=$1;}
        | '(' sexpr ')' { $$ = $2; }
        ;

sexpr   
//comparison_predicate
        :   value '=' ve
                { $$ = new Gordic.General.GDataFilter.FilterComparisonPredicate($1,Gordic.General.GDataFilter.FilterOperator.Equal,$3); }
        |   value '>' ve
                { $$ = new Gordic.General.GDataFilter.FilterComparisonPredicate($1,Gordic.General.GDataFilter.FilterOperator.Greater,$3); }
        |   value '<' ve
                { $$ = new Gordic.General.GDataFilter.FilterComparisonPredicate($1,Gordic.General.GDataFilter.FilterOperator.Less,$3); }
        |   value LE ve
                { $$ = new Gordic.General.GDataFilter.FilterComparisonPredicate($1,Gordic.General.GDataFilter.FilterOperator.LessOrEqual,$3); }
        |   value GE ve
                { $$ = new Gordic.General.GDataFilter.FilterComparisonPredicate($1,Gordic.General.GDataFilter.FilterOperator.GreaterOrEqual,$3); }
        |   value NE ve
                { $$ = new Gordic.General.GDataFilter.FilterComparisonPredicate($1,Gordic.General.GDataFilter.FilterOperator.NotEqual,$3); }

//null_predicate
        |   value IS NULL     { $$ = new Gordic.General.GDataFilter.FilterNullPredicate($1,true); }
        |   value IS NOT NULL { $$ = new Gordic.General.GDataFilter.FilterNullPredicate($1,false); }

//like_predicate:
        | value LIKE TextConstant { $$ = new Gordic.General.GDataFilter.FilterLikePredicate($1,$3,true); }
        | value NOT LIKE TextConstant { $$ = new Gordic.General.GDataFilter.FilterLikePredicate($1,$4,false); }
        //| value LIKE TextConstant '{' ESCAPE TextConstant '}'
        //| value NOT LIKE TextConstant '{' ESCAPE TextConstant '}'

//exists_predicate:
        //| EXISTS subquery

//quantified_predicate:
        //nemam

//in_predicate:
	    //| value op_not RW_IN subquery
        | value IN '(' in_value_list ')' { $$ = new Gordic.General.GDataFilter.FilterInPredicate($1,(Gordic.General.GDataFilter.FilterValueList)$4,true); }
        | value NOT IN '(' in_value_list ')' { $$ = new Gordic.General.GDataFilter.FilterInPredicate($1,(Gordic.General.GDataFilter.FilterValueList)$5,false); }
//between_predicate:
    	| value BETWEEN value AND value { $$ = new Gordic.General.GDataFilter.FilterBetweenPredicate($1,$3,$5,true); }
    	| value NOT BETWEEN value AND value { $$ = new Gordic.General.GDataFilter.FilterBetweenPredicate($1,$4,$6,false); }

;

in_value_list
        : ve  { $$ = new Gordic.General.GDataFilter.FilterValueList($1); }
    	| in_value_list ',' value { ((Gordic.General.GDataFilter.FilterValueList)$1).Add($3);$$=$1; }
        ;


%%
    public ExpressionParser(string expression) : base(new Scanner()) { ((Scanner)Scanner).SetSource(expression,0); }


