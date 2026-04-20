var DSSET = {
    onContentReady: function ()
    {
        var dsset = this.contentDiv;
        Gordic.Rak.Utils.ZmenaDatovehoFormatuElDokumentu(this.Ixp, this.Ixb, this);
        close(true);
    },

    Reload: function ()
    {
        close(true);
    }
}