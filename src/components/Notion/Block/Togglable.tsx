type Props = React.ComponentProps<"details"> & {
  summary: React.ReactNode;
};

export const Togglable: React.FC<Props> = ({ className, children, summary }) => {
  return (
    <details className={className}>
      <summary>
      {summary}
      </summary>
      {children}
    </details>
  );
};
