"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const m_transaction_1 = require("../model/m_transaction");
const m_category_1 = require("../model/m_category");
class c_transactions {
    constructor() {
        this.categories = [];
    }
    insert_transactions(records) {
        let api_response = records;
        this.categories = [];
        let transaction_array;
        transaction_array = api_response.transactions;
        transaction_array.forEach((trans) => {
            let m_trans = new m_transaction_1.m_transaction();
            m_trans.account_id = trans.account_id;
            m_trans.amount = trans.amount;
            m_trans.categories = trans.category;
            m_trans.category_id = trans.category_id;
            m_trans.date_time = trans.date;
            m_trans.label = trans.name;
            let cat_found = false;
            this.categories.forEach(function (cat) {
                if (cat.label === m_trans.categories[0]) {
                    cat.amount += m_trans.amount;
                    cat.transactions.push(m_trans);
                    cat_found = true;
                }
            });
            if (cat_found === false) {
                let new_cat = new m_category_1.m_category();
                new_cat.amount = m_trans.amount;
                new_cat.label = m_trans.categories[0];
                new_cat.transactions = [];
                new_cat.transactions.push(m_trans);
                this.categories.push(new_cat);
            }
        });
    }
    get_JSON() {
        return this.categories;
    }
}
exports.c_transactions = c_transactions;
//# sourceMappingURL=c_transactions.js.map