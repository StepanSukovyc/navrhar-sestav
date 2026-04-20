//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.BlankLine.cs                             </Name>
//    <Description> prázdný řádek                                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-08-02                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Refactoring.Special
{
    /// <summary>
    /// prázdný řádek
    /// </summary>
    public class BlankLine : AbstractSpecial
    {
        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="point"></param>
        public BlankLine(Location point)
            : base(point)
        {
        }
        /// <summary>
        /// akceptace návštěvy
        /// </summary>
        /// <param name="visitor"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public override object AcceptVisitor(ISpecialVisitor visitor, object data)
        {
            return visitor.Visit(this, data);
        }
    }
}
