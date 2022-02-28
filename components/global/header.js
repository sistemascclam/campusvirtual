import React from 'react';

export default function header() {
    return (
        
       <header>
     <div className="mx-auto">
     <nav className="bg-darkblue flex justify-center lg:justify-start items-center py-4">
     <button className="buttonlogo left-20 bg-white h-14 w-14 rounded-full absolute top-1.4 left-3 py-5 " type='button'>
             <div className=" p-3 object-cover h-6 w-6 scale-100 text-white"> </div>
             <img src="../images/cclamlogotipo.png" className="img h-12 w-20 absolute top-1 px-2 py-1 left-0 " > 
             
             </img>
    </button>
         
         
          <button type="button" className="buton">
             <div className="links px-10 px-10 text-white relative left-20 ">

             <ul>
                 <li>
                     <a href="#">Categorias</a>
                 </li>            
            </ul>
             </div>
         </button>
         
         <form method="GET" className="relative left-10">
    <div className="relative text-gray-600 focus-within:text-gray-400">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
      </span>
      <input type="search" name="q" className=" px-6 px-10 px-9 px-72 w-full rounded-full  ring-5  text-white bg-white content-center pl-15 focus:outline-none focus:bg-white focus:text-gray-900 " placeholder="Buscar en campus CCLAM" autocomplete="off"/>
    </div>
  </form>

         <div className="iconos text-white right-20 h-6 w-6 right-3/4 flex justify-between lg:justify-start items-center flex space-x-8 relative left-36">
    <button type="button"className="button" >
      <svg xmlns="http://www.w3.org/2000/svg" className="icono h-7 w-7 " viewBox="0 0 20 20" fill="currentColor">    
         <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
      </svg> 
   </button>
         
    <button type="button"className="button ">
     <svg xmlns="http://www.w3.org/2000/svg" className="icono1 h-7 w-7  " viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
     </svg>
   </button>

   <button type="button" className="button ">
    <svg xmlns="http://www.w3.org/2000/svg" className="icono2 h-7 w-7  " fill="none" viewBox="0 0 24 24" stroke="currentColor">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
   </svg>
  </button>
  </div>
 
 <button type="button"className="text absolute top-5 right-10 text-white bg-purple bg-center bg-cover rounded-full h-9 w-9 font-bold"> D </button>     
     
     </nav>
     </div>

       </header>
    )
}

