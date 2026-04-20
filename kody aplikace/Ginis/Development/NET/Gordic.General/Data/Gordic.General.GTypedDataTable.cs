//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GTypedDataTable.cs                           </Name>
//    <Description> Gordická typový datatable                                   </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2011-04-10                                                  </Created>
//  </FileHeader>

using System;
using System.Data;
using System.Xml;
using System.Runtime.Serialization;
using System.ComponentModel;
using System.Security.Permissions;

namespace Gordic.General
{

    /// <summary>Gordická typový datatable</summary>
#if !DEBUG
	[System.Diagnostics.DebuggerStepThrough]
#endif
    public abstract class GTypedDataTable : GDataTable//, ISerializable
    {

        /// <exclude/>
        protected GTypedDataTable()
            : base()
        {
        }

        /// <exclude/>
        protected GTypedDataTable(string tableName)
            : base(tableName)
        {
        }

        /// <exclude/>
        protected GTypedDataTable(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }

        ///// <exclude/>
        //public override void GetObjectData(SerializationInfo info, StreamingContext context)
        //{
        //    SerializationFormat remotingFormat = this.RemotingFormat;
        //    bool isSingleTable = (context.Context != null) ? Convert.ToBoolean(context.Context, System.Globalization.CultureInfo.InvariantCulture) : true;
        //    base.GetObjectData(info, context);
        //    //this.SerializeDataTable(info, context, isSingleTable, remotingFormat);
        //}
        ///// <exclude/>
        //[System.Security.SecurityCritical]
        //void ISerializable.GetObjectData(SerializationInfo info, StreamingContext context)
        //{
        //    this.GetObjectData(info, context);
        //}

 

    }

}
