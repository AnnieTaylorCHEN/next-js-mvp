import React, { useState } from "react";

const Filter = ({ filterItems, selected, onItemsUpdate }) => {
  const [selectedButton, setSelectedButton] = useState(false);

  const onListItemClick = (item) => {
    const getNewArr = () => {
      if (selected.some((t) => t === item)) {
        return selected.filter((t) => t !== item);
      }
      return [...selected, item];
    };

    const newSelectedItems = getNewArr();
    onItemsUpdate(newSelectedItems);
    setSelectedButton(!selectedButton);
  };

  return (
    <div className="user-filter__container">
      {filterItems.map((item) => {
        const highlight = selected.includes(item)
          ? { backgroundColor: "LightGreen" }
          : { backgroundColor: "SeaShell" };
        return (
          <div
            type="button"
            key={item}
            value={item}
            className="user-filter__item"
            style={highlight}
            onClick={() => {
              onListItemClick(item);
            }}
          >
            {item}
          </div>
        );
      })}
      <style jsx>{`
        .user-filter__container {
          display: flex;
        }

        .user-filter__item {
          padding: 1rem;
          border-radius: 10px;
          width: 50px;
          height: 50px;
          text-align: center;
          margin: 1rem;
        }
      `}</style>
    </div>
  );
};

export default Filter;
