async function searchFor({ subject, level, min, max }) {
  let query = undefined;
  if (subject && level && min && max) {
    const data = await fetch(
      `http://localhost:3000/api/tutors?subject=${subject}&level=${level}&min=${min}&max=${max}`
      ,
    );
  }
  return query;
}

export default searchFor;
