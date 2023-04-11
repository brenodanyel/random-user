type LoadingProps = {
  title?: string;
  className?: string;
};

export function Loading(props: LoadingProps) {
  const { title, className } = props;
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      {title && <span className="text-xl">{title}</span>}
      <progress className="progress progress-primary w-full"></progress>
    </div>
  );
}
