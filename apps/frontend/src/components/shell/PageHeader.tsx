export interface PageHeaderProps {
  title: string;
  breadcrumb?: string;
}

export default function PageHeader({ title, breadcrumb }: PageHeaderProps) {
  return (
    <div data-testid="page-header">
      {breadcrumb && <p>{breadcrumb}</p>}
      <h2>{title}</h2>
    </div>
  );
}
