
function Intro() {
    return (

    <>
    <div className="sm:mb-10 lg:grid mt-12 lg:grid-cols-5 md:grid-cols-none md:bg-gray-300 bg-gray-300 lg:bg-white lg:h-full">
      <div className=" px-10 py-10 max-w-md m-auto lg:col-span-2 mt-20 mb-20 shadow-xl rounded-xl lg:mt-10 md:shadow-xl md:rounded-xl lg:shadow-none lg:rounded-none lg:w-full lg:mb-10 lg:px-5 lg:pt-5 lg:pb-5 lg:max-w-lg bg-white">
        <img className="h-64 sm:h-52 sm:w-full sm:object-cover lg:hidden object-center mt-2 rounded-lg shadow-2xl" src="https://www.myaccelerate.io/assets/utilities/image/epa.jpg" alt="Ad- woman on a beach"/>
        <h1 className="font-bold text-lg text-gray-600">GET STARTED TODAY!</h1>
        <h1 className="text-lg text-gray-600 text-justify pt-2">Pitch Crest is an innovative online platform that revolutionizes the way entrepreneurs and startups pitch their projects to potential investors. Our platform facilitates seamless connections between visionary project creators and astute investors seeking promising ventures to fund. We aim to enhance collaboration, foster meaningful relationships, and drive the growth of groundbreaking projects that shape the future.</h1>
        <button className="mt-5 bg-gray-600 p-3 shadow-2xl rounded-xl text-white font-bold hover:bg-gray-800">GET STARTED!</button>
      </div>

      <div className="hidden relative lg:block mr-11  lg:col-span-3">
        <img className="absolute inset-0 w-full h-full object-cover object-center" src="https://www.myaccelerate.io/assets/utilities/image/epa.jpg" alt="Ad- woman on a beach"/>
      </div>
    </div>
        
        </>
    )
}

export default Intro;
