import { Render } from "@9gustin/react-notion-render";
type Props = {};

export const Main: React.FC<Props> = () => {
  return (
    <main className="px-24 pb-24">
      <article>
        <h2>This is main block</h2>
        <p>この中にNotionのコンテンツが入ってきます</p>
      </article>
    </main>
  );
};
