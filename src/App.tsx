import { useState } from "react";
import { corporateDemo } from "./examples/corporate-structure/structure";
import { CoreConcepts } from "./components/landing/CoreConcepts";
import { DataTypes } from "./components/landing/DataTypes";
import { DeveloperExperience } from "./components/landing/DeveloperExperience";
import { Documentation } from "./components/landing/Documentation";
import { Features } from "./components/landing/Features";
import { Footer } from "./components/landing/Footer";
import { Header } from "./components/landing/Header";
import { Hero } from "./components/landing/Hero";
import { IdentityExample } from "./components/landing/IdentityExample";
import { InteractiveExample } from "./components/landing/InteractiveExample";
import { RelationshipRules } from "./components/landing/RelationshipRules";

const initialExpanded = new Set(Object.values(corporateDemo.nodes));

export function App() {
  const [selectedId, setSelectedId] = useState(corporateDemo.nodes.alfa);
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(initialExpanded);

  function selectNode(id: string) {
    setSelectedId(id);
    const path = corporateDemo.structure.getPath(id);
    setExpanded((current) => {
      const next = new Set(current);
      for (const nodeId of path) next.add(nodeId);
      return next;
    });
  }

  function selectAndShow(id: string) {
    selectNode(id);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("example")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }

  function toggle(id: string) {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <>
      <a className="skip" href="#example">
        Skip to the example
      </a>
      <Header />
      <main>
        <Hero />
        <Features />
        <CoreConcepts />
        <InteractiveExample selectedId={selectedId} expanded={expanded} onSelect={selectNode} onToggle={toggle} />
        <RelationshipRules />
        <IdentityExample onSelect={selectAndShow} />
        <DeveloperExperience />
        <DataTypes />
        <Documentation />
      </main>
      <Footer />
    </>
  );
}
