import React, { useContext, useState } from "react";

import token from "assets/icons/token.png";

import { Box } from "components/ui/Box";
import { OuterPanel } from "components/ui/Panel";
import { Button } from "components/ui/Button";

import { Context } from "features/game/GameProvider";

import { Crop, CROPS } from "../lib/crops";

interface Props {}

export const Plants: React.FC<Props> = ({}) => {
  const [selected, setSelected] = useState<Crop>(CROPS.Sunflower);

  const { state, dispatcher } = useContext(Context);
  const inventory = state.inventory;

  const sell = () => {
    dispatcher({
      type: "item.sell",
      item: selected.name,
    });
  };

  return (
    <div className="flex">
      <div className="w-3/5 flex  flex-wrap h-fit">
        {Object.values(CROPS).map((item) => (
          <Box
            isSelected={selected.name === item.name}
            key={item.name}
            onClick={() => setSelected(item)}
            image={item.images.shop}
            count={inventory[item.name]}
          />
        ))}
      </div>
      <OuterPanel className="flex-1 w-1/3">
        <div className="flex flex-col justify-center items-center p-2 ">
          <span className="text-base text-shadow">{selected.name}</span>
          <img
            src={selected.images.shop}
            className="w-12"
            alt={selected.name}
          />
          <span className="text-xs text-shadow text-center mt-2">
            {selected.description}
          </span>

          <div className="border-t border-white w-full mt-2 pt-1">
            <div className="flex justify-center items-end">
              <img src={token} className="h-5 mr-1" />
              <span className="text-xs text-shadow text-center mt-2 ">
                {`$${selected.sellPrice}`}
              </span>
            </div>
          </div>
          <Button
            disabled={!inventory[selected.name]}
            className="text-xs mt-1"
            onClick={sell}
          >
            Sell
          </Button>
        </div>
      </OuterPanel>
    </div>
  );
};