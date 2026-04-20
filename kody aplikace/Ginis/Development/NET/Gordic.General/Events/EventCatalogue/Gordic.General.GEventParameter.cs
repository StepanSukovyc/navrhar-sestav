//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GEventParameter.cs                           </Name>
//    <Description> GEvent data parameter info                                  </Description>
//    <Author>      Vlastimil Máca                                              </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-01-12                                                  </Created>
//  </FileHeader>

namespace Gordic.General
{
    /// <summary>
    /// GEvent data parameter info
    /// </summary>
    public class GEventParameter
    {
        /// <summary>
        /// Event data property ID
        /// </summary>
        public string PropertyId { get; }
        /// <summary>
        /// Event data property type
        /// </summary>
        public string PropertyName { get; }
        /// <summary>
        /// Event data property data type
        /// </summary>
        public int DataType { get; }
        /// <summary>
        /// Event data property is required?
        /// </summary>
        public bool Required { get; }
        /// <summary>
        /// Order of property in event subject, -1 == not in subject, 0 = first
        /// </summary>
        public int SubjectPropertyOrder { get; } = -1;


        /// <summary>
        /// GEventParameter - event data paremeter description
        /// </summary>
        /// <param name="propertyId"></param>
        /// <param name="propertyName"></param>
        /// <param name="dataType"></param>
        /// <param name="required"></param>
        /// <param name="subjectPropertyOrder"></param>
        public GEventParameter(string propertyId, string propertyName, int dataType, bool required, int subjectPropertyOrder)
        {
            PropertyId = propertyId;
            PropertyName = propertyName;
            DataType = dataType;
            Required = required;
            SubjectPropertyOrder = subjectPropertyOrder;
        }
    }
}
