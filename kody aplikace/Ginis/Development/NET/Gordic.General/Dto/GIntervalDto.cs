//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GIntervalDto.cs                              </Name>
//    <Description> DTO pro intervalove hodnoty v intervalovych polickach       </Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-03-27                                                  </Created>
//  </FileHeader>

using System;
using System.Diagnostics;
using Newtonsoft.Json;

namespace Gordic.General
{
    /// <summary>Iface pro usnadneni prace s intervalovymi DTO.</summary>
    public interface IGIntervalDto
    {
        /// <summary>Zacatek intervalu</summary>
        object Start { get; set; }

        /// <summary>Konec intervalu</summary>
        object End { get; set; }

        /// <summary>Genericky typ intervalu</summary>
        Type Generic { get; }

        /// <summary>Je interval otevreny zleva?</summary>
        bool LeftOpened { get; }

        /// <summary>Je interval otevreny zprava?</summary>
        bool RightOpened { get; }
    }

    /// <summary>DTO pro intervalove hodnoty v intervalovych polickach</summary>
    /// <typeparam name="T"></typeparam>
    [DebuggerDisplay("{DebuggerDisplayValue,nq}")]
    public class GIntervalDto<T> : IGIntervalDto, IGDto, IGObject
    {
        /// <summary>Defaultni ctor</summary>
        public GIntervalDto()
        {}

        /// <summary>Intervalovy ctor</summary>
        public GIntervalDto(T start, T end)
        {
            Start = start;
            End = end;
        }

        /// <summary>Zacatek intervalu</summary>
        [JsonProperty(PropertyName = "start")]
        public T Start { get; set; }

        /// <summary>Konec intervalu</summary>
        [JsonProperty(PropertyName = "end")]
        public T End { get; set; }

        /// <summary>hodnota zobrazovaná v okně debugeru</summary>
        private object DebuggerDisplayValue
        {
            //get { return IsNull ? NullValue.NULL : DbValue; }
            get
            {
                if (Start == null && End == null) return "EMPTY INTERVAL";
                var sb = new System.Text.StringBuilder("INTERVAL ");
                if (LeftOpened) sb.Append('['); else sb.Append('(');
                if (Start != null)
                {
                    if (Start is IGDbType s1)
                        sb.Append(s1.ToString(System.Globalization.CultureInfo.InvariantCulture));
                    else
                        sb.Append(Start.ToString());
                }
                sb.Append(", ");
                if (End != null)
                {
                    if (End is IGDbType s1)
                        sb.Append(s1.ToString(System.Globalization.CultureInfo.InvariantCulture));
                    else
                        sb.Append(End.ToString());
                }
                if (RightOpened) sb.Append(']'); else sb.Append(')');
                return sb.ToString();
            }
        }

        #region IGIntervalDto members

        /// <summary>True = interval je zleva otevreny (hodnota Start do nej nepatri), default = false.</summary>
        [JsonProperty(PropertyName = "leftOpened", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public bool LeftOpened { get; set; }

        /// <summary>True = interval je zprava otevreny (hodnota End do nej nepatri), default = false.</summary>
        [JsonProperty(PropertyName = "rightOpened", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public bool RightOpened { get; set; }

        /// <summary>Zacatek intervalu</summary>
        [JsonIgnore]
        object IGIntervalDto.Start
        {
            get { return Start; }
            set { Start = (T)value; }
        }

        /// <summary>Konec intervalu</summary>
        [JsonIgnore]
        object IGIntervalDto.End
        {
            get { return End; }
            set { End = (T)value; }
        }

        /// <summary>Genericky typ intervalu</summary>
        [JsonIgnore]
        Type IGIntervalDto.Generic { get { return typeof(T); } }

        #endregion
    }
}
