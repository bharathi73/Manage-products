sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
],
function (Controller,UIComponent) {
    "use strict";

    return Controller.extend("com.techm.routing.controller.View2", {
        onInit: function () {

            var oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("RouteView2").attachMatched(this.getID,this);

            

        },
        getID:function(oEvent){
            var id=oEvent.getParameter("arguments").ProductID;
            var path="ProductsJSONModel>/"+id;
            this.getView().bindElement({path});
        }
    });
});
