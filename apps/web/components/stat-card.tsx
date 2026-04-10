import Link from "next/link";

type StatCardProps = {
  title: string;
  value: number;
  tone?: "default" | "accent" | "warning";
  hint?: string;
  href?: string;
};

export function StatCard({ title, value, tone = "default", hint, href }: StatCardProps) {
  const content = (
    <article className={`stat-card stat-card--${tone}`}>
      <span className="stat-card__title">{title}</span>
      <strong className="stat-card__value">{value}</strong>
      {hint ? <small className="stat-card__hint">{hint}</small> : null}
    </article>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} className="stat-card-link">
      {content}
    </Link>
  );
}
