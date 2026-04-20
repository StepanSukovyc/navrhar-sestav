//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.TreePathNotFoundException.cs             </Name>
//    <Description> Se vyvolá, když AddInTree nemůže najit požadovanou cestu.   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using Gordic.General;
using System;
using System.Runtime.Serialization;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Se vyvolá, když AddInTree nemůže najit požadovanou cestu.
    /// </summary>
    [Serializable()]
    public class TreePathNotFoundException : CoreException
    {
        /// <summary>
        /// Konstruktor nové <see cref="TreePathNotFoundException"/>
        /// </summary>
        /// <param name="path">Cesta</param>
        public TreePathNotFoundException(string path)
            : base(string.Format(string.Join(GResources.GetResourceText(29450198), " '{0}' ", GResources.GetResourceText(29450197)), path)) //RC 29450198 : Cesta
        {
        }

        /// <summary>
        /// Konstruktor nové <see cref="TreePathNotFoundException"/>
        /// </summary>
        public TreePathNotFoundException()
            : base()
        {
        }

        /// <summary>
        /// Konstruktor nové <see cref="TreePathNotFoundException"/>
        /// </summary>
        /// <param name="innerException">Vnitřní vyjímka</param>
        /// <param name="message">Obsah zprávy</param>
        public TreePathNotFoundException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        /// <summary>
        /// Deserializace <see cref="TreePathNotFoundException"/>
        /// </summary>
        /// <param name="context"></param>
        /// <param name="info"></param>
        protected TreePathNotFoundException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }
    }
}
