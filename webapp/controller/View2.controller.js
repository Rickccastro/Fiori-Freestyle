sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("fiorifreestyle.controller.View2", {
            onInit: function () {

               /* // model padrão da view
                var oView  = this.getView();
                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setData({"user": {"name": "Ricardo"}});
                oView.setModel(oModel);*/
                
                
                // model com o nome "dados"
                var oView  = this.getView();
                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setData({"user": {"name": "Ricardo"}});
                oView.setModel(oModel,"dados");
            },

            onTestModels: function(){
                console.log("oi");
                // model i18n
                var oI18n = this.getView().getModel("i18n").getResourceBundle();
                var sText = oI18n.getText("title");

                console.log("Texto com a chave 'title'");
                console.log(sText);

                console.log("------------------------------------------");

                // model de usuários
                var oModel = this.getOwnerComponent().getModel("usersInManifest");
                var oData = oModel.getData();
                console.log("Model dos usuários")
                console.log(oData);

                console.log("------------------------------------------");

                // model do serviço
                var oModel = this.getOwnerComponent().getModel();
                oModel.read("/HeaderSet",{
                    success: function(oData, oResponse){
                        console.log("Dados retornados do serviço")
                        console.log(oData);
                        console.log(oResponse);
                    },
                    error: function(oError){
                        console.log(oError);
                    }
                });
            }
        });
    });