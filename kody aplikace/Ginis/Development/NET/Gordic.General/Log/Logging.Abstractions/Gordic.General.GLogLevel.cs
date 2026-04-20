//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GLogLevel.cs                                 </Name>
//    <Description> Pøedstavuje dostupné logovací úrovnì                        </Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2020-09-21                                                  </Created>
//  </FileHeader>

// 
// Copyright (c) 2004-2020 Jaroslaw Kowalski <jaak@jkowalski.net>, Kim Christensen, Julian Verdurmen
// 
// All rights reserved.
// 
// Redistribution and use in source and binary forms, with or without 
// modification, are permitted provided that the following conditions 
// are met:
// 
// * Redistributions of source code must retain the above copyright notice, 
//   this list of conditions and the following disclaimer. 
// 
// * Redistributions in binary form must reproduce the above copyright notice,
//   this list of conditions and the following disclaimer in the documentation
//   and/or other materials provided with the distribution. 
// 
// * Neither the name of Jaroslaw Kowalski nor the names of its 
//   contributors may be used to endorse or promote products derived from this
//   software without specific prior written permission. 
// 
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE 
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE 
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE 
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR 
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS 
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN 
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF 
// THE POSSIBILITY OF SUCH DAMAGE.
// 

namespace Gordic.General
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;


    /// <summary>
    /// Pøedstavuje dostupné logovací úrovnì
    /// </summary>    
    [TypeConverter(typeof(NLog.Attributes.LogLevelTypeConverter))]
    public sealed class GLogLevel : IComparable, IEquatable<GLogLevel>, IConvertible
    {
        /// <summary>
        /// Logovací úroveò Trace 
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Security", "CA2104:DoNotDeclareReadOnlyMutableReferenceTypes", Justification = "Type is immutable")]
        public static readonly GLogLevel Trace = new GLogLevel("Trace", 0);

        /// <summary>
        /// Logovací úroveò Debug
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Security", "CA2104:DoNotDeclareReadOnlyMutableReferenceTypes", Justification = "Type is immutable")]
        public static readonly GLogLevel Debug = new GLogLevel("Debug", 1);

        /// <summary>
        /// Logovací úroveò Info
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Security", "CA2104:DoNotDeclareReadOnlyMutableReferenceTypes", Justification = "Type is immutable")]
        public static readonly GLogLevel Info = new GLogLevel("Info", 2);

        /// <summary>
        /// Logovací úroveò Warn
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Security", "CA2104:DoNotDeclareReadOnlyMutableReferenceTypes", Justification = "Type is immutable")]
        public static readonly GLogLevel Warn = new GLogLevel("Warn", 3);

        /// <summary>
        /// Logovací úroveò Error
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Security", "CA2104:DoNotDeclareReadOnlyMutableReferenceTypes", Justification = "Type is immutable")]
        public static readonly GLogLevel Error = new GLogLevel("Error", 4);

        /// <summary>
        /// Logovací úroveò Fatal
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Security", "CA2104:DoNotDeclareReadOnlyMutableReferenceTypes", Justification = "Type is immutable")]
        public static readonly GLogLevel Fatal = new GLogLevel("Fatal", 5);

        /// <summary>
        /// Logovací úroveò Off (vypnutá úroveò)
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Security", "CA2104:DoNotDeclareReadOnlyMutableReferenceTypes", Justification = "Type is immutable")]
        public static readonly GLogLevel Off = new GLogLevel("Off", 6);


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Security", "CA2104:DoNotDeclareReadOnlyMutableReferenceTypes", Justification = "Type is immutable")]
        private static readonly IList<GLogLevel> allLevels = new List<GLogLevel> { Trace, Debug, Info, Warn, Error, Fatal, Off }.AsReadOnly();

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Security", "CA2104:DoNotDeclareReadOnlyMutableReferenceTypes", Justification = "Type is immutable")]
        private static readonly IList<GLogLevel> allLoggingLevels = new List<GLogLevel> { Trace, Debug, Info, Warn, Error, Fatal }.AsReadOnly();

        /// <summary>
        /// Získá všechny dostupné logovací úrovnì  (Trace, Debug, Info, Warn, Error, Fatal, Off).
        /// </summary>
        public static IEnumerable<GLogLevel> AllLevels => allLevels;

        /// <summary>
        ///  Získá všechny dostupné logovací úrovnì, které mohou být použity pro logování (Trace, Debug, Info, Warn, Error, Fatal) 
        ///  napø. <c>GLogLevel.Off</c> je vyjmuta.
        /// </summary>
        public static IEnumerable<GLogLevel> AllLoggingLevels => allLoggingLevels;


        private readonly int _ordinal;
        private readonly string _name;

        /// <summary>
        /// Vytvoøí novou instanci <see cref="GLogLevel"/>.
        /// </summary>
        /// <param name="name">Název logovací úrovnì</param>
        /// <param name="ordinal">Poøadové èíslo logovací úrovnì</param>
        private GLogLevel(string name, int ordinal)
        {
            _name = name;
            _ordinal = ordinal;
        }

        /// <summary>
        /// Název logovací úrovnì
        /// </summary>
        public string Name => _name;

        internal static GLogLevel MaxLevel => Fatal;

        internal static GLogLevel MinLevel => Trace;

        /// <summary>
        /// Poøadové èíslo logovací úrovnì
        /// </summary>
        public int Ordinal => _ordinal;

        /// <summary>
        /// Compares two <see cref="GLogLevel"/> objects 
        /// and returns a value indicating whether 
        /// the first one is equal to the second one.
        /// </summary>
        /// <param name="level1">The first level.</param>
        /// <param name="level2">The second level.</param>
        /// <returns>The value of <c>level1.Ordinal == level2.Ordinal</c>.</returns>
        public static bool operator ==(GLogLevel level1, GLogLevel level2)
        {
            if (ReferenceEquals(level1, null))
            {
                return ReferenceEquals(level2, null);
            }

            if (ReferenceEquals(level2, null))
            {
                return false;
            }

            return level1.Ordinal == level2.Ordinal;
        }

        /// <summary>
        /// Compares two <see cref="GLogLevel"/> objects 
        /// and returns a value indicating whether 
        /// the first one is not equal to the second one.
        /// </summary>
        /// <param name="level1">The first level.</param>
        /// <param name="level2">The second level.</param>
        /// <returns>The value of <c>level1.Ordinal != level2.Ordinal</c>.</returns>
        public static bool operator !=(GLogLevel level1, GLogLevel level2)
        {
            if (ReferenceEquals(level1, null))
            {
                return !ReferenceEquals(level2, null);
            }

            if (ReferenceEquals(level2, null))
            {
                return true;
            }

            return level1.Ordinal != level2.Ordinal;
        }

        /// <summary>
        /// Compares two <see cref="GLogLevel"/> objects 
        /// and returns a value indicating whether 
        /// the first one is greater than the second one.
        /// </summary>
        /// <param name="level1">The first level.</param>
        /// <param name="level2">The second level.</param>
        /// <returns>The value of <c>level1.Ordinal &gt; level2.Ordinal</c>.</returns>
        public static bool operator >(GLogLevel level1, GLogLevel level2)
        {
            if (level1 == null) { throw new ArgumentNullException(nameof(level1)); }
            if (level2 == null) { throw new ArgumentNullException(nameof(level2)); }

            return level1.Ordinal > level2.Ordinal;
        }

        /// <summary>
        /// Compares two <see cref="GLogLevel"/> objects 
        /// and returns a value indicating whether 
        /// the first one is greater than or equal to the second one.
        /// </summary>
        /// <param name="level1">The first level.</param>
        /// <param name="level2">The second level.</param>
        /// <returns>The value of <c>level1.Ordinal &gt;= level2.Ordinal</c>.</returns>
        public static bool operator >=(GLogLevel level1, GLogLevel level2)
        {
            if (level1 == null) { throw new ArgumentNullException(nameof(level1)); }
            if (level2 == null) { throw new ArgumentNullException(nameof(level2)); }

            return level1.Ordinal >= level2.Ordinal;
        }

        /// <summary>
        /// Compares two <see cref="GLogLevel"/> objects 
        /// and returns a value indicating whether 
        /// the first one is less than the second one.
        /// </summary>
        /// <param name="level1">The first level.</param>
        /// <param name="level2">The second level.</param>
        /// <returns>The value of <c>level1.Ordinal &lt; level2.Ordinal</c>.</returns>
        public static bool operator <(GLogLevel level1, GLogLevel level2)
        {
            if (level1 == null) { throw new ArgumentNullException(nameof(level1)); }
            if (level2 == null) { throw new ArgumentNullException(nameof(level2)); }

            return level1.Ordinal < level2.Ordinal;
        }

        /// <summary>
        /// Compares two <see cref="GLogLevel"/> objects 
        /// and returns a value indicating whether 
        /// the first one is less than or equal to the second one.
        /// </summary>
        /// <param name="level1">The first level.</param>
        /// <param name="level2">The second level.</param>
        /// <returns>The value of <c>level1.Ordinal &lt;= level2.Ordinal</c>.</returns>
        public static bool operator <=(GLogLevel level1, GLogLevel level2)
        {
            if (level1 == null) { throw new ArgumentNullException(nameof(level1)); }
            if (level2 == null) { throw new ArgumentNullException(nameof(level2)); }

            return level1.Ordinal <= level2.Ordinal;
        }

        /// <summary>
        /// Získá <see cref="GLogLevel"/>, která odpovídá zadanému poøadovému èíslu logovací úrovnì
        /// </summary>
        /// <param name="ordinal">Poøadové èíslo logovací úrovnì</param>
        /// <returns>Instanci <see cref="GLogLevel"/>. Pro 0 vrací <see cref="GLogLevel.Trace"/>, 1 vrací <see cref="GLogLevel.Debug"/> atd.</returns>
        public static GLogLevel FromOrdinal(int ordinal)
        {
            switch (ordinal)
            {
                case 0:
                    return Trace;
                case 1:
                    return Debug;
                case 2:
                    return Info;
                case 3:
                    return Warn;
                case 4:
                    return Error;
                case 5:
                    return Fatal;
                case 6:
                    return Off;

                default:
                    throw new ArgumentException("Invalid ordinal.");
            }
        }

        /// <summary>
        /// Získá <see cref="T:GLogLevel"/>, která odpovídá zadanému <see langword="string" />.
        /// </summary>
        /// <param name="levelName">Textová reprezentace logovací úrovnì</param>
        /// <returns>Hodnota typu enum</returns>
        public static GLogLevel FromString(string levelName)
        {
            if (levelName == null)
            {
                throw new ArgumentNullException(nameof(levelName));
            }

            if (levelName.Equals("Trace", StringComparison.OrdinalIgnoreCase))
            {
                return Trace;
            }

            if (levelName.Equals("Debug", StringComparison.OrdinalIgnoreCase))
            {
                return Debug;
            }

            if (levelName.Equals("Info", StringComparison.OrdinalIgnoreCase))
            {
                return Info;
            }

            if (levelName.Equals("Warn", StringComparison.OrdinalIgnoreCase))
            {
                return Warn;
            }

            if (levelName.Equals("Error", StringComparison.OrdinalIgnoreCase))
            {
                return Error;
            }

            if (levelName.Equals("Fatal", StringComparison.OrdinalIgnoreCase))
            {
                return Fatal;
            }

            if (levelName.Equals("Off", StringComparison.OrdinalIgnoreCase))
            {
                return Off;
            }

            if (levelName.Equals("None", StringComparison.OrdinalIgnoreCase))
            {
                return Off;     // .NET Core Microsoft Extension Logging
            }

            if (levelName.Equals("Information", StringComparison.OrdinalIgnoreCase))
            {
                return Info;    // .NET Core Microsoft Extension Logging
            }

            if (levelName.Equals("Warning", StringComparison.OrdinalIgnoreCase))
            {
                return Warn;    // .NET Core Microsoft Extension Logging
            }

            throw new ArgumentException($"Unknown log level: {levelName}");
        }

        /// <summary>
        /// Returns a string representation of the log level.
        /// </summary>
        /// <returns>Log level name.</returns>
        public override string ToString()
        {
            return Name;
        }

        /// <summary>
        /// Returns a hash code for this instance.
        /// </summary>
        /// <returns>
        /// A hash code for this instance, suitable for use in hashing algorithms and data structures like a hash table. 
        /// </returns>
        public override int GetHashCode()
        {
            return Ordinal;
        }

        /// <summary>
        /// Determines whether the specified <see cref="System.Object"/> is equal to this instance.
        /// </summary>
        /// <param name="obj">The <see cref="System.Object"/> to compare with this instance.</param>
        /// <returns>Value of <c>true</c> if the specified <see cref="System.Object"/> is equal to 
        /// this instance; otherwise, <c>false</c>.</returns>
        public override bool Equals(object obj)
        {
            GLogLevel other = obj as GLogLevel;
            if ((object)other == null)
            {
                return false;
            }

            return Ordinal == other.Ordinal;
        }

        /// <summary>
        /// Determines whether the specified <see cref="GLogLevel"/> instance is equal to this instance.
        /// </summary>
        /// <param name="other">The <see cref="GLogLevel"/> to compare with this instance.</param>
        /// <returns>Value of <c>true</c> if the specified <see cref="GLogLevel"/> is equal to 
        /// this instance; otherwise, <c>false</c>.</returns>
        public bool Equals(GLogLevel other)
        {
            return other != null && Ordinal == other.Ordinal;
        }

        /// <summary>
        /// Compares the level to the other <see cref="GLogLevel"/> object.
        /// </summary>
        /// <param name="obj">
        /// The object object.
        /// </param>
        /// <returns>
        /// A value less than zero when this logger's <see cref="Ordinal"/> is 
        /// less than the other logger's ordinal, 0 when they are equal and 
        /// greater than zero when this ordinal is greater than the
        /// other ordinal.
        /// </returns>
        public int CompareTo(object obj)
        {
            if (obj == null)
            {
                throw new ArgumentNullException(nameof(obj));
            }

            // The code below does NOT account if the casting to GLogLevel returns null. This is 
            // because as this class is sealed and does not provide any public constructors it 
            // is impossible to create a invalid instance.

            GLogLevel level = (GLogLevel)obj;
            return Ordinal - level.Ordinal;
        }

        #region Implementation of IConvertible

        TypeCode IConvertible.GetTypeCode()
        {
            return TypeCode.Object;
        }

        byte IConvertible.ToByte(IFormatProvider provider)
        {
            return Convert.ToByte(_ordinal);
        }

        bool IConvertible.ToBoolean(IFormatProvider provider)
        {
            throw new InvalidCastException();
        }

        char IConvertible.ToChar(IFormatProvider provider)
        {
            return Convert.ToChar(_ordinal);
        }

        DateTime IConvertible.ToDateTime(IFormatProvider provider)
        {
            throw new InvalidCastException();
        }

        decimal IConvertible.ToDecimal(IFormatProvider provider)
        {
            return Convert.ToDecimal(_ordinal);
        }

        double IConvertible.ToDouble(IFormatProvider provider)
        {
            return _ordinal;
        }

        short IConvertible.ToInt16(IFormatProvider provider)
        {
            return Convert.ToInt16(_ordinal);
        }

        int IConvertible.ToInt32(IFormatProvider provider)
        {
            return Convert.ToInt32(_ordinal);
        }

        long IConvertible.ToInt64(IFormatProvider provider)
        {
            return Convert.ToInt64(_ordinal);
        }

        sbyte IConvertible.ToSByte(IFormatProvider provider)
        {
            return Convert.ToSByte(_ordinal);
        }

        float IConvertible.ToSingle(IFormatProvider provider)
        {
            return Convert.ToSingle(_ordinal);
        }

        string IConvertible.ToString(IFormatProvider provider)
        {
            return _name;
        }

        object IConvertible.ToType(Type conversionType, IFormatProvider provider)
        {
            if (conversionType == typeof(string))
                return Name;
            else
                return Convert.ChangeType(_ordinal, conversionType, provider);
        }

        ushort IConvertible.ToUInt16(IFormatProvider provider)
        {
            return Convert.ToUInt16(_ordinal);
        }

        uint IConvertible.ToUInt32(IFormatProvider provider)
        {
            return Convert.ToUInt32(_ordinal);
        }

        ulong IConvertible.ToUInt64(IFormatProvider provider)
        {
            return Convert.ToUInt64(_ordinal);
        }

        #endregion
    }
}
