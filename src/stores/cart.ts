import type { z } from "zod";
import { atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";
import { v4 as uuidv4 } from "uuid";
// import {
//   getCart,
//   addCartLines,
//   createCart,
//   removeCartLines,
// } from "../utils/shopify";
import type { CartResult } from "../utils/schemas";

// Cart drawer state (open or closed) with initial value (false) and no persistent state (local storage)
export const isCartDrawerOpen = atom(false);

// Cart is updating state (true or false) with initial value (false) and no persistent state (local storage)
export const isCartUpdating = atom(false);

const emptyCart = {
  id: "",
  checkoutUrl: "",
  totalQuantity: 0,
  lines: { nodes: [] },
  cost: { subtotalAmount: { amount: "", currencyCode: "" } },
};

const Url = "https://localhost:4321/shop/";

// Cart store with persistent state (local storage) and initial value
export const cart = persistentAtom<z.infer<typeof CartResult>>(
  "cart",
  emptyCart,
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

// Fetch cart data if a cart exists in local storage, this is called during session start only
// This is useful to validate if the cart still exists in Shopify and if it's not empty
// Shopify automatically deletes the cart when the customer completes the checkout or if the cart is unused or abandoned after 10 days
// https://shopify.dev/custom-storefronts/cart#considerations
export async function initCart() {
  const sessionStarted = sessionStorage.getItem("sessionStarted");
  if (!sessionStarted) {
    sessionStorage.setItem("sessionStarted", "true");
    const localCart = cart.get();
    const cartId = localCart?.id ? localCart.id : null;
    const isUserLoggingIn = false; //placeholder
    if (cartId) {
      // const data = await getCart(cartId);
      // if (data) {
      //   cart.set({
      //     id: data.id,
      //     cost: data.cost,
      //     checkoutUrl: data.checkoutUrl,
      //     totalQuantity: data.totalQuantity,
      //     lines: data.lines,
      //   });
      // } else {
        // If the cart doesn't exist in Shopify, reset the cart store
        cart.set(emptyCart);
      // }
    }
  }
}

// Add item to cart or create a new cart if it doesn't exist yet
// export async function addCartItem(item: { id: string; quantity: number, price: number}) {
//   const localCart = cart.get();
//   const cartId = localCart?.id;
//   const isUserLoggingIn = false; //placeholder

//   isCartUpdating.set(true);

//   if (!cartId) {
//     // const cartData = await createCart(item.id, item.quantity);
//     if(isUserLoggingIn) {
//       // to do
//     } else {
//       const cartGeneratedId = "1234567890";
//       // const cartGeneratedId = uuidv4();
//       cart.set({
//         ...cart.get(),
//         id: cartGeneratedId,
//         cost: { subtotalAmount: { amount: item.price, currencyCode: "USD" } },
//         checkoutUrl: Url + cartGeneratedId,
//         totalQuantity: item.quantity,
//         lines: {
//           nodes: [
//             {
//               id: item.id,
//               cost: {
//                 subTotalAmount: {
//                   cost: item.price * item.quantity,
//                   currencyCode: "USD",
//                 },
//               },
//               quantity: item.quantity,
//             },
//           ],
//         },
//       });
//       isCartUpdating.set(false);
//       isCartDrawerOpen.set(true);
      
//     }
//   } else {
//     // const cartData = await addCartLines(cartId, item.id, item.quantity);
//     if(isUserLoggingIn) {
//       // to do
//     } else {
//       // to do
//       // cart.set({
//       //   ...cart.get(),
//       //   id: cartId,
//       //   cost: cartData.cost,
//       //   checkoutUrl: cartData.checkoutUrl,
//       //   totalQuantity: cartData.totalQuantity,
//       //   lines: cartData.lines,
//       // });
//       // isCartUpdating.set(false);
//       // isCartDrawerOpen.set(true);
//     }
//   }
// }

export async function addCartItemOffline(item: { id: string; quantity: number, price: number, imageUrl: string, title: string}) {
  isCartUpdating.set(true);

  const localCart = cart.get();
  const cartId = localCart?.id || uuidv4(); // Replace with uuidv4() for unique id
  const existingQuantity = getExistingQuantity(localCart, item);
  const newQuantity = existingQuantity + item.quantity;
  const nodes = updateNodes(localCart, item, newQuantity);
  const subtotalAmount = addSubtotalAmount(localCart, item);
  const totalQuantity = addTotalQuantity(localCart, item);

  cart.set({
    ...localCart,
    id: cartId,
    cost: {
      subtotalAmount: {
        amount: subtotalAmount,
        currencyCode: "USD",
      },
    },
    checkoutUrl: Url + cartId,
    totalQuantity: totalQuantity,
    lines: {
      nodes: nodes,
    },
  });

  isCartUpdating.set(false);
  isCartDrawerOpen.set(true);
}

export async function removeCartItems(lineIds: string[]) {
  const localCart = cart.get();
  const cartId = localCart?.id;

  isCartUpdating.set(true);

  if (cartId) {
    // const cartData = await removeCartLines(cartId, lineIds);

    // if (cartData) {
    //   cart.set({
    //     ...cart.get(),
    //     id: cartData.id,
    //     cost: cartData.cost,
    //     checkoutUrl: cartData.checkoutUrl,
    //     totalQuantity: cartData.totalQuantity,
    //     lines: cartData.lines,
    //   });
    //   isCartUpdating.set(false);
    // }
  }
}

export async function removeCartItemsOffline(lineId: string) {
  const localCart = cart.get();

  isCartUpdating.set(true);

  if (localCart) {
    // Filter out the item with the given id
    const item = localCart.lines.nodes.find((item: { id: string; }) => item.id === lineId);
    const newNodes = localCart.lines.nodes.filter((item: { id: string; }) => item.id !== lineId);
    const subtotalAmount = subtractSubtotalAmount(localCart, item);
    const totalQuantity = subtractTotalQuantity(localCart, item);
    // Update the cart
    cart.set({
      ...localCart,
      cost: {
        subtotalAmount: {
          amount: subtotalAmount,
          currencyCode: "USD",
        },
      },
      totalQuantity: totalQuantity,
      lines: {
        nodes: newNodes,
      },
      
    });

    isCartUpdating.set(false);
  }
}

function getExistingQuantity(localCart: any, item: any) {
  return localCart?.lines.nodes.find((node: { id: string; }) => node.id === item.id)?.quantity || 0;
}

function updateNodes(localCart: any, item: any, newQuantity: number) {
  let nodes = localCart?.lines.nodes || [];
  const index = nodes.findIndex((node: { id: string; }) => node.id === item.id);

  if(index !== -1) {
    nodes = [
      ...nodes.slice(0, index), // Elements before the target index
      createNode(item, newQuantity),
      ...nodes.slice(index + 1), // Elements after the target index
    ];
  } else {
    nodes = [...nodes, createNode(item, item.quantity)];
  }

  return nodes;
}

function createNode(item: any, quantity: number) {
  return {
    id: item.id,
    cost: {
      subtotalAmount: {
        amount: (item.price * quantity).toString(),
        currencyCode: "USD",
      },
    },
    quantity: quantity,
    imageUrl: item.imageUrl,
    title: item.title,
  };
}

function addSubtotalAmount(localCart: any, item: any) {
  return localCart?.cost.subtotalAmount.amount
    ? (
        parseInt(localCart?.cost.subtotalAmount.amount) +
        item.price * item.quantity
      ).toString()
    : (item.price * item.quantity).toString();
}

function subtractSubtotalAmount(localCart: any, item: any) {
  return (parseInt(localCart?.cost.subtotalAmount.amount) - item.cost.subtotalAmount.amount).toString();
}

function addTotalQuantity(localCart: any, item: any) {
  return localCart?.totalQuantity
    ? localCart?.totalQuantity + item.quantity
    : item.quantity;
}

function subtractTotalQuantity(localCart: any, item: any) {
  return (localCart?.totalQuantity - item.quantity);
}
