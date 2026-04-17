sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("fiorifreestyle.controller.View1", {
        onInit: function () {
        var oView  = this.getView()
        var oModel = new sap.ui.model.json.JSONModel()
        
        oModel.setData({ "usuario": {"nome": "Ricardo"} })
        oView.setModel(oModel)
        },

        onPress: function (){
            alert("Hello")
        },
        
        onShowMessage: function(){
            var sTitle = this.getView().getModel("i18n").getResourceBundle().getText("customerName")
            alert(sTitle)

        }
    });
});
