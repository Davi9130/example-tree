import { documentation } from "../../lib/docs";
import { githubUrl, libraryDescription, libraryLicense, npmUrl } from "../../lib/meta";

const readme = documentation[0];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div>
          <p className="brand">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="HierarchTree" />
          </p>
          <p>{libraryDescription}</p>
        </div>
        <ul>
          <li>
            <a href={npmUrl}>npm package</a>
          </li>
          <li>
            <a href={githubUrl}>GitHub</a>
          </li>
          <li>
            {readme ? <a href={readme.href}>Documentation</a> : null}
          </li>
          <li>
            <span>License: {libraryLicense}</span>
          </li>
        </ul>
      </div>
    </footer>
  );
}
