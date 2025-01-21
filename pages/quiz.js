const Quiz = () => {
  return (
    <div>
      <div className="p-3 shadow-lg">
        <h1 className="text-2xl font-bold">Chapter 1 Magnetism</h1>
      </div>
      <div className="mx-4">
        <div className="shadow-lg w-full mt-5 p-3 rounded-lg">
          <h3 className="text-xl">
            Question 1: What is the capital of France?
          </h3>
          <div className="flex flex-col space-y-4 mt-3">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="option1"
                name="options"
                value="Option 1"
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="option1" className="text-gray-700">
                A) Delhi
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="option2"
                name="options"
                value="Option 2"
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="option2" className="text-gray-700">
                B) Paris
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="option3"
                name="options"
                value="Option 3"
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="option3" className="text-gray-700">
                C) Berlin
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="option3"
                name="options"
                value="Option 3"
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="option3" className="text-gray-700">
                D) Rome
              </label>
            </div>
          </div>
        </div>
        <div className="flex mt-5 items-center justify-between">
          <button className="bg-black hover:bg-gray-700 p-3 px-8 rounded-lg text-white text-sm font-bold">
            Prev
          </button>
          <p>1 of 5</p>
          <button className="bg-black hover:bg-gray-700 p-3 px-8 rounded-lg text-white text-sm font-bold">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
export default Quiz;
