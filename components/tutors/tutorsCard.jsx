import React from "react";

const TutorsCards = (props) => {
  return (
    <div className="bg-white relative w-full h-[250px] rounded-xl relative border-[1px] border-blackNot shadow-lg">
      <div className="absolute top-0 w-full h-[35%] bg-main rounded-tl-xl rounded-tr-xl z-[1]"></div>
      <div id="content" className="w-full h-full relative z-[2] flex gap-5">
        <div className="w-[200px] h-[200px] self-center rounded-xl pl-5">
          <img
            className="h-full w-full object-cover rounded-xl"
            src="https://images.pexels.com/photos/16786066/pexels-photo-16786066/free-photo-of-moda-hombre-gente-mujer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          ></img>
        </div>
        <div className="flex h-[30%] flex flex-col justify-end">
          <div className="flex w-full items-center gap-2">
            <p className="text-white font-bold text-2xl flex items-center gap-3">
              {props.tutor.tutor_name} {props.tutor.tutor_lastname}{" "}
            </p>
            <img
              className="h-[20px] w-[30px]"
              src={`/countriesFlags/${props.tutor.iso.toLowerCase()}.png`}
            ></img>
          </div>
          <div>
            <p className="font-semibold text-white flex">{props.tutor.tutor_description}&nbsp;|&nbsp;<strong>Skills: &nbsp;</strong> <strong className="font-light">{props.tutor.tutor_skills.map((skill,i) => {
              if(i!= props.tutor.tutor_skills.length-1){
                return `${skill} - `
              }else{
                return `${skill}`
              }
            })}</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorsCards;
