import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import React from "react";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const [resItems, setResItems] = useState(null);

  const { resId } = useParams();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(MENU_API + resId);
    const json = await data.json();
    console.log(json.data);
    setResItems(json.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards);
    setResInfo(json.data?.cards[0]?.card?.card?.info);
  };

  console.log(resInfo, resItems);
  if (resInfo === null) return <Shimmer />; // couldn't use optional because by default resInfo is set to null so couldn't fetch data in null

  //Shimmer UI
  return (
    <div>
      <h1>{resInfo?.name}</h1>
      <p>{resInfo?.cuisines.join(",")}</p>
      <h3>{resInfo?.costForTwoMessage}</h3>
      <h2>Menu</h2>
      <ul>
        {resItems.map(
          (item) => (
            console.log(resItems),
            (<li key={item?.card?.info?.id}>{item?.card?.card?.title}</li>)
          )
        )}
      </ul>{" "}
    </div>
  );
};

export default RestaurantMenu;
