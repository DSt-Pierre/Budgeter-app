import {m_transaction} from '../model/m_transaction';
import {m_client}from '../model/m_client';
import {inspect} from 'util';
import {plaid_api_response,TransactionsEntity,Transactions} from '../model/plaid_api_response';
import {m_category} from '../model/m_category'
import {Express} from 'express'

export class c_transactions{
    transactions:Array<m_transaction>;
    item:m_client;
    categories:Array<m_category>;
    constructor(){
        this.transactions = [];
    }
    draw_transactions(){
        return this.transactions;
    }

    //clears out transactions and categories and fills them with the categories in the records array
    insert_transactions(records:any){
        //console.log("From input:"+inspect(records,{colors:true,depth:4}));
        let api_response : Transactions = <Transactions>records;
        //console.log("From Transactions:"+inspect(this.api_response.transactions,{colors:true,depth:4}));
        //console.log("From Transactions:"+inspect(this.api_response.transactions.transactions,{colors:true,depth:4}));
        this.transactions = [];
        this.categories = [];
        let transaction_array : (TransactionsEntity)[];
        transaction_array = api_response.transactions;
        console.log("From the array:"+inspect(transaction_array,{colors:true,depth:4}));
        transaction_array.forEach((trans:TransactionsEntity) => {
            let m_trans = new m_transaction();//Create new transaction
            //insert info;
            m_trans.account_id = trans.account_id;
            m_trans.amount = trans.amount;
            m_trans.categories = trans.category;
            m_trans.category_id = trans.category_id;
            m_trans.date_time = trans.date;
            m_trans.label = trans.name;
            this.transactions.push(m_trans);//insert into array
            let cat_found = false;
            this.categories.forEach(function(cat:m_category){//Checks for the category of the transaction. If it exists, add the amount to the category
                if (cat.label===m_trans.categories[0]){
                    cat.amount += m_trans.amount;
                    cat_found = true;
                }
            })
            if(cat_found === false){//if not, create the category
                let new_cat = new m_category();
                new_cat.amount = m_trans.amount;
                new_cat.label = m_trans.categories[0];
                this.categories.push(new_cat);
            }
            
        })
        console.log("From Class Transactions: "+inspect(this.transactions,{colors:true,depth:4}));
        console.log("From Categories: "+inspect(this.categories,{colors:true,depth:4}));
    }
        
}



