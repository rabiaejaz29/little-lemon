import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import BookingForm from "./BookingForm";
import { fetchAPI, submitAPI } from "../api";

// First list of times: today's date.
export const initializeTimes = () => fetchAPI(new Date());

// Reducer: when the date changes, load the times for the new date.
export const updateTimes = (state, action) => {
  if (action.type === "UPDATE_TIMES") {
    // "T00:00:00" makes the date local, not UTC
    return fetchAPI(new Date(`${action.date}T00:00:00`));
  }
  return state;
};

function BookingPage() {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
  const navigate = useNavigate();

  const submitForm = (formData) => {
    if (submitAPI(formData)) {
      navigate("/confirmed", { state: formData });
    }
  };

  return (
    <section className="booking" aria-labelledby="booking-title">
      <h1 id="booking-title">Reserve a table</h1>
      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        submitForm={submitForm}
      />
    </section>
  );
}

export default BookingPage;
