"use strict";
var Gordic;
(function (Gordic) {
    var Ada;
    (function (Ada) {
        var DetailBuilderComponents;
        (function (DetailBuilderComponents) {
            /** Komponenta detail builderu Ada přílohy */
            class AdaPrilohy {
                /**
                 * Vytvoření builderu s ADA přílohami
                 *
                 * @param {any} componentDto
                 * @param {Wfl.DetailBuilderComponents.GIxsPrilohyOptions} [opts]
                 */
                static create(componentDto, opts) {
                    opts = opts ?? {};
                    opts.visitors = [Gordic.Wfl.DetailBuilderComponents.IxsPrilohy.createDefaultVisitor(componentDto), new AdaPrilohyVisitor()];
                    opts.attachmentDao = new AdaPrilohyDAO({ ixs: componentDto.ixs, islName: componentDto.islName });
                    return Gordic.Wfl.DetailBuilderComponents.IxsPrilohy.create(componentDto, opts);
                }
            }
            DetailBuilderComponents.AdaPrilohy = AdaPrilohy;
            /**
             * DAO
             *
             */
            class AdaPrilohyDAO extends Gordic.Wfl.WebClient.Attachments.GIxsAttachmentDAO {
                constructor(opts) {
                    super(opts);
                }
            }
            DetailBuilderComponents.AdaPrilohyDAO = AdaPrilohyDAO;
            /**
             * AdaPrilohyVisitor pro modifikaci IxsPrilohyDlg podle potřeb ADA
             *
             */
            class AdaPrilohyVisitor {
                visit(content) {
                    content.attachmentEvents.on(Gordic.Wfl.WebClient.Attachments.GIxsPrilohyDlgEvents.enhanceGridFormat, (ctx) => {
                        ctx.gridFormat.add(this.getGridFormat());
                    });
                    content.attachmentEvents.on(Gordic.Wfl.WebClient.Attachments.GIxsAttachmentVisitorEvents.beforeRemove, (ctx) => {
                        if ((ctx.attachments) && (ctx.attachments.length > 0)) {
                            var moje_priloha;
                            moje_priloha = ctx.attachments[0].data;
                            if (moje_priloha.Navazane_ISP != "") {
                                ctx.customDialog = (dialogs) => dialogs.confirm("<br>Příloha je vázána na následující IP:<br><br><br><b>" + moje_priloha.Navazane_ISP + "</b><br>Jejím odstraněním dojde i k odebrání z uvedených IP.<br><br><b>Opravdu odstrait přílohu {0}?".format(ctx.attachments[0].data.Name ?? "")).createDialogPromise("yes");
                            }
                            else {
                                ctx.customDialog = (dialogs) => dialogs.confirm("Opravdu odstrait přílohu {0}?".format(ctx.attachments[0].data.Name ?? "")).createDialogPromise("yes");
                            }
                        }
                    });
                }
                getGridFormat() {
                    const gridColumns = new Gordic.Data.GridFormat();
                    //gridColumns
                    //    .addTextColumn({ caption: "ISP", name: "Navazane_ISP", tooltipTemplate: function (row) { return row.Navazane_ISP; } });
                    gridColumns
                        .addIconColumn({
                        name: "Navazane_ISP",
                        field: "Navazane_ISP",
                        caption: "IP",
                        formatPreset: Gordic.Global.Enums.GridColumnFormatIcon.icon,
                        tooltipTemplate: function (row) {
                            return (row.Navazane_ISP);
                        },
                        iconTemplate: function (data) {
                            if (data.Navazane_ISP != "") {
                                return { icon: "gi-tick", text: "Navázáno", caption: "Navázáno" }; //, tooltip: data.Navazane_ISP };
                            }
                            else {
                                return { icon: "fa-fw", text: "", caption: "" };
                            }
                        }
                    });
                    return gridColumns;
                }
            }
            DetailBuilderComponents.AdaPrilohyVisitor = AdaPrilohyVisitor;
        })(DetailBuilderComponents = Ada.DetailBuilderComponents || (Ada.DetailBuilderComponents = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FkYVByaWxvaHlDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbIlNjcmlwdHMvR0FkYVByaWxvaHlDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsTUFBTSxDQTRGZjtBQTVGRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E0Rm5CO0lBNUZnQixXQUFBLEdBQUc7UUFBQyxJQUFBLHVCQUF1QixDQTRGM0M7UUE1Rm9CLFdBQUEsdUJBQXVCO1lBRXhDLDZDQUE2QztZQUM3QyxNQUFhLFVBQVU7Z0JBRW5COzs7OzttQkFLRztnQkFDSCxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxJQUFxRDtvQkFDN0UsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFvRCxDQUFDO29CQUNwRSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxpQkFBaUIsRUFBRSxDQUFDLENBQUM7b0JBQzVILElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxhQUFhLENBQUMsRUFBRSxHQUFHLEVBQUUsWUFBWSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBQ2pHLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDcEYsQ0FBQzthQUNKO1lBZFksa0NBQVUsYUFjdEIsQ0FBQTtZQUdEOzs7ZUFHRztZQUNILE1BQWEsYUFBYyxTQUFRLE9BQUEsR0FBRyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsaUJBQWlCO2dCQUUxRSxZQUFZLElBR1g7b0JBQ0csS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoQixDQUFDO2FBQ0o7WUFSWSxxQ0FB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Q0o7WUFyRFkseUNBQWlCLG9CQXFEN0IsQ0FBQTtRQUNMLENBQUMsRUE1Rm9CLHVCQUF1QixHQUF2QiwyQkFBdUIsS0FBdkIsMkJBQXVCLFFBNEYzQztJQUFELENBQUMsRUE1RmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTRGbkI7QUFBRCxDQUFDLEVBNUZTLE1BQU0sS0FBTixNQUFNLFFBNEZmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5BZGEuRGV0YWlsQnVpbGRlckNvbXBvbmVudHMge1xyXG5cclxuICAgIC8qKiBLb21wb25lbnRhIGRldGFpbCBidWlsZGVydSBBZGEgcMWZw61sb2h5ICovXHJcbiAgICBleHBvcnQgY2xhc3MgQWRhUHJpbG9oeSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvxZllbsOtIGJ1aWxkZXJ1IHMgQURBIHDFmcOtbG9oYW1pXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHthbnl9IGNvbXBvbmVudER0b1xyXG4gICAgICAgICAqIEBwYXJhbSB7V2ZsLkRldGFpbEJ1aWxkZXJDb21wb25lbnRzLkdJeHNQcmlsb2h5T3B0aW9uc30gW29wdHNdXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc3RhdGljIGNyZWF0ZShjb21wb25lbnREdG8sIG9wdHM/OiBXZmwuRGV0YWlsQnVpbGRlckNvbXBvbmVudHMuR0l4c1ByaWxvaHlPcHRpb25zKSB7XHJcbiAgICAgICAgICAgIG9wdHMgPSBvcHRzID8/IHt9IGFzIFdmbC5EZXRhaWxCdWlsZGVyQ29tcG9uZW50cy5HSXhzUHJpbG9oeU9wdGlvbnM7XHJcbiAgICAgICAgICAgIG9wdHMudmlzaXRvcnMgPSBbR29yZGljLldmbC5EZXRhaWxCdWlsZGVyQ29tcG9uZW50cy5JeHNQcmlsb2h5LmNyZWF0ZURlZmF1bHRWaXNpdG9yKGNvbXBvbmVudER0byksIG5ldyBBZGFQcmlsb2h5VmlzaXRvcigpXTtcclxuICAgICAgICAgICAgb3B0cy5hdHRhY2htZW50RGFvID0gbmV3IEFkYVByaWxvaHlEQU8oeyBpeHM6IGNvbXBvbmVudER0by5peHMsIGlzbE5hbWU6IGNvbXBvbmVudER0by5pc2xOYW1lIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gR29yZGljLldmbC5EZXRhaWxCdWlsZGVyQ29tcG9uZW50cy5JeHNQcmlsb2h5LmNyZWF0ZShjb21wb25lbnREdG8sIG9wdHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEQU9cclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgQWRhUHJpbG9oeURBTyBleHRlbmRzIFdmbC5XZWJDbGllbnQuQXR0YWNobWVudHMuR0l4c0F0dGFjaG1lbnREQU8ge1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihvcHRzOiB7XHJcbiAgICAgICAgICAgIGl4czogc3RyaW5nO1xyXG4gICAgICAgICAgICBpc2xOYW1lPzogc3RyaW5nO1xyXG4gICAgICAgIH0pIHtcclxuICAgICAgICAgICAgc3VwZXIob3B0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRhUHJpbG9oeVZpc2l0b3IgcHJvIG1vZGlmaWthY2kgSXhzUHJpbG9oeURsZyBwb2RsZSBwb3TFmWViIEFEQVxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBBZGFQcmlsb2h5VmlzaXRvciBpbXBsZW1lbnRzIFdmbC5XZWJDbGllbnQuQXR0YWNobWVudHMuSUdBdHRhY2htZW50RGxnVmlzaXRvciB7XHJcblxyXG4gICAgICAgIHZpc2l0KGNvbnRlbnQ6IFdmbC5XZWJDbGllbnQuQXR0YWNobWVudHMuSUdJeHNQcmlsb2h5RGxnPFdmbC5JbnRlcmZhY2UuR0F0dGFjaG1lbnREdG8+KTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBjb250ZW50LmF0dGFjaG1lbnRFdmVudHMub24oV2ZsLldlYkNsaWVudC5BdHRhY2htZW50cy5HSXhzUHJpbG9oeURsZ0V2ZW50cy5lbmhhbmNlR3JpZEZvcm1hdCwgKGN0eDogeyBncmlkRm9ybWF0OiBEYXRhLkdyaWRGb3JtYXQgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY3R4LmdyaWRGb3JtYXQuYWRkKHRoaXMuZ2V0R3JpZEZvcm1hdCgpKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb250ZW50LmF0dGFjaG1lbnRFdmVudHMub24oV2ZsLldlYkNsaWVudC5BdHRhY2htZW50cy5HSXhzQXR0YWNobWVudFZpc2l0b3JFdmVudHMuYmVmb3JlUmVtb3ZlLCAoY3R4OiBXZmwuV2ViQ2xpZW50LkF0dGFjaG1lbnRzLklHSXhzQXR0YWNobWVudFZpc2l0b3JSZW1vdmVPcHRpb25zKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKChjdHguYXR0YWNobWVudHMpICYmIChjdHguYXR0YWNobWVudHMubGVuZ3RoID4gMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbW9qZV9wcmlsb2hhOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HQWRhQXR0YWNobWVudER0bztcclxuICAgICAgICAgICAgICAgICAgICBtb2plX3ByaWxvaGEgPSBjdHguYXR0YWNobWVudHNbMF0uZGF0YTsgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2plX3ByaWxvaGEuTmF2YXphbmVfSVNQICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmN1c3RvbURpYWxvZyA9IChkaWFsb2dzKSA9PiBkaWFsb2dzLmNvbmZpcm0oXCI8YnI+UMWZw61sb2hhIGplIHbDoXrDoW5hIG5hIG7DoXNsZWR1asOtY8OtIElQOjxicj48YnI+PGJyPjxiPlwiICsgbW9qZV9wcmlsb2hhLk5hdmF6YW5lX0lTUCArIFwiPC9iPjxicj5KZWrDrW0gb2RzdHJhbsSbbsOtbSBkb2pkZSBpIGsgb2RlYnLDoW7DrSB6IHV2ZWRlbsO9Y2ggSVAuPGJyPjxicj48Yj5PcHJhdmR1IG9kc3RyYWl0IHDFmcOtbG9odSB7MH0/XCIuZm9ybWF0KGN0eC5hdHRhY2htZW50c1swXS5kYXRhLk5hbWUgPz8gXCJcIikpLmNyZWF0ZURpYWxvZ1Byb21pc2UoXCJ5ZXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguY3VzdG9tRGlhbG9nID0gKGRpYWxvZ3MpID0+IGRpYWxvZ3MuY29uZmlybShcIk9wcmF2ZHUgb2RzdHJhaXQgcMWZw61sb2h1IHswfT9cIi5mb3JtYXQoY3R4LmF0dGFjaG1lbnRzWzBdLmRhdGEuTmFtZSA/PyBcIlwiKSkuY3JlYXRlRGlhbG9nUHJvbWlzZShcInllc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRHcmlkRm9ybWF0KCkge1xyXG4gICAgICAgICAgICBjb25zdCBncmlkQ29sdW1ucyA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KCk7IFxyXG5cclxuICAgICAgICAgICAgLy9ncmlkQ29sdW1uc1xyXG4gICAgICAgICAgICAvLyAgICAuYWRkVGV4dENvbHVtbih7IGNhcHRpb246IFwiSVNQXCIsIG5hbWU6IFwiTmF2YXphbmVfSVNQXCIsIHRvb2x0aXBUZW1wbGF0ZTogZnVuY3Rpb24gKHJvdykgeyByZXR1cm4gcm93Lk5hdmF6YW5lX0lTUDsgfSB9KTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgZ3JpZENvbHVtbnNcclxuICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJOYXZhemFuZV9JU1BcIixcclxuICAgICAgICAgICAgICAgIGZpZWxkOiBcIk5hdmF6YW5lX0lTUFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJJUFwiLFxyXG4gICAgICAgICAgICAgICAgZm9ybWF0UHJlc2V0OiBHb3JkaWMuR2xvYmFsLkVudW1zLkdyaWRDb2x1bW5Gb3JtYXRJY29uLmljb24sXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwVGVtcGxhdGU6IGZ1bmN0aW9uIChyb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHJvdy5OYXZhemFuZV9JU1ApO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuTmF2YXphbmVfSVNQICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgaWNvbjogXCJnaS10aWNrXCIsIHRleHQ6IFwiTmF2w6F6w6Fub1wiLCBjYXB0aW9uOiBcIk5hdsOhesOhbm9cIiB9OyAvLywgdG9vbHRpcDogZGF0YS5OYXZhemFuZV9JU1AgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgaWNvbjogXCJmYS1md1wiLCB0ZXh0OiBcIlwiLCBjYXB0aW9uOiBcIlwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBncmlkQ29sdW1ucztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=