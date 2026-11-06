// Mock booking API (same behaviour as the course API).
// It gives the same "random" times for the same day of the month.

const seededRandom = (seed) => {
  const m = 2 ** 35 - 31;
  const a = 185852;
  let s = seed % m;
  return () => (s = (s * a) % m) / m;
};

// Returns the available times for a given Date object, e.g. ["17:00", "18:30"].
export function fetchAPI(date) {
  const result = [];
  const random = seededRandom(date.getDate());
  for (let hour = 17; hour <= 23; hour++) {
    if (random() < 0.5) result.push(`${hour}:00`);
    if (random() < 0.5) result.push(`${hour}:30`);
  }
  return result;
}

// Pretends to save the booking. Returns true when it "worked".
export function submitAPI(formData) {
  return Boolean(formData);
}
