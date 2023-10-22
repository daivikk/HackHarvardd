"use client";

import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '@/state/reducers/authSlice';
import { courseActions } from '@/state/reducers/courseSlice';
import { useRouter } from "next/navigation";
import { useEffect } from 'react';

export const Flashcard = (props) => {
    // const user = useSelector((state) => state.auth.user)
    // const courses = useSelector((state) => state.course.courses)
    // const token = useSelector((state) => state.auth.token)

    const data = props.data
  return (
    <>
            <div className='ml-60 mr-60 justify-center items-center'>
                <div className='font-biscuitReg bg-off-white shadow-lg rounded-3xl'>
                    <p className='summaryText text-3xl text-dark-gray p-52 items-center justify-center'>{data}</p>
                </div>
            </div>
    {/* ARROW BUTTONS */}
            {/* <div className='flex flex-row justify-between ml-20 mr-20 -mt-64'>
            <div className='justify-start z-10'>
                <button className="btn btn-sm w-[4rem] h-[4rem] btn-circle btn-ghost bg-blue-md rounded-full justify-center items-center flex inline-block hover:scale-105">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-dark-blue hover:scale-110 hover:cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </button>
            </div>
            <div className='justify-end z-10'>
                <button className="btn btn-sm w-[4rem] h-[4rem] btn-circle btn-ghost bg-blue-md rounded-full justify-center items-center flex inline-block hover:scale-105">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-dark-blue hover:scale-110 hover:cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </button>
            </div>
            </div> */}
    </>   
  )
}

// export function Flashcard() {
//     const user = useSelector((state) => state.auth.user)
//     const courses = useSelector((state) => state.course.courses)
//     const token = useSelector((state) => state.auth.token)

//   return (
//     <>
// <button className="btn" onClick={()=>document.getElementById('my_modal_4').showModal()}>open modal</button>
// <dialog id="my_modal_4" className="modal w-full h-full bg-off-white rounded-3xl">
//   <div className="modal-box">
// <div className='flex items-center space-x-5 font-biscuitReg mt-4'>
//         <h1 className="flex font-semibold text-dark-gray text-3xl ml-6 border-b border-light-gray">Unit 1 Quiz</h1>
//     <div className="bg-blue-md w-fit pl-3 pr-3 h-8 rounded-3xl flex items-center ">
//         <h1 className="text-md text-dark-blue">Linear Algebra</h1>
//     </div> 
//   </div>
//   <div className='ml-4 mr-4 mb-4 -mt-3'>
//   <div className='font-biscuitReg h-fit w-full bg-storm p-7 mt-7 rounded-3xl'>
//     <p className='summaryText text-lg text-justify text-dark-gray'>
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui accumsan sit amet nulla facilisi morbi. Elit pellentesque habitant morbi tristique. Bibendum at varius vel pharetra vel turpis nunc eget. Id ornare arcu odio ut sem nulla pharetra diam sit. Neque viverra justo nec ultrices dui sapien eget mi proin. Netus et malesuada fames ac turpis egestas integer eget. Lorem ipsum dolor sit amet consectetur adipiscing. Magna sit amet purus gravida quis blandit turpis cursus in. Hac habitasse platea dictumst quisque sagittis purus sit. Dignissim enim sit amet venenatis urna cursus eget nunc. In tellus integer feugiat scelerisque varius.

//         Diam vulputate ut pharetra sit. Sociis natoque penatibus et magnis. Facilisis volutpat est velit egestas. Nisi est sit amet facilisis. Et egestas quis ipsum suspendisse ultrices gravida dictum. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Quis hendrerit dolor magna eget est. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Tellus in hac habitasse platea dictumst. Adipiscing tristique risus nec feugiat in fermentum posuere. Vulputate eu scelerisque felis imperdiet proin fermentum.

