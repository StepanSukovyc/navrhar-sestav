//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ClassMaker.cs                           </Name>
//    <Description> Vytvoření instance objektu určité třídy.                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.Collections;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Vytvoření instance objektu určité třídy.
    /// </summary>
    /// <attribute name="class" use="required">
    /// Úplný název třídy objektu
    /// </attribute>
    /// <usage>Všude kde se očekávají objekty.</usage>
    /// <returns>
    /// Jakýkoliv typ objektu.
    /// </returns>
    public class ClassMaker : IMaker
    {
        /// <exclude/>
        public bool HandleConditions { get { return false; } }

        /// <summary>
        /// Vytvoření položky
        /// </summary>
        /// <param name="caller"></param>
        /// <param name="entity">Větev konfiguračního stromu</param>
        /// <param name="subItems">Případné podpoložky</param>
        /// <returns></returns>
        public object BuildItem(object caller, Entity entity, ArrayList subItems)
        {
            return entity.AddIn.CreateObject(entity.Properties["class"]);
        }
    }
}
