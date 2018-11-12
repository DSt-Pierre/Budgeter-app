//Interfaces automatically generated from the json response from an actual plaid api query
//Generated using this site: https://jvilk.com/MakeTypes/`

export interface plaid_api_response {
    error?: Error | null;
    transactions?: Transactions | null;
  }
  export interface Transactions {
    accounts?: (AccountsEntity)[] | null;
    item: Item;
    request_id: string;
    total_transactions: number;
    transactions?: (TransactionsEntity)[] | null;
    status_code: number;
  }
  export interface AccountsEntity {
    account_id: string;
    balances: Balances;
    mask: string;
    name: string;
    official_name: string;
    subtype: string;
    type: string;
  }
  export interface Balances {
    available?: number | null;
    current: number;
    iso_currency_code: string;
    limit?: number | null;
    unofficial_currency_code?: null;
  }
  export interface Item {
    available_products?: (string)[] | null;
    billed_products?: (string)[] | null;
    error?: null;
    institution_id: string;
    item_id: string;
    webhook: string;
  }
  export interface TransactionsEntity {
    account_id: string;
    account_owner?: null;
    amount: number;
    category?: (string)[] | null;
    category_id: string;
    date: string;
    iso_currency_code: string;
    location: Location;
    name: string;
    payment_meta: PaymentMeta;
    pending: boolean;
    pending_transaction_id?: null;
    transaction_id: string;
    transaction_type: string;
    unofficial_currency_code?: null;
  }
  export interface Location {
    address?: null;
    city?: null;
    lat?: null;
    lon?: null;
    state?: null;
    store_number?: string | null;
    zip?: null;
  }
  export interface PaymentMeta {
    by_order_of?: null;
    payee?: null;
    payer?: null;
    payment_method?: string | null;
    payment_processor?: null;
    ppd_id?: null;
    reason?: null;
    reference_number?: null;
  }
  export interface Error {
    display_message?: null;
    error_code: string;
    error_message: string;
    error_type: string;
    request_id: string;
    status_code: number;
  }
  
  