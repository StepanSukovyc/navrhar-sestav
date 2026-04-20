//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ItemType.cs                              </Name>
//    <Description> Silné složení typů položek.                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.Utils;
using Gordic.General;

namespace Gordic.GFE.Parsers.AddIns.Project
{
    /// <summary>
    /// Silné složení typů položek.
    /// Nechceme všude používate řetězce
    /// </summary>
    public struct ItemType : IEquatable<ItemType>, IComparable<ItemType>
    {
        /// <summary>
        /// odkaz na soubor
        /// </summary>
        public static readonly ItemType Reference = new ItemType("Reference");

        /// <summary>
        /// Kolekce typu položek souboru.
        /// </summary>
        public static readonly ReadOnlyCollectionWrapper<ItemType> DefaultFileItems
            = new Set<ItemType>(new ItemType("Content"), new ItemType("None")).AsReadOnly();

        /// <summary>
        /// nevizuální element
        /// </summary>
        public static readonly ItemType Element = new ItemType("Element");

        /// <summary>
        /// Jiný soubor
        /// </summary>
        public static readonly ItemType None = new ItemType("None");
        /// <summary>
        /// Datový soubor
        /// </summary>
        public static readonly ItemType Data = new ItemType("Data");
        /// <summary>
        /// Soubor struktury
        /// </summary>
        public static readonly ItemType Structure = new ItemType("Structure");
        /// <summary>
        /// Soubor generátoru
        /// </summary>
        public static readonly ItemType Generator = new ItemType("generator");
        /// <summary>
        /// Soubor transformu
        /// </summary>
        public static readonly ItemType Transform = new ItemType("transform");

        /// <summary>
        /// Obsah - alf soubor
        /// </summary>
        public static readonly ItemType Content = new ItemType("Content");
        /// <summary>
        /// Případně složka
        /// </summary>
        public static readonly ItemType Folder = new ItemType("Folder");
        /// <summary>
        /// Zdroj dodatečných dat - obvyklé zip soubor
        /// </summary>
        public static readonly ItemType Resource = new ItemType("Resource");
        /// <summary>
        /// Soubor pro dekomprimací - obvyklé má koncovku jinou než .zip, 
        /// ale je to zip soubor (např. gfrm, srz atd.)
        /// </summary>
        public static readonly ItemType Archive = new ItemType("Archive");

        /// <summary>
        /// spustitelný soubor - např. ssr
        /// </summary>
        public static readonly ItemType Runable = new ItemType("Runable");

        readonly string itemName;
        /// <summary>
        /// Název položky
        /// </summary>
        public string ItemName { get { return itemName; } }
        /// <summary>
        /// Vytvoření nové položky určitého názvu
        /// </summary>
        /// <param name="itemName">Název položky</param>
        public ItemType(string itemName)
        {
            if (string.IsNullOrEmpty(itemName))
                throw new ArgumentNullException(GResources.GetResourceText(29450117)); //RC 29450117 : itemName nesmí být prázdná hodnota!
            this.itemName = itemName;
        }

        /// <summary>
        /// převod položky na řetězec
        /// </summary>
        /// <returns></returns>
        public override string ToString() { return itemName; }

        /// <summary>
        /// Porovnání položek
        /// </summary>
        /// <param name="other">porovnávaná položka</param>
        /// <returns></returns>
        public int CompareTo(ItemType other)
        {
            return itemName.CompareTo(other.itemName);
        }

        #region Equals a GetHashCode
        /// <summary>
        /// Rovnost položek
        /// </summary>
        /// <param name="obj">objekt pro porovnání</param>
        /// <returns></returns>
        public override bool Equals(object obj)
        {
            if (obj is ItemType)
                return Equals((ItemType)obj);
            else
                return false;
        }
        /// <summary>
        /// Porovnání s jinou položkou
        /// </summary>
        /// <param name="other">Jiná položka</param>
        /// <returns></returns>
        public bool Equals(ItemType other)
        {
            return this.itemName.Equals(other.itemName, StringComparison.InvariantCultureIgnoreCase);
        }

        /// <exclude/>
        public override int GetHashCode()
        {
            return itemName.GetHashCode();
        }
        /// <exclude/>
        public static bool operator ==(ItemType lhs, ItemType rhs)
        {
            return lhs.Equals(rhs);
        }

        /// <exclude/>
        public static bool operator !=(ItemType lhs, ItemType rhs)
        {
            return !(lhs.Equals(rhs));
        }
        #endregion
    }
}
