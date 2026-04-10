from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.territory import Neighborhood, Pole
from app.schemas.territory import NeighborhoodCreate, PoleCreate


def list_poles(db: Session) -> list[Pole]:
    return list(db.execute(select(Pole).order_by(Pole.name.asc())).scalars().all())


def list_neighborhoods(db: Session) -> list[Neighborhood]:
    return list(db.execute(select(Neighborhood).order_by(Neighborhood.name.asc())).scalars().all())


def get_or_create_pole(db: Session, name: str, city: str = "") -> Pole:
    normalized_name = name.strip()
    pole = db.execute(select(Pole).where(Pole.name.ilike(normalized_name))).scalar_one_or_none()
    if pole:
        if city.strip() and not pole.city:
            pole.city = city.strip()
            db.add(pole)
            db.commit()
            db.refresh(pole)
        return pole

    pole = Pole(name=normalized_name, city=city.strip())
    db.add(pole)
    db.commit()
    db.refresh(pole)
    return pole


def get_or_create_neighborhood(db: Session, name: str, city: str = "") -> Neighborhood:
    normalized_name = name.strip()
    neighborhood = db.execute(select(Neighborhood).where(Neighborhood.name.ilike(normalized_name))).scalar_one_or_none()
    if neighborhood:
        if city.strip() and not neighborhood.city:
            neighborhood.city = city.strip()
            db.add(neighborhood)
            db.commit()
            db.refresh(neighborhood)
        return neighborhood

    neighborhood = Neighborhood(name=normalized_name, city=city.strip())
    db.add(neighborhood)
    db.commit()
    db.refresh(neighborhood)
    return neighborhood


def create_pole(db: Session, payload: PoleCreate) -> Pole:
    return get_or_create_pole(db, payload.name, payload.city)


def create_neighborhood(db: Session, payload: NeighborhoodCreate) -> Neighborhood:
    return get_or_create_neighborhood(db, payload.name, payload.city)
