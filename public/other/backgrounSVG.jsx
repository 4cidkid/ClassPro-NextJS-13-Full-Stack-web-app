import React from "react"
const BackgroundSVG = ({classname}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={classname || ''} viewBox="0 0 1000 1000" >
    <path fill="#F60954" d="M0 0h1000v1000H0z" />
    <defs>
      <radialGradient
        id="a"
        cx={500}
        cy={500}
        r="61.2%"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#F60954" />
        <stop offset={1} stopColor="#E6084F" />
      </radialGradient>
      <radialGradient
        id="b"
        cx={500}
        cy={500}
        r="56.6%"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#F60954" />
        <stop offset={1} stopColor="#F60954" stopOpacity={0} />
      </radialGradient>
    </defs>
    <path fill="url(#a)" d="M0 0h1000v1000H0z" />
    <g fill="none" stroke="#FFF" strokeMiterlimit={10} strokeOpacity={0.17}>
      <path d="M12.5 12.5h975v975h-975z" />
      <path d="M25 25h950v950H25z" />
      <path d="M37.5 37.5h925v925h-925z" />
      <path d="M50 50h900v900H50z" />
      <path d="M62.5 62.5h875v875h-875z" />
      <path d="M75 75h850v850H75z" />
      <path d="M87.5 87.5h825v825h-825z" />
      <path d="M100 100h800v800H100z" />
      <path d="M112.5 112.5h775v775h-775z" />
      <path d="M125 125h750v750H125z" />
      <path d="M137.5 137.5h725v725h-725z" />
      <path d="M150 150h700v700H150z" />
      <path d="M162.5 162.5h675v675h-675z" />
      <path d="M175 175h650v650H175z" />
      <path d="M187.5 187.5h625v625h-625z" />
      <path d="M200 200h600v600H200z" />
      <path d="M212.5 212.5h575v575h-575z" />
      <path d="M225 225h550v550H225z" />
      <path d="M237.5 237.5h525v525h-525z" />
      <path d="M250 250h500v500H250z" />
      <path d="M262.5 262.5h475v475h-475z" />
      <path d="M275 275h450v450H275z" />
      <path d="M287.5 287.5h425v425h-425z" />
      <path d="M300 300h400v400H300z" />
      <path d="M312.5 312.5h375v375h-375z" />
      <path d="M325 325h350v350H325z" />
      <path d="M337.5 337.5h325v325h-325z" />
      <path d="M350 350h300v300H350z" />
      <path d="M362.5 362.5h275v275h-275z" />
      <path d="M375 375h250v250H375z" />
      <path d="M387.5 387.5h225v225h-225z" />
      <path d="M400 400h200v200H400z" />
      <path d="M412.5 412.5h175v175h-175z" />
      <path d="M425 425h150v150H425z" />
      <path d="M437.5 437.5h125v125h-125z" />
      <path d="M450 450h100v100H450z" />
      <path d="M462.5 462.5h75v75h-75z" />
      <path d="M475 475h50v50h-50z" />
      <path d="M487.5 487.5h25v25h-25z" />
    </g>
    <path fill="url(#b)" fillOpacity={0.17} d="M0 0h1000v1000H0z" />
  </svg>
)
export default BackgroundSVG
