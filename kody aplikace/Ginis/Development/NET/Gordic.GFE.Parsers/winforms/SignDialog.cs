//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.SignDialog.cs                            </Name>
//    <Description> Dialog pro podepisování                                     </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2015-11-30                                                  </Created>
//  </FileHeader>

using Gordic.General;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Dialog pro podepisování
    /// </summary>
    public partial class SignDialog : Form
    {
        public SignDialog()
        {
            InitializeComponent();
        }

        public SignDialog(object value)
            : this()
        {
            if (value == null)
                radioButton1.Checked = true;
            else
            {
                Value = value.ToString();
                //TODO
                if (Value.StartsWith("DS"))
                    radioButton3.Checked = true;
                else
                    radioButton2.Checked = true;
            }
            pnDs.Visible = false;
            pnOk.Visible = true;
        }
        bool first = true;
        protected override void OnActivated(EventArgs e)
        {
            if (first)
            {
                first = false;
                this.radioButton1.Click += new System.EventHandler(this.RadioButton_Click);
                this.radioButton2.Click += new System.EventHandler(this.RadioButton_Click);
                this.radioButton3.Click += new System.EventHandler(this.RadioButton_Click);
            }
            base.OnActivated(e);
        }

        private void RadioButton_Click(object sender, EventArgs e)
        {
            pnOk.Visible = false;
            pnDs.Visible = radioButton3.Checked;
        }

        private void Button1_Click(object sender, EventArgs e)
        {
            Gordic.WinForms.Controls.GWaitForm.ShowWaitForm(GResources.GetResourceText(29450766) + "...");
            System.Threading.Thread.Sleep(200);
            try
            {
                var a = new Gordic.Ids2.Client.IsdsDataBoxAccessWs(Gordic.General.ApplicationClient.GUserProcess.Current);
                a.SetConfig(
                    "https://ws1.czebox.cz/DS/DsManage"
#if DEBUG
                    , "b22p9d", "Erbenova1"
#else
                    , textBox1.Text, textBox2.Text
#endif
                    , Gordic.Ids2.Interface.Common.IsdsAuthenticatonType.BASIC
                    , delegate (string serializedCookie) { return ""; }
                    );
                Gordic.WinForms.Controls.GWaitForm.ShowWaitForm(GResources.GetResourceText(29450767) + "...");
                //Gordic.Support.DataMessage.tDbUserInfo dbUserInfo;
                //a.GetUserInfoFromLogin(out dbUserInfo);
                a.GetOwnerInfoFromLogin(out Support.DataMessage.tDbOwnerInfo dbOwnerInfo);
                Value = "DS" + dbOwnerInfo.firmName;
                pnDs.Visible = false;
                pnOk.Visible = true;
                labOk.Text = GResources.GetResourceText(29450768) + "\n" + dbOwnerInfo.firmName;
                Save?.Invoke(this, e);

                //                using (var s = Security.Service.GCertGenerator.GenerateSelfSignedCertificate())
                {
                }


                //System.IO.File.Copy(@"e:\test\ali1\2\1.xml", @"n:\sign.xml", true);
                /*
                                using (var x = new Gordic.Security.Service.GXmlSignature())
                                {
                                    using (var s = new SBX509Ex.TElX509CertificateEx())
                                    {
                                        s.UseUTF8 = true;
                                        s.ValidFrom = DateTime.Today;
                                        s.ValidTo = DateTime.Today.AddYears(10);
                                        //var subj = new SBX509.TName()
                                        //{
                                        //    CommonName = dbOwnerInfo.pnFirstName + dbOwnerInfo.pnMiddleName + dbOwnerInfo.pnLastName,
                                        //    Organization = dbOwnerInfo.firmName,
                                        //    OrganizationUnit = dbOwnerInfo.ic,
                                        //    EMailAddress = dbOwnerInfo.email,
                                        //    Locality = dbOwnerInfo.adStreet + dbOwnerInfo.adNumberInStreet,
                                        //    Country = dbOwnerInfo.adCity,
                                        //    StateOrProvince = dbOwnerInfo.adState
                                        //};
                                        //s.SetSubject(subj); 
                                        //s.SetIssuer(subj);
                                        _setSI(s, SBConstants.Unit.SB_CERT_OID_COMMON_NAME, "DB", dbOwnerInfo.dbID);
                                        _setSI(s, SBConstants.Unit.SB_CERT_OID_COUNTRY, dbOwnerInfo.adState);
                                        _setSI(s, SBConstants.Unit.SB_CERT_OID_LOCALITY, dbOwnerInfo.adCity);
                                        _setSI(s, SBConstants.Unit.SB_CERT_OID_STREET_ADDRESS, dbOwnerInfo.adStreet, dbOwnerInfo.adNumberInMunicipality, dbOwnerInfo.adNumberInStreet);
                                        _setSI(s, SBConstants.Unit.SB_CERT_OID_POSTAL_CODE, dbOwnerInfo.adZipCode);

                                        _setSI(s, SBConstants.Unit.SB_CERT_OID_GIVEN_NAME, dbOwnerInfo.pnFirstName);
                                        _setSI(s, SBConstants.Unit.SB_CERT_OID_SURNAME, dbOwnerInfo.pnLastName);
                                        _setSI(s, SBConstants.Unit.SB_CERT_OID_PSEUDONYM, dbOwnerInfo.pnMiddleName);
                                        //dbOwnerInfo.pnLastNameAtBirth
                                        _setSI(s, SBConstants.Unit.SB_CERT_OID_PERMANENT_IDENTIFIER, dbOwnerInfo.registryCode);
                                        //nationality
                                        //identifier

                                        _setSI(s, SBConstants.Unit.SB_CERT_OID_INITIALS, dbOwnerInfo.dbType);                       //dbType
                                        //dbEffectiveOVM
                                        //dbState
                                        //dbOpenAddressing

                                        //public string biCity { get; set; }
                                        //public string biCounty { get; set; }
                                        //public DateTime? biDate { get; set; }
                                        //public string biState { get; set; }

                                        _setSI(s, SBConstants.Unit.SB_CERT_OID_TELEPHONE_NUMBER, dbOwnerInfo.telNumber);

                                        _setSI(s, SBConstants.Unit.SB_CERT_OID_ORGANIZATION, dbOwnerInfo.firmName);
                                        _setSI(s, SBConstants.Unit.SB_CERT_OID_TELEX_NUMBER, dbOwnerInfo.ic);
                                        //_setSI(s, SBConstants.Unit.SB_CERT_OID_ORGANIZATION_UNIT, "uuuuuuuuuuuuuuuuuuuu");
                                        _setSI(s, SBConstants.Unit.SB_CERT_OID_EMAIL, dbOwnerInfo.email);
                                        //var ss = s.SubjectRDN.SaveToDNString();

                                        //s.SerialNumber =
                                        s.Extensions.KeyUsage = new SBX509Ext.TElKeyUsageExtension() { DigitalSignature = true };
                                        s.Generate(SBConstants.Unit.SB_CERT_ALGORITHM_SHA256_RSA_ENCRYPTION, 16);

                                        //s.SaveToFile(@"n:\sign.spc", "", 4);

                                        using (var s2 = new Gordic.Security.Service.GCertificate(s))
                                        {

                                            x.Sign(@"n:\sign.xml",
                                                NodeToSign: null, // Gordic.Security.Service.GXmlRef.GetRefWithOneNs("/d:Z/d:A1", "d", "data:delpoz:1:1"), // null,
                                                NodeForSaveSignature: null, //Gordic.Security.Service.GXmlRef.GetRefWithOneNs("/d:Z", "d", "data:delpoz:1:1"), // null
                                                Certificate: s2,
                                                canonization: Security.Service.GXmlSignature.CanonMethodEnum.Canon,
                                                SignatureType: Security.Service.GXmlSignature.SignatureTypeEnum.Enveloped, //Enveloping
                                                XmlSignatureMethod: Security.Service.GXmlSignature.SignatureMethodEnum.RSA_SHA256,
                                                DigestMethod: Security.Service.GXmlSignature.DigestMethodEnum.SHA256,

                                                AddSignatureToDocument: true,
                                                doAddReferenceAttribute: true,
                                                addEnvelopeTransform: true,

                                                ReferenceAttributeName: null,
                                                ReferenceAttributeValue: null
                                                //,XAdESDesc: new GXAdESDescriptor()
                                                );
                                        }
                                    }
                                }
                */
            }
            finally
            {
                Gordic.WinForms.Controls.GWaitForm.HideWaitForm();
            }
        }

        //private void _setSI(SBX509Ex.TElX509CertificateEx s, SBConstants.TBufferTypeConst t, params object[] p)
        //{
        //    var x = Encoding.UTF8.GetBytes(_t(p));
        //    if (x.Length == 0) return;
        //    s.SubjectRDN.Add(t, x, SBASN1Tree.Unit.SB_ASN1_UTF8STRING);
        //    s.IssuerRDN.Add(t, x, SBASN1Tree.Unit.SB_ASN1_UTF8STRING);
        //}

        private string _t(params object[] p)
        {
            if (p.Length == 0) return "";
            if (p.Length == 1) return p[0] == null ? "" : p[0].ToString();
            var sb = new StringBuilder();
            foreach (var w in p)
            {
                if (w == null) continue;
                if (sb.Length > 0) sb.Append(' ');
                sb.Append(w);
            }
            return sb.ToString();
        }

        public string Value;

        public event EventHandler Save;

    }
}
