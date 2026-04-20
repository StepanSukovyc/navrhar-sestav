//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GSecureString.cs                             </Name>
//    <Description> xxx                                                         </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-03-08                                                  </Created>
//  </FileHeader>


using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Runtime.Serialization;
using System.Security;
using System.Text;
using System.Threading.Tasks;
using static Gordic.General.GDbType;

namespace Gordic.General
{
    /// <summary>
    /// Třída pro práci s tajemstvím v rámci paměti procesu - umožní pracovat rovnocenně s 
    /// předaným IPasswordSecret nebo s heslem předaným na vstupu jako string. 
    /// Na cílovém místě umožní použití tajemství přes property Secret
    /// Ta by se měla použít co nejblíže jejímu předání externímu kódu - např. těsně před DB připojením 
    /// </summary>
    [Serializable]
    [TypeConverter(typeof(GSecureStringConverter))]
    [JsonConverter(typeof(GSecureStringJsonConverter))] // new: Newtonsoft.Json converter attribute
    public class GSecureString : IPasswordSecret, IDisposable, ICloneable, ISerializable   // , IGDbType
    {
        #region soukromé členy

        /// <summary>
        /// Interní uchování hodnoty
        /// </summary>
        private SecureString _secureString = null;
        /// <summary>
        /// Interní uchování odkazu na tajemství
        /// </summary>
        private IPasswordSecret _passwordSecret = null;

        /// <summary>
        /// Příznak, že tajemství je uchováváno přes SecureString, jinak je to přes IPasswordSecret
        /// </summary>
        private bool _valueIsBySecureString = true;

        private bool disposedValue;
        #endregion

        #region konstruktory

        /// <summary>
        /// 
        /// </summary>
        public GSecureString() 
        {
            
        } // end method

        /// <summary>
        /// 
        /// </summary>
        /// <param name="secure"></param>
        public GSecureString(string secure )
        {
            _secureString = secure.ConvertStringToSecureString();
            //m_eState = ValueState.Unchanged;
        } // end method

        /// <summary>
        /// 
        /// </summary>
        /// <param name="secure"></param>
        public GSecureString(SecureString secure)
        {
            _secureString = secure;
            //m_eState = ValueState.Unchanged;
        } // end method

        /// <summary>
        /// 
        /// </summary>
        /// <param name="secure"></param>
        public GSecureString(GSecureString secure)
        {
            if (secure != null)
            {
                if (secure._valueIsBySecureString)
                    _secureString = secure._secureString;
                else
                {
                    _valueIsBySecureString = false;
                    _passwordSecret = secure._passwordSecret;
                }
            }
            //m_eState = secure.m_eState;
        } // end method

        /// <summary>
        /// 
        /// </summary>
        /// <param name="secure"></param>
        public GSecureString(IPasswordSecret secure)
        {
            _valueIsBySecureString = false;
            _passwordSecret = secure;
            //m_eState = ValueState.Unchanged;
        } // end method

        #endregion

        #region ICloneable
        /// <summary>vytvoření identické kopie objektu</summary>
        /// <returns>nová instance objektu</returns>
        /// <remarks>příznak hodnoty určené pouze ke čtení je u nově vzniklé instance vždy negativní</remarks>
        object ICloneable.Clone()
        {
            return new GSecureString(this);
        } // end method
        #endregion

        #region ISerializable
        // https://learn.microsoft.com/cs-cz/dotnet/api/system.runtime.serialization.formatters.binary.binaryformatter?view=net-8.0
        // https://learn.microsoft.com/en-us/dotnet/api/system.runtime.serialization.iserializable?view=net-8.0

        /// <summary>
        /// Konstruktor pro BinaryFormatter deserializaci
        /// </summary>
        [SecurityCritical]
        protected GSecureString(SerializationInfo info, StreamingContext context) 
        {
            //deserializace
            foreach (var se in info)
            {
                if (se.Name.Equals("Secure", StringComparison.OrdinalIgnoreCase))
                {
                    _secureString = GCover.Uncover((string)se.Value).ConvertStringToSecureString();
                    _valueIsBySecureString = true;
                    break;
                }
            }
        }

        /// <summary>
        /// Funkce pro BinaryFormatter serializaci
        /// </summary>
        /// <param name="info"></param>
        /// <param name="context"></param>
        [SecurityCritical]
        void ISerializable.GetObjectData(SerializationInfo info, StreamingContext context)
        {
            info.AddValue("Secure", Cover());
        }
        #endregion

        #region ToString - ta by zde ale radji neměla být
        /// <summary>převod hodnoty na text</summary>
        /// <returns>textová reprezentace hodnoty</returns>
        public override string ToString()
        {
            if (IsNull)
                return null; 
            else
                return Secret;
        } // end method
        #endregion

