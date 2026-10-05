import { createContext, useContext } from "react";

import useBookingCart from "../hooks/useBookingCart";


const BookingContext =
  createContext(null);


export function BookingProvider({ children }) {

  const booking =
    useBookingCart();


  return (
    <BookingContext.Provider value={booking}>

      {children}

    </BookingContext.Provider>
  );

}


export function useBooking() {

  return useContext(BookingContext);

}