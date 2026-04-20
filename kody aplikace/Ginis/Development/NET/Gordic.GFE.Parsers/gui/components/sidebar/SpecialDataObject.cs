//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SpecialDataObject.cs                   </Name>
//    <Description> Speciální datový objekt                                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Speciální datový objekt
    /// </summary>
    public class SpecialDataObject : System.Windows.Forms.IDataObject
    {
        List<object> dataObjects = new List<object>();
        /// <summary>
        /// Získání objektu určitého formátu
        /// </summary>
        /// <param name="format">Formát ziskávaného objektu</param>
        /// <returns></returns>
        public object GetData(string format)
        {
            return GetData(format, true);
        }

        /// <summary>
        /// Získání objektu určitého formátu
        /// </summary>
        /// <param name="format">Formát ziskávaného objektu</param>
        /// <returns></returns>
        public object GetData(System.Type format)
        {
            foreach (object o in dataObjects)
                if (o.GetType() == format)
                    return o;
            return null;
        }

        /// <summary>
        /// Ziskání objektu určitého formátu
        /// </summary>
        /// <param name="str">Typ ziskávaného objektu</param>
        /// <param name="autoConvert">Indikuje automatickou konverzí typu</param>
        /// <returns></returns>
        public object GetData(string str, bool autoConvert)
        {
            foreach (object o in dataObjects)
            {
                if (o == null)
                    continue;
                Type type = o.GetType();
                string typeStr = type.ToString();
                if (typeStr == str)
                    return o;

                if (typeStr == "Gordic.GFE.WinClient.Gui.ReportDesignerSideTabItem")
                    return o;

                if (type.BaseType != null)
                {
                    typeStr = type.BaseType.ToString();
                    if (typeStr == str)
                        return o;
                }
            }
            return null;
        }

        /// <summary>
        /// Získání dat určitého formátu
        /// </summary>
        /// <param name="format">Formát ziskávaných dat</param>
        /// <returns></returns>
        public bool GetDataPresent(string format)
        {
            return GetDataPresent(format, true);
        }
        /// <exclude/>
        public bool GetDataPresent(System.Type format)
        {
            return GetData(format) != null;
        }

        /// <exclude/>
        public bool GetDataPresent(string format, bool autoConvert)
        {
            return GetData(format, autoConvert) != null;
        }

        /// <exclude/>
        public string[] GetFormats()
        {
            return new string[0];
        }
        /// <exclude/>
        public string[] GetFormats(bool autoConvert)
        {
            return new string[0];
        }
        /// <exclude/>
        public void SetData(object data)
        {
            dataObjects.Add(data);
        }
        /// <exclude/>
        public void SetData(string format, object data) { }
        /// <exclude/>
        public void SetData(System.Type format, object data) { }
        /// <exclude/>
        public void SetData(string format, bool autoConvert, object data) { }
    }
}
