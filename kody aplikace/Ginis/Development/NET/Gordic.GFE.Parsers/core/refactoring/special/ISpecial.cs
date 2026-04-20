//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ISpecial.cs                              </Name>
//    <Description> rozhraní všech speciálů.                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-08-02                                                  </Created>
//  </FileHeader>

using Gordic.General;
using System;

namespace Gordic.GFE.Parsers.Refactoring.Special
{
    /// <summary>
    /// rozhraní všech speciálů.
    /// </summary>
    public interface ISpecial
    {
        /// <summary>
        /// pozice začátku
        /// </summary>
        Location StartPosition { get; }
        /// <summary>
        /// pozice konce
        /// </summary>
        Location EndPosition { get; }
        /// <summary>
        /// akceptace navštívenosti speciálu
        /// </summary>
        /// <param name="visitor"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        object AcceptVisitor(ISpecialVisitor visitor, object data);
    }

    /// <summary>
    /// rozhraní "návštěvníka" speciálu
    /// </summary>
    public interface ISpecialVisitor
    {
        /// <summary>
        /// návštěva speciálu
        /// </summary>
        /// <param name="special"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        object Visit(ISpecial special, object data);
        /// <summary>
        /// návštěva prázdného řádku
        /// </summary>
        /// <param name="special"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        object Visit(BlankLine special, object data);
        /// <summary>
        /// návštěva komentáře
        /// </summary>
        /// <param name="special"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        object Visit(Comment special, object data);
        /// <summary>
        /// návštěva směrnice
        /// </summary>
        /// <param name="special"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        object Visit(PreprocessingDirective special, object data);
    }
    /// <summary>
    /// třída abstraktního speciálu
    /// </summary>
    public abstract class AbstractSpecial : ISpecial
    {
        /// <exclude/>
        public Location StartPosition { get; set; }
        /// <exclude/>
        public Location EndPosition { get; set; }
        /// <summary>
        /// akceptace návštěvy
        /// </summary>
        /// <param name="visitor"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public abstract object AcceptVisitor(ISpecialVisitor visitor, object data);
        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="position">pozice speciálu</param>
        protected AbstractSpecial(Location position)
        {
            this.StartPosition = position;
            this.EndPosition = position;
        }
        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="startPosition">startovní pozice pseciálu</param>
        /// <param name="endPosition">pozice konce speciálu</param>
        protected AbstractSpecial(Location startPosition, Location endPosition)
        {
            this.StartPosition = startPosition;
            this.EndPosition = endPosition;
        }

        /// <exclude/>
        public override string ToString()
        {
            return String.Format(string.Join(" ", "[{0}:", GResources.GetResourceText(29450227), "={1};", GResources.GetResourceText(29450174), "={2}]"), //RC 29450174 : konec
                                 GetType().Name, StartPosition, EndPosition);
        }
    }
}
