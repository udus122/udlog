import { BlockComponent } from "@/types";
import { EquationBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

export const BlockEquation: BlockComponent<EquationBlockObjectResponse> = ({
  block,
}) => (
  <div id={block.id} className="notin_equation">
    <BlockMath math={block.equation.expression} />
  </div>
);
