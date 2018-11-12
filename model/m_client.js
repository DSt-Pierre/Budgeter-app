"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class m_client {
    constructor() {
        this.app_port = 8000;
        this.client_id = '5bdce0ecca639100112a5014';
        this.secret = '29a8b3c0aa0ab0e0001dfb9c2cc7dc';
        this.public_key = 'fed36afd6f314f3cd45aabb90e8420';
        this.env = 'sandbox';
        this.access_token = '';
        this.public_token = '';
        this.item_id = '';
    }
    initialize_client(temp_client) {
        this.plaid_client = temp_client;
    }
    get_transactions() {
    }
}
exports.m_client = m_client;
//# sourceMappingURL=m_client.js.map