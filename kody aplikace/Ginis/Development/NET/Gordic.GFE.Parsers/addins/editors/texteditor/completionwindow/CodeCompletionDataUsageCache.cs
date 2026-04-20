//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.CodeCompletionDataUsageCache.cs          </Name>
//    <Description> track názvu dle nejvyššího použití při zobrazení nápovědy   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-27                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Services;
using Gordic.General;

namespace Gordic.GFE.Parsers.DefaultEditor
{
    /// <summary>
    /// track názvu dle nejvyššího použití při zobrazení nápovědy
    /// položka přiřazuje vyšší prioritu
    /// </summary>
    public static class CodeCompletionDataUsageCache
    {
        /// <summary>
        /// struktura kratnosti použití
        /// </summary>
        struct UsageStruct
        {
            /// <summary>
            /// bylo použito krát
            /// </summary>
            public int Uses;
            /// <summary>
            /// počet zobrazení
            /// </summary>
            public int ShowCount;
            /// <summary>
            /// vytvoření struktury
            /// </summary>
            /// <param name="uses">použito</param>
            /// <param name="showCount">počet zobrazení</param>
            public UsageStruct(int uses, int showCount)
            {
                this.Uses = uses;
                this.ShowCount = showCount;
            }
        }

        class SaveItemsComparer : IComparer<KeyValuePair<string, UsageStruct>>
        {
            public int Compare(KeyValuePair<string, UsageStruct> x, KeyValuePair<string, UsageStruct> y)
            {
                double a = ((double)x.Value.Uses / x.Value.ShowCount);
                return -a.CompareTo((double)y.Value.Uses / y.Value.ShowCount);
            }
        }

        static Dictionary<string, UsageStruct> dict;
        const long magic = 0x6567617355444343;
        const short version = 1;
        /// <summary>Minimální počet použití slova aby bylo zapsano do souboru.</summary>
        const int MinUsesForSave = 2;

        /// <summary>
        /// soubor cach
        /// </summary>
        public static string CacheFilename
        {
            get { return Path.Combine(PropertyService.ConfigDirectory, "CodeCompletionUsageCache.dat"); }
        }

        static void LoadCache()
        {
            dict = new Dictionary<string, UsageStruct>();
            //ProjectService.SolutionClosed += delegate(object sender, EventArgs e) { SaveCache(); };
            if (!File.Exists(CacheFilename))
                return;

            using (FileStream fs = new FileStream(CacheFilename, FileMode.Open, FileAccess.Read))
            {
                using (BinaryReader reader = new BinaryReader(fs))
                {
                    if (reader.ReadInt64() != magic)
                    {
                        LoggingService.Warning("CodeCompletionDataUsageCache:" + '\n' + GResources.GetResourceText(29450096)); //RC 29450096 : nesprávný soubor!
                        return;
                    }
                    if (reader.ReadInt16() != version)
                    {
                        LoggingService.Warning("CodeCompletionDataUsageCache:" + '\n' + GResources.GetResourceText(29450097)); //RC 29450097 : meznamá verze souboru!
                        return;
                    }
                    int itemCount = reader.ReadInt32();
                    for (int i = 0; i < itemCount; i++)
                    {
                        string key = reader.ReadString();
                        int uses = reader.ReadInt32();
                        int showCount = reader.ReadInt32();
                        if (showCount > 1000)
                        {
                            // sničení počtu pro příští použití
                            showCount /= 3;
                            uses /= 3;
                        }
                        dict.Add(key, new UsageStruct(uses, showCount));
                    }
                }
            }
            LoggingService.InfoFormatted(GResources.GetResourceText(29450098) +  " ({0} " + GResources.GetResourceText(29450099) + ").", dict.Count); //RC 29450099 : položek
        }

        /// <summary>
        /// uložení dat
        /// </summary>
        public static void SaveCache()
        {
            if (dict == null)
                return;
            int count;
            using (FileStream fs = new FileStream(CacheFilename, FileMode.Create, FileAccess.Write))
                using (BinaryWriter writer = new BinaryWriter(fs))
                    count = SaveCache(writer);

            LoggingService.InfoFormatted(GResources.GetResourceText(29450100) + " ({0} " + GResources.GetResourceText(29450101) + " {1} " + GResources.GetResourceText(29450099) + ").", count, dict.Count); //RC 29450101 : z
        }

        static int SaveCache(BinaryWriter writer)
        {
            writer.Write(magic);
            writer.Write(version);
            int maxSaveItems = CodeCompletionOptions.Instance.DataUsageCacheItemCount;
            if (dict.Count < maxSaveItems)
            {
                writer.Write(dict.Count);
                foreach (KeyValuePair<string, UsageStruct> entry in dict)
                {
                    writer.Write(entry.Key);
                    writer.Write(entry.Value.Uses);
                    writer.Write(entry.Value.ShowCount);
                }
                return dict.Count;
            }
            else
            {
                List<KeyValuePair<string, UsageStruct>> saveItems = new List<KeyValuePair<string, UsageStruct>>();
                foreach (KeyValuePair<string, UsageStruct> entry in dict)
                    if (entry.Value.Uses > MinUsesForSave)
                        saveItems.Add(entry);
                if (saveItems.Count > maxSaveItems)
                    saveItems.Sort(new SaveItemsComparer());
                
                int count = Math.Min(maxSaveItems, saveItems.Count);
                writer.Write(count);
                for (int i = 0; i < count; i++)
                {
                    KeyValuePair<string, UsageStruct> entry = saveItems[i];
                    writer.Write(entry.Key);
                    writer.Write(entry.Value.Uses);
                    writer.Write(entry.Value.ShowCount);
                }
                return count;
            }
        }

        /// <summary>
        /// obnovení cach
        /// </summary>
        public static void ResetCache()
        {
            dict = new Dictionary<string, UsageStruct>();
            try
            {
                if (File.Exists(CacheFilename))
                    File.Delete(CacheFilename);
            }
            catch (Exception ex)
            {
                LoggingService.Warning("CodeCompletionDataUsageCache.ResetCache(): " + ex.Message);
            }
        }

        /// <summary>
        /// získání priority slova
        /// </summary>
        /// <param name="word">slovo</param>
        /// <param name="incrementShowCount">indikuje nutnost zvětšít počet zobrazení</param>
        /// <returns></returns>
        public static double GetPriority(string word, bool incrementShowCount)
        {
            if (!CodeCompletionOptions.Instance.DataUsageCacheEnabled)
                return 0;
            if (dict == null)
                LoadCache();
            if (!dict.TryGetValue(word, out UsageStruct usage))
                return 0;
            double priority = (double)usage.Uses / usage.ShowCount;
            if (usage.Uses < MinUsesForSave)
                priority *= 0.2;
            if (incrementShowCount)
            {
                usage.ShowCount += 1;
                dict[word] = usage;
            }
            return priority;
        }

        /// <summary>
        /// zvýšení použití slova
        /// </summary>
        /// <param name="word">slovo</param>
        public static void IncrementUsage(string word)
        {
            if (!CodeCompletionOptions.Instance.DataUsageCacheEnabled)
                return;
            if (dict == null)
                LoadCache();
            if (!dict.TryGetValue(word, out UsageStruct usage))
                usage = new UsageStruct(0, 2);
            usage.Uses += 1;
            dict[word] = usage;
        }
    }
}
