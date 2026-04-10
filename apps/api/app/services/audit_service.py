from collections.abc import Mapping


def build_audit_event(action: str, entity_name: str, entity_id: str, payload: Mapping[str, object] | None = None) -> dict[str, object]:
    return {
        "action": action,
        "entity_name": entity_name,
        "entity_id": entity_id,
        "payload": dict(payload or {}),
    }
