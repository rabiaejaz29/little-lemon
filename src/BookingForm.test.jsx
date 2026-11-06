import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from "./components/BookingForm";
import { initializeTimes, updateTimes } from "./components/BookingPage";

const times = ["17:00", "18:00"];

const setup = (props = {}) => {
  const submitForm = vi.fn();
  const dispatch = vi.fn();
  render(
    <BookingForm availableTimes={times} dispatch={dispatch} submitForm={submitForm} {...props} />
  );
  return { submitForm, dispatch };
};

// Helper: fill the form with valid values
const fillValid = () => {
  fireEvent.change(screen.getByLabelText("Choose date"), { target: { value: "2099-01-15" } });
  fireEvent.change(screen.getByLabelText("Choose time"), { target: { value: "18:00" } });
  fireEvent.change(screen.getByLabelText("Number of guests"), { target: { value: "4" } });
};

describe("BookingForm rendering", () => {
  test("renders all form fields and the submit button", () => {
    setup();
    expect(screen.getByLabelText("Choose date")).toBeInTheDocument();
    expect(screen.getByLabelText("Choose time")).toBeInTheDocument();
    expect(screen.getByLabelText("Number of guests")).toBeInTheDocument();
    expect(screen.getByLabelText("Occasion")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /make your reservation/i })).toBeInTheDocument();
  });

  test("shows the available times in the time select", () => {
    setup();
    expect(screen.getByRole("option", { name: "17:00" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "18:00" })).toBeInTheDocument();
  });

  test("applies HTML5 validation attributes", () => {
    setup();
    expect(screen.getByLabelText("Choose date")).toBeRequired();
    expect(screen.getByLabelText("Choose date")).toHaveAttribute("min");
    expect(screen.getByLabelText("Number of guests")).toHaveAttribute("min", "1");
    expect(screen.getByLabelText("Number of guests")).toHaveAttribute("max", "10");
  });
});

describe("BookingForm validation", () => {
  test("shows errors and does not submit when the form is empty", () => {
    const { submitForm } = setup();
    fireEvent.click(screen.getByRole("button", { name: /make your reservation/i }));
    expect(screen.getByText("Please choose a date.")).toBeInTheDocument();
    expect(screen.getByText("Please choose a time.")).toBeInTheDocument();
    expect(submitForm).not.toHaveBeenCalled();
  });

  test("rejects a date in the past", () => {
    const { submitForm } = setup();
    fillValid();
    fireEvent.change(screen.getByLabelText("Choose date"), { target: { value: "2020-01-01" } });
    fireEvent.change(screen.getByLabelText("Choose time"), { target: { value: "18:00" } });
    fireEvent.click(screen.getByRole("button", { name: /make your reservation/i }));
    expect(screen.getByText("The date cannot be in the past.")).toBeInTheDocument();
    expect(submitForm).not.toHaveBeenCalled();
  });

  test("rejects 0 guests and more than 10 guests", () => {
    const { submitForm } = setup();
    fillValid();
    const guests = screen.getByLabelText("Number of guests");
    const button = screen.getByRole("button", { name: /make your reservation/i });

    fireEvent.change(guests, { target: { value: "0" } });
    fireEvent.click(button);
    expect(screen.getByText("Guests must be between 1 and 10.")).toBeInTheDocument();

    fireEvent.change(guests, { target: { value: "11" } });
    fireEvent.click(button);
    expect(screen.getByText("Guests must be between 1 and 10.")).toBeInTheDocument();
    expect(submitForm).not.toHaveBeenCalled();
  });

  test("submits the data when everything is valid", () => {
    const { submitForm } = setup();
    fillValid();
    fireEvent.click(screen.getByRole("button", { name: /make your reservation/i }));
    expect(submitForm).toHaveBeenCalledWith({
      date: "2099-01-15",
      time: "18:00",
      guests: 4,
      occasion: "Birthday",
    });
  });

  test("dispatches UPDATE_TIMES when the date changes", () => {
    const { dispatch } = setup();
    fireEvent.change(screen.getByLabelText("Choose date"), { target: { value: "2099-01-15" } });
    expect(dispatch).toHaveBeenCalledWith({ type: "UPDATE_TIMES", date: "2099-01-15" });
  });
});

describe("times reducer", () => {
  test("initializeTimes returns an array of times", () => {
    const result = initializeTimes();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  test("updateTimes returns the same state for an unknown action", () => {
    expect(updateTimes(times, { type: "OTHER" })).toEqual(times);
  });

  test("updateTimes returns times for UPDATE_TIMES", () => {
    const result = updateTimes([], { type: "UPDATE_TIMES", date: "2099-01-15" });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
});
