//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.GCustomDialogDto.cs                 </Name>
//    <Description> Custom dialog sestavy                                       </Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-01-04                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.Report.Interface
{
    /// <summary>Custom dialog sestavy</summary>
    [Serializable]
    public class GCustomDialogDto : IGDto
    {
        /// <summary>Titulek okna</summary>
        [JsonProperty("title")]
        public string Title { get; set; }

        /// <summary>id</summary>
        [JsonProperty("id")]
        public string Id { get; set; }
        
        /// <summary>Pozice X</summary>
        [JsonProperty("posX")]
        public int PosX { get; set; }

        /// <summary>Pozice Y</summary>
        [JsonProperty("posY")]
        public int PosY { get; set; }

        /// <summary>Sirka</summary>
        [JsonProperty("width")]
        public int Width { get; set; }

        /// <summary>Vyska</summary>
        [JsonProperty("height")]
        public int Height { get; set; }

        /// <summary>Typ dialogu (default = "Custom")</summary>
        [JsonProperty("dialogType")]
        public string DialogType { get; set; } = "Custom";

        /// <summary>Seznam ovl. prvku</summary>
        [JsonProperty("controls")]
        public IList<GCustomDialogControlDto> Controls { get; set; } = new List<GCustomDialogControlDto>();

        /// <summary>Dalsi property dialogu</summary>
        [JsonProperty("props")]
        [GTypeScript(Type = "ObjectLiteral<any>")]
        public Dictionary<string, object> Props { get; set; } = new Dictionary<string, object>();
    }

    /// <summary>Ovl. prvek (obecne)</summary>
    [Serializable]
    public abstract class GCustomDialogControlDto : IGDto
    {
        /// <summary>Nazev</summary>
        [JsonProperty("name")]
        public string Name { get; set; }

        /// <summary>Typ ovl. prvku</summary>
        [JsonProperty("controlType")]
        [GTypeScript(ReadOnly = true)]
        public abstract string ControlType { get; set; }

        /// <summary>Pozice X</summary>
        [JsonProperty("left")]
        public int Left { get; set; }

        /// <summary>Pozice Y</summary>
        [JsonProperty("top")]
        public int Top { get; set; }

        /// <summary>Sirka</summary>
        [JsonProperty("width")]
        public int Width { get; set; }

        /// <summary>Vyska</summary>
        [JsonProperty("height")]
        public int Height { get; set; }

        /// <summary>Property (serializovatelne!!!)</summary>
        [JsonProperty("props")]
        [GTypeScript(Type = "ObjectLiteral<any>")]
        public Dictionary<string, object> Props { get; set; }
    }

    /// <summary>Label</summary>
    [Serializable]
    public class GCustomDialogLabelDto : GCustomDialogControlDto
    {
        /// <summary>Typ ovl. prvku</summary>
        [JsonProperty("controlType")]
        [GTypeScript(ReadOnly = true)]
        public override string ControlType { get; set; } = "label";

        /// <summary>Popisek</summary>
        [JsonProperty("caption")]
        public string Caption { get; set; }
    }

    /// <summary>Checkbox</summary>
    [Serializable]
    public class GCustomDialogCheckBoxDto : GCustomDialogControlDto
    {
        /// <summary>Typ ovl. prvku</summary>
        [JsonProperty("controlType")]
        [GTypeScript(ReadOnly = true)]
        public override string ControlType { get; set; } = "checkbox";

        /// <summary>Popisek</summary>
        [JsonProperty("caption")]
        public string Caption { get; set; }

        /// <summary>Hodnota</summary>
        [JsonProperty("value")]
        public bool Value { get; set; }
    }

    /// <summary>Datebox</summary>
    [Serializable]
    public class GCustomDialogDateBoxDto : GCustomDialogControlDto
    {
        /// <summary>Typ ovl. prvku</summary>
        [JsonProperty("controlType")]
        [GTypeScript(ReadOnly = true)]
        public override string ControlType { get; set; } = "datebox";

        /// <summary>Hodnota</summary>
        [JsonProperty("value")]
        public DateTime Value { get; set; }
    }

    /// <summary>Editbox</summary>
    [Serializable]
    public class GCustomDialogEditBoxDto : GCustomDialogControlDto
    {
        /// <summary>Typ ovl. prvku</summary>
        [JsonProperty("controlType")]
        [GTypeScript(ReadOnly = true)]
        public override string ControlType { get; set; } = "editbox";

        /// <summary>Hodnota</summary>
        [JsonProperty("value")]
        public string Value { get; set; }

        /// <summary>Maximalni delka (hodnota 0 = nedefinovano)</summary>
        [JsonProperty("maxLength", DefaultValueHandling = DefaultValueHandling.Ignore)]
        [GTypeScript(AllowNull = false)]
        public int MaxLength { get; set; }
    }

    /// <summary>Memo</summary>
    [Serializable]
    public class GCustomDialogMemoDto : GCustomDialogEditBoxDto
    {
        /// <summary>Typ ovl. prvku</summary>
        [JsonProperty("controlType")]
        [GTypeScript(ReadOnly = true)]
        public override string ControlType { get; set; } = "memo";
    }

    /// <summary>Numberbox</summary>
    [Serializable]
    public class GCustomDialogNumberBoxDto : GCustomDialogControlDto
    {
        /// <summary>Typ ovl. prvku</summary>
        [JsonProperty("controlType")]
        [GTypeScript(ReadOnly = true)]
        public override string ControlType { get; set; } = "numberbox";

        /// <summary>Hodnota</summary>
        [JsonProperty("value")]
        public decimal Value { get; set; }

        /// <summary>Minimalni hodnota</summary>
        [JsonProperty("minValue")]
        public decimal MinValue { get; set; }

        /// <summary>Maximalni hodnota</summary>
        [JsonProperty("maxValue")]
        public decimal MaxValue { get; set; }

        /// <summary>Maximalni delka?</summary>
        [JsonProperty("maxLength")]
        public int MaxLength { get; set; }

        /// <summary>Presnost</summary>
        [JsonProperty("decimals")]
        public int Decimals { get; set; }
    }

    [Serializable]
    public abstract class GCustomDialogSelectBoxDto : GCustomDialogControlDto
    {
        /// <summary>Predvybrana hodnota</summary>
        [JsonProperty("selectedIndex")]
        public int SelectedIndex { get; set; }

        /// <summary>Polozky</summary>
        [JsonProperty("items")]
        public IList<GCustomDialogSelectOptionDto> Items { get; set; }
    }

    /// <summary>Listbox</summary>
    [Serializable]
    public class GCustomDialogListBoxDto : GCustomDialogSelectBoxDto
    {
        /// <summary>Typ ovl. prvku</summary>
        [JsonProperty("controlType")]
        [GTypeScript(ReadOnly = true)]
        public override string ControlType { get; set; } = "listbox";

        /// <summary>?</summary>
        [JsonProperty("checks")]
        public string Checks { get; set; }

        /// <summary>Styl (Gordic.Report.Interface.GCheckListStyle)</summary>
        [JsonProperty("style")]
        public int Style { get; set; }
    }

    /// <summary>Combobox</summary>
    public class GCustomDialogComboBoxDto : GCustomDialogSelectBoxDto
    {
        /// <summary>Typ ovl. prvku</summary>
        [JsonProperty("controlType")]
        [GTypeScript(ReadOnly = true)]
        public override string ControlType { get; set; } = "combobox";

        /// <summary>?</summary>
        [JsonProperty("returnIndex")]
        public bool ReturnIndex { get; set; }
    }

    /// <summary>Polozka seznamu</summary>
    [Serializable]
    public class GCustomDialogSelectOptionDto : IGDto
    {
        /// <summary>Nazev option</summary>
        [JsonProperty("text")]
        public string Text { get; set; }

        /// <summary>Hodnota (value) option</summary>
        [JsonProperty("value")]
        public string Value { get; set; }

        /// <summary>?</summary>
        [JsonProperty("check")]
        public string Check { get; set; }
    }
}
