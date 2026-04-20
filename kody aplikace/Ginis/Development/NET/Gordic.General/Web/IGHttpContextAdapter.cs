//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.App.Interface.IGHttpContextAdapter.cs                </Name>
//    <Description> IGVirtualHttpContext - platform abstraction                 </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-09-14                                                  </Created>
//  </FileHeader>

using Gordic.App.Core;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Gordic.General
{
    public abstract class AdapterOption
    {
        AdapterOption()
        {
        }

        /// <summary>
        /// Is option present?
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="name"></param>
        /// <param name="options"></param>
        /// <param name="val"></param>
        /// <returns></returns>
        public static bool IsPresent<T>(string name, AdapterOption[] options, ref T val)
        {
            var value = options
                .OfType<OptionBase<T>>()
                .FirstOrDefault(option => option.OptionType == OptionTypes.Option && option.Name == name);

            if (value != null)
            {
                val = value.Value;
                return true;
            }

            return false;
        }

        public enum OptionTypes
        {
            Header,
            Option
        }

        public sealed class OptionBase<T> : AdapterOption
        {
            public readonly string Name;
            public readonly T Value;
            public readonly OptionTypes OptionType;

            public OptionBase(OptionTypes optionType, string name, T value)
            {
                OptionType = optionType;
                Name = name;
                Value = value;
            }

            public override string ToString() => $"[{OptionType}.{Name}]={Value}";
        }

        public static OptionBase<string> Header(string name, string value)
        {
            return new OptionBase<string>(OptionTypes.Header, name, value);
        }

        public static OptionBase<bool> Option(string name, bool value)
        {
            return new OptionBase<bool>(OptionTypes.Option, name, value);
        }

        public static OptionBase<int> Option(string name, int value)
        {
            return new OptionBase<int>(OptionTypes.Option, name, value);
        }
    }

    public enum HttpMetadata
    {
        Request_Url,
        Request_LogonUserName,
        Request_IsAuthenticated,
        Request_UserHostAddress,
        Request_RawUrl,
        Request_ContentType,
        Request_Path
    }

    /// <summary>
    /// IGVirtualHttpContext - platform abstraction
    /// </summary>
    public interface IGHttpContextAdapter
    {
        /// <summary>
        /// IsAuthenticated
        /// </summary>
        bool IsAuthenticated
        {
            get;
        }

        /// <summary>
        /// RequestMethod
        /// </summary>
        string RequestMethod
        {
            get;
        }

        /// <summary>
        /// GetMetadata
        /// </summary>
        string GetMetadata(HttpMetadata httpMedatata);

        /// <summary>
        /// RequestQuery
        /// </summary>
        IEnumerable<string> GetRequestQuery(string name);

        /// <summary>
        /// GetBufferlessInputStream
        /// </summary>
        /// <returns></returns>
        Stream GetInputStream();

        /// <summary>
        /// GetRequestHeader
        /// </summary>
        /// <param name="header"></param>
        /// <returns></returns>
        string GetRequestHeader(string header);

        /// <summary>
        /// SetResponseHeader
        /// </summary>
        /// <param name="header"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        void SetResponseHeader(string header, string value);

        /// <summary>
        /// GetRequestHeaderValues
        /// </summary>
        /// <param name="header"></param>
        /// <returns></returns>
        IEnumerable<string> GetRequestHeaderValues(string header);

        /// <summary>
        /// WriteResponseWithContentType
        /// </summary>
        /// <param name="contentType"></param>
        /// <param name="binaryResponse"></param>
        /// <param name="options"></param>
        void WriteResponseWithContentType(
            string contentType,
            byte[] binaryResponse,
            AdapterOption[] options = null
        );

        /// <summary>
        /// WriteResponseWithStreams
        /// </summary>
        /// <param name="invokeMethodOutput"></param>
        /// <param name="streams"></param>
        /// <param name="options"></param>
        void WriteResponseWithStreams(
            InvokeMethodOutput invokeMethodOutput,
            GTransportStreams streams,
            AdapterOption[] options = null
        );
    }
}
