"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class v_transaction_table {
    constructor() {
    }
    build_transaction_table(categories, transactions) {
        let built_html = "";
        categories.forEach(category => {
            "<tr id=\"row-" + category.label + "\"><td>" + category.label + "</td><td>" + category.amount.toString() + "</td><td></td></tr>";
        });
        return built_html;
    }
}
exports.v_transaction_table = v_transaction_table;
//# sourceMappingURL=v_transaction_table.js.map