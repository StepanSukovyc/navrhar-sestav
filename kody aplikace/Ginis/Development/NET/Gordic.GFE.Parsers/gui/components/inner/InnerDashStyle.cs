//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.InnerDashStyle.cs                        </Name>
//    <Description> rozhraní stylu vnitřního ohraničení                         </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2022-11-16                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// rozhraní stylu vnitřního ohraničení
    /// </summary>
    public interface IInnerDashStyle
    {
        /// <summary>
        /// hodnota 'společného' stylu
        /// </summary>
        [TypeConverter(typeof(ComplexDashStyleConverter))]
        string Value { get; set; }
        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="value">objekt inicializačních hodnot</param>
        IInnerDashStyle Initialize(IInnerDashStyle value);
        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="value">objekt inicializačních hodnot</param>
        IInnerDashStyle Initialize(string value);
    }

    /// <summary>
    /// Třída s propojenými vlastnostmi
    /// </summary>
    [Serializable]
    public class InnerDashStyle : IInnerDashStyle
    {
        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        [XmlAttribute("Value")]
        [DisplayName("hodnota")]
        public virtual string Value { get; set; }


        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public InnerDashStyle() { }

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="value">objekt inicializačních hodnot</param>
        public virtual IInnerDashStyle Initialize(string value) { Value = value; return this; }

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        public virtual IInnerDashStyle Initialize()
        {
            Value = ComplexDashStyle.Unspec;
            return this;
        }

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        /// <param name="value">objekt inicializačních hodnot</param>
        public virtual IInnerDashStyle Initialize(IInnerDashStyle value)
        {
            if (value != null)
                Value = value.Value;
            else
                Initialize();

            return this;
        }

        void SetValue(string value) { Value = value; }

        /// <summary>
        /// Převod na řetězec
        /// </summary>
        /// <returns></returns>
        public override string ToString() => string.Format("{0};", Value);

        /// <exclude/>
        public override bool Equals(object obj) => obj is IInnerDashStyle ? Equals(obj as IInnerDashStyle) : base.Equals(obj);

        /// <summary>
        /// Porovnání s jinou položkou
        /// </summary>
        /// <param name="other">Jiná položka</param>
        /// <returns></returns>
        bool Equals(IComplexFiveDashStyle other) => Value.Equals(other.LeftValue, StringComparison.OrdinalIgnoreCase);

        /// <summary>
        /// Přetížení
        /// </summary>
        /// <returns></returns>
        public override int GetHashCode() => base.GetHashCode();
    }

    /// <summary>
    /// Třída s pěti propojenými vlastnostmi
    /// </summary>
    [Serializable]
    [TypeConverter(typeof(ExpandableObjectConverter))]
    public class URInnerDashStyle : InnerDashStyle
    {
        [NonSerialized]
        readonly UndoRedo<string> value = new UndoRedo<string>();
        /// <summary>
        /// Uživatelská hodnota [Neviditelná v tabulce vlastnosti]
        /// </summary>
        [XmlAttribute("Value")]
        [DisplayName("hodnota")]
        public override string Value { get => value.Value; set => this.value.Value = value; }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public URInnerDashStyle() : base() { }
    }
}
