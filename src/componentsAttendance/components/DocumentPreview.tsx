export type DocumentPreviewItem = {
  title: string;
  content: string;
};

export function DocumentPreview({
  title = '근 로 계 약 서',
  subtitle,
  items,
  signedDate,
}: {
  title?: string;
  subtitle?: string;
  items: DocumentPreviewItem[];
  signedDate?: string;
}) {
  return (
    <article className="att-document-preview">
      <header>
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </header>
      <div className="att-document-preview__body">
        {items.map((item) => (
          <section key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </section>
        ))}
      </div>
      {signedDate ? <footer>{signedDate} 체결</footer> : null}
    </article>
  );
}
