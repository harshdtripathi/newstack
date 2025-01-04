import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const updateLocalStorage = (cart, total, totalItems) => {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("total", JSON.stringify(total));
  localStorage.setItem("totalItems", JSON.stringify(totalItems));
};

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const course = action.payload;
      console.log("COURSE",course.courseDetails._id);
      const index = state.cart.findIndex((item) => item._id === course?.courseDetails._id);
        console.log("Index",index);
      if (index >= 0) {
        toast.error("Course already in cart");
        return;
      }
     
        state.cart.push(course);
      state.totalItems++;
      state.total += course?.courseDetails?.price;
      console.log("TOTAL",course.courseDetails.price);

      updateLocalStorage(state.cart, state.total, state.totalItems);
      toast.success("Course added to cart");

      
      
    },
    removeFromCart: (state, action) => {
      const courseId = action.payload;
      const index = state.cart.findIndex((item) => item._id === courseId);

      if (index >= 0) {
        state.totalItems--;
        state.total -= state.cart[index].price;
        state.cart.splice(index, 1);

        updateLocalStorage(state.cart, state.total, state.totalItems);
        toast.success("Course removed from cart");
      } else {
        toast.error("Course not found in cart");
      }
    },
    resetCart: (state) => {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;

      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      localStorage.removeItem("totalItems");

      toast.success("Cart reset successfully");
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
