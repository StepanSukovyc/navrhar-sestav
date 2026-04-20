//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.PreprocessingDirective.cs                </Name>
//    <Description> směrnice speciálu                                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-08-02                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.GFE.Parsers.Refactoring.Special
{
    /// <summary>
    /// směrnice speciálu
    /// </summary>
    public class PreprocessingDirective : AbstractSpecial
    {
        string cmd;
        string arg;
        //Expression expression = Expression.Null;

        /// <summary>
        /// Získání direktivy, včetně '#'.
        /// </summary>
        public string Cmd
        {
            get { return cmd; }
            set { cmd = value ?? string.Empty; }
        }

        /// <summary>
        /// Argument direktivy
        /// </summary>
        public string Arg
        {
            get { return arg; }
            set { arg = value ?? string.Empty; }
        }

        ///// <summary>
        ///// Získání a nastavení výrazu (pro direktivy jsou to výrazy, např. #if a #elif).
        ///// </summary>
        //public Expression Expression
        //{
        //    get { return expression; }
        //    set { expression = value ?? Expression.Null; }
        //}

        /// <value>
        /// Konec 58dku direktivy.
        /// </value>
        public Location LastLineEnd { get; set; }

        /// <exclude/>
        public override string ToString()
        {
            return String.Format("[PreprocessingDirective: Cmd = {0}, Arg = {1}]", Cmd, Arg);
        }
        /// <summary>
        /// vztvoření nové instance třídy
        /// </summary>
        /// <param name="cmd"></param>
        /// <param name="arg"></param>
        /// <param name="start"></param>
        /// <param name="end"></param>
        public PreprocessingDirective(string cmd, string arg, Location start, Location end)
            : base(start, end)
        {
            this.Cmd = cmd;
            this.Arg = arg;
        }
        /// <exclude/>
        public override object AcceptVisitor(ISpecialVisitor visitor, object data)
        {
            return visitor.Visit(this, data);
        }
    }
}
