sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  return Controller.extend("fiorifreestyle.controller.View1", {
    onInit: function () {
      var oView = this.getView();
      var oModel = new sap.ui.model.json.JSONModel();

      oModel.setData({ user: { name: "Ricardo" } });
      oView.setModel(oModel,"userModel");

    },

    onPress: function () {
      alert("Hello");
    },

    onShowMessage: function () {
      var oI18n = this.getView().getModel("i18n").getResourceBundle();
      var oModel = this.getView().getModel("userModel");
      var oData = oModel.getData();

      var sText = oI18n.getText("welcomeMsg", [oData.user.name]);
      alert(sText);
    },
    onView2: function(){
      var r = sap.ui.core.UIComponent.getRouterFor(this)
      r.navTo("RouteView2")
    },
    onView3: function(){
      var r = sap.ui.core.UIComponent.getRouterFor(this)
      r.navTo("RouteView3")
    },
    onView4: function(){
      var r = sap.ui.core.UIComponent.getRouterFor(this)
      r.navTo("RouteView4")
    },
    onFiltersPagesOrder: function(){
      var r = sap.ui.core.UIComponent.getRouterFor(this)
      r.navTo("RouteFiltersPagesOrder")
    },
    onFiltersPagesOrderPagination: function(){
      var r = sap.ui.core.UIComponent.getRouterFor(this)
      r.navTo("RouteFiltersPagesOrderPagination")
    }
  });
});
