from datetime import UTC, datetime, timedelta

from sqlalchemy import delete

from app.core.database import SessionLocal, init_db
from app.models.activity import Activity
from app.models.citizen import Citizen
from app.models.demand import Demand
from app.models.task import Task
from app.models.territory import Neighborhood, Pole
from app.models.user import User


POLES = [
    "Polo Central",
    "Sitio Pocoes",
    "Novo Horizonte",
    "Bom Repouso",
    "Parque das Industrias",
    "Imbirucu",
    "Sao Joao",
]

ACTION_POLES = [
    "Sitio Pocoes",
    "Novo Horizonte",
    "Bom Repouso",
    "Parque das Industrias",
    "Imbirucu",
    "Sao Joao",
]

COLLABORATORS = [
    ("Marcia", "Sitio Pocoes"),
    ("Paulo", "Novo Horizonte"),
    ("Eliane", "Bom Repouso"),
    ("Robson", "Parque das Industrias"),
    ("Denise", "Imbirucu"),
    ("Adriano", "Sao Joao"),
]

BENEFICIARIES = [
    ("Beneficiario 0101", "Sitio Pocoes", "Sitio Pocoes", "Marcia"),
    ("Beneficiario 0102", "Sitio Pocoes", "Sitio Pocoes", "Marcia"),
    ("Beneficiario 0103", "Sitio Pocoes", "Sitio Pocoes", "Marcia"),
    ("Beneficiario 0104", "Sitio Pocoes", "Sitio Pocoes", "Marcia"),
    ("Beneficiario 0105", "Sitio Pocoes", "Sitio Pocoes", "Marcia"),
    ("Beneficiario 0201", "Novo Horizonte", "Novo Horizonte", "Paulo"),
    ("Beneficiario 0202", "Novo Horizonte", "Novo Horizonte", "Paulo"),
    ("Beneficiario 0203", "Novo Horizonte", "Novo Horizonte", "Paulo"),
    ("Beneficiario 0204", "Novo Horizonte", "Novo Horizonte", "Paulo"),
    ("Beneficiario 0205", "Novo Horizonte", "Novo Horizonte", "Paulo"),
    ("Beneficiario 0301", "Bom Repouso", "Bom Repouso", "Eliane"),
    ("Beneficiario 0302", "Bom Repouso", "Bom Repouso", "Eliane"),
    ("Beneficiario 0303", "Bom Repouso", "Bom Repouso", "Eliane"),
    ("Beneficiario 0304", "Bom Repouso", "Bom Repouso", "Eliane"),
    ("Beneficiario 0305", "Bom Repouso", "Bom Repouso", "Eliane"),
    ("Beneficiario 0401", "Parque das Industrias", "Parque das Industrias", "Robson"),
    ("Beneficiario 0402", "Parque das Industrias", "Parque das Industrias", "Robson"),
    ("Beneficiario 0403", "Parque das Industrias", "Parque das Industrias", "Robson"),
    ("Beneficiario 0404", "Parque das Industrias", "Parque das Industrias", "Robson"),
    ("Beneficiario 0405", "Parque das Industrias", "Parque das Industrias", "Robson"),
    ("Beneficiario 0501", "Imbirucu", "Imbirucu", "Denise"),
    ("Beneficiario 0502", "Imbirucu", "Imbirucu", "Denise"),
    ("Beneficiario 0503", "Imbirucu", "Imbirucu", "Denise"),
    ("Beneficiario 0504", "Imbirucu", "Imbirucu", "Denise"),
    ("Beneficiario 0505", "Imbirucu", "Imbirucu", "Denise"),
    ("Beneficiario 0601", "Sao Joao", "Sao Joao", "Adriano"),
    ("Beneficiario 0602", "Sao Joao", "Sao Joao", "Adriano"),
    ("Beneficiario 0603", "Sao Joao", "Sao Joao", "Adriano"),
    ("Beneficiario 0604", "Sao Joao", "Sao Joao", "Adriano"),
    ("Beneficiario 0605", "Sao Joao", "Sao Joao", "Adriano"),
]


def reset_demo_data() -> None:
    session = SessionLocal()
    try:
        session.execute(delete(Activity))
        session.execute(delete(Task))
        session.execute(delete(Demand))
        session.execute(delete(Citizen))
        session.execute(delete(User))
        session.execute(delete(Neighborhood))
        session.execute(delete(Pole))
        session.commit()
    finally:
        session.close()


