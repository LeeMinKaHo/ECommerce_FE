export const validationMessages = {
   email: {
      required: "Please enter your email",
      invalid: "Please provide a valid email address",
   },
   password: {
      required: "Please enter your password",
      min: "Password must be at least 6 characters",
      confirm: "Passwords do not match",
   },
   name: {
      required: "Please enter your name",
      min: "Name must be at least 2 characters",
   },
};
export const MESSAGES = {
  AUTH: {
    NOT_LOGGED_IN: "You need to log in to use this feature.",
    LOGIN_REQUIRED: "Please log in to continue.",
    LOGIN_FAILED: "Login failed. Please try again.",
  },
  CART: {
    ADD_SUCCESS: "Product added to cart successfully!",
    ADD_ERROR: "An error occurred while adding the product to the cart.",
    INVALID_PRODUCT: "Invalid product.",
    COLOR_REQUIRED: "Please select a color before adding to the cart.",
    SIZE_REQUIRED: "Please select a size before adding to the cart.",
  },
  COMMON: {
    UNKNOWN_ERROR: "An unexpected error occurred. Please try again later.",
  },
  CHECKOUT : {
    SUCCESS: "Order placed successfully!"
  }
};
