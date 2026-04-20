//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GTypedDataSet.cs                             </Name>
//    <Description> Gordický typový dataset                                     </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2011-04-10                                                  </Created>
//  </FileHeader>

using System;
using System.Data;
using System.Xml;
using System.Runtime.Serialization;
using System.ComponentModel;

namespace Gordic.General
{

    /// <summary>Gordický typový dataset</summary>
#if !DEBUG
	[System.Diagnostics.DebuggerStepThrough]
#endif
    public abstract class GTypedDataSet : GDataSet
    {

        /// <exclude/>
        public GTypedDataSet()
        {
            base.RemotingFormat = SerializationFormat.Binary;
        }

        /// <exclude/>
        protected GTypedDataSet(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }

        /// <exclude/>
        protected GTypedDataSet(SerializationInfo info, StreamingContext context, bool ConstructSchema)
            : base(info, context, ConstructSchema)
        {
        }

        /// <exclude/>
        [Browsable(true), DefaultValue(SerializationFormat.Binary)]
        public new SerializationFormat RemotingFormat
        {
            get { return base.RemotingFormat; }
            set { base.RemotingFormat = value; }
        }

        SchemaSerializationMode m_SchemaSerializationMode = System.Data.SchemaSerializationMode.ExcludeSchema;
        /// <exclude/>
        [Browsable(true), DefaultValue(SchemaSerializationMode.ExcludeSchema)]
        public override SchemaSerializationMode SchemaSerializationMode
        {
            get
            {
                return m_SchemaSerializationMode;
            }
            set
            {
                m_SchemaSerializationMode = value;
            }
        }




    }

}
