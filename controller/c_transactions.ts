import {m_transaction} from '../model/m_transaction';
import {inspect} from 'util';
import {TransactionsEntity,Transactions} from '../model/plaid_api_response';
import {m_category} from '../model/m_category'

export class c_transactions{
    categories:Array<m_category>;
    constructor(){
        this.categories = [];
    }

    //clears out transactions and categories and fills them with the categories in the records array
    insert_transactions(records:any){
        
        let api_response : Transactions = <Transactions>records;
        this.categories = [];
        let transaction_array : (TransactionsEntity)[];
        transaction_array = api_response.transactions;
        transaction_array.forEach((trans:TransactionsEntity) => {
            let m_trans = new m_transaction();//Create new transaction
            //insert info;
            m_trans.account_id = trans.account_id;
            m_trans.amount = trans.amount;
            m_trans.categories = trans.category;
            m_trans.category_id = trans.category_id;
            m_trans.date_time = trans.date;
            m_trans.label = trans.name;
            let cat_found = false;
            this.categories.forEach(function(cat:m_category){//Checks for the category of the transaction. If it exists, add the amount to the category
                if (cat.label===m_trans.categories[0]){
                    cat.amount += m_trans.amount;
                    cat.transactions.push(m_trans);
                    cat_found = true;
                }
            })
            if(cat_found === false){//if not, create the category
                let new_cat = new m_category();
                new_cat.amount = m_trans.amount;
                new_cat.label = m_trans.categories[0];
                new_cat.transactions=[];
                new_cat.transactions.push(m_trans);
                this.categories.push(new_cat);
            }
            
        })
        
    }
    get_JSON(){
        return this.categories;
    }
        
}



