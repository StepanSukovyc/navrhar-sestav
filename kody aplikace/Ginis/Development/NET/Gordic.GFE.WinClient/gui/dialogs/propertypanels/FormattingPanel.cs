//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FormattingPanel.cs                     </Name>
//    <Description> Panel změny formátování                                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-03-20                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.Report.Implementation;
using Gordic.WinForms.Controls;
using Gordic.General;
using System.Runtime.InteropServices;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.Gui.PropertyPanels
{
    /// <summary>
    /// Panel změny formátování
    /// </summary>
    class FormattingPanel : AbstractPropertyPanel
    {
        #region AbstractPropertyPanel
        /// <summary>
        /// Získání nové hodnoty - PropertyGrid
        /// </summary>
        /// <returns>Nová hodnota</returns>
        public override object PropertyValue { get { return currentFormatting; } }
        /// <summary>
        /// Reakce na akceptace změn
        /// </summary>
        /// <returns>TRUE- změna provedená</returns>
        protected override bool Accept()
        {
            if (Service == null)
                return true;

            if (defaultFormatting != currentFormatting)
            {
                if (!UndoRedoService.IsTransactionStarted)
                    UndoRedoService.StartTransaction(GResources.GetResourceText(29450475)); //RC 29450475 : změna formátování

                foreach (object item in Service.SelectedComponents)
                    if (item is ITextHandler
                        && (item as ITextHandler).Text != null)
                        (item as ITextHandler).Text.Format = currentFormatting;
                    else if (item is IFormatting)
                        (item as IFormatting).Format = currentFormatting;
            }

            return base.Accept();
        }

        /// <summary>
        /// Reakce na tlačítko Výchozí hodnoty
        /// </summary>
        /// <returns>True - Nastavení provedené</returns>
        protected override void SetDefault()
        {
            if (Service != null)
            {
                if (lbDruh.Items.Count == 0)
                    lbDruh.Items.AddRange(CommonService.TextFormatsType.ToArray());

                // index vybrané položky v seznamu Druh
                int _value = -1;

                lbDruh.SelectedIndex = -1;
                lbFormats.SelectedIndex = -1;
                currentFormatting = string.Empty;
                defaultFormatting = string.Empty;

                bool first = true;

                // projdeme všechny vybrané položky a zjistíme jejích hodnoty
                foreach (object item in Service.SelectedComponents)
                {
                    string format = item is IFormatting ? (item as IFormatting).Format :
                        item is ITextHandler ? (item as ITextHandler).Text.Format : string.Empty;

                    if (!string.IsNullOrEmpty(format))
                    {
                        // pokud je to první objekt, pak jeho vlastnosti nakopírujeme
                        if (first)
                        {
                            first = false;
                            _value = GetIndex(format);
                            currentFormatting = format;
                        }
                        else
                        {
                            // _formating == null znamená, že obsahy nejsou stejné
                            if (!string.Equals(currentFormatting, format, StringComparison.InvariantCultureIgnoreCase)
                                && currentFormatting != null)
                                currentFormatting = null;

                            //_value == -1 znamená, že obsahy nejsou stejné
                            if (_value != -1
                                && _value != GetIndex(format))
                                _value = -1;
                        }

                    }
                }
                lbDruh.SelectedIndex = _value;
                defaultFormatting = currentFormatting;
            }
        }

        int GetIndex(string _format)
        {
            // pokud formátování není uvedeno, pak není co řešit
            if (string.IsNullOrEmpty(_format))
                return -1;

            string _result = "-1";
            // pokusíme se najit formátování v seznamu všech standardně dostupných formátování
            if (CommonService.TextFormats.TryGetValue(_format, out _result))
            {
                int result = -1;
                int.TryParse(_result, out result);
                return result;
            }
            else
            // pokud takový formát neexistuje, pak ho přidáme
            {
                CommonService.TextFormats.Add(_format, "4");
                return 4;
            }
        }

        /// <summary>
        /// Načtení obsahu panelu
        /// </summary>
        public override void LoadPanelContents()
        {
            try
            {
                SetupLocalizedXFRM(AssemblyName + ".Resources.forms.property.FormattingPanel.xfrm");
                tbFormatString = ((GLabeledTextBox)ControlDictionary["tbFormatString"]);
                tbFormatString.TextChanged += textChanged;
                lbFormats = (ListBox)ControlDictionary["lbFormats"];
                lbFormats.SelectedIndexChanged += formatsSelectedIndexChanged;
                lbDruh = (ListBox)ControlDictionary["lbDruh"];
                lbDruh.SelectedIndexChanged += druhSelectedIndexChanged;

                btnAdd = (Button)ControlDictionary["btnAdd"];
                btnAdd.Click += addClick;
                btnDelete = (Button)ControlDictionary["btnDelete"];
                btnDelete.Click += deleteClick;

                ((Panel)ControlDictionary["pnlPreview"]).Paint += previewPaint;
                updateFormattingPreviewPanel(true);
            }
            catch (Exception ex) { LoggingService.Error(GResources.GetResourceText(29450428) + " FormattingPanel.xfrm:" + ex.Message); }
        }
        /// <summary>
        /// Podmínky viditelnosti daného panelu
        /// </summary>
        /// <returns>TRUE - podmínka je splněná</returns>
        public override bool VisibleCondition()
        {
            if (view == null)
                return base.VisibleCondition();

            return Service != null && Service.SelectedComponents.Exists(item => (item is ITextHandler || item is IFormatting));
        }
        #endregion

        // aktuální formátování
        string currentFormatting = string.Empty, defaultFormatting;
        GLabeledTextBox tbFormatString;
        ListBox lbFormats, lbDruh;
        Button btnAdd, btnDelete;

        void textChanged(object sender, EventArgs e)
        {
            btnAdd.Enabled = (lbFormats.SelectedItem != null)
                && (tbFormatString.Text.CompareTo(lbFormats.SelectedItem.ToString()) != 0);

            currentFormatting = tbFormatString.Text;
            updateFormattingPreviewPanel(false);
        }
        void formatsSelectedIndexChanged(object sender, EventArgs e)
        {
            if (lbFormats.SelectedItem != null)
                tbFormatString.Text = lbFormats.SelectedItem.ToString();

            btnDelete.Enabled = (lbDruh.SelectedIndex == 4) && (lbFormats.SelectedItem != null);
        }
        void druhSelectedIndexChanged(object sender, EventArgs e)
        {
            lbFormats.Items.Clear();
            tbFormatString.Text = string.Empty;
            foreach (KeyValuePair<string, string> item in CommonService.TextFormats)
                if (item.Value.Equals(lbDruh.SelectedIndex.ToString(), StringComparison.InvariantCultureIgnoreCase))
                    lbFormats.Items.Add(item.Key);

            if (currentFormatting != null
                && lbFormats.Items.IndexOf(currentFormatting) != -1)
                lbFormats.SelectedIndex = lbFormats.Items.IndexOf(currentFormatting);
            else if (lbFormats.Items.Count > 0)
                lbFormats.SelectedIndex = 0;
        }
        void addClick(object sender, EventArgs e)
        {
            currentFormatting = tbFormatString.Text;
            if (!CommonService.TextFormats.ContainsKey(tbFormatString.Text))
            {
                CommonService.TextFormats.Add(tbFormatString.Text, "4");
                if (lbDruh.SelectedIndex == 4)
                {
                    lbFormats.Items.Add(tbFormatString.Text);
                    lbFormats.SelectedIndex = lbFormats.Items.IndexOf(tbFormatString.Text);
                }
                else
                    lbDruh.SelectedIndex = 4;
            }
            else
            {
                int result = -1;
                int.TryParse(CommonService.TextFormats[tbFormatString.Text], out result);
                lbDruh.SelectedIndex = result;
            }
            Application.DoEvents();
        }
        void deleteClick(object sender, EventArgs e)
        {
            if (lbFormats.SelectedIndex != -1)
            {
                CommonService.TextFormats.Remove(Convert.ToString(lbFormats.SelectedItem));
                lbFormats.Items.Remove(lbFormats.SelectedItem);
            }
            if (lbFormats.Items.Count > 0)
                lbFormats.SelectedIndex = 0;
        }
        void updateFormattingPreviewPanel(bool setDefault)
        {
            if (setDefault)
                SetDefault();

            ((Panel)ControlDictionary["pnlPreview"]).Invalidate();
        }
        void previewPaint(object sender, PaintEventArgs e)
        {
            if (string.IsNullOrEmpty(tbFormatString.Text))
                return;
            e.Graphics.TextRenderingHint = System.Drawing.Text.TextRenderingHint.AntiAliasGridFit;
            Font fnt = new Font(FontFamily.GenericSansSerif, 10.0F, GraphicsUnit.Pixel);
            SizeF stringSize = new SizeF();
            StringFormatFlags flags = StringFormatFlags.FitBlackBox | StringFormatFlags.MeasureTrailingSpaces;
            StringFormat sf = (StringFormat)StringFormat.GenericTypographic.Clone();
            sf.FormatFlags |= flags;
            sf.Alignment = StringAlignment.Near;

            try
            {
                string s1 = string.Empty, s2 = string.Empty, s3 = string.Empty, s4 = string.Empty, s5 = string.Empty;
                using (GScriptEngine eng = GScriptEngine.LoadNew())
                {
                    string spec1 = string.Empty, spec2 = string.Empty, spec3 = string.Empty;

                    if (lbDruh.SelectedIndex == 2)
                    {
                        try
                        {
                            s1 = eng.FormatDatetime(tbFormatString.Text, DateTime.MinValue);
                            s2 = eng.FormatDatetime(tbFormatString.Text, DateTime.Now);
                            s3 = eng.FormatDatetime(tbFormatString.Text, DateTime.Today);
                            s4 = eng.FormatDatetime(tbFormatString.Text, DateTime.MaxValue);
                            s5 = eng.FormatDatetime(tbFormatString.Text, "00000000");
                        }
                        catch { }
                    }
                    else
                    {
                        s1 = eng.FormatDecimal(tbFormatString.Text, "12345678", out spec1);
                        s2 = eng.FormatDecimal(tbFormatString.Text, "-12345678", out spec2);
                        s3 = eng.FormatDecimal(tbFormatString.Text, "123.45678", out spec1);
                        s4 = eng.FormatDecimal(tbFormatString.Text, "-123.45678", out spec2);
                        s5 = eng.FormatDecimal(tbFormatString.Text, "0", out spec3);
                    }
                    char[] sd = s1.ToCharArray();
                    SolidBrush sb1 = new SolidBrush(Color.Black);
                    SolidBrush sb2 = new SolidBrush(Color.Black);
                    SolidBrush sb3 = new SolidBrush(Color.Black);
                    int l_zarovnani1 = 5;
                    int l_zarovnani2 = 5;
                    int l_zarovnani3 = 5;

                    if (!string.IsNullOrEmpty(spec1))
                        foreach (string sspec1 in spec1.Split(';'))
                        {
                            if (sspec1.IndexOf("=") < 0)
                                sb1 = new SolidBrush(Color.FromName(sspec1));

                            if (sspec1.IndexOf("color=") >= 0)
                                sb1 = new SolidBrush(Color.FromName(sspec1.Substring(sspec1.IndexOf("=") + 1)));

                            if (sspec1.IndexOf("align=") >= 0)
                            {
                                string zarovnani = sspec1.Substring(sspec1.IndexOf("=") + 1);
                                if (zarovnani == "left") l_zarovnani1 = 5; // end if
                                if (zarovnani == "center") l_zarovnani1 = 60; // end if
                                if (zarovnani == "right") l_zarovnani1 = 160; // end if
                            }
                        }

                    if (!string.IsNullOrEmpty(spec2))
                        foreach (string sspec2 in spec2.Split(';'))
                        {
                            if (sspec2.IndexOf("=") < 0)
                                sb2 = new SolidBrush(Color.FromName(sspec2));

                            if (sspec2.IndexOf("color=") >= 0)
                                sb2 = new SolidBrush(Color.FromName(sspec2.Substring(sspec2.IndexOf("=") + 1)));

                            if (sspec2.IndexOf("align=") >= 0)
                            {
                                string zarovnani = sspec2.Substring(sspec2.IndexOf("=") + 1);
                                if (zarovnani == "left") l_zarovnani2 = 5; // end if
                                if (zarovnani == "center") l_zarovnani2 = 60; // end if
                                if (zarovnani == "right") l_zarovnani2 = 160; // end if
                            }
                        }
                    if (!string.IsNullOrEmpty(spec3)) // end if
                        foreach (string sspec3 in spec3.Split(';'))
                        {
                            if (sspec3.IndexOf("=") < 0)
                                sb3 = new SolidBrush(Color.FromName(sspec3));

                            if (sspec3.IndexOf("color=") >= 0)
                                sb3 = new SolidBrush(Color.FromName(sspec3.Substring(sspec3.IndexOf("=") + 1)));

                            if (sspec3.IndexOf("align=") >= 0)
                            {
                                string zarovnani = sspec3.Substring(sspec3.IndexOf("=") + 1);
                                if (zarovnani == "left") l_zarovnani3 = 5;
                                if (zarovnani == "center") l_zarovnani3 = 60;
                                if (zarovnani == "right") l_zarovnani3 = 160;
                            }
                        }

                    if (!sb1.Color.IsKnownColor) sb1 = new SolidBrush(Color.Black);
                    if (!sb2.Color.IsKnownColor) sb2 = new SolidBrush(Color.Black);
                    if (!sb3.Color.IsKnownColor) sb3 = new SolidBrush(Color.Black);

                    if (s1.IndexOf(Convert.ToChar(127)) == 0)
                    {
                        SizeF sizf1 = new SizeF(e.Graphics.MeasureString(s1.Substring(1), fnt, 500, sf));
                        SizeF sizf2 = new SizeF(e.Graphics.MeasureString(s2, fnt, 500, sf));
                        SizeF sizf3 = new SizeF(e.Graphics.MeasureString(s3.Substring(1), fnt, 500, sf));
                        SizeF sizf4 = new SizeF(e.Graphics.MeasureString(s4, fnt, 500, sf));
                        SizeF sizf5 = new SizeF(e.Graphics.MeasureString(s5.Substring(1), fnt, 500, sf));
                        stringSize = e.Graphics.MeasureString(s1[1].ToString(), fnt, 100, sf);
                        e.Graphics.DrawString(s1.Substring(2), fnt, sb1, new PointF(l_zarovnani1 + stringSize.Width, 12), sf);

                        if (l_zarovnani2 == 160)
                            e.Graphics.DrawString(s2, fnt, sb2, new PointF(l_zarovnani2 + (sizf1.Width - sizf2.Width), 24), sf); // end if
                        else e.Graphics.DrawString(s2, fnt, sb2, new PointF(l_zarovnani2, 24), sf); // end else

                        if (l_zarovnani1 == 160)
                            e.Graphics.DrawString(s3.Substring(2), fnt, sb1, new PointF(l_zarovnani1 + stringSize.Width + (sizf1.Width - sizf3.Width), 36), sf); // end if
                        else e.Graphics.DrawString(s3.Substring(2), fnt, sb1, new PointF(l_zarovnani1 + stringSize.Width, 36), sf); // end else

                        if (l_zarovnani2 == 160)
                            e.Graphics.DrawString(s4, fnt, sb2, new PointF(l_zarovnani2 + (sizf1.Width - sizf4.Width), 48), sf); // end if
                        else e.Graphics.DrawString(s4, fnt, sb2, new PointF(l_zarovnani2, 48), sf); // end else

                        if (l_zarovnani3 == 160)
                            e.Graphics.DrawString(s5.Substring(2), fnt, sb1, new PointF(l_zarovnani3 + stringSize.Width + (sizf1.Width - sizf5.Width), 60), sf); // end if
                        else e.Graphics.DrawString(s5.Substring(2), fnt, sb1, new PointF(l_zarovnani3 + stringSize.Width, 60), sf); // end else
                    }
                    else if (s1.IndexOf(Convert.ToChar(127)) >= 0)
                    {
                        SizeF sizf1 = new SizeF(e.Graphics.MeasureString(s1.Substring(0, s1.IndexOf(Convert.ToChar(127))) + s1.Substring(s1.Length - 1), fnt, 500, sf));
                        SizeF sizf2 = new SizeF(e.Graphics.MeasureString(s2, fnt, 500, sf));
                        SizeF sizf3 = new SizeF(e.Graphics.MeasureString(s3.Substring(0, s3.IndexOf(Convert.ToChar(127))) + s3.Substring(s3.Length - 1), fnt, 500, sf));
                        SizeF sizf4 = new SizeF(e.Graphics.MeasureString(s4, fnt, 500, sf));
                        SizeF sizf5 = new SizeF(e.Graphics.MeasureString(s5.Substring(0, s5.IndexOf(Convert.ToChar(127))) + s5.Substring(s5.Length - 1), fnt, 500, sf));
                        e.Graphics.DrawString(s1.Substring(0, s1.IndexOf(Convert.ToChar(127))), fnt, sb1, new PointF(l_zarovnani1, 12), sf);

                        if (l_zarovnani2 == 160)
                            e.Graphics.DrawString(s2, fnt, sb2, new PointF(l_zarovnani2 + (sizf1.Width - sizf2.Width), 24), sf); // end if
                        else e.Graphics.DrawString(s2, fnt, sb2, new PointF(l_zarovnani2, 24), sf); // end else

                        if (l_zarovnani1 == 160)
                            e.Graphics.DrawString(s3.Substring(0, s3.IndexOf(Convert.ToChar(127))), fnt, sb1, new PointF(l_zarovnani1 + (sizf1.Width - sizf3.Width), 36), sf); // end if
                        else e.Graphics.DrawString(s3.Substring(0, s3.IndexOf(Convert.ToChar(127))), fnt, sb1, new PointF(l_zarovnani1, 36), sf); // end else

                        if (l_zarovnani2 == 160)
                            e.Graphics.DrawString(s4, fnt, sb2, new PointF(l_zarovnani2 + (sizf1.Width - sizf4.Width), 48), sf); // end if
                        else e.Graphics.DrawString(s4, fnt, sb2, new PointF(l_zarovnani2, 48), sf); // end else

                        if (l_zarovnani3 == 160)
                            e.Graphics.DrawString(s5.Substring(0, s5.IndexOf(Convert.ToChar(127))), fnt, sb3, new PointF(l_zarovnani3 + stringSize.Width + (sizf1.Width - sizf5.Width), 60), sf); // end if
                        else e.Graphics.DrawString(s5.Substring(0, s5.IndexOf(Convert.ToChar(127))), fnt, sb3, new PointF(l_zarovnani3 + stringSize.Width, 60), sf); // end else
                    }
                    else
                    {
                        SizeF sizf1 = new SizeF(e.Graphics.MeasureString(s1, fnt, 500, sf));
                        SizeF sizf2 = new SizeF(e.Graphics.MeasureString(s2, fnt, 500, sf));
                        SizeF sizf3 = new SizeF(e.Graphics.MeasureString(s3, fnt, 500, sf));
                        SizeF sizf4 = new SizeF(e.Graphics.MeasureString(s4, fnt, 500, sf));
                        SizeF sizf5 = new SizeF(e.Graphics.MeasureString(s5, fnt, 500, sf));
                        e.Graphics.DrawString(s1, fnt, sb1, new PointF(l_zarovnani1, 12), sf);

                        if (l_zarovnani2 == 160)
                            e.Graphics.DrawString(s2, fnt, sb2, new PointF(l_zarovnani2 + (sizf1.Width - sizf2.Width), 24), sf); // end if
                        else e.Graphics.DrawString(s2, fnt, sb2, new PointF(l_zarovnani2, 24), sf); // end else

                        if (l_zarovnani1 == 160)
                            e.Graphics.DrawString(s3, fnt, sb1, new PointF(l_zarovnani1 + (sizf1.Width - sizf3.Width), 36), sf); // end if
                        else e.Graphics.DrawString(s3, fnt, sb1, new PointF(l_zarovnani1, 36), sf); // end else

                        if (l_zarovnani2 == 160)
                            e.Graphics.DrawString(s4, fnt, sb2, new PointF(l_zarovnani2 + (sizf1.Width - sizf4.Width), 48), sf); // end if
                        else e.Graphics.DrawString(s4, fnt, sb2, new PointF(l_zarovnani2, 48), sf); // end else

                        if (l_zarovnani3 == 160)
                            e.Graphics.DrawString(s5, fnt, sb3, new PointF(l_zarovnani3 + stringSize.Width + (sizf1.Width - sizf5.Width), 60), sf); // end if
                        else e.Graphics.DrawString(s5, fnt, sb3, new PointF(l_zarovnani3 + stringSize.Width, 60), sf); // end else
                    }
                }
            }
            catch { }
        }
    }
}
