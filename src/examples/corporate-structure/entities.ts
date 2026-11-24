import type { Party } from "./types";

export const alfa: Party = {
  taxPayer: "10.000.000/0001-10",
  type: "PJ",
  name: "Alfa Holding Ltda.",
  status: "active",
  email: "contato@alfaholding.example",
  phone: null,
  active: true,
  tags: ["holding", "root"],
  address: { city: "São Paulo", state: "SP" },
  foundedAt: "2012-03-01",
};

export const beta: Party = {
  taxPayer: "20.000.000/0001-20",
  type: "PJ",
  name: "Beta Participações Ltda.",
  status: "active",
  email: "societario@betapart.example",
  phone: "+55 11 3000-0000",
  active: true,
  tags: ["holding"],
  address: { city: "São Paulo", state: "SP" },
  foundedAt: "2015-07-19",
};

export const carlos: Party = {
  taxPayer: "300.000.000-30",
  type: "PF",
  name: "Carlos Mendes",
  status: "active",
  email: "carlos.mendes@example",
  phone: "+55 11 90000-0000",
  active: true,
  tags: ["shareholder", "director"],
  address: { city: "Campinas", state: "SP" },
  foundedAt: null,
};

export const gamma: Party = {
  taxPayer: "40.000.000/0001-40",
  type: "PJ",
  name: "Gamma Serviços Ltda.",
  status: "active",
  email: "contato@gammaservicos.example",
  phone: null,
  active: true,
  tags: ["operating"],
  address: { city: "Curitiba", state: "PR" },
  foundedAt: "2018-01-09",
};

export const ana: Party = {
  taxPayer: "500.000.000-50",
  type: "PF",
  name: "Ana Oliveira",
  status: "active",
  email: "ana.oliveira@example",
  phone: null,
  active: true,
  tags: ["quota-holder"],
  address: null,
  foundedAt: null,
};

export const delta: Party = {
  taxPayer: "70.000.000/0001-70",
  type: "PJ",
  name: "Delta Tecnologia Ltda.",
  status: "active",
  email: "ir@deltatec.example",
  phone: "+55 41 3333-7070",
  active: true,
  tags: ["technology"],
  address: { city: "Florianópolis", state: "SC" },
  foundedAt: "2020-11-02",
};

export const bruno: Party = {
  taxPayer: "800.000.000-80",
  type: "PF",
  name: "Bruno Costa",
  status: "active",
  email: "bruno.costa@example",
  phone: null,
  active: true,
  tags: ["quota-holder"],
  address: null,
  foundedAt: null,
};
