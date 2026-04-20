//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.CompilationUnit.cs                    </Name>
//    <Description> Zkontrolovaná a přeložená jednotka GRF sestavy              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using Gordic.Gfe.FormFiller.AddIns;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Services;
using System.Text;

namespace Gordic.Gfe.FormFiller.Gui
{
    /// <summary>
    /// Zkontrolovaná a přeložená jednotka GRF sestavy
    /// </summary>
    class DocfrmCompilationUnit : AlfCompilationUnit
    {
        /// <summary>
        /// Otevřený soubor nad kterým se provádí operace
        /// </summary>
        public override OpenedFile OpenedFile { get; set; }

        readonly string resourcesFile = string.Empty;
        /// <summary>
        /// cesta k šabloně dokumentu
        /// </summary>
        public string ResourcesFile { get { return (string)resourcesFile; } }

        //DocfrmFormationProperties formationProperty = new DocfrmFormationProperties();
        ///// <summary>
        ///// Vastností jednotky
        ///// </summary>
        //public DocfrmFormationProperties FormationProperty { get { return formationProperty; } }

        readonly string namespaceURI = string.Empty;
        /// <summary>
        /// URI aktuálního elementu
        /// </summary>
        public string NamespaceURI { get { return namespaceURI; } }

        /// <summary>
        /// Získání objektu, ve kterém je StructureViewEntry uzamčeno.
        /// </summary>
        public object SyncRoot { get { return OpenedFile; } }

        /// <summary>
        /// Konstruktor třídy s otevřeným souborem
        /// </summary>
        /// <param name="openedFile">Otevřený soubor sestavy</param>
        public DocfrmCompilationUnit(OpenedFile openedFile)
            : base()
        {
            OpenedFile = openedFile;
        }

        /// <summary>
        /// Vytvoření jednotky dle obsahu
        /// </summary>
        /// <param name="fileContent">Daný obsah</param>
        public DocfrmCompilationUnit(string fileContent)
            : base(fileContent)
        {
        }
        /// <summary>
        /// Kompilace jednotky - vytvoření XML obsahu.
        /// </summary>
        public override void Compile(DefaultAbstractSecondaryViewContent view)
        {
            base.Compile(view);
            lock (SyncRoot)
            {
                try
                {
                    UpdateContent((view as DocfrmViewContent).DataManager.GetOuterData());
                    OnAfterCompile();
                }
                catch { ErrorsDuringCompile = true; }
            }
        }
    }
}
