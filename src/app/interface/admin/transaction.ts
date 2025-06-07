export interface Transaction {
    id: string;
    customer: string;
    connected_user: string;
    amount: number;
    fee: number;
    application_fee_amount: number;
    application_fee_percentage: string;
    net: number;
    currency: string;
    created: string;
    id_account: string;
}
