//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.TokensDescriptor.cs                      </Name>
//    <Description> Popis klíčů                                                 </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-11-27                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.Parsers.Refactoring;
using Gordic.General;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Popis klíčů
    /// </summary>
    public class TokensDescriptor
    {
        readonly string @contextClass;
        /// <summary>
        /// Název třídy kontextu
        /// </summary>
        public string ContextClass { get { return @contextClass; } }

        ExpressionContext context;
        /// <summary>
        /// Obsah záložky
        /// </summary>
        public ExpressionContext Context
        {
            get
            {
                CreateContext();
                return context;
            }
        }

        readonly string @tokensClass;
        /// <summary>
        /// Název třídy kontextu
        /// </summary>
        public string TokensClass { get { return @tokensClass; } }

        ALFAVTokens tokens;
        /// <summary>
        /// Obsah záložky
        /// </summary>
        public ALFAVTokens Tokens
        {
            get
            {
                CreateTokens();
                return tokens;
            }
        }

        bool contextCreated, tokensCreated;
        AddIn addIn;

        /// <summary>
        /// Vytvoření nové podložky z konfiguračního strom
        /// </summary>
        /// <param name="entity">Větev konfiguračního stromu.</param>
        public TokensDescriptor(Entity entity)
        {
            addIn = entity.AddIn;

            @contextClass = entity.Properties["context"];
            @tokensClass = entity.Properties["tokens"];
        }

        /// <summary>
        /// Vytvoření contextu
        /// </summary>
        public void CreateContext()
        {
            if (!contextCreated)
            {
                contextCreated = true;
                try
                {
                    if (addIn != null)
                    {
                        LoggingService.DebugFormatted(GResources.GetResourceText(29450741) + " '{0}'...", ContextClass);
                        context = (ExpressionContext)addIn.CreateObject(ContextClass);
                    }
                }
                catch (Exception ex) { MessageService.ShowError(ex, string.Format(GResources.GetResourceText(29450742) + " '{0}'!", ContextClass)); }
            }
        }

        /// <summary>
        /// Vytvoření contextu
        /// </summary>
        public void CreateTokens()
        {
            if (!tokensCreated)
            {
                tokensCreated = true;
                try
                {
                    if (addIn != null)
                    {
                        LoggingService.DebugFormatted(GResources.GetResourceText(29450743) + " '{0}'...", TokensClass);
                        tokens = (ALFAVTokens)addIn.CreateObject(@tokensClass);
                    }
                }
                catch (Exception ex) { MessageService.ShowError(ex, string.Format(GResources.GetResourceText(29450744) + " '{0}'!", TokensClass)); }
            }
        }
    }
}
