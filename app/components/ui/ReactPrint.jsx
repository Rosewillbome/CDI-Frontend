import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
function ReactPrint({contentRef}) {
  //   const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <div className="my-4">
      {/* <ReactToPrint
          trigger={() => ( */}
      <button
        onClick={() => reactToPrintFn()}
        className="bg-[#308DE0] p-3 text-white rounded-md hover:text-[#308DE0] hover:bg-white transition-all duration-300 cursor-pointer tracking-tight leading-tight"
      >
        Download report
      </button>
      {/* )}
          content={() => componentRef.current}
        /> */}
    </div>
  );
}

export default ReactPrint;
