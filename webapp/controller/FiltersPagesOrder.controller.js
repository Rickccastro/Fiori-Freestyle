sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("fiorifreestyle.controller.FiltersPagesOrder", {
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
        });
        oView.setModel(oFModel, "filter");

        this.onFilterSearch();
      },
      onFilterReset: function () {
        // executando filtro
         this.getView().byId("table2").bindRows({
          path: "/HeaderSet",
        });
      },
      onFilterSearch: function (oEvent) {
        var oView = this.getView();
        var oTable = oView.byId("table2");
        var oFModel = oView.getModel("filter");
        var oFData = oFModel.getData();
        var oFilter = null;
        var aParams = [];

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

        // executando filtro
        oTable.bindRows({
          path: "/HeaderSet",
          sorter: aSorter,
          filters: aFilters,
        });
      },
    });
  },
);
