namespace transaction;


entity Transaction {
    key TransactionId : UUID;
        SenderName    : String(100);
        ReceiverName  : String(100);
        AmountPaid    : Integer;
        Paidon        : Timestamp @cds.on.insert: $now;
}
