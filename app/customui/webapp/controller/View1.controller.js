sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Label",
    "sap/m/Input",
    "sap/m/DatePicker"
], (Controller, MessageBox, Dialog, Button, Label, Input, DatePicker) => {
    "use strict";

    return Controller.extend("customui.controller.View1", {
        onInit() {
        },
        onCreateTransaction: function () {
            var oDialog = new Dialog({
                title: "Create Transaction",
                contentWidth: "600px", 
                content: [
                    new Label({ text: "Sender Name" }),
                    new Input({ id: "senderName", value: "", width: "100%" }),
                    new Label({ text: "Receiver Name" }),
                    new Input({ id: "receiverName", value: "", width: "100%" }),
                    new Label({ text: "Amount Paid" }),
                    new Input({ id: "amountPaid", value: "", width: "100%", type: "Number" })
                ],
                beginButton: new Button({
                    text: "Submit",
                    press: function () {
                        this._submitTransaction(oDialog);
                    }.bind(this)
                }),
                endButton: new Button({
                    text: "Cancel",
                    press: function () {
                        oDialog.close();
                    }
                }),
                afterClose: function () {
                    oDialog.destroy();
                }
            });
            oDialog.open();
        },

        _submitTransaction: function (oDialog) {
            var oCore = sap.ui.getCore();
            var sSenderName = oCore.byId("senderName").getValue();
            var sReceiverName = oCore.byId("receiverName").getValue();
            var sAmountPaid = oCore.byId("amountPaid").getValue();
            if (!sSenderName || !sReceiverName || !sAmountPaid) {
                MessageBox.error("Please fill in all fields.");
                return;
            }
            var oNewTransaction = {
                SenderName: sSenderName,
                ReceiverName: sReceiverName,
                AmountPaid: parseFloat(sAmountPaid)
            };
            var oModel = this.getView().getModel();
            var oListBinding = oModel.bindList("/Transaction");
            oListBinding.create(oNewTransaction, {
                success: function (response) {
                    console.log("Success response:", response);
                    sap.ui.getCore().getLibraryResourceBundle("sap/m").then(function (oBundle) {
                        MessageBox.success("Transaction created successfully!", {
                            onClose: function () {
                                oDialog.close();
                                oModel.refresh(); 
                            }
                        });
                    }).catch(function (oError) {
                        console.error("Error loading MessageBox resource bundle:", oError);
                    });
                },
                error: function (oError) {
                    console.error("Error creating transaction:", oError);
                    MessageBox.error("Error creating transaction: " + (oError.message || "Unknown error"));
                }
            });
        },
    });
});