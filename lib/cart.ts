if (existingItemIndex > -1) {
    const existingItem = cart.items[existingItemIndex]
    if (existingItem) {
      existingItem.quantity += quantity
    }
  } else {