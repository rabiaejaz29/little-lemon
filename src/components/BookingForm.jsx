import { useState } from "react";

const MIN_GUESTS = 1;
const MAX_GUESTS = 10;


const getToday = () => {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
};

function BookingForm({ availableTimes, dispatch, submitForm }) {
  const today = getToday();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("1");
  const [occasion, setOccasion] = useState("Birthday");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const found = {};
    if (!date) found.date = "Please choose a date.";
    else if (date < today) found.date = "The date cannot be in the past.";

    if (!time) found.time = "Please choose a time.";

    const count = Number(guests);
    if (guests === "" || !Number.isInteger(count)) {
      found.guests = "Please enter a whole number of guests.";
    } else if (count < MIN_GUESTS || count > MAX_GUESTS) {
      found.guests = `Guests must be between ${MIN_GUESTS} and ${MAX_GUESTS}.`;
    }
    return found;
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setDate(value);
    setTime("");
    if (value) dispatch({ type: "UPDATE_TIMES", date: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length === 0) {
      submitForm({ date, time, guests: Number(guests), occasion });
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Table reservation form" noValidate>
      <label htmlFor="res-date">Choose date</label>
      <input
        id="res-date"
        type="date"
        min={today}
        value={date}
        onChange={handleDateChange}
        required
        aria-required="true"
        aria-invalid={Boolean(errors.date)}
        aria-describedby={errors.date ? "date-error" : undefined}
      />
      {errors.date && <p id="date-error" className="error" role="alert">{errors.date}</p>}

      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
        aria-required="true"
        aria-invalid={Boolean(errors.time)}
        aria-describedby={errors.time ? "time-error" : undefined}
      >
        <option value="">Select a time</option>
        {availableTimes.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      {availableTimes.length === 0 && (
        <p className="hint">No tables left on this date. Please try another day.</p>
      )}
      {errors.time && <p id="time-error" className="error" role="alert">{errors.time}</p>}

      <label htmlFor="guests">Number of guests</label>
      <input
        id="guests"
        type="number"
        min={MIN_GUESTS}
        max={MAX_GUESTS}
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
        required
        aria-required="true"
        aria-invalid={Boolean(errors.guests)}
        aria-describedby={errors.guests ? "guests-error" : undefined}
      />
      {errors.guests && <p id="guests-error" className="error" role="alert">{errors.guests}</p>}

      <label htmlFor="occasion">Occasion</label>
      <select id="occasion" value={occasion} onChange={(e) => setOccasion(e.target.value)}>
        <option>Birthday</option>
        <option>Anniversary</option>
        <option>Other</option>
      </select>

      <button type="submit" className="button" aria-label="Make your reservation">
        Make your reservation
      </button>
    </form>
  );
}

export default BookingForm;
