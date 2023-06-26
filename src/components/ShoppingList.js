import React, { useEffect, useState } from "react";

function ShoppingList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://api.example.com/shopping-items")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => {
        console.error("Error fetching shopping items:", error);
      });
  }, []);

  const handleAddItem = (name, category) => {
    const newItem = {
      id: Date.now(),
      name,
      category,
      isInCart: false,
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleToggleCart = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, isInCart: !item.isInCart } : item
      )
    );
  };

  const handleDeleteItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <div>
      <h1>Shopping List</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.category}
            <button onClick={() => handleToggleCart(item.id)}>
              {item.isInCart ? "Remove From Cart" : "Add to Cart"}
            </button>
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add Item</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const name = e.target.elements.name.value;
          const category = e.target.elements.category.value;
          handleAddItem(name, category);
          e.target.reset();
        }}
      >
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" />
        <label htmlFor="category">Category:</label>
        <input type="text" id="category" />
        <button type="submit">Add to List</button>
      </form>
    </div>
  );
}

export default ShoppingList;
