import { Client,ClientOptions } from 'plaid';

export class m_client{
    private app_port :number;
    private client_id :string;
    private secret :string;//Change if we switch to development environment
    private public_key:string;
    private env :string;//Environment. Options: sandbox,development,production
    //private services:ClientOptions;//String list, comma-divided, used when initializing the connection with plaid, this parameter will determine what operations are allowed using the access_key
    private access_token:string;
    private public_token:string;
    private item_id:string;
    private plaid_client : Client;
    constructor(){
        this.app_port = 8000;
        this.client_id = '5bdce0ecca639100112a5014';
        this.secret = '29a8b3c0aa0ab0e0001dfb9c2cc7dc';
        this.public_key = 'fed36afd6f314f3cd45aabb90e8420';
        this.env = 'sandbox';
        //this.services.version = '2018-05-22';
        this.access_token='';
        this.public_token= '';
        this.item_id = '';
    }
    initialize_client(temp_client : Client){
        this.plaid_client = temp_client
    }
    get_transactions(){
        
    }
}