import Image from "next/image";
import Link from "next/link";

type BrandLockupProps = {
  href?: string;
  className?: string;
  compact?: boolean;
};

export function BrandLockup({
  href = "/",
  className = "",
  compact = false,
}: BrandLockupProps) {
  return (
    <Link href={href} className={`brand-lockup${compact ? " brand-lockup--compact" : ""} ${className}`.trim()}>
      <span className="brand-mark brand-mark--image">
        <Image
          src="/revisa/logo-revisa.png"
          alt="REVISA - Rede de Protecao a Vida e a Saude"
          fill
          className="brand-mark__image"
          sizes={compact ? "96px" : "140px"}
        />
      </span>
      <span>
        <strong>REVISA</strong>
        <small>Rede de Protecao a Vida e a Saude</small>
        <small className="brand-meta">OSC | CNPJ 14.452.770/0001-80</small>
      </span>
    </Link>
  );
}
