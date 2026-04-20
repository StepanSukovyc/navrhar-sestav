//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ResolveResult.cs                         </Name>
//    <Description> základní třída všech možných výsledků                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-27                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.Dom;

namespace Gordic.GFE.Parsers.Binding
{
    /// <summary>
    /// základní třída všech možných výsledků
    /// </summary>
    public class ResolveResult : AbstractFreezable, ICloneable
    {
        /// <summary>
        /// klon objektu
        /// </summary>
        /// <returns></returns>
        public virtual ResolveResult Clone() { return new ResolveResult(callingMember); }

        object ICloneable.Clone() { return this.Clone(); }

        readonly IMember callingMember;
        /// <summary>
        /// člen, obsahující výraz, který volá daný ResolveResult.
        /// </summary>
        public IMember CallingMember { get { return callingMember; } }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="callingMember">volaný člen</param>
        public ResolveResult(IMember callingMember)
        {
            this.callingMember = callingMember;
        }
    }
}
