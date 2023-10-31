import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({
  cloudinaryImageId,
  name,
  cuisines,
  avgRating,
  costForTwo,
  deliveryTime,
}) => {
  return (
    <div className="restaurant-card" style={{ backgroundColor: "#f0f0f0" }}>
      <img className="res-logo" src={CDN_URL + cloudinaryImageId} alt="logo" />
      <h3>{name}</h3>
      <h4>{cuisines.join(",")}</h4>
      <h4>{avgRating} Stars</h4>
      <h4> Rs {costForTwo}/-</h4>
      <h4>{deliveryTime} mins</h4>
    </div>
  ); // converting the costForTwo in inr
};
export default RestaurantCard;
