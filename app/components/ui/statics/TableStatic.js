import React from "react";

function TableStatic({ years, groupedData, selectedOption }) {
  return (
    <div className="">
      <div
        className="w-full"
        // style={{ maxHeight: "700px", overflowY: "auto" }}
      >
        <table className="static_table">
          <thead className="table_head">
            <tr>
              {/* <th className="table_headings">Month</th> */}
              {years?.map((year, index) => (
                <th key={index} className="table_headings">
                  {year}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="table_body">
            {groupedData?.map((item, index) => (
              <tr
                key={index}
                className={`table_body_row ${
                  selectedOption?.trim() !== "selected_option"
                    ? ""
                    : `${index !== 0 && index % 3 === 0 ? `page-break` : ``}`
                }`}
              >
                {/* <td className="table_body_row_td rt"><h6 className="table_body_row_td_h">{item[0][0]}</h6></td> */}
                {item?.map((monthData, monthIndex) => (
                  <td
                    key={monthIndex}
                    className={`${
                      selectedOption?.trim() !== "selected_option"
                        ? `table_body_row_td`
                        : `table_body_row_td_five`
                    }`}
                  >
                    <h6 className="table_body_row_td_h">{item[0][0]}</h6>
                    <div
                      className={`${
                        selectedOption?.trim() !== "selected_option"
                          ? `table_body_row_td_img`
                          : `table_body_row_td_img_five`
                      }`}
                    >
                      <img
                        src={`${process.env.NEXT_PUBLIC_API}uploaded${monthData[4]}`}
                        alt={`${monthData[2]}`}
                        className="static_image"
                      />
                    </div>
                    {/* {monthData[2]} */}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableStatic;
