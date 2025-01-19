const InputController = ({ label, ...rest }) => {
  return (
    // <div className="flex my-5 flex-col">
    //   <label className="text-sm text-gray-500 font-bold mb-2">{label}</label>
    //   <input
    //     name={label}
    //     className="text-sm focus:border-orange-600 focus:border-2 rounded border border-gray-200 p-2 outline-none font-bold text-gray-600"
    //     {...rest}
    //   />
    // </div>
    <div class="relative">
      <input
        type="text"
        {...rest}
        id={label}
        class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-gray-600 peer"
        placeholder=" "
      />
      <label
        for={label}
        class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {label}
      </label>
    </div>
  );
};
export default InputController;
