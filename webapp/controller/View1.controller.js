sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
],
    function (Controller, Filter, FilterOperator, UIComponent, JSONModel) {
        "use strict";

        return Controller.extend("com.techm.routing.controller.View1", {
            onInit: function () {
                
                var oDataModel = new JSONModel({
                    "inStock": 0,
                    "Shortage": 0,
                    "outOfStock": 0,
                    "all": 0 
                });
                var data = oDataModel.getData();
                
                var dataModel = this.getOwnerComponent().getModel("ProductsJSONModel");
                var stockItems = dataModel.getData();
                for (var i = 0; i < stockItems.length; i++) {
                    if (stockItems[i].UnitsInStock >= stockItems[i].UnitsOnOrder) {
                        stockItems[i].stockStatus = "plentyOfStock";
                        stockItems[i].show = "all";
                        data.inStock++;
                        data.all++;
                    } else if (stockItems[i].UnitsInStock <
                        stockItems[i].UnitsOnOrder) {
                        stockItems[i].stockStatus = "Shortage";
                        stockItems[i].show = "all";
                        data.Shortage++;
                        data.all++;
                    } else {
                        stockItems[i].stockStatus = "OutofStock";
                        stockItems[i].show = "all";
                        data.outOfStock++;
                        data.all++;
                    }
                }
                this.getView().setModel(oDataModel, "countModel");
            },
            onQuickFilter: function (oEvent) {
                var sKey = oEvent.getParameter("selectedKey");
                var oTable = this.byId("productsTable");
                var oBinding = oTable.getBinding("items");
                var aFilter = [];
                if (sKey === "all") {
                    var filter = new Filter("show", "EQ", sKey);
                    aFilter.push(filter);
                    oBinding.filter(aFilter);
                }
                else {
                    var oTable = this.byId("productsTable");
                    var oBinding = oTable.getBinding("items");
                    var aFilter = [];
                    var filter = new Filter("stockStatus", "EQ", sKey);
                    aFilter.push(filter);
                    oBinding.filter(aFilter);
                }
            },
            onPress: function (oEvent) {
                var select = oEvent.getParameter("listItem").getBindingContextPath();
                select = select.split("/")[1];
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("RouteView2", { ProductID: select });
            },
            onFilterProducts: function (oEvent) {
                var aFilter = [], sQuery = oEvent.getParameter("query"),
                    oList = this.getView().byId("productsTable"),
                    oBinding = oList.getBinding("items");
                if (sQuery) {
                    aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
                }
                oBinding.filter(aFilter);
            }
        });
    });
