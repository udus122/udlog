import { TableBlockObjectResponse, TableRowBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import React from "react";
import { RichText } from "./RichText";

export const Table = ({ block }: { block: TableBlockObjectResponse }) => {
  // @ts-ignore Notion types are incorrect
  const children = block[block.type].children
  const has_column_header = block.table.has_column_header;
  const has_row_header = block.table.has_row_header;
  return (
    <table className="notion_table">
      <tbody>
        {/* @ts-ignore Notion types are incorrect */}
        {children?.map((row, i) => {
          if (row) {
            return (
              <tr
                key={row.id}
                className={
                  has_column_header && i === 0 ? "notion_table_header" : ""
                }
              >
                {/* @ts-ignore Notion types are incorrect */}
                {row.table_row.cells.map((cell, j) => {
                  if (cell) {
                    return (
                      <td
                        key={row.id+j}
                        className={`notion_table_cell ${
                          has_row_header && i === 0 ? "notion_table_header" : ""
                        }`}
                      >
                        <RichText rich_text={cell} />
                      </td>
                    );
                  } else {
                    return null;
                  }
                })}
              </tr>
            );
          } else {
            return null;
          }
        })}
      </tbody>
    </table>
  );
};
