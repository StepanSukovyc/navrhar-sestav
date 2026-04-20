//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.tokens.cs                                </Name>
//    <Description> specifické klíče doplňování.                                </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-01-22                                                  </Created>
//  </FileHeader>

using System.Collections;

namespace Gordic.GFE.Parsers.Refactoring
{
    /// <summary>
    /// společná třída argumentů
    /// </summary>
    public abstract class ALFAVTokens
    {
        protected ArrayList items;
        /// <summary>
        /// položky klíče
        /// </summary>
        public virtual ArrayList Items
        {
            get
            {
                if (items == null)
                    _Initialize();
                return items;
            }
        }

        /// <summary>
        /// inicializace seznamu klíčů
        /// </summary>
        abstract protected void _Initialize();

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        public ALFAVTokens() { }
    }

    /// <summary>
    /// prázdná množina
    /// </summary>
    public sealed class EmptyTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
    {
        bool initialized = false;
        /// <summary>
        /// položky klíče
        /// </summary>
        public override System.Collections.ArrayList Items
        {
            get
            {
                if (!initialized)
                    _Initialize();
                return base.Items;
            }
        }
        /// <summary>
        /// inicializace seznamu klíčů
        /// </summary>
        protected override void _Initialize() { items = new System.Collections.ArrayList(); initialized = true; }
    }

}
