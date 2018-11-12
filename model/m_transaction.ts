export class m_transaction{
    public account_id:string;//The account the transaction belongs to
    public date_time:string;//date and time of the specific transaction
    public categories:Array<string>;//array of categories for the transaction
    public category_id:string;//id for the category
    public amount:number;//numeric:amount of the transaction
    public label:string;//label for the transaction

}