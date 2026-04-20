//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ClassBrowserIconService.cs             </Name>
//    <Description> Služba pro práci s prohlížečem tříd                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-16                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;

namespace Gordic.GFE.Parsers.Services
{
    /// <summary>
    /// Služba pro práci s prohlížečem tříd
    /// </summary>
    public static class ClassBrowserIconService
    {
        /// <summary>
        /// index parametru
        /// </summary>
        public const int ParameterIndex = 17;
        /// <summary>
        /// index větve
        /// </summary>
        public const int NodeIndex = 18;
        /// <summary>
        /// attribut
        /// </summary>
        public const int AttributeIndex = 58;

        /// <summary>
        /// Index
        /// </summary>
        public const int NamespaceIndex = 3;
        /// <summary>
        /// Index šablony
        /// </summary>
        public const int CodeTemplateIndex = 20;
        /// <summary>
        /// index třídy
        /// </summary>
        public const int XmlAttrDeclIndex = 21;
        /// <summary>
        /// index třídy
        /// </summary>
        public const int FieldIndex = 48;
        /// <summary>
        /// index třídy
        /// </summary>
        public const int ClassIndex = 22;
        /// <summary>
        /// index metody
        /// </summary>
        public const int MethodIndex = ClassIndex + 4 * 4;
        /// <summary>
        /// Klíčové slovo
        /// </summary>
        public const int KeywordIndex = NamespaceIndex; //19;

        /// <summary>
        /// index skriptů
        /// </summary>
        public const int ScriptIndex = 54;

        /// <summary>
        /// Klíčové slovo
        /// </summary>
        public const int XmlIndex = 21; //21;

        static ImageList imglist = null;
        /// <summary>
        /// Seznam obrázků
        /// </summary>
        public static ImageList ImageList { get { return imglist; } }

        static ClassBrowserIconService()
        {
            imglist = new ImageList
            {
                ColorDepth = ColorDepth.Depth32Bit
            };
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.Assembly"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.OpenAssembly"));

            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.Library"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.NameSpace"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.SubTypes"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.SuperTypes"));

            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.ClosedFolderBitmap"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.OpenFolderBitmap"));

            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.Reference"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.ClosedReferenceFolder"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.OpenReferenceFolder"));

            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.ResourceFileIcon"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.Event"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.SelectionArrow"));

            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.CombineIcon"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.Literal"));

            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.Local"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.Parameter"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.Operator"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.Keyword"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.TextFileIcon"));

            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons__Ost__xml"));

            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.Class")); //22
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.InternalClass"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.ProtectedClass"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.PrivateClass"));

            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.Struct"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.InternalStruct"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.ProtectedStruct"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.PrivateStruct"));

            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.Interface"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.InternalInterface"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.ProtectedInterface"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.PrivateInterface"));

            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.Enum"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.InternalEnum"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.ProtectedEnum"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.PrivateEnum"));

            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.Method"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.InternalMethod"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.ProtectedMethod"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.PrivateMethod"));

            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.Property"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.InternalProperty"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.ProtectedProperty"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.PrivateProperty"));

            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.Field"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.InternalField"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.ProtectedField"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.PrivateField"));

            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.Delegate"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.InternalDelegate"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.ProtectedDelegate"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.PrivateDelegate"));

            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.Event"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.InternalEvent"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.ProtectedEvent"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.PrivateEvent"));

            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.Indexer"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.InternalIndexer"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.ProtectedIndexer"));
            imglist.Images.Add(WinFormsResourceService.GetBitmap("Icons.16x16.PrivateIndexer"));

        }

        /// <summary>
        /// získání ikonky člena
        /// </summary>
        /// <param name="member">uvedený člen</param>
        /// <returns></returns>
        public static int GetIcon(IMember member)
        {
            if (member is IField)
                return GetIcon(member as IField);
            return ParameterIndex;
        }

        /// <summary>
        /// získání ikonky člena
        /// </summary>
        /// <param name="entity">uvedený člen</param>
        /// <returns></returns>
        public static int GetIcon(ICompletationEntity entity)
        {
            switch (entity.TypeType)
            {
                case TypeType.xml:
                case TypeType.format:
                case TypeType.region:
                    return FieldIndex;
                default:
                    return XmlAttrDeclIndex;
            }
        }
        /// <summary>
        /// získání ikonky pole
        /// </summary>
        /// <param name="field">uvedené pole</param>
        /// <returns></returns>
        public static int GetIcon(IField field)
        {
            if (field.IsParameter)
                return ParameterIndex;
            return ParameterIndex;
        }
    }
}
