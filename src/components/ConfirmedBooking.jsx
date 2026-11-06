import { Link, useLocation } from "react-router-dom";

function ConfirmedBooking() {
  const { state } = useLocation(); // booking details sent from BookingPage

  return (
    <section className="booking" aria-labelledby="confirmed-title">
      <h1 id="confirmed-title">Booking confirmed</h1>
      {state ? (
        <p>
          Your table for {state.guests} on {state.date} at {state.time} is
          booked ({state.occasion}). See you soon!
        </p>
      ) : (
        <p>Your booking is confirmed. See you soon!</p>
      )}
      <Link className="button" to="/">Back to home</Link>
    </section>
  );
}

export default ConfirmedBooking;