//         Blandit turpis cursus in hac habitasse. Volutpat blandit aliquam etiam erat velit scelerisque. Nunc faucibus a pellentesque sit amet porttitor eget dolor morbi. Nunc lobortis mattis aliquam faucibus purus in. Nisi quis eleifend quam adipiscing vitae proin. Semper auctor neque vitae tempus quam pellentesque nec nam aliquam. Consequat semper viverra nam libero justo laoreet sit amet cursus. Nibh ipsum consequat nisl vel pretium lectus quam. Urna condimentum mattis pellentesque id. Nunc lobortis mattis aliquam faucibus purus in. Ac turpis egestas integer eget aliquet nibh. Adipiscing commodo elit at imperdiet dui accumsan sit. Etiam tempor orci eu lobortis elementum nibh. Praesent semper feugiat nibh sed pulvinar proin. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Duis at tellus at urna condimentum mattis pellentesque.

//         Justo laoreet sit amet cursus sit amet dictum sit. Augue eget arcu dictum varius. Euismod nisi porta lorem mollis aliquam. Ipsum dolor sit amet consectetur adipiscing elit. Tortor vitae purus faucibus ornare. Eu lobortis elementum nibh tellus. Gravida rutrum quisque non tellus orci ac. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Convallis a cras semper auctor neque vitae. Lectus sit amet est placerat in egestas erat. Vitae suscipit tellus mauris a diam maecenas sed.

//         Aliquet risus feugiat in ante. Velit aliquet sagittis id consectetur purus.  <br /><br /> Augue lacus viverra vitae congue. Nec ullamcorper sit amet risus nullam eget. Cursus sit amet dictum sit amet justo donec enim diam. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Dui nunc mattis enim ut tellus elementum sagittis. Neque volutpat ac tincidunt vitae semper quis lectus nulla at. Id nibh tortor id aliquet lectus. Aliquet bibendum enim facilisis gravida neque convallis a cras. Sit amet venenatis urna cursus eget nunc scelerisque viverra mauris. Tortor aliquam nulla facilisi cras. Tellus rutrum tellus pellentesque eu tincidunt. Non curabitur gravida arcu ac tortor dignissim convallis aenean.

//         Bibendum enim facilisis gravida neque convallis. Cras fermentum odio eu feugiat pretium nibh ipsum. Etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus. Dui id ornare arcu odio ut sem nulla pharetra diam. Felis eget velit aliquet sagittis. Tincidunt eget nullam non nisi est. At auctor urna nunc id cursus metus aliquam. Cum sociis natoque penatibus et magnis dis parturient. Tincidunt ornare massa eget egestas purus viverra. Vehicula ipsum a arcu cursus vitae. Purus in mollis nunc sed. Pulvinar mattis nunc sed blandit libero volutpat sed.

//         Aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh. Pulvinar elementum integer enim neque volutpat ac tincidunt. Enim praesent elementum facilisis leo vel fringilla est ullamcorper eget. Ornare suspendisse sed nisi lacus. Tincidunt nunc pulvinar sapien et. Viverra ipsum nunc aliquet bibendum. Malesuada nunc vel risus commodo viverra maecenas accumsan. Faucibus nisl tincidunt eget nullam. Vitae justo eget magna fermentum iaculis. Dictum varius duis at consectetur lorem donec. Ipsum nunc aliquet bibendum enim. Vestibulum lorem sed risus ultricies tristique. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Egestas maecenas pharetra convallis posuere. Massa enim nec dui nunc mattis enim ut. Purus in mollis nunc sed id semper risus in hendrerit. Purus semper eget duis at. Purus in massa tempor nec. Nec feugiat in fermentum posuere urna nec tincidunt praesent. Habitant morbi tristique senectus et netus et malesuada fames ac.

//         Enim nec dui nunc mattis enim. Urna molestie at elementum eu facilisis sed odio. 
//     </p>
// </div>
//   </div>
//     <div className="modal-action">
//       <form method="dialog">
//         {/* if there is a button, it will close the modal */}
//         <button className="btn btn-sm w-[1.7rem] h-[1.7rem] btn-circle btn-ghost absolute top-3 right-3 bg-pastel-red rounded-full justify-center items-center flex inline-block">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="text-dark-red hover:text-hover-red hover:scale-105 w-[1.35rem] h-[1.35rem]">
//                 <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//         </button>
//       </form>
//     </div>
//   </div>
// </dialog>

