# KnowledgeOS — Strukturiertes KI-Wissenssystem

Ein KI-gestütztes System zur Transformation unstrukturierter Dokumente in interaktives, strukturiertes Wissen — mit RAG-Analyse, automatischer Mindmap-Generierung und integriertem Chat-Interface.

---

## Kurzbeschreibung

KnowledgeOS ist kein Chatbot. Es ist ein strukturiertes KI-System, das Dokumente nicht nur liest, sondern versteht, vernetzt und visuell aufbereitet. Nutzer laden Dokumente hoch, die das System mittels Retrieval-Augmented Generation analysiert, in strukturierte Mindmaps überführt und in einem interaktiven Arbeitsbereich zugänglich macht. Das Ergebnis ist kein einfacher Textzusammenfassung, sondern ein navigierbares Wissensnetz.

---

## Kernfunktionen

- Dokumenten-Upload mit automatischer Vorverarbeitung (PDF, DOCX, TXT)
- KI-gestützte Inhaltsanalyse via RAG (Retrieval-Augmented Generation)
- Automatische Generierung strukturierter Mindmaps aus Dokumentinhalten
- Interaktiver Chat zur gezielten Abfrage von Dokumentwissen
- Ideenerweiterung durch kontextbewusstes KI-Gespräch
- Optionaler visueller Arbeitsbereich (Whiteboard-Konzept) zur freien Weiterarbeit
- Export- und Weiterverarbeitungsmöglichkeiten der generierten Strukturen

---

## Anwendungsfall

Ein Analyst erhält einen 80-seitigen Forschungsbericht. Statt ihn manuell durchzuarbeiten, lädt er ihn in KnowledgeOS hoch. Das System extrahiert automatisch die zentralen Themen, Abhängigkeiten und Kernaussagen, stellt sie als Mindmap dar und ermöglicht gezielte Nachfragen per Chat. Im angeschlossenen Whiteboard kann er Ideen visuell weiterentwickeln, ohne das System zu verlassen.

---

## Funktionsweise

1. **Upload** — Nutzer lädt ein oder mehrere Dokumente hoch
2. **Preprocessing** — Dokumente werden segmentiert, bereinigt und vektorisiert
3. **RAG-Analyse** — Das KI-Modell analysiert Inhalte kontextbezogen anhand der Vektordatenbank
4. **Mindmap-Generierung** — Aus den strukturierten Ergebnissen wird automatisch eine interaktive Mindmap erstellt
5. **Interaktion** — Nutzer stellt gezielte Fragen im Chat; Antworten referenzieren Dokumentstellen
6. **Erweiterung** — Ideen können im integrierten Chat weiterentwickelt werden
7. **Whiteboard** — Optionaler visueller Arbeitsbereich zur freien Strukturierung und Weiterarbeit

---

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Mermaid.js / React Flow (Mindmap-Rendering)

### Backend
- Next.js API Routes
- Node.js

### KI & Daten
- Ollama (lokale LLM-Inferenz, kein Cloud-Zwang)
- LangChain (RAG-Pipeline)
- ChromaDB / Qdrant (Vektordatenbank)
- LlamaIndex (Dokumentenindexierung)

### Infrastruktur
- Lokal betreibbar, kein externer API-Key erforderlich
- Optional: Vercel Deployment (ohne Ollama-Komponenten)

---

## Architektur

```
Nutzer
  │
  ▼
┌─────────────────────────────────────────┐
│           Next.js Frontend              │
│  Upload · Mindmap · Chat · Whiteboard   │
└──────────────────┬──────────────────────┘
                   │ API
┌──────────────────▼──────────────────────┐
│           Next.js API Routes            │
│   /api/upload · /api/analyze · /api/chat│
└──────────────────┬──────────────────────┘
                   │
       ┌───────────┴───────────┐
       │                       │
┌──────▼──────┐       ┌────────▼────────┐
│  Vektor-DB  │       │  Ollama (LLM)   │
│  ChromaDB   │◄──────│  RAG · Chat     │
└─────────────┘       └─────────────────┘
```

Das System hält alle Komponenten lokal. Dokumente verlassen die Maschine des Nutzers nicht.

---

## Setup

### Voraussetzungen

- Node.js 18+
- Ollama installiert und gestartet (`ollama serve`)
- Ein laufendes LLM-Modell, z.B.: `ollama pull llama3`

### Installation

```bash
git clone https://github.com/NOMX/knowledgeos.git
cd knowledgeos
npm install
cp .env.example .env.local
npm run dev
```

Anwendung läuft unter `http://localhost:3000`.

### Umgebungsvariablen

```env
# Optional: Ollama-Adresse (Standard: http://localhost:11434/v1)
OLLAMA_BASE_URL=http://localhost:11434/v1
```

Kein API-Key erforderlich.

---

## Screenshots / Demo

> Screenshots und Demo-Video folgen nach finaler UI-Fertigstellung.

---

## Geplante Erweiterungen

