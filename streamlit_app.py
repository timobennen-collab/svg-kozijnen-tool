import streamlit as st
from streamlit.components.v1 import html
import os
from pathlib import Path

# Bepaal het basispad automatisch op basis van de locatie van dit script
# Dit zorgt ervoor dat het pad altijd correct is, ongeacht waar het script wordt uitgevoerd
BASE_PATH = Path(__file__).parent.resolve()

SVG_OPTIONS = {
    "Buiten linksdraaiend raam": BASE_PATH / "public" / "public" / "assets" / "icons" / "buiten linksdraaiend raam.svg",
    "Buiten linksdraaiend raam met rooster": BASE_PATH / "public" / "public" / "assets" / "icons" / "buiten linksdraaiend raam met rooster.svg",
}

st.set_page_config(page_title="Kozijnen Configurator (Streamlit)", layout="wide")

st.subheader("HTML Preview")

html_file = BASE_PATH / "public" / "example.html"
if html_file.exists():
    with open(html_file, "r", encoding="utf-8") as f:
        html_content = f.read()
    html(html_content, height=800, scrolling=True)
else:
    st.info("📁 Geen HTML bestand gevonden. Plaats jouw HTML code in `public/example.html`.")


