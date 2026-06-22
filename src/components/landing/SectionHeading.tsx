export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="font-mono text-[12px] font-normal tracking-normal text-text-muted">
        {eyebrow}
      </p>
      <h2
        className="mt-3 text-[32px] font-semibold leading-10 tracking-[-0.04em] text-text-primary"
      >
        {title}
      </h2>
      <p className="mt-3 text-[16px] leading-6 text-text-secondary">
        {description}
      </p>
    </div>
  );
}
