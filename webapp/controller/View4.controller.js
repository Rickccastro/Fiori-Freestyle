sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageToast) {
        "use strict";

        return Controller.extend("fiorifreestyle.controller.View4", {
            onInit: function () {
            },

            onCreateHeader: function(){
                var oData = {
                    ClientID: 1,
                    TotalItems: '100.00',
                    TotalFreight: '10.00',
                    TotalOrder: '110.00',
                    Status: 'N'
                };
                this.create(oData);
            },

            onCreateDeepHeader: function(){
                var oData = {
                    ClientID: 1,
                    TotalItems: '100.00',
                    TotalFreight: '10.00',
                    TotalOrder: '110.00',
                    Status: 'N',
                    /*Header X Item Association in SEGW*/
                    HeaderItem: [
                        {
                          "ItemId": 1,
                          "Material": "100",
                          "Description": "Mouse",
                          "Quantity": 1,
                          "UnitPrice": '1.00',
                          "TotalPrice": '1.00'
                        },
                        {
                            "ItemId": 2,
                            "Material": "200",
                            "Description": "Teclado",
                            "Quantity": 2,
                            "UnitPrice": '10.00',
                            "TotalPrice": '20.00'
                          }
                    ]
                };
                this.create(oData);
            },

            create: function(oData){
                var that   = this;
                var oModel = this.getOwnerComponent().getModel();

                this.getView().setBusy(true);
                oModel.create("/HeaderSet",oData,{
                    success: function(oData2, oResponse){
                        that.getView().setBusy(false);

                        console.log(oData2);
                        console.log(oResponse);
                        if(oResponse.statusCode == 201){
                            that.getView().byId("lastOrdemId").setValue(oData2.OrdemId);
                            that.getView().byId("textarea1").setValue(JSON.stringify(oData2));

                            MessageToast.show("Cadastrado com sucesso");
                        }else{
                            MessageToast.show("Erro no cadastro");    
                        }
                    },
                    error: function(oError){
                        that.getView().setBusy(false);
                        
                        console.log(oError);
                        var oObj = JSON.parse(oError.responseText);
                        MessageToast.show(oObj.error.message.value);
                    }}
                );
            },

            onReadHeader: function(){
                var iOrdemId = this.getView().byId("lastOrdemId").getValue();
                if(iOrdemId == 0){
                    MessageToast.show("Create a header to the order first");
                    return;
                }

                this.read(iOrdemId);
            },
            
            read: function(iOrdemId){
                var that   = this;
                var oModel = this.getOwnerComponent().getModel();

                this.getView().setBusy(true);
                oModel.read("/HeaderSet("+iOrdemId+")",{
                    success: function(oData2, oResponse){
                        that.getView().setBusy(false);

                        that.getView().byId("textarea1").setValue(JSON.stringify(oData2));

                        console.log(oData2);
                        console.log(oResponse);
                        MessageToast.show("Leitura realizada");
                    },
                    error: function(oError){
                        that.getView().setBusy(false);

                        console.log(oError);
                        var oObj = JSON.parse(oError.responseText);
                        MessageToast.show(oObj.error.message.value);
                    }
                });
            },

            onUpdateHeader: function(){
                var iOrdemId = this.getView().byId("lastOrdemId").getValue();
                if(iOrdemId == 0){
                    MessageToast.show("Create a header first");
                    return;
                }

                var oData = {
                    ClientID: 2,
                    TotalItems: '150.00',
                    TotalFreight: '10.00',
                    TotalOrder: '160.00',
                    Status: 'C'
                };
                this.update(iOrdemId,oData);
            },
            
            update: function(iOrdemId,oData){
                var that   = this;
                var oModel = this.getOwnerComponent().getModel();

                this.getView().setBusy(true);
                oModel.update("/HeaderSet("+iOrdemId+")",oData,{
                    success: function(oData2, oResponse){
                        that.getView().setBusy(false);
                        console.log(oData2);
                        console.log(oResponse);
                        if(oResponse.statusCode == 204){
                            MessageToast.show("Updated with success");
                        }else{
                            MessageToast.show("Error in update");
                        }
                    },
                    error: function(oError){
                        that.getView().setBusy(false);

                        console.log(oError);
                        var oObj = JSON.parse(oError.responseText);
                        MessageToast.show(oObj.error.message.value);
                    }}
                );
            },

            onDeleteHeader: function(){
                var iOrdemId = this.getView().byId("lastOrdemId").getValue();
                this.delete(iOrdemId);
            },
            
            delete: function(iOrdemId){
                var that   = this;
                var oModel = this.getOwnerComponent().getModel();

                this.getView().setBusy(true);
                oModel.remove("/HeaderSet("+iOrdemId+")",{
                    success: function(oData2, oResponse){
                        that.getView().setBusy(false);

                        console.log(oData2);
                        console.log(oResponse);
                        if(oResponse.statusCode == 204){
                            MessageToast.show("Deleted with success");
                        }else{
                            MessageToast.show("Error to delete");
                        }
                    },
                    error: function(oError){
                        that.getView().setBusy(false);
                        console.log(oError);

                        var oObj = JSON.parse(oError.responseText);
                        MessageToast.show(oObj.error.message.value);
                    }}
                );
            }
        });
    });