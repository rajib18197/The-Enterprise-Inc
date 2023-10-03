import { useState } from "react";

export default function Form({
  description,
  onSetDescription,
  quantity,
  onSetQuantity,
  onAddItems,
  items,
  onSetItems,
}) {
  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;
    const isEditItem = items.find((item) => item.isEditing);
    if (isEditItem) {
      onSetItems((items) =>
        items.map((item) => {
          if (item.isEditing) {
            return {
              ...item,
              description: description,
              quantity: quantity,
              isEditing: false,
            };
          }

          return { ...item };
        })
      );

      onSetDescription("");
      onSetQuantity("");
      return;
    }
    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => onSetQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => onSetDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
