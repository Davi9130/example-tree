const links = [
  { href: "#concepts", label: "Concepts" },
  { href: "#example", label: "Example" },
  { href: "#rules", label: "Rules" },
  { href: "#docs", label: "Docs" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <a className="brand" href="#top" aria-label="HierarchTree">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="HierarchTree" />
        </a>
        <nav aria-label="Page">
          <ul className="nav-list">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
