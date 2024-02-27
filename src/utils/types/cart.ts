export type Cart = {
    id: string;
    cost: {
        subtotalAmount: {
            amount: string;
            currencyCode: string;
        };
    };
    checkoutUrl: string;
    totalQuantity: number | null;
    lines: {
        nodes: Node[];
    };
    isServer: boolean;
};

export type Node = {
    id: string;
    cost: {
        subtotalAmount: {
            amount: string;
            currencyCode: string;
        };
    };
    quantity: number;
    imageUrl: string;
    title: string;
};

export type ShoppingSession = {
    id: number;
    user_id: string;
    session_id: string;
    sub_total: number;
    total_quantity: number;
    created_at: string;
    modified_at: string | null;
};

export type NodeList = {
    created_at: string;
    id: number;
    modified_at: string | null;
    total_amount: number;
    quantity: number;
    user_id: string;
    item_id: number;
};

