//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.AvailableVersions.cs                   </Name>
//    <Description> dialogové okno výběru verze pro import                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-08-09                                                  </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Windows.Forms;

namespace Gordic.GFE.WinClient
{
    /// <summary>
    ///dialogové okno výběru verze pro import
    /// </summary>
    partial class AvailableVersions : Form
    {
        sealed class VersionItem
        {
            string path;
            /// <summary>
            /// cesta ke složce konfigurace určité verze
            /// </summary>
            public string Path { get { return path; } }

            string name;
            /// <summary>
            /// název složky
            /// </summary>
            public string Name { get { return name; } }

            /// <summary>
            /// vytvoření nové instance třídy
            /// </summary>
            /// <param name="path">cesta ke složce konfigurace určité verze</param>
            public VersionItem(string path)
            {
                this.path = path;
                if (Directory.Exists(path))
                    name = (new DirectoryInfo(path)).Name;
            }
            /// <exclude/>
            public override string ToString() { return Name; }
        }
        static AvailableVersions instance;
        /// <summary>
        /// verze k importu
        /// </summary>
        public static string Version;

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public AvailableVersions() { InitializeComponent(); }

        /// <summary>
        /// zobrazení dialogového okna dostupných verzí pro import
        /// </summary>
        /// <param name="versions">dostupné verze</param>
        internal static void ShowAvailableVersions(string[] versions)
        {
            instance = new AvailableVersions();
            instance.SetVersions(versions);
            instance.ShowDialog();
        }

        void SetVersions(string[] versions)
        {
            foreach (var item in versions)
            {
                VersionItem vi = new VersionItem(item);
                if (vi.Name != null && vi.Name.Split('.').Length > 3)
                    lbVersions.Items.Add(vi);
            }
        }
        void lbVersions_SelectedIndexChanged(object sender, EventArgs e)
        {
            btnImport.Enabled = true;
            Version = (lbVersions.SelectedItem as VersionItem).Path;
        }
        void btnImport_Click(object sender, EventArgs e) { Close(); }
        void btnCancel_Click(object sender, EventArgs e)
        {
            Version = null;
            Close();
        }
    }
}
