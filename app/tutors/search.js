export async function searchFor({ subject, level, min, max }) {
  const response = await fetch(
    `http://localhost:3000/api/tutors?subject=${subject}&level=${level}&min=${min}&max=${max}`
  );
  const data = await response.json();
  return data.response;
}
export async function searchAny() {
  const response = await fetch(`http://localhost:3000/api/tutors`);
  const data = await response.json();
  return data.response;
}

