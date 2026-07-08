export interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export default function PlaceholderPage({
  title,
  description = "This section is planned for a future phase. Navigation is wired and ready.",
}: PlaceholderPageProps) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #d0d5dd",
        borderRadius: "12px",
        padding: "1.5rem",
        maxWidth: "720px",
      }}
    >
      <h2 style={{ margin: "0 0 0.75rem", color: "#101828", fontSize: "1.25rem" }}>
        {title}
      </h2>
      <p style={{ margin: 0, color: "#475467", lineHeight: 1.6 }}>{description}</p>
    </div>
  );
}
