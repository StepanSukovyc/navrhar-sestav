(function ($) {
    "use strict";
    namespace("Gordic.Gin.DetailBuilderComponents", {

        GinHeaderForm: {
            sizes: {
                noPid: [
                    { info: [12, 12, 12], layout: "L-3-8-1, M-3-9-0, S-12-12-0"   },
                    { info: [3, 3, 12], data: [9, 9, 12], layout: "L-3-8-1, M-3-9-0, S-12-12-0" },
                    { info: [4, 4, 12], data: [4, 4, 12], layout: "L-3-9-0, MS-12-12-0" },
                    { info: [3, 3, 12], data: [3, 3, 12], layout: "LMS-12-12-0"  },
                    { info: [3, 3, 12], data: [2, 2, 12], layout: "LMS-12-12-0"  },
                ],
                pid: [
                    { info: [12, 12, 12] },
                    { info: [2, 3, 12], data: [10, 9, 12] },
                    { info: [2, 2, 12], data: [3, 3, 6] },
                    { info: [2, 3, 12], data: [2, 2, 6] },
                    { info: [2, 3, 12], data: [2, 2, 6] },
                ]
            },
            /**
             * Creates Gin header form.
             * @author vmaca
             * @type {function (componentDto) {}
             */
            create: function (componentDto) {
                var nmspc =  Gordic.Gin.DetailBuilderComponents;
                var headerForm = nmspc.GinHeaderFormLayout.create(componentDto).headerForm;

                var infoSection = nmspc.GinHeaderFormInfoSection.create(componentDto).headerForm.form.sections;

                var dataSections = nmspc.GinHeaderFormDataSections.create(componentDto).headerForm.form.sections;

                headerForm.addPrefab(infoSection, "sections");
                headerForm.addPrefab(dataSections, "sections");


                return { headerForm: headerForm };
            }
            // code
        },
        GinHeaderFormLayout: {
            create: function (componentDto) {

                var dataSectionsCount = componentDto != null ? componentDto.dataSectionsCount : 2;

                var LCount = dataSectionsCount + 1;
                var MCount = dataSectionsCount + 1;
                var SCount = 1;

                return {
                    headerForm: new Gordic.Forms.Form({ 
                        name: "formHeader", 
                        layoutDescriptor: "L{0}M{1}S{2} {3} {4} ".format(
                        LCount, 
                        MCount, 
                        SCount, 
                        dataSectionsCount >= 2 ? (dataSectionsCount >= 3 ? "LMS-12-12-0" : "L-3-9-0, MS-12-12-0") 
                                               : "L-3-8-1, M-3-9-0, S-12-12-0", 
                        ", breaks-810-1190") })
                };
            }
        },
        GinHeaderFormInfoSection: {

			create: function (componentDto) {
                var nmspc = Gordic.Gin.DetailBuilderComponents;
                var dataSectionsCount = componentDto != null ? componentDto.dataSectionsCount : 2;
                var hasPid = componentDto != null && componentDto.pid != null;
                var sizes = hasPid ? nmspc.GinHeaderForm.sizes.pid : nmspc.GinHeaderForm.sizes.noPid;
                var infoSizes = sizes[dataSectionsCount].info;
                var secClass = "w-L-{0} w-M-{1} w-S-{2}".format(infoSizes[0], infoSizes[1], infoSizes[2]);

                var headerForm = new Gordic.Forms.Form({ name: "formHeader" })
                    .addSection({ 
                        name: "formHeaderInfoSection", 
                        customClass: secClass,
                        layoutDescriptor: hasPid ? "LMS-0-12-0" : null 
                    });

                if (hasPid) {
					          headerForm.addRow({ name: "formHeaderRowPid" })
                        .addField("gpidbar", { name: "formHeaderFieldPid", pid: componentDto.pid, dto: componentDto.IkonBarDto });
                }

                return {
                    headerForm: headerForm
                };
            }
        },

        GinHeaderFormDataSections: {
            create: function (componentDto) {
                var nmspc = Gordic.Gin.DetailBuilderComponents;
                var headerForm = new Gordic.Forms.Form({ name: "formHeader" });
                var hasComponentDto = componentDto != null;
                var dataSectionsCount = hasComponentDto ? componentDto.dataSectionsCount : 2;

                var hasPid = hasComponentDto && componentDto.pid != null;
                var sizes = hasPid ? nmspc.GinHeaderForm.sizes.pid : nmspc.GinHeaderForm.sizes.noPid;
                var dataSizes = sizes[dataSectionsCount].data;

                var sectionClass = "w-L-{0} w-M-{1} w-S-{2}".format(dataSizes[0] , dataSizes[1], dataSizes[2]);
                var sectionName = "formHeaderSection{0}";

                if (!hasComponentDto || dataSectionsCount >= 1)
                    headerForm.addSection({ name: sectionName.format("One"), customClass: sectionClass });
                if (!hasComponentDto || dataSectionsCount >= 2)
                    headerForm.addSection({ name: sectionName.format("Two"), customClass: sectionClass });
                if (!hasComponentDto || dataSectionsCount >= 3)
                    headerForm.addSection({ name: sectionName.format("Three"), customClass: sectionClass });
                if (!hasComponentDto || dataSectionsCount >= 4)
                    headerForm.addSection({ name: sectionName.format("Four"), customClass: sectionClass });


                return {
                    headerForm: headerForm
                };

            }
            // code
        }

    }, { extendIntellisense: GContent, pure: true });
})(jQuery);