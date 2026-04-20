//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>          GDataSet                               </Name>
//    <Description>   netypový obecný dataset                </Description>
//    <Author>        Martin Aliger                          </Author>
//    <Copyright>     © GORDIC spol. s r. o. 1993 - 2021  </Copyright>
//    <Created>       2005-03-10                             </Created>
//  </FileHeader>

using System;
using System.Data;
using System.Xml;
using System.Runtime.Serialization;

namespace Gordic.General {

	/// <summary>Gordický netypový øádek datasetu</summary>
    #if !DEBUG
	[System.Diagnostics.DebuggerStepThrough]
    #endif
	public class GDataRow : DataRow	{
        
        /// <summary>konstruktor</summary>
        protected internal GDataRow(DataRowBuilder builder) : base(builder)  { }

        /// <summary>vrací hodnotu daného sloupce ve tvaru GTypu</summary>
        public IGDbType GetDbValue(DataColumn column, bool trimValues = true) {
            return GDataSet.GetDbValue(column,this[column], trimValues);
        } // end method

        /// <summary>vrací hodnotu daného sloupce ve tvaru GTypu</summary>
        public IGDbType GetDbValue(string columnName, bool trimValues = true) {
            return GetDbValue(Table.Columns[columnName], trimValues);
        } // end method

        /// <summary>nastaví hodnotu daného sloupce ve tvaru GTypu</summary>
        public void SetDbValue(DataColumn column, IGDbType value) {
            object cval = this[column];
            if (value == null || value.IsNull) {
                if ((cval != System.DBNull.Value)) {
                    this[column] = System.DBNull.Value;
                } // end if
            } else {
                if(cval.Equals(value.DbValue) == false) {
                    this[column] = value.DbValue;
                } // end if
            } // end if
        } // end method

        /// <summary>nastaví hodnotu daného sloupce ve tvaru GTypu</summary>
        public void SetDbValue(string columnName, IGDbType value) {
            SetDbValue(Table.Columns[columnName], value);
        } // end method

        /// <exclude/>
        public GGroupingDataRow ConvertToGroup()
        {
            GGroupingDataRow g = GDataTable.NewGroupingRow(Table, ItemArray);
            int l_index = Table.Rows.IndexOf(this);
            Table.Rows.RemoveAt(l_index);
            Table.Rows.InsertAt(g, l_index);
            return g;
        }

	} // end class

} // end namespace
