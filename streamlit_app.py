import streamlit as st
from streamlit.components.v1 import html
import os
from pathlib import Path

SVG_OPTIONS = {
    "Buiten linksdraaiend raam": Path("public/public/assets/icons/buiten linksdraaiend raam.svg"),
    "Buiten linksdraaiend raam met rooster": Path("public/public/assets/icons/buiten linksdraaiend raam met rooster.svg"),
}

st.set_page_config(page_title="Kozijnen Configurator (Streamlit)", layout="wide")

st.subheader("HTML Preview")

html_file = "public/example.html"
if os.path.exists(html_file):
    with open(html_file, "r", encoding="utf-8") as f:
        html_content = f.read()
    html(html_content, height=800, scrolling=True)
else:
    st.info("📁 Geen HTML bestand gevonden. Plaats jouw HTML code in `public/example.html`.")