- Unterstützung mehrerer gleichzeitiger Dokumente mit übergreifender Analyse
- Kollaborationsmodus für Teams (geteilte Wissensbasis)
- Exportfunktion für Mindmaps (PNG, SVG, JSON)
- Versionierung von Dokumentanalysen
- Plugin-System für externe Datenquellen (URLs, APIs, Notion)
- Mobile-optimiertes Interface

---

## Autor

Entwickelt von **NOMX**

---

## Hinweis zur KI-Unterstützung

Dieses Projekt wurde mit Unterstützung von [Claude (Anthropic)](https://claude.ai) als Entwicklungswerkzeug erstellt. Claude wurde als technischer Assistent eingesetzt — für Code-Review, Architekturentscheidungen und Dokumentation. Die Konzeption, Produktentscheidungen und Gesamtverantwortung liegen beim Entwickler. Claude ist ein Werkzeug, kein Autor dieses Projekts.

---

---

# KnowledgeOS — Structured AI Knowledge System

An AI-powered system for transforming unstructured documents into interactive, structured knowledge — with RAG-based analysis, automatic mindmap generation, and an integrated chat interface.

---

## Description

KnowledgeOS is not a chatbot. It is a structured AI system that does not simply read documents, but understands them, connects their contents, and renders them visually. Users upload documents, which the system analyzes via Retrieval-Augmented Generation, converts into structured mindmaps, and makes accessible within an interactive workspace. The output is not a plain text summary — it is a navigable knowledge network.

---

## Key Features

- Document upload with automatic preprocessing (PDF, DOCX, TXT)
- AI-powered content analysis via RAG (Retrieval-Augmented Generation)
- Automatic generation of structured mindmaps from document content
- Interactive chat for targeted queries against document knowledge
- Idea extension through context-aware AI conversation
- Optional visual workspace (whiteboard concept) for continued free-form work
- Export and further processing of generated knowledge structures

---

## Use Case

An analyst receives an 80-page research report. Instead of reading it manually, they upload it to KnowledgeOS. The system automatically extracts the central topics, dependencies, and key statements, displays them as a mindmap, and enables targeted follow-up questions via chat. In the integrated whiteboard, ideas can be developed visually without leaving the system.

---

## How It Works

1. **Upload** — User uploads one or more documents
2. **Preprocessing** — Documents are segmented, cleaned, and vectorized
3. **RAG Analysis** — The AI model analyzes content contextually against the vector database
4. **Mindmap Generation** — An interactive mindmap is automatically created from structured results
5. **Interaction** — User asks targeted questions in chat; answers reference document passages
6. **Extension** — Ideas can be further developed through integrated chat
7. **Whiteboard** — Optional visual workspace for free-form structuring and continuation

---

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Mermaid.js / React Flow (mindmap rendering)

### Backend
- Next.js API Routes
- Node.js

### AI & Data
- Ollama (local LLM inference, no cloud dependency)
- LangChain (RAG pipeline)
- ChromaDB / Qdrant (vector database)
- LlamaIndex (document indexing)

### Infrastructure
- Fully local operation, no external API key required
- Optional: Vercel deployment (without Ollama components)

---

## Architecture Overview

```
User
  │
  ▼
┌─────────────────────────────────────────┐
│           Next.js Frontend              │
│  Upload · Mindmap · Chat · Whiteboard   │
└──────────────────┬──────────────────────┘
                   │ API
┌──────────────────▼──────────────────────┐
│           Next.js API Routes            │
│  /api/upload · /api/analyze · /api/chat │
└──────────────────┬──────────────────────┘
                   │
       ┌───────────┴───────────┐
       │                       │
┌──────▼──────┐       ┌────────▼────────┐
│  Vector DB  │       │  Ollama (LLM)   │
│  ChromaDB   │◄──────│  RAG · Chat     │
└─────────────┘       └─────────────────┘
```

All components run locally. Documents never leave the user's machine.

---

## Setup Instructions

### Prerequisites

- Node.js 18+
- Ollama installed and running (`ollama serve`)
- A local LLM model, e.g.: `ollama pull llama3`

### Installation

```bash
git clone https://github.com/NOMX/knowledgeos.git
cd knowledgeos
npm install
cp .env.example .env.local
npm run dev
```

Application runs at `http://localhost:3000`.

### Environment Variables

```env
# Optional: Ollama address (default: http://localhost:11434/v1)
OLLAMA_BASE_URL=http://localhost:11434/v1
```

No API key required.

---

## Screenshots / Demo

> Screenshots and demo video will be added after final UI completion.

---

## Future Improvements

- Multi-document support with cross-document analysis
- Collaboration mode for teams (shared knowledge base)
- Mindmap export (PNG, SVG, JSON)
- Versioning of document analyses
- Plugin system for external data sources (URLs, APIs, Notion)
- Mobile-optimized interface

---

## Author

Developed by **NOMX**

---

## AI Support Disclaimer

This project was built with the assistance of [Claude (Anthropic)](https://claude.ai) as a development tool. Claude was used as a technical assistant — for code review, architectural decisions, and documentation. All conceptual decisions, product direction, and overall responsibility remain with the developer. Claude is a tool, not the author of this project.
#   s o c i a l c r a f t  
 