using {transaction as db} from '../db/schema';

service MyTransactionService {


    entity Transaction as projection on db.Transaction;

}

annotate transaction.Transaction with @odata.draft.enabled;
