import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { useAuth } from "../context/AuthContext";

function useBookingCart() {
  const { currentUser } = useAuth();

  const userKey = currentUser?.id || "guest";
  const cartStorageKey = `wanderlahBookingCart_${userKey}`;
  const historyStorageKey = `wanderlahBookingHistory_${userKey}`;

  // -----------------------------
  // CART
  // -----------------------------
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(cartStorageKey);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // -----------------------------
  // BOOKING HISTORY
  // -----------------------------
  const [bookingHistory, setBookingHistory] = useState(() => {
    try {
      const savedBookings = localStorage.getItem(historyStorageKey);

      if (savedBookings) {
        return JSON.parse(savedBookings).filter(
          (booking) => booking.status !== "Cancelled"
        );
      }

      // Keep old confirmed bookings from the previous version of the app.
      // Cancelled bookings are intentionally removed.
      if (currentUser) {
        const oldBookings = localStorage.getItem("bookingHistory");

        if (oldBookings) {
          const confirmedBookings = JSON.parse(oldBookings).filter(
            (booking) => booking.status !== "Cancelled"
          );

          localStorage.removeItem("bookingHistory");
          return confirmedBookings;
        }
      }

      return [];
    } catch {
      return [];
    }
  });

  // -----------------------------
  // SELECTED PACKAGE
  // -----------------------------
  const [selectedPackage, setSelectedPackage] = useState(null);

  // -----------------------------
  // TRAVEL DATES
  // -----------------------------
  const [travelDates, setTravelDates] = useState({
    startDate: "",
    endDate: ""
  });

  // -----------------------------
  // TRAVELER DETAILS
  // -----------------------------
  const [travelerDetails, setTravelerDetails] = useState({
    name: currentUser?.username || "",
    email: currentUser?.email || "",
    phone: ""
  });

  // -----------------------------
  // BOOKING INFORMATION
  // -----------------------------
  const [bookingInfo, setBookingInfo] = useState(null);

  // Save cart for the current user.
  useEffect(() => {
    localStorage.setItem(
      cartStorageKey,
      JSON.stringify(cartItems)
    );
  }, [cartItems, cartStorageKey]);

  // Save booking history for the current user.
  useEffect(() => {
    localStorage.setItem(
      historyStorageKey,
      JSON.stringify(bookingHistory)
    );
  }, [bookingHistory, historyStorageKey]);

  // =================================================
  // SELECT PACKAGE
  // =================================================
  const selectPackage = useCallback((packageData) => {
    setSelectedPackage(packageData);
  }, []);

  // =================================================
  // ADD TO CART
  // =================================================
  const addToCart = useCallback(
    (packageData, numberOfTravelers = 1) => {
      const count = Math.max(
        1,
        Number(numberOfTravelers) || 1
      );

      setSelectedPackage(packageData);

      setCartItems((currentItems) => {
        const alreadyExists = currentItems.some(
          (item) => item.id === packageData.id
        );

        if (alreadyExists) {
          return currentItems.map((item) => {
            if (item.id === packageData.id) {
              return {
                ...item,
                travelers: count,
                total: item.price * count
              };
            }

            return item;
          });
        }

        return [
          ...currentItems,
          {
            ...packageData,
            travelers: count,
            total: packageData.price * count
          }
        ];
      });
    },
    []
  );

  // =================================================
  // REMOVE PACKAGE
  // =================================================
  const removeFromCart = useCallback((packageId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== packageId)
    );

    setSelectedPackage((currentPackage) => {
      if (currentPackage?.id === packageId) {
        return null;
      }

      return currentPackage;
    });
  }, []);

  // =================================================
  // UPDATE TRAVELERS
  // =================================================
  const updateTravelers = useCallback(
    (packageId, number) => {
      const count = Math.max(
        1,
        Number(number) || 1
      );

      setCartItems((currentItems) =>
        currentItems.map((item) => {
          if (item.id === packageId) {
            return {
              ...item,
              travelers: count,
              total: item.price * count
            };
          }

          return item;
        })
      );
    },
    []
  );

  // =================================================
  // UPDATE TRAVEL DATES
  // =================================================
  const updateTravelDates = useCallback(
    (startDate) => {
      if (!startDate) {
        setTravelDates({
          startDate: "",
          endDate: ""
        });
        return;
      }

      const longestDuration = cartItems.reduce(
        (max, item) =>
          Math.max(max, Number(item.duration) || 0),
        0
      );

      const start = new Date(startDate);
      const end = new Date(start);

      end.setDate(
        end.getDate() + longestDuration
      );

      const formattedEndDate =
        end.toISOString().split("T")[0];

      setTravelDates({
        startDate,
        endDate: formattedEndDate
      });
    },
    [cartItems]
  );

  // =================================================
  // CLEAR CART
  // =================================================
  const clearCart = useCallback(() => {
    setCartItems([]);
    setSelectedPackage(null);
  }, []);

  // =================================================
  // TRIP DURATION
  // =================================================
  const tripDuration = useMemo(() => {
    if (!travelDates.startDate || !travelDates.endDate) {
      return 0;
    }

    const start = new Date(travelDates.startDate);
    const end = new Date(travelDates.endDate);
    const difference = end - start;

    return Math.max(
      0,
      Math.ceil(
        difference / (1000 * 60 * 60 * 24)
      )
    );
  }, [travelDates]);

  // =================================================
  // NUMBER OF TRAVELERS
  // =================================================
  const travelerCount = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total + Number(item.travelers || 1),
      0
    );
  }, [cartItems]);

  // =================================================
  // TOTAL PACKAGE COST
  // =================================================
  const packageCost = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total + Number(item.total || 0),
      0
    );
  }, [cartItems]);

  // =================================================
  // DISCOUNT
  // =================================================
  const discount = useMemo(() => {
    if (packageCost >= 50000) {
      return packageCost * 0.10;
    }

    if (packageCost >= 30000) {
      return packageCost * 0.05;
    }

    return 0;
  }, [packageCost]);

  // =================================================
  // TAX
  // =================================================
  const taxes = useMemo(() => {
    const amountAfterDiscount =
      packageCost - discount;

    return amountAfterDiscount * 0.05;
  }, [packageCost, discount]);

  // =================================================
  // FINAL AMOUNT
  // =================================================
  const finalAmount = useMemo(() => {
    return packageCost - discount + taxes;
  }, [packageCost, discount, taxes]);

  // =================================================
  // CANCEL BOOKING
  // =================================================
  const cancelBooking = useCallback((bookingId) => {
    setBookingHistory((currentHistory) =>
      currentHistory.filter(
        (booking) => booking.id !== bookingId
      )
    );

    alert("Booking removed successfully.");
  }, []);

  // =================================================
  // CONFIRM BOOKING
  // =================================================
  const confirmBooking = useCallback(() => {
    if (!currentUser) {
      alert("Please login before confirming your booking.");
      return false;
    }

    if (cartItems.length === 0) {
      alert("Please add a package to continue.");
      return false;
    }

    if (!travelDates.startDate || !travelDates.endDate) {
      alert("Please select travel dates.");
      return false;
    }

    if (
      !travelerDetails.name ||
      !travelerDetails.email ||
      !travelerDetails.phone
    ) {
      alert("Please fill all traveler details.");
      return false;
    }

    const booking = {
      id: Date.now(),
      userId: currentUser.id,
      username: currentUser.username,
      packages: cartItems,
      travelDates,
      travelerDetails,
      tripDuration,
      travelerCount,
      packageCost,
      discount,
      taxes,
      finalAmount,
      status: "Confirmed"
    };

    setBookingHistory((currentHistory) => [
      ...currentHistory,
      booking
    ]);

    setBookingInfo(booking);
    setCartItems([]);
    setSelectedPackage(null);

    alert("Booking Confirmed Successfully!");

    return true;
  }, [
    currentUser,
    cartItems,
    travelDates,
    travelerDetails,
    tripDuration,
    travelerCount,
    packageCost,
    discount,
    taxes,
    finalAmount
  ]);

  return {
    cartItems,
    bookingHistory,
    selectedPackage,
    setSelectedPackage,
    travelDates,
    travelerDetails,
    setTravelerDetails,
    bookingInfo,
    selectPackage,
    addToCart,
    removeFromCart,
    updateTravelers,
    updateTravelDates,
    clearCart,
    confirmBooking,
    cancelBooking,
    tripDuration,
    travelerCount,
    packageCost,
    discount,
    taxes,
    finalAmount
  };
}

export default useBookingCart;
