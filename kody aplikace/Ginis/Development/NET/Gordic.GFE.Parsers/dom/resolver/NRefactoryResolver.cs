//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.NRefactoryResolver.cs                    </Name>
//    <Description> popis třídy                                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-08-02                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.Parsers.Refactoring;
using Gordic.General;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers.Dom.Resolver
{
    /// <summary>
    /// popis třídy
    /// </summary>
    public class NRefactoryResolver : IResolver
    {
        /// <exclude/>
        public ResolveResult Resolve(ExpressionResult expressionResult,
                                     ParseInformation parseInfo,
                                     string fileContent)
        {
            if (!Initialize(parseInfo, expressionResult.Region.BeginLine, expressionResult.Region.BeginColumn))
                return null;

            return null;
        }

        readonly LanguageProperties languageProperties;
        /// <summary>
        /// vlastnosti jazyka
        /// </summary>
        public LanguageProperties LanguageProperties { get { return languageProperties; } }
        readonly SupportedLanguage language;
        int caretLine;
        int caretColumn;
        ICompilationUnit cu;
        IFileContent fileContent;
        readonly static string tokensPath = "/TextEditor/Tokens";

        /// <summary>
        /// obsah souboru
        /// </summary>
        public IFileContent FileContent
        {
            get { return fileContent; }
            set
            {
                fileContent = value ?? throw new ArgumentNullException("value");
            }
        }
        /// <summary>
        /// volaný člen
        /// </summary>
        public IMember CallingMember { get => null; }
        /// <summary>
        /// aktuální řádek
        /// </summary>
        public int CaretLine { get { return caretLine; } }
        /// <summary>
        /// aktuální sloupec
        /// </summary>
        public int CaretColumn { get { return caretColumn; } }

        /// <summary>
        /// analyzovaná kompilační jednotka
        /// </summary>
        public ICompilationUnit CompilationUnit { get { return cu; } }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="languageProperties"></param>
        public NRefactoryResolver(LanguageProperties languageProperties)
        {
            this.languageProperties = languageProperties ?? throw new ArgumentNullException(GResources.GetResourceText(29450328));
            if (languageProperties is Dom.LanguageProperties.GRFProperties)
                language = SupportedLanguage.GRF;
            else if (languageProperties is Dom.LanguageProperties.GRRProperties)
                language = SupportedLanguage.GRR;
            else if (languageProperties is Dom.LanguageProperties.RTFProperties)
                language = SupportedLanguage.RTF;
            else if (languageProperties is Dom.LanguageProperties.MSEProperties)
                language = SupportedLanguage.MSE;
            else if (languageProperties is Dom.LanguageProperties.OXSProperties)
                language = SupportedLanguage.OXS;
            else
                throw new NotSupportedException(string.Join(" ", GResources.GetResourceText(29450329), languageProperties.ToString(), GResources.GetResourceText(29450164))); //RC 29450329 : Jazyk
        }
        /// <summary>
        /// inicializace
        /// </summary>
        /// <param name="parseInfo"></param>
        /// <param name="caretLine"></param>
        /// <param name="caretColumn"></param>
        /// <returns></returns>
        public bool Initialize(ParseInformation parseInfo, int caretLine, int caretColumn)
        {
            this.caretLine = caretLine;
            this.caretColumn = caretColumn;

            if (parseInfo == null)
                return false;

            cu = parseInfo.MostRecentCompilationUnit;
            if (cu == null || cu.FileContent == null)
                return false;
            this.FileContent = cu.FileContent;

            if (cachClassTokens == null)
                InitializeClassTokens();
            return true;
        }

        void InitializeClassTokens()
        {
            cachClassTokens = new Dictionary<ExpressionContext, ALFAVTokens>();

            ArrayList tokens = AddInTree.GetTreeNode(tokensPath).BuildChildItems(this);
            foreach (TokensDescriptor token in tokens)
                if (token != null 
                    && !cachClassTokens.ContainsKey(token.Context))
                    cachClassTokens.Add(token.Context, token.Tokens);
        }

        Dictionary<SupportedLanguage, Dictionary<ExpressionContext, ArrayList>> cachKeyWords = new Dictionary<SupportedLanguage, Dictionary<ExpressionContext, ArrayList>>();
        /// <summary>
        /// seznam tříd klíčů
        /// </summary>
        Dictionary<ExpressionContext, ALFAVTokens> cachClassTokens;
        /// <summary>
        /// reakce na stisknutí Ctrl+Space
        /// </summary>
        /// <param name="caretLine"></param>
        /// <param name="caretColumn"></param>
        /// <param name="parseInfo"></param>
        /// <param name="fileContent"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public ArrayList CtrlSpace(int caretLine, int caretColumn, ParseInformation parseInfo, string fileContent, ExpressionContext context)
        {
            if (!Initialize(parseInfo, caretLine, caretColumn))
                return null;

            if (context == null)
                return null;

            if (!cachKeyWords.ContainsKey(language)
                || !cachKeyWords[language].ContainsKey(context)
                || cachKeyWords[language][context].Count == 0)
            {
                if (!cachKeyWords.ContainsKey(language))
                    switch (language)
                    {
                        case SupportedLanguage.GRF:
                            cachKeyWords.Add(language, new Dictionary<ExpressionContext, ArrayList>());
                            break;
                        case SupportedLanguage.GRR:
                            cachKeyWords.Add(language, new Dictionary<ExpressionContext, ArrayList>());
                            break;
                        case SupportedLanguage.RTF:
                            cachKeyWords.Add(language, new Dictionary<ExpressionContext, ArrayList>());
                            break;
                        case SupportedLanguage.MSE:
                            cachKeyWords.Add(language, new Dictionary<ExpressionContext, ArrayList>());
                            break;
                        default:
                            cachKeyWords.Add(language, new Dictionary<ExpressionContext, ArrayList>());
                            break;
                    }

                if (cachKeyWords[language].ContainsKey(context)
                    && cachKeyWords[language][context].Count == 0)
                    cachKeyWords[language].Remove(context);

                if (!cachKeyWords[language].ContainsKey(context))
                    if (cachClassTokens.ContainsKey(context) && context.Cach)
                        cachKeyWords[language].Add(context, cachClassTokens[context].Items);
                    else if (cachClassTokens.Keys.ToList().Exists(key => key.GetType().Equals(context.GetType())))
                    {
                        ExpressionContext ec = cachClassTokens.Keys.First(key => key.GetType().Equals(context.GetType()));
                        ALFAVTokens tk = cachClassTokens[ec];
                        cachClassTokens.Remove(ec);
                        cachClassTokens.Add(context, tk);

                        if (context.Cach)
                        {
                            // aktualizace slovíček
                            if (cachKeyWords[language].Keys.ToList().Exists(key => key.GetType().Equals(context.GetType())))
                            {
                                ec = cachKeyWords[language].Keys.First(key => key.GetType().Equals(context.GetType()));
                                cachKeyWords[language].Remove(ec);
                            }

                            cachKeyWords[language].Add(context, tk.Items);
                        }
                        else return tk.Items;
                    }
                    else
                        switch (language)
                        {
                            case SupportedLanguage.GRR:
                            case SupportedLanguage.GRF:
                            case SupportedLanguage.RTF:
                            case SupportedLanguage.MSE:
                                var aTokens = new ALFTokens();
                                aTokens.Initialize();
                                cachKeyWords[language].Add(context, ALFKeywords(aTokens, context));
                                break;
                            default:
                                cachKeyWords[language].Add(context, new ArrayList());
                                break;
                        }
            }

            return cachKeyWords[language][context];
        }

        ArrayList ALFKeywords(dynamic tokens, ExpressionContext context)
        {
            ArrayList result = new ArrayList();
            BitArray keywords = tokens.GetKeywordsByContext(context);

            for (int index = 0; index < keywords.Length; index++)
                if (keywords[index])
                    result.Add(tokens.GetTokenObject(index, context));

            return result;
        }
    }
}
