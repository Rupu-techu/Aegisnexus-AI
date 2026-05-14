from __future__ import annotations

import os
from typing import Any

try:  # pragma: no cover - optional in non-Streamlit contexts
    import streamlit as st
except ImportError:  # pragma: no cover - local backend-only runtime
    st = None


def get_setting(name: str, default: Any = None) -> Any:
    if st is not None:
        try:
            return st.secrets[name]
        except Exception:
            pass

    return os.getenv(name, default)
