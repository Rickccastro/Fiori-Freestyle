sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, MessageToast) {
    "use strict";

    return Controller.extend(
      "fiorifreestyle.controller.FiltersPagesOrderPagination",
      {
        onInit: function () {
          var oView = this.getView();
          var oFModel = new sap.ui.model.json.JSONModel();

          oFModel.setData({
            OrderId: "",
            CreatedAt: "",
            CreatedBy: "",
            ClientID: "",
            TotalItems: "",
            TotalFreight: "",
            TotalOrder: "",
            Status: "",
            OrderField: "OrderId",
            OrderType: "ASC",
            Limit: 10,
            Offset: 0,
          });

          oView.setModel(oFModel, "filter");
          
          var oTModel = new sap.ui.model.json.JSONModel();
          oTModel.setData([]);
          oView.setModel(oTModel, "table");

          this.onFilterSearch();
        },
        onFilterReset: function () {
          // executando filtro
          this.getView().byId("table3").bindRows({
            path: "/HeaderSet",
          });
        },
        onFilterSearch: function (oEvent) {
          var oView = this.getView();
          var oModel = this.getOwnerComponent().getModel();
          var oFModel = oView.getModel("filter");
          var oTModel = oView.getModel("table");
          var oFData = oFModel.getData();
          var oFilter = null;
          var aParams = [];
          var that = this;

          // aplicando filtros
          var aSorter = [];
          var aFilters = [];

          if (oFData.OrderId != "") {
            oFilter = new sap.ui.model.Filter({
              path: "OrderId",
              operator: sap.ui.model.FilterOperator.EQ,
              value1: oFData.OrderId,
            });
            aFilters.push(oFilter);
          }

          if (oFData.CreatedAt != "") {
            oFilter = new sap.ui.model.Filter({
              path: "CreatedAt",
              operator: sap.ui.model.FilterOperator.EQ,
              value1: oFData.CreatedAt,
            });
            aFilters.push(oFilter);
          }

          if (oFData.ClientID != "") {
            oFilter = new sap.ui.model.Filter({
              path: "ClientID",
              operator: sap.ui.model.FilterOperator.EQ,
              value1: oFData.ClientID,
            });
            aFilters.push(oFilter);
          }

          var bDescending = false;
          if (oFData.OrderType == "DESC") {
            bDescending = true;
          }
          var oSort = new sap.ui.model.Sorter(oFData.OrderField, bDescending);
          aSorter.push(oSort);

          // limite, offset
          aParams.push("$top=" + oFData.Limit);
          aParams.push("$skip=" + oFData.Offset);

          // executando filtro
          this.getView().setBusy(true);
          oModel.read("/HeaderSet", {
            sorters: aSorter,
            filters: aFilters,
            urlParameters: aParams,

            success: function (oData2, oResponse) {
              that.getView().setBusy(false);
              oTModel.setData(oData2.results);
            },
            error: function (oError) {
              that.getView().setBusy(false);
              MessageToast.show("Erro");
            },
          });
        },
      },
    );
  },
);
