import React from 'react'



const SectionHome = ({id, children}) => (
    <section id={id} className='bg-second pb-24'>
    {children}
    </section>
)

export default SectionHome;