export const territoryRanking = [
  { name: "Centro", citizens: 42, momentum: "+12%" },
  { name: "Jardim Esperanca", citizens: 31, momentum: "+8%" },
  { name: "Santa Luzia", citizens: 27, momentum: "+5%" },
  { name: "Nova Aurora", citizens: 18, momentum: "-2%" },
];

export const collaboratorRanking = [
  { name: "Toninho", total: 38, conversion: "74%" },
  { name: "Marcia", total: 25, conversion: "69%" },
  { name: "Paulo", total: 21, conversion: "63%" },
  { name: "Eliane", total: 17, conversion: "58%" },
];

export const criticalDemands = [
  { title: "Iluminacao publica", neighborhood: "Centro", status: "alta prioridade" },
  { title: "Agendamento de visita", neighborhood: "Santa Luzia", status: "aguardando retorno" },
  { title: "Regularizacao de cadastro", neighborhood: "Jardim Esperanca", status: "revisao manual" },
];

export const governanceItems = [
  { label: "Usuarios ativos", value: "18", note: "3 coordenadores, 11 campo e 4 apoio administrativo" },
  { label: "Consentimentos pendentes", value: "7", note: "cadastros aguardando validacao documental" },
  { label: "Exportacoes controladas", value: "2", note: "ultima exportacao liberada ha 3 dias" },
];

export const quickActions = [
  { label: "Novo usuario", href: "/dashboard/users/new" },
  { label: "Novo polo", href: "#" },
  { label: "Relatorio por bairro", href: "#" },
  { label: "Revisar duplicidades", href: "#" },
];

export const agendaHighlights = [
  { when: "Hoje, 18:30", title: "Reuniao com liderancas locais", place: "Polo Centro" },
  { when: "Amanha, 09:00", title: "Mutirao de cadastramento", place: "Jardim Esperanca" },
  { when: "Sexta, 19:00", title: "Atividade comunitaria", place: "Santa Luzia" },
];
