//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AbstractFormationProperty.cs             </Name>
//    <Description> abstraktní implementace vlastnosti formátu                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-25                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Xml;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Services;

namespace Gordic.GFE.Parsers.Editor
{
    /// <summary>
    /// abstraktní implementace vlastnosti formátu
    /// </summary>
    abstract public class AbstractFormationProperty : IFormationDocumentProperty
    {
        #region IFormationDocumentProperty
        List<GFEFormatTag> unknowns = new List<GFEFormatTag>();
        /// <summary>
        /// Neznáme formáty
        /// </summary>
        public ReadOnlyCollection<GFEFormatTag> Unknowns { get => unknowns.AsReadOnly(); }

        readonly List<DefaultComment> comments = new List<DefaultComment>();
        /// <summary>
        /// Komentáře sestavy
        /// </summary>
        public ReadOnlyCollection<DefaultComment> Comments { get => comments.AsReadOnly(); }

        /// <summary>
        /// Globální skripta
        /// </summary>
        public List<string> GlobalScripts { get; } = new List<string>();

        /// <summary>
        /// získání formátu z proudu dat
        /// </summary>
        /// <param name="document">Dokument vlastnosti</param>
        /// <param name="enc">Kódování</param>
        /// <param name="xml">Proud dat formátu</param>
        /// <param name="filename">jméno souboru</param>
        public void LoadContent(object document, Encoding enc, string xml, string filename)
        {
            this.document = (IFormationDocument)document;

            if (xml == null || xml.Length == 0)
                throw new Exception();

            try { Format = GFEFormat.LoadFromString(xml, filename, enc); }
            catch (Exception ex) { MessageBox.Show(ex.Message); }
            // načtení skriptů
            Task.Factory.StartNew(delegate { FormationService.LoadScripts(Format, GlobalScripts); });
            // načtení komentářů
            Task.Factory.StartNew(delegate { FormationService.LoadComments(Format, comments); });
            // načtení neznámých globálních větví
            Task.Factory.StartNew(delegate { FormationService.LoadUnknowns(Format, unknowns); });
        }
        /// <summary>
        /// čitadlo průchodů
        /// používá se pro separované načtení různých sekcí sestavy ve metodě LoadRegion
        /// </summary>
        protected int counter;
        /// <summary>
        /// Aktualizace stránek formuláře
        /// </summary>
        public void RefreshContent()
        {
            document?.LoadPages(Format);

            counter = 0;
            if (Format != null)
                LoadRegion(Format.Root);

            while (counter != 0)
                Application.DoEvents();
        }
        #endregion

        public virtual Dictionary<Guid, IScriptHandler> FieldsList { get; }

        /// <summary>
        /// dokument, vlastnosti kterého prezentuje daná třída
        /// </summary>
        protected IFormationDocument document;
        /// <summary>
        /// formát sestavy
        /// nutno pro generování části fragmentů
        /// </summary>
        public GFEFormat Format { get; internal set; }

        /// <summary>
        /// uložení obsahu dokumentu
        /// </summary>
        /// <param name="xmlFormat">Formát dokumentu</param>
        /// <param name="unit">kompilační jednotka dokumentu</param>
        abstract public void SetData(ref XmlElement xmlFormat, ICompilationUnit unit);

        /// <summary>
        /// načtení hlavního regionu
        /// </summary>
        /// <param name="reg">hlavní region sestavy</param>
        abstract public void LoadRegion(GFEFormatRegion reg);
    }
}
