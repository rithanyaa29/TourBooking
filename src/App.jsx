import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Packages from "./components/Packages";
import PackageDetail from "./components/PackageDetail";
import BookingCart from "./components/BookingCart";
import Checkout from "./components/Checkout";
import TravelerForm from "./components/TravelerForm";
import BookingLayout from "./components/BookingLayout";
import BookingDates from "./components/BookingDates";
import BookingSummary from "./components/BookingSummary";
import BookingPayment from "./components/BookingPayment";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";

import "./App.css";

function Protected({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

function AppContent() {
  const { currentUser } = useAuth();

  return (
    <BookingProvider key={currentUser?.id || "guest"}>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/package/:id" element={<PackageDetail />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }/>
        <Route
          path="/cart"
          element={
            <Protected>
              <BookingCart />
            </Protected>
          }/>
        <Route
          path="/bookings"
          element={
            <Protected>
              <BookingCart />
            </Protected>
          }/>
        <Route
          path="/checkout"
          element={
            <Protected>
              <Checkout />
            </Protected>}/>
        <Route
          path="/booking"
          element={
            <Protected>
              <BookingLayout />
            </Protected>
          }
        >
          <Route
            index
            element={<Navigate to="/booking/dates" replace />}/>
          <Route path="dates" element={<BookingDates />} />
          <Route path="travelers" element={<TravelerForm />} />
          <Route path="summary" element={<BookingSummary />} />
          <Route path="payment" element={<BookingPayment />} />
        </Route>
        <Route
          path="/traveler"
          element={<Navigate to="/booking/travelers" replace />}/>

        <Route
          path="*"
          element={<Navigate to="/" replace />}/>
      </Routes>

      <Footer />
    </BookingProvider>
  );
}

function App() {
  return (
    <ErrorBoundary>
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
     </ErrorBoundary>
  );
}

export default App;