def seed_demo_data() -> None:
    init_db()
    reset_demo_data()

    session = SessionLocal()
    try:
        for pole_name in POLES:
            session.add(Pole(name=pole_name, city="Betim"))
            session.add(Neighborhood(name=pole_name, city="Betim"))

        admin_users = [
            User(
                full_name="Solange REVISA",
                email="admin@revisa.local",
                hashed_password="",
                phone="(31) 99975-1882",
                profile_type="Administrador",
                political_profile="Administrativo",
                pole_name="Polo Central",
                is_active=True,
                is_superuser=True,
            ),
            User(
                full_name="Carlos Linha de Frente",
                email="campo@revisa.local",
                hashed_password="",
                phone="(31) 99975-1801",
                profile_type="Colaborador de campo",
                political_profile="Base territorial",
                pole_name="Sitio Pocoes",
            ),
            User(
                full_name="Renata Gestao",
                email="gestao@revisa.local",
                hashed_password="",
                phone="(31) 99975-1802",
                profile_type="Colaborador administrativo",
                political_profile="Administrativo",
                pole_name="Polo Central",
            ),
            User(
                full_name="Joao Polo",
                email="coordenacao@revisa.local",
                hashed_password="",
                phone="(31) 99975-1803",
                profile_type="Coordenador de polo",
                political_profile="Base territorial",
                pole_name="Novo Horizonte",
            ),
            User(
                full_name="Maria Lideranca",
                email="lideranca@revisa.local",
                hashed_password="",
                phone="(31) 99975-1804",
                profile_type="Lideranca local",
                political_profile="Lideranca comunitaria",
                pole_name="Bom Repouso",
            ),
            User(
                full_name="Gabinete Aliado",
                email="vereador@revisa.local",
                hashed_password="",
                phone="(31) 99975-1805",
                profile_type="Vereador",
                political_profile="Articulacao politica",
                pole_name="Polo Central",
            ),
            User(
                full_name="Empresa Horizonte",
                email="parceiro@revisa.local",
                hashed_password="",
                phone="(31) 99975-1806",
                profile_type="Empresa parceira",
                political_profile="Parceria institucional",
                pole_name="Polo Central",
            ),
            User(
                full_name="Apoiador Comunitario",
                email="apoiador@revisa.local",
                hashed_password="",
                phone="(31) 99975-1807",
                profile_type="Apoiador",
                political_profile="Articulacao politica",
                pole_name="Polo Central",
            ),
            User(
                full_name="Beneficiaria Referencia",
                email="beneficiaria@revisa.local",
                hashed_password="",
                phone="(31) 99975-1808",
                profile_type="Beneficiario",
                political_profile="Beneficiario do projeto",
                pole_name="Imbirucu",
            ),
        ]
        session.add_all(admin_users)

        citizens = []
        for index, (full_name, neighborhood, pole_name, collaborator_name) in enumerate(BENEFICIARIES, start=1):
            citizens.append(
                Citizen(
                    full_name=full_name,
                    phone=f"(31) 98888-{index:04d}",
                    email=f"beneficiario{index:02d}@revisa.local",
                    neighborhood=neighborhood,
                    pole_name=pole_name,
                    address=f"Rua {neighborhood}, {100 + index}",
                    reference_point=f"Referencia do polo {pole_name}",
                    notes="Cadastro demonstrativo para painel administrativo local.",
                    collaborator_name=collaborator_name,
                    registered_in_field=True,
                    consent_given=index % 4 != 0,
                )
            )
        session.add_all(citizens)
        session.flush()

        citizen_by_name = {citizen.full_name: citizen for citizen in citizens}

        demands = [
            Demand(
                title="Ligar para Beneficiario 0201 Polo 04",
                citizen_id=citizen_by_name["Beneficiario 0201"].id,
                category="Retorno",
                description="Confirmar disponibilidade para atividade e atualizar telefone de contato.",
                neighborhood="Novo Horizonte",
                pole_name="Parque das Industrias",
                priority="alta",
                status="aguardando retorno",
            ),
            Demand(
                title="Auxiliar beneficiario CPF 00198962630",
                citizen_id=citizen_by_name["Beneficiario 0302"].id,
                category="Documentacao",
                description="Apoio para regularizacao documental e atualizacao cadastral.",
                neighborhood="Bom Repouso",
                pole_name="Bom Repouso",
                priority="alta",
                status="triagem",
            ),
            Demand(
                title="Encaminhar familia ao CRAS do Imbirucu",
                citizen_id=citizen_by_name["Beneficiario 0504"].id,
                category="Assistencia social",
                description="Situacao de vulnerabilidade com necessidade de encaminhamento qualificado.",
                neighborhood="Imbirucu",
                pole_name="Imbirucu",
                priority="alta",
                status="aberta",
            ),
            Demand(
                title="Regularizar comprovante escolar do Beneficiario 0603",
                citizen_id=citizen_by_name["Beneficiario 0603"].id,
                category="Educacao",
                description="Atualizar frequencia escolar para manutencao no programa.",
                neighborhood="Sao Joao",
                pole_name="Sao Joao",
                priority="media",
                status="aberta",
            ),
            Demand(
                title="Visita tecnica ao beneficiario 0402",
                citizen_id=citizen_by_name["Beneficiario 0402"].id,
                category="Acompanhamento",
                description="Verificar demanda familiar e condicoes de adesao as atividades do polo.",
                neighborhood="Parque das Industrias",
                pole_name="Parque das Industrias",
                priority="media",
                status="pendente",
            ),
        ]
        session.add_all(demands)

        tasks = [
            Task(
                title="Ligar para Secretaria de Governo",
                assigned_to="Renata Gestao",
                description="Solicitar retorno sobre apoio institucional para agenda do Polo Central.",
                pole_name="Polo Central",
                priority="alta",
                status="pending",
            ),
            Task(
                title="Protocolar Oficio 001/2026",
                assigned_to="Solange REVISA",
                description="Protocolo administrativo junto ao gabinete parceiro.",
                pole_name="Polo Central",
                priority="alta",
                status="pending",
            ),
            Task(
                title="Atualizar lista de presenca do Sitio Pocoes",
                assigned_to="Carlos Linha de Frente",
                description="Consolidar relatorio semanal de frequencia.",
                pole_name="Sitio Pocoes",
                priority="media",
                status="em andamento",
            ),
            Task(
                title="Conferir consentimentos do Polo Sao Joao",
                assigned_to="Joao Polo",
                description="Verificar cadastros pendentes e anexar autorizacoes.",
                pole_name="Sao Joao",
                priority="media",
                status="pending",
            ),
            Task(
                title="Preparar relatorio por bairro do Imbirucu",
                assigned_to="Renata Gestao",
                description="Separar beneficiarios, demandas e agenda de visitas.",
                pole_name="Imbirucu",
                priority="media",
                status="open",
            ),
        ]
        session.add_all(tasks)

        base_time = datetime.now(UTC).replace(hour=9, minute=0, second=0, microsecond=0)
        activities = [
            Activity(name="Mutirao social no Polo Central", territory="Centro", pole_name="Polo Central", scheduled_for=base_time + timedelta(hours=6)),
            Activity(name="Yoga comunitaria", territory="Sitio Pocoes", pole_name="Sitio Pocoes", scheduled_for=base_time + timedelta(days=1, hours=1)),
            Activity(name="Oficina de artesanato", territory="Bom Repouso", pole_name="Bom Repouso", scheduled_for=base_time + timedelta(days=2, hours=10)),
            Activity(name="Treino esportivo da juventude", territory="Parque das Industrias", pole_name="Parque das Industrias", scheduled_for=base_time + timedelta(days=3, hours=8)),
            Activity(name="Roda de conversa com familias", territory="Imbirucu", pole_name="Imbirucu", scheduled_for=base_time + timedelta(days=4, hours=9)),
            Activity(name="Atendimento itinerante", territory="Sao Joao", pole_name="Sao Joao", scheduled_for=base_time + timedelta(days=5, hours=7)),
            Activity(name="Reuniao de liderancas locais", territory="Novo Horizonte", pole_name="Novo Horizonte", scheduled_for=base_time + timedelta(days=6, hours=11)),
        ]
        session.add_all(activities)

        session.commit()
    finally:
        session.close()


if __name__ == "__main__":
    seed_demo_data()
    print("Demo data seeded successfully.")
