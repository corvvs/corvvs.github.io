type Props = {
  i: JSX.Element;
  className?: string;
};
export const InlineIcon = ({ i, className }: Props) => {
  return (
    <span className={`inline-block ${className || 'p-1'} align-middle`}>{i}</span>
  );
};
