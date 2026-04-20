//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DefaultAbstractSecondaryViewContent.cs   </Name>
//    <Description> Sekundární pohled na obsah - pohled,                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-03-01                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.General;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Sekundární pohled na obsah - pohled, 
    /// který je založen na jiném (primárním) pohledu na obsah.
    /// </summary>
    public abstract class DefaultAbstractSecondaryViewContent : DefaultAbstractViewContent
    {
        protected IViewContent primaryViewContent;
        OpenedFile primaryFile;

        /// <summary>
        /// Primární pohled
        /// </summary>
        public IViewContent PrimaryViewContent => primaryViewContent;

        /// <summary>
        /// Primární soubor
        /// </summary>
        public sealed override OpenedFile PrimaryFile => primaryFile;

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        protected DefaultAbstractSecondaryViewContent() : base() { }

        /// <summary>
        /// inicializace pohledu
        /// </summary>
        /// <param name="primaryViewContent">Primární pohled</param>
        /// <param name="isLK">indikuje LK</param>
        public override IViewContent Initialize(IViewContent primaryViewContent, bool isLK = false)
        {
            base.Initialize(primaryViewContent, isLK);
            if (primaryViewContent == null)
                throw new ArgumentNullException("primaryViewContent");
            if (primaryViewContent.PrimaryFile == null)
                throw new ArgumentException("primaryViewContent.PrimaryFile " + GResources.GetResourceText(29450312)); //RC 29450312 : nesmí být NULL!
            this.primaryViewContent = primaryViewContent;

            primaryFile = primaryViewContent.PrimaryFile;
            _Files.Add(primaryFile);
            return this;
        }
        /// <exclude/>
        public override void Load(OpenedFile file, Stream stream)
        {
            if (file != this.PrimaryFile)
                throw new ArgumentException(GResources.GetResourceText(29450313)); //RC 29450313 : Soubor musí být primárním souborem primárního pohledu, použijte přetížení Load() pro načtení nového souboru!
            primaryViewContent.Load(file, stream);
            LoadFromPrimary();
        }
        /// <exclude/>
        public override void Save(OpenedFile file, Stream stream)
        {
            if (file != this.PrimaryFile)
                throw new ArgumentException(GResources.GetResourceText(29450314)); //RC 29450314 : Soubor musí být primárním souborem primárního pohledu, použijte přetížení Save() pro napojení jiného souboru!

            SaveToPrimary();
            primaryViewContent.Save(file, stream);
        }
        /// <exclude/>
        public override bool SupportsSwitchFromThisWithoutSaveLoad(OpenedFile file, IViewContent newView) => file == this.PrimaryFile
            ? newView.SupportsSwitchToThisWithoutSaveLoad(file, primaryViewContent)
            : base.SupportsSwitchFromThisWithoutSaveLoad(file, newView);

        /// <exclude/>
        public override bool SupportsSwitchToThisWithoutSaveLoad(OpenedFile file, IViewContent oldView) => file == this.PrimaryFile
            ? oldView.SupportsSwitchToThisWithoutSaveLoad(file, primaryViewContent)
            : base.SupportsSwitchFromThisWithoutSaveLoad(file, oldView);
        /// <exclude/>
        public override bool SwitchFromThisWithoutSaveLoad(OpenedFile file, IViewContent newView)
        {
            if (file == this.PrimaryFile && this != newView)
                SaveToPrimary();

            return true;
        }
        /// <exclude/>
        public override void SwitchToThisWithoutSaveLoad(OpenedFile file, IViewContent oldView)
        {
            if (file.Equals(PrimaryFile)
                && !oldView.Equals(this))
            {
                primaryViewContent.SwitchToThisWithoutSaveLoad(file, oldView);
                LoadFromPrimary();
            }
        }

        /// <exclude/>
        protected abstract void LoadFromPrimary();
        /// <exclude/>
        protected abstract void SaveToPrimary();

        /// <summary>
        /// Seznám sekundárních pohledů.
        /// </summary>
        public override ICollection<IViewContent> SecondaryViewContents
        {
            get { return primaryViewContent.SecondaryViewContents; }
        }
    }
}
