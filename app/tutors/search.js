async function searchFor({ subject, level, min, max }) {
  let query = undefined;
  if (subject && level && min && max) {
    query = {
      subject,
      level,
      min,
      max,
    };
  }
  return query;
}



export default searchFor;
