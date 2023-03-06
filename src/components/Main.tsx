type Props = React.ComponentProps<"main">;

export const Main: React.FC<Props> = ({ className = "" }) => {
  return (
    <main className={`px-24 pb-24 ${className}`}>
      <article>
        <h2>This is main block</h2>
        <p>この中にNotionのコンテンツが入ってきます</p>
      </article>
    </main>
  );
};
