import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body = () => {
  const [restaurantList, setRestaurantList] = useState([]); // copy of all the restaurant
  const [filteredRestaurant, setFilteredRestaurant] = useState([]); // filtered data
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6304203&lng=77.21772159999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();
    console.log(json.data);

    setRestaurantList(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants // updating filtered restaurant~
    );
  };

  //conditional rendering

  return restaurantList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        {/* Search bar */}
        <div className="search">
          <input
            type="text"
            className="search-box"
            placeholder="Type here....."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              //filter restaurant carts and update UI
              // searchText
              const filteredRestaurant = restaurantList.filter((restaurant) =>
                restaurant?.info?.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = restaurantList.filter(
              (restaurant) => restaurant?.info?.avgRating > 4
            );
            setRestaurantList(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="reataurant-container">
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant?.info?.id}
            to={"/restaurant/" + restaurant?.info?.id}
          >
            {" "}
            <RestaurantCard
              id={restaurant?.info?.id}
              cloudinaryImageId={restaurant?.info?.cloudinaryImageId}
              name={restaurant?.info?.name}
              avgRating={restaurant?.info?.avgRating}
              cuisines={restaurant?.info?.cuisines}
              costForTwo={restaurant?.info?.costForTwo}
              deliveryTime={restaurant?.info?.sla.deliveryTime}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
