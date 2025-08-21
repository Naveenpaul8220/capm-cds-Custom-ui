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
                content: [
                    new Label({ text: "Transaction ID" }),
                    new Input({ id: "transactionId", value: "", width: "100%" }),
                    new Label({ text: "Sender Name" }),
                    new Input({ id: "senderName", value: "", width: "100%" }),
                    new Label({ text: "Receiver Name" }),
                    new Input({ id: "receiverName", value: "", width: "100%" }),
                    new Label({ text: "Amount Paid" }),
                    new Input({ id: "amountPaid", value: "", width: "100%", type: "Number" }),
                    new Label({ text: "Paid On" }),
                    new DatePicker({ id: "paidOn", value: "", width: "100%", valueFormat: "yyyy-MM-dd" })
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
            // Get input values
            var oView = sap.ui.getCore();
            var sTransactionId = oView.byId("transactionId").getValue();
            var sSenderName = oView.byId("senderName").getValue();
            var sReceiverName = oView.byId("receiverName").getValue();
            var sAmountPaid = oView.byId("amountPaid").getValue();
            var sPaidOn = oView.byId("paidOn").getValue();
            if (!sTransactionId || !sSenderName || !sReceiverName || !sAmountPaid || !sPaidOn) {
                MessageBox.error("Please fill in all fields.");
                return;
            }
            var oNewTransaction = {
                TransactionId: sTransactionId,
                SenderName: sSenderName,
                ReceiverName: sReceiverName,
                AmountPaid: parseFloat(sAmountPaid),
                Paidon: sPaidOn
            };
            var oModel = this.getView().getModel();
            oModel.create("/Transaction", oNewTransaction, {
                success: function () {
                    MessageBox.success("Transaction created successfully!");
                    oDialog.close();
                    oModel.refresh(); 
                },
                error: function (oError) {
                    MessageBox.error("Error creating transaction: " + oError.message);
                }
            });
        }
    });
});