// {/* THE FOLLOWING CODE IS FOR THE GENERATE W AI MODAL */}
// <button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>ai modal</button>
// <dialog id="my_modal_5" className="modal w-2/12 h-10/12 bg-off-white rounded-3xl">
//   <div className="modal-box">
// <div className='flex items-center justify-center items-center font-biscuitReg mt-4'>
// <div className="w-10 h-10 sm:w-12 sm:h-12 bg-light-pink rounded-full justify-center items-center flex inline-block">
// <svg xmlns="http://www.w3.org/2000/svg" className="text-dark-pink h-10 w-10" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M128,200c16,0,42.5-.2,72.9-17.8s40.3-39.5,43.4-50.8a7.9,7.9,0,0,0-5.7-9.8c-7.3-1.9-20.1-3.6-36.5.3" fill="none" stroke="#FFA1DF" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M53.9,121.8c-16.4-3.8-29.2-2.1-36.5-.2a7.9,7.9,0,0,0-5.7,9.8c3.1,11.3,13,33.3,43.4,50.8S112,200,128,200" fill="none" stroke="#FFA1DF" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M128,200s40-21.8,40-80c0-45.6-24.6-68.8-35.2-76.8a8.1,8.1,0,0,0-9.6,0C112.6,51.2,88,74.4,88,120,88,178.2,128,200,128,200Z" fill="none" stroke="#FFA1DF" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M128,200c12-2.6,44.3-20.8,63.7-54.4s14.6-60.3,10.8-72a7.8,7.8,0,0,0-9.2-5.3,77.1,77.1,0,0,0-31.4,15.1" fill="none" stroke="#FFA1DF" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M94.1,83.4A77.1,77.1,0,0,0,62.7,68.3a7.8,7.8,0,0,0-9.2,5.3c-3.8,11.7-8.6,38.5,10.8,72S116,197.4,128,200" fill="none" stroke="#FFA1DF" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
// </div>
//         {/* <h1 className="flex font-semibold text-dark-gray text-3xl ml-6 border-b border-light-gray">Generate With AI</h1> */}
//     {/* <div className="bg-blue-md w-fit pl-3 pr-3 h-8 rounded-3xl flex items-center">
//         <h1 className="text-md text-dark-blue">Linear Algebra</h1>
//     </div>  */}
//   </div>
//   <div className='ml-2 mr-2 mb-4 -mt-6 flex space-x-4 p-2'>
//   <btn className='font-biscuitReg h-24 w-24 bg-purple-md p-7 mt-7 rounded-3xl justify-center flex inline-block hover:cursor-pointer hover:scale-105'>
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="text-hover-purple w-10 h-10 absolute -mt-2">
//         <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
//     </svg>
//     <p className='text-sm text-hover-purple absolute mt-8'>Summary</p>
// </btn>
// <btn className='font-biscuitReg h-24 w-24 bg-blue-md p-7 mt-7 rounded-3xl justify-center flex inline-block hover:cursor-pointer hover:scale-105'>
// <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="text-dark-blue w-9 h-9 absolute -mt-2">
//   <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
// </svg>
//     <p className='text-sm text-dark-blue absolute mt-8'>Quiz</p>
// </btn>
//   </div>
//     <div className="modal-action">
//       <form method="dialog">
//         {/* if there is a button, it will close the modal */}
//         <button className="btn btn-sm w-[1.25rem] h-[1.25rem] btn-circle btn-ghost absolute top-3 right-3 bg-pastel-red rounded-full justify-center items-center flex inline-block">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="text-dark-red hover:text-hover-red hover:scale-105 w-[1rem] h-[1rem]">
//                 <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//         </button>
//       </form>
//     </div>
//   </div>
// </dialog>
//     </>
//   )
// }
