type Props = React.PropsWithChildren<{ className?: string }>;

export default function ({ children, className = "" }: Props) {
  return (
    <div className={`mx-auto max-w-5xl px-4 md:px-6 ${className}`}>
      {children}
    </div>
  );
}
