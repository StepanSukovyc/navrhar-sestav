//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ApplicationInterface.GOrderBy.cs             </Name>
//    <Description> OrderBy - struktura pøedepisující jak se má øadit seznam    </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2006-01-19                                                  </Created>
//  </FileHeader>

using System;
using System.Data;
using Gordic.General;

namespace Gordic.General
{

    //---------------------------------------------------------------------
    /// <summary>
    /// OrderBy - struktura pøedepisující jak se má øadit seznam
    /// </summary>
    [Serializable]
    [Newtonsoft.Json.JsonConverter(typeof(GOrderByJsonConverter))]
    public class GOrderBy<TColumnId> : IGObject, ICloneable, IGOrderBy
         where TColumnId : Enum
    {
        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor z identifikace sloupce a smìru øazení
        /// </summary>
        /// <param name="columnId">identifikace sloupce</param>
        /// <param name="direction">smìr øazení</param>
        public GOrderBy(TColumnId columnId, OrderDirection direction)
        {
            Direction = direction;
            ColumnId = columnId;
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Konstruktor z identifikace sloupce, smìr øazení je vzestupnì
        /// </summary>
        /// <param name="columnId">identifikace sloupce</param>
        public GOrderBy(TColumnId columnId)
        {
            ColumnId = columnId;
        }

        //------------------------------------------------------------------
        private OrderDirection m_oDirection = OrderDirection.Asc;
        ///<summary>Smìr øazení (sestupnì/vzestupnì)</summary>
        public OrderDirection Direction
        {
            get { return (m_oDirection); }
            set { m_oDirection = value; }
        }

        //------------------------------------------------------------------
        private TColumnId m_oColumnId;
        ///<summary>Identifikace sloupce, podle kterého se má øadit</summary>
        public TColumnId ColumnId
        {
            get { return (m_oColumnId); }
            set { m_oColumnId = value; }
        }

        //---------------------------------------------------------------------
        private string m_sColumn = null;
        /// <summary>
        /// Textový název sloupce
        /// </summary>
        public string Column
        {
            get
            {
                if (m_sColumn != null)
                    return m_sColumn;
                return ColumnId.ToString();
            }
            set { m_sColumn = value; }
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Vytvoøí klon
        /// </summary>
        public object Clone()
        {
            return new GOrderBy<TColumnId>(ColumnId, Direction) { Column = this.m_sColumn };
        }

        //---------------------------------------------------------------------
        /// <summary>
        /// Konverze na øetìzec
        /// </summary>
        public override string ToString()
        {
            if (Direction == OrderDirection.Desc)
                return Column + " DESC";
            else
                return Column;
        }
    }
    //---------------------------------------------------------------------
    /// <summary>
    /// Smìr v kterém se má provádìt øazení  
    /// </summary>
    public enum OrderDirection
    {
        /// <summary>
        /// Vzestupnì
        /// </summary>
        Asc,
        /// <summary>
        /// Sestupnì
        /// </summary>
        Desc
    }

}
