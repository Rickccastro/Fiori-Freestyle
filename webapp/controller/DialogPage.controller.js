sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  return Controller.extend("fiorifreestyle.controller.DialogPage", {
    onInit: function () {},
    onOpenDialogInfo() {
      var that = this;
      var sName = "fiorifreestyle.view.fragment.Dialog";

      if (!this.oDialog) {
        /*
                    this.loadFragment({
                        name: sName
                    }).then(function(oDialog2) {
                        that.oDialog = oDialog2;
                        that.oDialog.open();
                    }.bind(this));
                    */

        this.oDialog = this.byId("DialogInfo");
        that.oDialog.open();
      } else {
        this.oDialog.open();
      }
    },

    onCloseDialogInfo: function () {
      //this.byId("DialogInfo").close();
      this.oDialog.close();
    },
  });
});
