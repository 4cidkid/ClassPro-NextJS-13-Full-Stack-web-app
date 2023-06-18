
//function to search for tutors with given params
export async function searchFor({ subject, level, min, max }) {
  const response = await fetch(
    `http://localhost:3000/api/tutors?subject=${subject}&level=${level}&min=${min}&max=${max}`
  );
  const data = await response.json();
  if(!data.response.length){
    return false
  }else{
    return data;
  }
}
//search any tutor, without any params
export async function searchAny() {
  const response = await fetch(`http://localhost:3000/api/tutors`);
  const data = await response.json();
  return data;
}

