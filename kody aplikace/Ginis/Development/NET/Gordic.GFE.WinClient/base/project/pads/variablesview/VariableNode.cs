//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.VariableNode.cs                        </Name>
//    <Description> proměnna                                                    </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2015-01-27                                                  </Created>
//  </FileHeader>


using Gordic.General;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.UndoRedoFramework;
using System.ComponentModel;

namespace Gordic.GFE.WinClient.VariablesView
{
    /// <summary>
    /// proměnna
    /// </summary>
    public sealed class VariableNode : IVariable
    {
        #region IVariable
        /// <summary>
        /// Datová položka struktury sestavy
        /// </summary>
        [Browsable(false)]
        public IGRRLabel Region { get; set; }

        readonly UndoRedo<string> name = new UndoRedo<string>();
        /// <summary>
        /// Popis položky
        /// </summary>
        [Category("Proměnná")]
        [DisplayName("název")]
        [Description("Název proměnné")]
        public string Name { get => name.Value; set => name.Value = value; }

        readonly UndoRedo<string> valuescript = new UndoRedo<string>();
        /// <summary>
        /// Datová položka struktury sestavy
        /// </summary>
        [Category("Proměnná")]
        [DisplayName("skript")]
        [Description("Hodnota proměnné")]
        public string ValueScript { get => valuescript.Value; set => valuescript.Value = value; }

        readonly UndoRedo<string> datatype = new UndoRedo<string>();
        /// <summary>
        /// Datová položka struktury sestavy
        /// </summary>
        [Category("Proměnná")]
        [DisplayName("typ")]
        [Description("Typ proměnné")]
        public string DataType { get => datatype.Value; set => datatype.Value = value; }
        #endregion

        /// <summary>
        /// proměnná regionu
        /// </summary>
        [Browsable(false)]
        public IVariable Variable { get; set; }

        /// <summary>
        /// nastavení nápovědy větve
        /// </summary>
        /// <returns>Text-nápověda položky stromu</returns>
        internal string SetToolTip()
        {
            // je to region
            return string.Format(GResources.GetResourceText(29450401) + ": {0}\n" + GResources.GetResourceText(29450400) + ": {1}", Name, ValueScript); //RC 29450401 : název
        }

        /// <summary>
        /// prázdný konstruktor třídy
        /// nejspíš se jedná o první větev
        /// </summary>
        public VariableNode()
        {
            Name = GResources.GetResourceText(29450402); //RC 29450402 : Proměnné
        }

        /// <summary>
        /// vytvoření nové instance třídy dle dané proměnné
        /// </summary>
        /// <param name="variable">Proměnná</param>
        public VariableNode(IVariable variable)
        {
            // TODO: Complete member initialization
            this.Variable = variable;
            if (variable != null)
            {
                Name = variable.Name;
                ValueScript = variable.ValueScript;
                Region = variable.Region;
                DataType = variable.DataType;
            }
            else
                Name = GResources.GetResourceText(29450402); //RC 29450402 : Proměnné
        }

        /// <summary>
        /// vytvoření nové instance třídy dle datové položky
        /// </summary>
        /// <param name="item">datová položka</param>
        public VariableNode(Parsers.Core.GFEFormatVariable item)
        {
            if (item != null)
            {
                Name = item.Name;
                ValueScript = item.ValueScript;
                DataType = item.DataType.ToString().ToLowerInvariant();
            }
        }

        /// <summary>
        /// řetězec představující větev
        /// </summary>
        /// <returns></returns>
        public override string ToString() => Name;
    }
}
