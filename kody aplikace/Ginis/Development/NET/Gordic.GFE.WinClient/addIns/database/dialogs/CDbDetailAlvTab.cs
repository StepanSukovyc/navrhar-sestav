//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.CDbExportTab.cs                        </Name>
//    <Description> Uložení sestavy do databáze                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-06-27                                                  </Created>
//  </FileHeader>

using System;
using System.Linq;
using System.Windows.Forms;
using Gordic.General;
using Gordic.Report.Interface;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Database;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Gui;
using Gordic.Ginis.DbModel;

namespace Gordic.GFE.WinClient
{
    /// <summary>
    /// Uložení sestavy do databáze
    /// </summary>
    partial class CDbDetailAlvTab : UserControl, IDialogDefaultable
    {
        #region IDialogDefaultable
        /// <summary>
        /// Reakce na ukončení s akceptací změn
        /// </summary>
        public event EventHandler AcceptEvent;

        /// <summary>
        /// stav načtení ovladače
        /// </summary>
        public bool Loading { get; set; }
        /// <summary>
        /// indikuje zrušení dialogu
        /// </summary>
        public bool Canceling { get; set; }
        /// <summary>
        /// Obsah
        /// </summary>
        public IViewContent Content { get; set; }

        /// <summary>
        /// Na ovladači proběhla změna
        /// </summary>
        public bool Change { get; set; }
        /// <summary>
        /// Titulek ovladače
        /// </summary>
        public string Title { get { return GResources.GetResourceText(29450008); } } //RC 29450008 : Uložení sestavy do databáze
        /// <summary>
        /// Reakce na akceptování nastavení
        /// </summary>
        public void Accept()
        {
            if (ParentForm is PropertyDialog)
                (ParentForm as PropertyDialog).DialogResult = SaveAlv() ? DialogResult.OK : DialogResult.Cancel;
            else SaveAlv();
            OnAccept();
        }

        private void OnAccept()
        {
            AcceptEvent?.Invoke(this, EventArgs.Empty);
        }

        /// <summary>
        /// Reakce na zamitnutí nastavení
        /// </summary>
        public void Cancel() { }

        /// <summary>
        /// Nastavení implicitních hodnot
        /// </summary>
        public void SetDefault()
        {
            var r = new Gordic.Report.Client.GReportInfo(DatabaseService.UserProcess, new GReportIdentity(tbIxsAlv.Value.BaseValueTrimmed));
            tbTema.Value = r.Tema;
            tbIdSes.Value = r.IdSes;
            tbTypVyst.Value = r.TypVyst;

            cbPrizDotaz.Items.AddRange(GGincpdoEnum.GetValues().ToArray());
            cbPrizDotaz.SelectedItem = (GGincpdoEnum)r.Alv.priz_dotaz;

            cbZpusUloz.Items.AddRange(GGinczulEnum.GetValues().ToArray());
            cbZpusUloz.SelectedItem = (GGinczulEnum)r.Alv.zpus_uloz;
            
            tbFormVyst.Value = r.Alv.form_vyst;
            cbAktivita.SetValidData(r.Alv.aktivita);

            cbPrizPodp.Items.AddRange(GGincpopEnum.GetValues().ToArray());
            cbPrizPodp.SelectedItem = (GGincpopEnum)r.Alv.priz_podp;

            tbIxsTyp.SetValidData(r.Alv.ixs_typ);
            tbSablonaPodpisu.AllowNull = true;
            tbSablonaPodpisu.SetValidData(r.Alv.ixs_dpo);
            tbPoznamka.Value = r.Alv.poznamka;
        }

        #endregion

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public CDbDetailAlvTab(GString ixs_alv) 
        {
            InitializeComponent();
            tbIxsAlv.Value = ixs_alv;
        }

        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);
            //btnNewPID.BackgroundImage = WinFormsResourceService.GetBitmap("Icons__Gin__plus");
        }
        /// <summary>
        /// Ukládání sestavy do databáze
        /// </summary>
        bool SaveAlv()
        {
            try
            {
                var ads = new Gordic.Report.Client.GReportAdmin(DatabaseService.UserProcess);
                var ixsAlv = tbIxsAlv.Value;
                ads.UpdateAlv(ixsAlv, (GGincpdoEnum)cbPrizDotaz.SelectedItem, (GGinczulEnum)cbZpusUloz.SelectedItem, (GGincpopEnum)cbPrizPodp.SelectedItem, cbAktivita.Aktivita, tbIxsTyp.IxsTyp, tbFormVyst.Value, tbSablonaPodpisu.IxsDpo);

                return true;
            }
            catch (Exception ex)
            {
                MessageService.ShowError(ex);
                return false;
            }
        }        
    }
}
