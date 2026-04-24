sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast"],
  function (Controller, MessageToast) {
    "use strict";

    return Controller.extend(
      "fiorifreestyle.controller.fragment.FragmentPage",
      {
        onInit: function () {},
        /*functions no fragment são declaradas na view utilizada*/
        onHeaderFragment: function () {
          alert("onHeader");
        },
      },
    );
  },
);