        #region Cover - Uncover
        /// <summary>
        /// zakódování textu
        /// </summary>
        /// <returns></returns>
        [System.Security.SecuritySafeCritical]
        public string Cover()
        {
            if (this.IsNull)
                return null;
            return GCover.Cover(this.Secret);
        }

        /// <summary>dekódování textu</summary>
        /// <param name="input">vstupní text</param>
        /// <returns>dekódovaný text</returns>
        [System.Security.SecurityCritical]
        public static GSecureString Uncover(string input)
        {
            return new GSecureString(GCover.Uncover(input));
        } // end method
        #endregion

        #region FromGinisCoverString - F51
        /// <summary>dekódování textu z kódování f15 -> f51 </summary>
        /// <param name="input">vstupní text</param>
        /// <returns>dekódovaný text</returns>
        [System.Security.SecurityCritical]
        public static GSecureString FromGinisCoverString(string input)
        {
            return new GSecureString(GWin32.FromGinisCoverString(input));
        } // end method
        #endregion

        /// <summary>
        /// Value of secret - IPasswordSecret
        /// Pokud tajemství nebylo nastaveno, vrací null
        /// </summary>
        public string Secret
        {
            get
            {
                if (_valueIsBySecureString)
                {
                    if (_secureString == null)
                        return null;
                    else
                        return (_secureString.ConvertSecureStringToString());
                }
                else
                {
                    if(_passwordSecret == null || !_passwordSecret.Exists)
                        return null;
                    else
                        return (_passwordSecret.Secret);
                }
            }
        }

        /// <summary>příznak nenastavení nebo nastavení hodnoty null</summary>
        public bool IsNull
        {
            get
            {
                if (_valueIsBySecureString)
                {
                    return (_secureString == null);
                }
                else
                {
                    return (_passwordSecret == null || !_passwordSecret.Exists || _passwordSecret.Secret == null);
                }
            }
            set
            {
                _secureString = null;
                _passwordSecret = null;
                _valueIsBySecureString = true;
            }
        }

        /// <summary>
        /// Příznak, že je nastaveno nějaké tajemství.
        /// </summary>
        public bool Exists
        {
            get
            {
                if (_valueIsBySecureString)
                    return (_secureString != null);
                else
                {
                    return (_passwordSecret != null || _passwordSecret.Exists);
                }
            }
        }

        /// <summary>
        /// Převede SecureString na hash hexa string 
        /// Pokud tajemství nebylo nastaveno, potom vrací null
        /// </summary>
        /// <returns></returns>
        public string ConvertSecureStringToHashHexaString()
        {
            if (_valueIsBySecureString)
            {
                if (_secureString == null)
                    return null;
                else
                    return (_secureString.ConvertSecureStringToHashHexaString());
            }
            else
            {
                if (_passwordSecret == null || !_passwordSecret.Exists)
                    return null;
                else
                    return (GHashSha256Utils.ComputeToHexa(_passwordSecret.Secret));
            }
        }

        #region IPasswordSecret, IExistable
        /// <summary>
        /// Value of secret - IPasswordSecret
        /// </summary>
        string IPasswordSecret.Secret
        {
            get
            {
                if (_valueIsBySecureString)
                {
                    if (_secureString == null)
                        return null;
                    else
                        return (_secureString.ConvertSecureStringToString());
                }
                else
                    return (_passwordSecret.Secret);
            }
        }

        SecretScope ISecret.Scope => throw new NotImplementedException();

        string ISecret.VaultId => throw new NotImplementedException();

        string ISecret.Path => throw new NotImplementedException();

        bool IExistable.Exists
        {
            get
            {
                if (_valueIsBySecureString)
                    return (_secureString != null);
                else
                {
                    return (_passwordSecret.Exists);
                }
            }
        }
        #endregion

        #region IDisposable
        /// <summary>
        /// 
        /// </summary>
        /// <param name="disposing"></param>
        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    if (_secureString != null)
                    {
                        _secureString.Dispose();
                        _secureString = null;
                    }
                    if (_passwordSecret != null)
                        _passwordSecret = null;
                }

                // TODO: free unmanaged resources (unmanaged objects) and override finalizer
                // TODO: set large fields to null
                disposedValue = true;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        public void Dispose()
        {
            // Do not change this code. Put cleanup code in 'Dispose(bool disposing)' method
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }
        #endregion

        /// <summary>nastavení hodnoty s případnou předchozí typovou konverzí</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        public static GSecureString Parse(object inputValue)
        {
            GSecureString vaule = null;
            if (inputValue == null)
            {
                vaule = new GSecureString();
            }
            else if (inputValue is IPasswordSecret password)
            {
                vaule = new GSecureString(password);
            }
            else if (inputValue is SecureString secure)
            {
                vaule = new GSecureString(secure);
            }
            else if (inputValue is string text)
            {
                vaule = new GSecureString(text);
            }
            else
                vaule = new GSecureString(inputValue.ToString());

            return vaule;
        }

        //int IComparable.CompareTo(object obj)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
