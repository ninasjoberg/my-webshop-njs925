export function saveItemToLocalStorage(product, listName) {
    let cartArray = getItemListFromLocalStorage(listName)
    if (cartArray) {
        cartArray.push(product)
    }
    localStorage.setItem(listName, JSON.stringify(cartArray));
}

export function updateItemListToLocalStorage(productList, listName) {
    let cartArray = getItemListFromLocalStorage(listName)
    cartArray = productList
    localStorage.setItem(listName, JSON.stringify(cartArray));
}

export function getItemListFromLocalStorage(listName) {
    const storedCartArray = JSON.parse(localStorage.getItem(listName));
    return storedCartArray || [];
}

