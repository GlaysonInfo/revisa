import Link from "next/link";

import { PublicSiteChrome } from "../../components/public-site-chrome";

const contactTopics = [
  {
    title: "Consulta do cidadao",
    description: "Pedidos de informacao, demandas comunitarias, duvidas sobre atendimento ou retorno de equipe.",
  },
  {
    title: "Parcerias e doacoes",
    description: "Empresas e apoiadores interessados em contribuir com recursos, servicos, materiais ou articulacao.",
  },
  {
    title: "Quero conhecer a REVISA",
    description: "Canal para navegantes pelo site que desejam entender melhor a proposta, a metodologia e o impacto.",
  },
];

export default function ContactPage() {
  return (
    <PublicSiteChrome>
      <div className="inner-page">
        <header className="inner-page__header inner-page__hero">
          <p className="public-eyebrow">Fale Conosco</p>
          <h1>Canal institucional para atendimento, parceria e orientacao.</h1>
          <p>
            Fale com a REVISA para consultas do cidadao, apresentacoes institucionais, propostas de parceria, doacoes
            e esclarecimentos sobre os servicos no territorio.
          </p>
          <div className="public-hero__cta">
            <Link href="/participar" className="primary-button">
              Participar da rede
            </Link>
            <Link href="/login" className="secondary-button">
              Acesso Restrito
            </Link>
          </div>
        </header>

        <section className="public-card-grid">
          {contactTopics.map((topic) => (
            <article key={topic.title} className="public-card">
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
            </article>
          ))}
        </section>

        <section className="public-section public-section--two-col">
          <form className="public-form public-form--wide">
            <h2>Enviar mensagem</h2>
            <div className="form-grid">
              <label>
                Nome
                <input type="text" placeholder="Como podemos te chamar" />
              </label>
              <label>
                Telefone ou WhatsApp
                <input type="text" placeholder="(31) 99999-9999" />
              </label>
              <label>
                Email
                <input type="email" placeholder="voce@exemplo.com" />
              </label>
              <label>
                Assunto
                <select defaultValue="">
                  <option value="" disabled>
                    Selecione um assunto
                  </option>
                  <option>Consulta do cidadao</option>
                  <option>Parceria institucional</option>
                  <option>Doacao espontanea</option>
                  <option>Quero saber mais</option>
                </select>
              </label>
              <label className="form-grid__full">
                Mensagem
                <textarea rows={6} placeholder="Conte brevemente como podemos ajudar." />
              </label>
            </div>
            <div className="form-actions">
              <button type="submit" className="primary-button">
                Enviar contato
              </button>
            </div>
          </form>

          <aside className="public-panel">
            <div className="section-heading">
              <p className="public-eyebrow">O que acontece depois</p>
              <h2>Encaminhamento organizado desde o primeiro contato.</h2>
            </div>
            <div className="timeline">
              <div className="timeline__item">
                <small>1</small>
                <strong>Triagem inicial</strong>
                <span>A mensagem e classificada por tipo de demanda ou interesse.</span>
              </div>
              <div className="timeline__item">
                <small>2</small>
                <strong>Direcionamento</strong>
                <span>O time adequado recebe o contato para retorno, visita, analise ou articulacao.</span>
              </div>
              <div className="timeline__item">
                <small>3</small>
                <strong>Registro na base</strong>
                <span>O contato pode evoluir para cadastro, parceria, apoio ou acompanhamento territorial.</span>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </PublicSiteChrome>
  );
}
