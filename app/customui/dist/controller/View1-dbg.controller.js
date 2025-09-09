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
                contentWidth: "50%",
                content: [
                    new Label({ text: "Sender Name" }),
                    new Input({ id: "senderName", value: "", width: "20%" }),
                    new Label({ text: "Receiver Name" }),
                    new Input({ id: "receiverName", value: "", width: "20%" }),
                    new Label({ text: "Amount Paid" }),
                    new Input({ id: "amountPaid", value: "", width: "20%", type: "Number" })
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
            try {
                const oContext = oListBinding.create(oNewTransaction);

                oContext.created()
                    .then((response) => {
                        //var sMessage = response.message || "Transaction Created!";
                        MessageBox.success("Transaction Createed Succesfully!!!!!!!!!!!!");
                        
                    })
                    // .catch((err) => {
                    //     var sErrorMsg = err?.responseJSON?.error?.message;
                    //     MessageBox.error(sErrorMsg);
                    //     console.error("Call Off Error:", err);
                    // })
            } catch (error) {
                console.log("cateched error", error)
            }
        },
    });
});