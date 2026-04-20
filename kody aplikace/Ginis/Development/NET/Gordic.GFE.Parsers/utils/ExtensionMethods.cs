//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ExtensionMethods.cs                      </Name>
//    <Description> Rozšířené metody používané v Gfe.                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using Gordic.General;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers.Utils
{
    /// <summary>
    /// Rozšířené metody používané v GFE
    /// </summary>
    public static class ExtensionMethods
    {
        /// <summary>
        /// Přidá všechny <paramref name="elements"/> do <paramref name="input"/>.
        /// Pokud v seznamu element již existuje, pak ho nahradí
        /// </summary>
        /// <typeparam name="T">Typ objektu</typeparam>
        /// <param name="input">Seznam do kterého se přidává</param>
        /// <param name="elements">Přidávaný element</param>
        public static void AddRange<T>(this ICollection<T> input, IEnumerable<T> elements)
        {
            if (input == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450496)); //RC 29450496 : Neplatný vstupní argument INPUT!
            if (elements == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450763));

            foreach (T o in elements)
            {
                if (input.Contains(o))
                    input.Remove(o);
                input.Add(o);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="TKey"></typeparam>
        /// <typeparam name="T"></typeparam>
        /// <param name="input"></param>
        /// <param name="elements"></param>
        public static void AddRange<TKey, T>(this Dictionary<TKey, T> input, IDictionary<TKey, T> elements)
        {
            if (input == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450496)); //RC 29450496 : Neplatný vstupní argument INPUT!
            if (elements == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450763));

            foreach (var o in elements)
                if (input.ContainsKey(o.Key))
                    input[o.Key] = o.Value;
                else
                    input.Add(o.Key, o.Value);
        }

        /// <summary>
        /// Spuštění akce pro všechny prvky.
        /// </summary>
        public static void ForEach<T>(this IEnumerable<T> input, Action<T> action)
        {
            if (input == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450496)); //RC 29450496 : Neplatný vstupní argument INPUT!

            foreach (T element in input)
                action(element);
        }

        /// <summary>
        /// Spuštění akce pro všechny prvky.
        /// </summary>
        /// <typeparam name="T">Typ parametrů</typeparam>
        /// <param name="input">Vstupní seznam</param>
        /// <param name="action">Akce pro spuštění</param>
        /// <param name="param">Parametry akce</param>
        public static void ForEach<T>(this IEnumerable<T> input, ActionParams<T> action, params object[] param)
        {
            if (input == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450496));

            foreach (T element in input)
                action(element, param);
        }

        /// <summary>
        /// Akce s výsledkem TRUE/FALSE
        /// </summary>
        /// <typeparam name="T">Typ vstupního parametru akce</typeparam>
        /// <param name="obj">vstupní argument akce</param>
        /// <returns></returns>
        public delegate bool ActionBool<in T>(T obj);

        /// <summary>
        /// Spuštění akce pro všechny prvky.
        /// </summary>
        public static bool ForEachBool<T>(this IEnumerable<T> input, ActionBool<T> action)
        {
            if (input == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450496));

            bool result = false;
            foreach (T element in input)
                if (!result)
                    result = action(element);
                else action(element);

            return result;
        }

        /// <summary>
        /// Spuštění akce pro všechny prvky.
        /// </summary>
        public static void ForEach<T>(this IEnumerable<T> input, Func<T, bool> predicate, Action<T> action)
        {
            if (input == null)
                throw new ArgumentNullException(string.Format(GResources.GetResourceText(29450496), GResources.GetResourceText(29450764)));

            if (predicate == null)
                throw new ArgumentNullException(string.Format(GResources.GetResourceText(29450496) + '\n' + "{0}", GResources.GetResourceText(29450765)));

            foreach (var t in input.Where(predicate))
                action(t);
        }

        /// <summary>
        /// Akce s výsledkem TRUE/FALSE
        /// </summary>
        /// <typeparam name="T">Typ vstupního parametru akce</typeparam>
        /// <param name="obj">vstupní argument akce</param>
        /// <param name="param">Vstupní parametry</param>
        /// <returns></returns>
        public delegate void ActionParams<in T>(T obj, params object[] param);

        /// <summary>
        /// Spuštění akce pro všechny prvky vzhovující podmínce
        /// </summary>
        /// <typeparam name="T">Typ objektu seznamu</typeparam>
        /// <param name="input">Vstupní seznam</param>
        /// <param name="predicate">Hodnoticí podmínka</param>
        /// <param name="action">Akce, která se má spustit po kladném vyhodnocení podmínky</param>
        /// <param name="param">Vstupní parametry akce</param>
        public static void ForEach<T>(this IEnumerable<T> input, Func<T, bool> predicate, ActionParams<T> action, params object[] param)
        {
            if (input == null)
                throw new ArgumentNullException(string.Format(GResources.GetResourceText(29450496), GResources.GetResourceText(29450764)));

            if (predicate == null)
                throw new ArgumentNullException(string.Format(GResources.GetResourceText(29450496) + '\n' + "{0}", GResources.GetResourceText(29450765)));

            foreach (var t in input.Where(predicate))
                action(t, param);
        }

        /// <summary>
        /// Spuštění akce první prvek.
        /// </summary>
        public static void ForFirst<T>(this IEnumerable<T> input, Action<T> action)
        {
            if (input == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450496));

            if (input.Count(el => (el != null)) != 0)
                action(input.ElementAt(0));
        }

        /// <summary>
        /// Získání prvního nebo NULL objektu
        /// </summary>
        /// <typeparam name="T">Typ získáváného objektu</typeparam>
        /// <param name="input">Vstupní seznam</param>
        /// <param name="predicate">Daná podmínka</param>
        /// <returns></returns>
        public static T FirstOrNull<T>(this IEnumerable<T> input, Func<T, bool> predicate)
        {
            if (input == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450496));

            // získání prvního nebo NULL objektu
            // vyhovujícího podmínce
            return input.FirstOrDefault(predicate);
        }

        /// <summary>
        /// Nalezení všech položek, vyhovujících podmínce
        /// </summary>
        /// <typeparam name="TKey">Typ klíče</typeparam>
        /// <typeparam name="T">Typ hodnoty</typeparam>
        /// <param name="input">Vstupní množina</param>
        /// <param name="match">Podmínka výběru - podmínka je nad hodnotou TKey</param>
        /// <returns></returns>
        public static bool ExistsByKey<TKey, T>(this Dictionary<TKey, T> input, Predicate<TKey> match)
        {
            if (input == null)
                throw new ArgumentNullException(string.Format(GResources.GetResourceText(29450496), GResources.GetResourceText(29450764)));

            if (match == null)
                throw new ArgumentNullException(string.Format(GResources.GetResourceText(29450496) + '\n' + "{0}", GResources.GetResourceText(29450765)));

            IEnumerable<bool> bools = input.Select(kv => match(kv.Key));
            return bools.ToList().Exists(itm => itm == true);
        }

        /// <summary>
        /// Nalezení všech položek, vyhovujících podmínce
        /// </summary>
        /// <typeparam name="TKey">Typ klíče</typeparam>
        /// <typeparam name="T">Typ hodnoty</typeparam>
        /// <param name="input">Vstupní množina</param>
        /// <param name="match">Podmínka výběru - podmínka je nad hodnotou TKey</param>
        /// <returns></returns>
        public static bool ExistsByValue<TKey, T>(this Dictionary<TKey, T> input, Predicate<T> match)
        {
            if (input == null)
                throw new ArgumentNullException(string.Format(GResources.GetResourceText(29450496), GResources.GetResourceText(29450764)));

            if (match == null)
                throw new ArgumentNullException(string.Format(GResources.GetResourceText(29450496) + '\n' + "{0}", GResources.GetResourceText(29450765)));

            IEnumerable<bool> bools = input.Select(kv => match(kv.Value));
            return bools.ToList().Exists(itm => itm == true);
        }


        /// <summary>
        /// Nalezení všech položek, vyhovujících podmínce
        /// </summary>
        /// <typeparam name="TKey">Typ klíče</typeparam>
        /// <typeparam name="T">Typ hodnoty</typeparam>
        /// <param name="input">Vstupní množina</param>
        /// <param name="match">Podmínka výběru - podmínka je nad hodnotou TKey</param>
        /// <returns></returns>
        public static Dictionary<TKey, T> FindAllByKey<TKey, T>(this Dictionary<TKey, T> input, Predicate<TKey> match)
        {
            if (input == null)
                throw new ArgumentNullException(string.Format(GResources.GetResourceText(29450496), GResources.GetResourceText(29450764)));

            if (match == null)
                throw new ArgumentNullException(string.Format(GResources.GetResourceText(29450496) + '\n' + "{0}", GResources.GetResourceText(29450765)));

            IEnumerable<bool> bools = input.Select(kv => match(kv.Key));
            List<bool> bb = bools.ToList();
            Dictionary<TKey, T> dict = new Dictionary<TKey, T>();
            for (int index = 0; index < bb.Count; index++)
                if (bb[index])
                    dict.Add(input.ElementAt(index).Key, input.ElementAt(index).Value);

            return dict;
        }
        /// <summary>
        /// Nalezení všech položek, vyhovujících podmínce
        /// </summary>
        /// <typeparam name="TKey">Typ klíče</typeparam>
        /// <typeparam name="T">Typ hodnoty</typeparam>
        /// <param name="input">Vstupní množina</param>
        /// <param name="match">Podmínka výběru - podmínka je nad hodnotou TKey</param>
        /// <returns></returns>
        public static Dictionary<TKey, T> FindAllByValue<TKey, T>(this Dictionary<TKey, T> input, Predicate<T> match)
        {
            if (input == null)
                throw new ArgumentNullException(string.Format(GResources.GetResourceText(29450496), GResources.GetResourceText(29450764)));

            if (match == null)
                throw new ArgumentNullException(string.Format(GResources.GetResourceText(29450496) + '\n' + "{0}", GResources.GetResourceText(29450765)));

            IEnumerable<bool> bools = input.Select(kv => match(kv.Value));
            List<bool> bb = bools.ToList();
            Dictionary<TKey, T> dict = new Dictionary<TKey, T>();
            for (int index = 0; index < bb.Count; index++)
                if (bb[index])
                    dict.Add(input.ElementAt(index).Key, input.ElementAt(index).Value);

            return dict;
        }

        /// <summary>
        /// Spuštění akce na prvním prvku splňujícím podmínku.
        /// </summary>
        /// <typeparam name="T">Parametr objektu v seznamu</typeparam>
        /// <param name="input">Vstupní seznam</param>
        /// <param name="predicate">Podmínka spuštění akce</param>
        /// <param name="action">Spouštěná akce</param>
        /// <param name="param">Parametry akce</param>
        /// <returns>Indikuje provedení akce</returns>
        public static bool ForFirstBool<T>(this IEnumerable<T> input, Func<T, bool> predicate, ActionParams<T> action, params object[] param)
        {
            if (input == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450496));
            // pokusíme se najit objekt, splňující podmínku
            T element = input.FirstOrDefault(predicate);

            // pokud takový element existuje, pak spustíme akci
            if (element != null)
            {
                action(element, param);
                return true;
            }
            return false;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="encoding"></param>
        /// <param name="text"></param>
        /// <returns></returns>
        public static byte[] GetBytesWithBom(this Encoding encoding, string text)
        {
            byte[] encodedText = encoding.GetBytes(text), bom = encoding.GetPreamble();
            if (bom != null && bom.Length > 0)
            {
                byte[] result = new byte[bom.Length + encodedText.Length];
                bom.CopyTo(result, 0);
                encodedText.CopyTo(result, bom.Length);
                return result;
            }
            else
                return encodedText;
        }

        /// <exclude/>
        public static ReadOnlyCollection<T> AsReadOnly<T>(this T[] arr)
        {
            return Array.AsReadOnly(arr);
        }

        /// <summary>
        /// Získání obsahu
        /// </summary>
        /// <param name="encoding">kódování</param>
        /// <param name="text">Text</param>
        /// <returns></returns>
        public static byte[] GetBytesWithPreamble(this Encoding encoding, string text)
        {
            byte[] encodedText = encoding.GetBytes(text), bom = encoding.GetPreamble();
            if (bom != null && bom.Length > 0)
            {
                byte[] result = new byte[bom.Length + encodedText.Length];
                bom.CopyTo(result, 0);
                encodedText.CopyTo(result, bom.Length);
                return result;
            }
            else
                return encodedText;
        }

        /// <summary>
        /// Získání obsahu
        /// </summary>
        /// <param name="encoding">kódování</param>
        /// <param name="text">Text</param>
        /// <returns></returns>
        public static byte[] GetBytes(this Encoding encoding, string text) => encoding.GetBytes(text);

        /// <summary>
        /// rekurzivní získání kolekci objektu
        /// </summary>
        /// <param name="collection">kolekce na vstupu</param>
        /// <returns></returns>
        public static IEnumerable<Control> GetRecursive(this Control.ControlCollection collection)
        {
            foreach (Control ctl in collection)
            {
                yield return ctl;
                foreach (Control subCtl in ctl.Controls.GetRecursive())
                    yield return subCtl;
            }
        }
    }
}
