(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DetailBuilderComponents", {

        WflHeaderForm: {
            create: function (componentDto) {
                var ginComponents = Gordic.Gin.DetailBuilderComponents;
                
                var headerForm = ginComponents.GinHeaderFormLayout.create(componentDto).headerForm;
                var infoSection = Gordic.Wfl.DetailBuilderComponents.WflHeaderFormInfoSection.create(componentDto).headerForm.form.sections;
                var dataSections = ginComponents.GinHeaderFormDataSections.create(componentDto).headerForm.form.sections;

                headerForm.addPrefab(infoSection, "sections");
                headerForm.addPrefab(dataSections, "sections");

                return { headerForm: headerForm };
            }
        },

        WflHeaderFormInfoSection: {
            create: function (componentDto) {
                var headerForm = Gordic.Gin.DetailBuilderComponents.GinHeaderFormInfoSection.create(componentDto).headerForm;
                headerForm.form.sections[0].rows[0].fields[0].widget = "gwflpidbar";

                return { headerForm: headerForm };
            }
        }

    }, {extendIntellisense: GContent, pure:true});
})(jQuery);