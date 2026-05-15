export type MiniProfileProps = {
  src: string;
  name: string;
  subtitle?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export function MiniProfile({
  src,
  name,
  subtitle,
  alt,
  size = 'md',
  className = '',
}: MiniProfileProps) {
  return (
    <div className={`sb-mini-profile sb-mini-profile--${size} ${className}`}>
      <img className="sb-mini-profile__avatar" src={src} alt={alt ?? name} />
      <div className="sb-mini-profile__text">
        <span className="sb-mini-profile__name">{name}</span>
        {subtitle ? (
          <span className="sb-mini-profile__subtitle">{subtitle}</span>
        ) : null}
      </div>
    </div>
  );
}
