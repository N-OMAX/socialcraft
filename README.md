# KnowledgeOS

Strukturiertes KI-System zur Transformation unstrukturierter Dokumente in interaktives Wissen.

Kein Chatbot. Ein System das Dokumente versteht, vernetzt und visuell aufbereitet - mit RAG-Analyse, automatischer Mindmap-Generierung und integriertem Chat-Interface.

---

## Inhalt

- [Beschreibung](#beschreibung)
- [Kernfunktionen](#kernfunktionen)
- [Anwendungsfall](#anwendungsfall)
- [Funktionsweise](#funktionsweise)
- [Tech Stack](#tech-stack)
- [Architektur](#architektur)
- [Installation](#installation)
- [Screenshots](#screenshots)
- [Geplante Erweiterungen](#geplante-erweiterungen)
- [Autor](#autor)
- [KI-Hinweis](#ki-hinweis)
- [English Version](#knowledgeos-english)

---

## Beschreibung

KnowledgeOS transformiert unstrukturierte Dokumente in navigierbare Wissensnetze. Nutzer laden Dokumente hoch, die das System via Retrieval-Augmented Generation analysiert, in strukturierte Mindmaps ueberfuehrt und in einem interaktiven Arbeitsbereich zugaenglich macht. Das Ergebnis ist kein Textzusammenfassung - es ist strukturiertes, abfragbares Wissen.

---

## Kernfunktionen

- Dokumenten-Upload mit automatischer Vorverarbeitung (PDF, DOCX, TXT)
- KI-gestuetzte Inhaltsanalyse via RAG (Retrieval-Augmented Generation)
- Automatische Generierung strukturierter Mindmaps aus Dokumentinhalten
- Interaktiver Chat zur gezielten Abfrage von Dokumentwissen
- Ideenerweiterung durch kontextbewusstes KI-Gespraech
- Optionaler visueller Arbeitsbereich (Whiteboard-Konzept)
- Export der generierten Wissensstrukturen

---

## Anwendungsfall

Ein Analyst erhaelt einen 80-seitigen Forschungsbericht. Statt ihn manuell durchzuarbeiten, laedt er ihn in KnowledgeOS hoch. Das System extrahiert automatisch zentrale Themen, Abhaengigkeiten und Kernaussagen, stellt sie als Mindmap dar und ermoeglicht gezielte Nachfragen per Chat. Im integrierten Whiteboard kann er Ideen visuell weiterentwickeln, ohne das System zu verlassen.

---

## Funktionsweise

1. Upload - Nutzer laedt ein oder mehrere Dokumente hoch
2. Preprocessing - Dokumente werden segmentiert, bereinigt und vektorisiert
3. RAG-Analyse - Das KI-Modell analysiert Inhalte kontextbezogen gegen die Vektordatenbank
4. Mindmap-Generierung - Interaktive Mindmap wird automatisch aus den Ergebnissen erstellt
5. Interaktion - Geziele Fragen im Chat; Antworten referenzieren Dokumentstellen
6. Erweiterung - Ideen werden im integrierten Chat weitergefuehrt
7. Whiteboard - Optionaler visueller Arbeitsbereich zur freien Strukturierung

---

## Tech Stack

**Frontend**
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Mermaid.js / React Flow (Mindmap-Rendering)

**Backend**
- Next.js API Routes
- Node.js

**KI und Daten**
- Ollama (lokale LLM-Inferenz, kein Cloud-Zwang)
- LangChain (RAG-Pipeline)
- ChromaDB / Qdrant (Vektordatenbank)
- LlamaIndex (Dokumentenindexierung)

**Infrastruktur**
- Vollstaendig lokal betreibbar, kein externer API-Key erforderlich
- Optional: Vercel Deployment

---

## Architektur

```
Nutzer
  |
  v
+------------------------------------------+
|           Next.js Frontend               |
|  Upload  Mindmap  Chat  Whiteboard       |
+------------------+-----------------------+
                   | API
+------------------v-----------------------+
|           Next.js API Routes             |
|  /api/upload  /api/analyze  /api/chat    |
+------------------+-----------------------+
                   |
       +-----------+-----------+
       |                       |
+------v------+       +--------v--------+
|  Vector DB  |       |  Ollama (LLM)   |
|  ChromaDB   |<------|  RAG  Chat      |
+-------------+       +-----------------+
```

Alle Komponenten laufen lokal. Dokumente verlassen die Maschine des Nutzers nicht.

---

## Installation

**Voraussetzungen**

- Node.js 18 oder hoeher
- Ollama installiert: https://ollama.com
- Git

**Schritt 1 - Ollama starten und Modell laden**

```bash
ollama serve
ollama pull llama3
```

**Schritt 2 - Repository klonen**

```bash
git clone https://github.com/NOMX/knowledgeos.git
cd knowledgeos
```

**Schritt 3 - Abhaengigkeiten installieren**

```bash
npm install
```

**Schritt 4 - Umgebungsvariablen**

```bash
cp .env.example .env.local
```

Inhalt von `.env.local` (kein API-Key erforderlich):

```
# Optional: Ollama-Adresse anpassen falls noetig
OLLAMA_BASE_URL=http://localhost:11434/v1
```

**Schritt 5 - Anwendung starten**

```bash
npm run dev
```

Anwendung laeuft unter http://localhost:3000

---

## Screenshots

Screenshots und Demo-Video folgen nach finaler UI-Fertigstellung.

---

## Geplante Erweiterungen

- Multi-Dokument-Analyse mit dokumentuebergreifenden Verbindungen
- Kollaborationsmodus fuer Teams mit geteilter Wissensbasis
- Mindmap-Export (PNG, SVG, JSON)
- Versionierung von Dokumentanalysen
- Plugin-System fuer externe Datenquellen (URLs, APIs, Notion)
- Mobile-optimiertes Interface

---

## Autor

Entwickelt von **NOMX**

---

## KI-Hinweis

Dieses Projekt wurde mit Unterstuetzung von [Claude (Anthropic)](https://claude.ai) als Entwicklungswerkzeug erstellt. Claude wurde als technischer Assistent eingesetzt - fuer Code-Review, Architekturentscheidungen und Dokumentation. Konzeption, Produktentscheidungen und Gesamtverantwortung liegen beim Entwickler. Claude ist ein Werkzeug, kein Autor dieses Projekts.

---

---

# SocialCraft

KI-gestuetzter Social Media Content Generator mit lokalen Sprachmodellen via Ollama.

Generiert plattformspezifische Captions, Hashtags und Image Prompts fuer 6 verschiedene Bildgeneratoren - vollstaendig offline, kein API-Key erforderlich.

---

## SocialCraft - Installation

**Voraussetzungen**

- Node.js 18 oder hoeher
- Ollama installiert und gestartet: https://ollama.com
- Git

**Schritt 1 - Ollama starten und Modelle laden**

```bash
ollama serve
```

Eines oder mehrere der unterstuetzten Modelle pullen:

```bash
ollama pull qwen2.5-coder:14b
ollama pull qwen2.5-coder:7b
ollama pull llama3
ollama pull deepseek-coder-v2:16b
```

**Schritt 2 - Repository klonen oder Archiv entpacken**

Option A - via Git:

```bash
git clone https://github.com/NOMX/socialcraft.git
cd socialcraft
```

Option B - via Archiv (social-ai-final.tar.gz):

Windows PowerShell:
```powershell
# WICHTIG: Pfad darf keine Sonderzeichen enthalten (kein !, &, etc.)
# Falsch: C:\!! Projekte\socialcraft
# Richtig: C:\Projects\socialcraft

cd C:\Projects
tar -xzf social-ai-final.tar.gz
cd social-ai
```

macOS / Linux:
```bash
cd ~/Projects
tar -xzf social-ai-final.tar.gz
cd social-ai
```

**Schritt 3 - Abhaengigkeiten installieren**

```bash
npm install
```

**Schritt 4 - Umgebungsvariablen (optional)**

```bash
cp .env.example .env.local
```

Standard-Konfiguration funktioniert ohne Aenderungen:

```
# Nur aendern falls Ollama auf einem anderen Port laeuft
OLLAMA_BASE_URL=http://localhost:11434/v1
```

**Schritt 5 - Anwendung starten**

```bash
npm run dev
```

Anwendung laeuft unter http://localhost:3000

**Schritt 6 - Ollama sicherstellen**

Falls die App einen Verbindungsfehler zeigt:

```bash
# Neues Terminal oeffnen und Ollama starten
ollama serve
```

---

## SocialCraft - Funktionen

- LLM-Auswahl direkt in der UI (Qwen 14B/7B, Llama 3, DeepSeek Coder V2)
- Plattformen: Instagram, Twitter/X, LinkedIn, TikTok
- Toene: Professional, Casual, Humorous, Inspirational
- Image Prompts optimiert fuer: Midjourney, DALL-E 3, Stable Diffusion, Flux, Ideogram, Adobe Firefly
- Post-History gespeichert im Browser (localStorage, Key: social_ai_posts)
- History loeschen: Browser DevTools (F12) -> Application -> Local Storage -> localhost:3000 -> social_ai_posts

---

## SocialCraft - Bekannte Einschraenkungen

- Webpack erlaubt keine Sonderzeichen (!, &, etc.) im Projektpfad auf Windows
- Loesung: Projekt in einen sauberen Pfad verschieben, z.B. C:\Projects\socialcraft

---

---

# KnowledgeOS (English)

Structured AI system for transforming unstructured documents into interactive knowledge.

Not a chatbot. A system that understands, connects, and visually structures documents - with RAG-based analysis, automatic mindmap generation, and an integrated chat interface.

---

## Description

KnowledgeOS transforms unstructured documents into navigable knowledge networks. Users upload documents which the system analyzes via Retrieval-Augmented Generation, converts into structured mindmaps, and makes accessible within an interactive workspace. The output is not a plain summary - it is structured, queryable knowledge.

---

## Key Features

- Document upload with automatic preprocessing (PDF, DOCX, TXT)
- AI-powered content analysis via RAG (Retrieval-Augmented Generation)
- Automatic generation of structured mindmaps from document content
- Interactive chat for targeted queries against document knowledge
- Idea extension through context-aware AI conversation
- Optional visual workspace (whiteboard concept)
- Export of generated knowledge structures

---

## Use Case

An analyst receives an 80-page research report. Instead of reading it manually, they upload it to KnowledgeOS. The system automatically extracts central topics, dependencies, and key statements, displays them as a mindmap, and enables targeted follow-up questions via chat. In the integrated whiteboard, ideas can be developed visually without leaving the system.

---

## How It Works

1. Upload - User uploads one or more documents
2. Preprocessing - Documents are segmented, cleaned, and vectorized
3. RAG Analysis - The AI model analyzes content contextually against the vector database
4. Mindmap Generation - An interactive mindmap is automatically created from structured results
5. Interaction - Targeted questions in chat; answers reference document passages
6. Extension - Ideas are continued through integrated chat
7. Whiteboard - Optional visual workspace for free-form structuring

---

## Tech Stack

**Frontend**
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Mermaid.js / React Flow (mindmap rendering)

**Backend**
- Next.js API Routes
- Node.js

**AI and Data**
- Ollama (local LLM inference, no cloud dependency)
- LangChain (RAG pipeline)
- ChromaDB / Qdrant (vector database)
- LlamaIndex (document indexing)

**Infrastructure**
- Fully local operation, no external API key required
- Optional: Vercel deployment

---

## Architecture Overview

```
User
  |
  v
+------------------------------------------+
|           Next.js Frontend               |
|  Upload  Mindmap  Chat  Whiteboard       |
+------------------+-----------------------+
                   | API
+------------------v-----------------------+
|           Next.js API Routes             |
|  /api/upload  /api/analyze  /api/chat    |
+------------------+-----------------------+
                   |
       +-----------+-----------+
       |                       |
+------v------+       +--------v--------+
|  Vector DB  |       |  Ollama (LLM)   |
|  ChromaDB   |<------|  RAG  Chat      |
+-------------+       +-----------------+
```

All components run locally. Documents never leave the user's machine.

---

## Setup Instructions

**Prerequisites**

- Node.js 18 or higher
- Ollama installed: https://ollama.com
- Git

**Step 1 - Start Ollama and pull a model**

```bash
ollama serve
ollama pull llama3
```

**Step 2 - Clone the repository**

```bash
git clone https://github.com/NOMX/knowledgeos.git
cd knowledgeos
```

**Step 3 - Install dependencies**

```bash
npm install
```

**Step 4 - Environment variables**

```bash
cp .env.example .env.local
```

Contents of `.env.local` (no API key required):

```
# Optional: adjust Ollama address if needed
OLLAMA_BASE_URL=http://localhost:11434/v1
```

**Step 5 - Start the application**

```bash
npm run dev
```

Application runs at http://localhost:3000

---

## Screenshots / Demo

Screenshots and demo video will be added after final UI completion.

---

## Future Improvements

- Multi-document analysis with cross-document connections
- Collaboration mode for teams with shared knowledge base
- Mindmap export (PNG, SVG, JSON)
- Versioning of document analyses
- Plugin system for external data sources (URLs, APIs, Notion)
- Mobile-optimized interface

---

## Author

Developed by **NOMX**

---

## AI Support Disclaimer

This project was built with the assistance of [Claude (Anthropic)](https://claude.ai) as a development tool. Claude was used as a technical assistant - for code review, architectural decisions, and documentation. All conceptual decisions, product direction, and overall responsibility remain with the developer. Claude is a tool, not the author of this project.
