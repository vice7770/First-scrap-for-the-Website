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
    created_at: string;
    id: number;
    modified_at: string | null;
    sub_total: number;
    total_quantity: number;
    user_id: string;
};

export type NodeList = {
    created_at: string;
    id: number;
    modified_at: string | null;
    total_amount: number;
    quantity: number;
    user_id: string;
};

