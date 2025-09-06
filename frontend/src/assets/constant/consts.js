const categoriesList = [
  "T-Shirts",
  "Shirts",
  "Jeans",
  "Trousers",
  "Shorts",
  "Jackets",
  "Coats",
  "Sweaters",
  "Hoodies",
  "Dresses",
  "Skirts",
  "Suits",
  "Underwear",
  "Socks",
  "Accessories",
  "Shoes",
  "Hats",
  "Scarves",
  "Gloves",
];

const sortingOptions = [
  "Price: Low to High",
  "Price: High to Low",
  "Newest Arrivals",
  "Oldest",
  "Alphabetical: A to Z",
  "Alphabetical: Z to A",
];
const actions = { reply: "↩", read: "✔️", archive: "🗃️", delete: "🗑️" };
module.exports = { sortingOptions, categoriesList, actions };
