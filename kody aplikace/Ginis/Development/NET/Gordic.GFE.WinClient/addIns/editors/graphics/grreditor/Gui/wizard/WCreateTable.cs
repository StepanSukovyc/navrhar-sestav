//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.WCreateTable.cs                        </Name>
//    <Description> wizard vztviření objektu Tabulka                            </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-09-18                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using System;
using System.Drawing;
using System.Windows.Forms;
using System.Xml;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// průvodce vytvoření objektu tabulka
    /// </summary>
    class WCreateTable : AbstractWizardPanel
    {
        Label lbLinesCount, lbColumnsCount;
        NumericUpDown nudLines, nudColumns;
        CheckBox cbXmlCode;
        RichTextBox rtbXmlCode;
        ErrorProvider errorProvider;

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public WCreateTable()
        {	
			InitializeComponent();
			Init();
		}

        /// <summary>
        /// Inicializace komponent
        /// </summary>
        void InitializeComponent()
        {
            lbLinesCount = new Label();
            nudLines = new NumericUpDown();

            lbColumnsCount = new Label();
            nudColumns = new NumericUpDown();
            cbXmlCode = new CheckBox();
            rtbXmlCode = new RichTextBox();

            this.SuspendLayout();
            //
            // lbLinesCount
            //
            lbLinesCount.Location = new Point(8, 16);
            lbLinesCount.Name = "lbLinesCount";
            lbLinesCount.Size = new Size(45, 14);
            lbLinesCount.Text = "řádků:";
            //
            // nudLines
            //
            nudLines.Location = new Point(61, 16);
            nudLines.Name = "nudLines";
            nudLines.Size = new Size(55, 24);
            nudLines.TabIndex = 1;
            nudLines.Minimum = 1;
            nudLines.Maximum = 25;
            //
            // lbColumnsCount
            //
            lbColumnsCount.Location = new Point(134, 16);
            lbColumnsCount.Name = "lbColumnsCount";
            lbColumnsCount.Size = new Size(50, 14);
            lbColumnsCount.Text = "sloupců:";
            //
            // nudColumns
            //
            nudColumns.Location = new Point(187, 16);
            nudColumns.Name = "nudColumns";
            nudColumns.Size = new Size(55, 24);
            nudColumns.TabIndex = 2;
            nudColumns.Minimum = 1;
            nudColumns.Maximum = 35;

            //
            // cbXmlCode
            //
            cbXmlCode.Location = new Point(8, 48);
            cbXmlCode.Name = "cbXmlCode";
            cbXmlCode.Size = new Size(100, 21);
            cbXmlCode.Text = "XML kód:";
            cbXmlCode.CheckedChanged += delegate { rtbXmlCode.Enabled = cbXmlCode.Checked; };
            //
            // rtbXmlCode
            //
            rtbXmlCode.Location = new Point(8, 77);
            rtbXmlCode.Name = "rtbXmlCode";
            rtbXmlCode.Size = new Size(125, 65);
            rtbXmlCode.Anchor = AnchorStyles.Left | AnchorStyles.Right | AnchorStyles.Top | AnchorStyles.Bottom;
            rtbXmlCode.Enabled = false;
            rtbXmlCode.TextChanged += delegate { UpdateError(); };
            rtbXmlCode.Text = "<table>" + "\r\n\t" + "Obsah objektu nebo odstraň vše" + "\r\n" + "</table>";
            //
            // errorProvider
            //
            errorProvider = new ErrorProvider
            {
                ContainerControl = this
            };

            this.Controls.AddRange(new Control[] { lbLinesCount, nudLines, lbColumnsCount, nudColumns, cbXmlCode, rtbXmlCode });

            this.ResumeLayout(false);
        }
        void Init()
        {
            FinishPanelRequested += SectionPanelFinishPanelRequested;
            UpdateError();
        }
        void SectionPanelFinishPanelRequested(object sender, EventArgs e)
        {
            try
            {
                if (!cbXmlCode.Checked)
                {
                    XmlDocument xmlDoc = new XmlDocument();
                    xmlDoc.LoadXml(CreateXmlString());
                    this.Wizard.Customizer = xmlDoc.DocumentElement;
                }
                else if (string.IsNullOrEmpty(rtbXmlCode.Text))
                    this.Wizard.Customizer = null;
                else
                {
                    XmlDocument xmlDoc = new XmlDocument();
                    xmlDoc.LoadXml(rtbXmlCode.Text);
                    this.Wizard.Customizer = xmlDoc.DocumentElement;
                }
            }
            catch (Exception ex) { LoggingService.Error(ex.Message); }
        }

        string CreateXmlString()
        {
            string result = "<table>";
            for (int counter = 0; counter < nudLines.Value; counter++)
                result += CreateXmlLine();

            result += "</table>";
            return result;
        }

        string CreateXmlLine()
        {
            string result = "<line>";
            for (int counter = 0; counter < nudColumns.Value; counter++)
                result += CreateXmlColumn();

            result += "</line>";
            return result;
        }
        string CreateXmlColumn()
        {
            string result = "<style>";
            for (int counter = 0; counter < nudColumns.Value; counter++)
                result += "<text value=\"\" />";

            result += "</style>";
            return result;
        }

        void UpdateError()
        {
            if (!cbXmlCode.Checked)
                errorProvider.SetError(rtbXmlCode, "");
            else
                if (ParserService.IsWellFormedXML(rtbXmlCode.Text, out string errorMessage))
                    errorProvider.SetError(rtbXmlCode, "");
                else
                    errorProvider.SetError(rtbXmlCode, errorMessage/*"obsah není XML validní!"*/);
        }

        /// <exclude/>
        public override bool ReceiveDialogMessage(Parsers.DialogMessage message)
        {
            switch (message)
            {
                case DialogMessage.finish:
                    FinishPanel();
                    break;
                default:
                    break;
            }
            return true;
        }
    }
}
