import {m_transaction} from './../model/m_transaction';
import {m_category} from './../model/m_category';

export class v_transaction_table{
    constructor(){
    }
    build_transaction_table(categories:(m_category)[],transactions:(m_transaction)[]){
        let built_html:string="";
        //built_html = "<table>";\\We'll use a table tag already in the document
        categories.forEach(category => {
            "<tr id=\"row-"+category.label+"\"><td>"+category.label+"</td><td>"+category.amount.toString()+"</td><td></td></tr>";
        });

        return built_html;
    }
}