import {
  TableBlockObjectResponse,
  TableRowBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import clsx from "clsx";
import React from "react";
import { RichText } from "./RichText";

export const Table = ({ block }: { block: TableBlockObjectResponse }) => {
  const has_column_header = block.table.has_column_header;
  const has_row_header = block.table.has_row_header;
  return (
    <table id={block.id} className={clsx("notion_table", "notion_table")}>
      <tbody>
        {/* @ts-ignore Notion types are incorrect */}
        {block[block.type].children?.map((row, i) => {
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
                        key={row.id + j}
                        className={`notion_table_cell ${
                          has_row_header && i === 0 ? "notion_table_header" : ""
                        }`}
                      >
                        <RichText richText={cell} />
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
