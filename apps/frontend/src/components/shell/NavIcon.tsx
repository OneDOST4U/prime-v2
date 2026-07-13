import styles from "./AppShell.module.css";

const paths: Record<string, string> = {
  home: "M3 12l9-8 9 8M5 10v10h5v-6h4v6h5V10",
  file: "M7 3h8l4 4v14H7zM15 3v4h4",
  plus: "M12 5v14M5 12h14",
  bell: "M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M10 21a2 2 0 004 0",
  user: "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0",
  inbox: "M22 12h-6l-2 3h-4l-2-3H2M5 5h14l3 7v7H2v-7z",
  check: "M9 11l3 3 8-8M21 12v7H3V5h13",
  layers: "M12 2l10 5-10 5L2 7zM2 12l10 5 10-5M2 17l10 5 10-5",
  peso: "M12 2v20M17 6H9.5a2.5 2.5 0 000 5h5a2.5 2.5 0 010 5H6",
  shield: "M12 22s8-3 8-10V5l-8-3-8 3v7c0 7 8 10 8 10z",
  list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  settings:
    "M12 15a3 3 0 100-6 3 3 0 000 6zM19 12a7 7 0 01-.1 1.2l2 1.6-2 3.4-2.4-1a7 7 0 01-2 1.2L14 21h-4l-.5-2.6a7 7 0 01-2-1.2l-2.4 1-2-3.4 2-1.6A7 7 0 015 12a7 7 0 01.1-1.2l-2-1.6 2-3.4 2.4 1a7 7 0 012-1.2L10 3h4l.5 2.6a7 7 0 012 1.2l2.4-1 2 3.4-2 1.6A7 7 0 0119 12z",
};

export default function NavIcon({ name }: { name?: string }) {
  if (!name || !paths[name]) return null;
  return (
    <svg
      className={styles.navIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
