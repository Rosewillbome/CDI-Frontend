'use client'
import React,{useRef} from "react";
import SnapshotTable from "../SnapshotTable";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";

function SnapshotReport() {
    const contentRef = useRef(null);
const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <div>
      <div className="my-4">
        {/* <ReactToPrint
          trigger={() => ( */}
            <button onClick={() => reactToPrintFn()} className="bg-[#308DE0] p-3 text-white rounded-md hover:text-[#308DE0] hover:bg-white transition-all duration-300 cursor-pointer tracking-tight leading-tight">
              Download
            </button>
          {/* )}
          content={() => componentRef.current}
        /> */}
      </div>
      <div className="w-full p-10" ref={contentRef}>
        <div>
          <Image
            src="/fao.png"
            alt="FAO Logo"
            width={200}
            height={100}
            className="object-contain mb-7"
          />
        </div>
        <h1 className="font-bold mb-4">UGANDA MONTHLY SNAPSHOT</h1>
        <h2 className="font-bold mb-4">MONTH, YEAR</h2>

        <h2 className="font-bold mb-4">DROUGHT BULLETIN</h2>

        <h3 className="font-bold mb-4">Overview</h3>
        <p className="mb-1">
          {`The drought continues to affect various districts in Uganda. A total of
        ${0}
         districts are classified under Severe and Extreme Drought conditions and
        may require immediate humanitarian assistance in the coming days or
        month.`}
        </p>

        <p className="mb-1">These districts are:</p>
        <SnapshotTable currentData={[]} />

        <p className="mb-1">
          {` Additionally, ${0}
        districts have experienced
                  severe and extreme drought conditions for an extended period
       
        .`}
        </p>

        <p className="mb-1">These districts are:</p>
        <SnapshotTable currentData={[]} />

        <p className="mb-1">
          {`Finally, ${0} districts
        are showing signs of recovery. Ongoing interventions should be
        maintained or expanded to ensure full restoration of livelihoods and
        livelihood systems in these areas.`}
        </p>

        <p className="mb-1">These districts are:</p>
        <SnapshotTable currentData={[]} />

        <p className="mb-1">
          {" "}
          <strong>NB</strong> : This is an automated report generated using the
          combined drought index approach. For, further information on the
          methodology, insert report download hyperlink{" "}
        </p>
        <p className="mb-1 font-bold">For more information contact us:</p>
        <p className="mb-1 font-bold"> Name :</p>
        <p className="mb-1 font-bold"> Email Address:</p>
        <p className="mb-1 font-bold"> Telephone:</p>
      </div>
    </div>
  );
}

export default SnapshotReport;
