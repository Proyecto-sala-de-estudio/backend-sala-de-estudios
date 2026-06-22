## Context

The project requires high-level architecture and flow diagrams, which are currently marked as pending in `README.md`. Mermaid is natively supported by GitHub and avoids the need to manage binary image files in the repository.

## Goals / Non-Goals

**Goals:**
- Provide 6 small, abstract, high-level diagrams representing the system.
- Store the diagrams inside the `docs/` folder. Use `.md` files containing Mermaid blocks for diagrams that Mermaid supports well, and `.puml` files for diagrams that Mermaid cannot implement effectively (like Use Case diagrams).

**Non-Goals:**
- Highly detailed or exhaustive diagrams detailing every property and low-level interaction.
- Using external drawing tools like Draw.io for diagrams that can be expressed as code.

## Decisions

- **Text-based Diagram Files**: We will create individual files for each diagram within the `docs/` folder.
- **Diagram Definitions**:
  - `docs/modelo-dominio.md`: A Mermaid class diagram showing `Sala` and `Reserva`.
  - `docs/casos-uso.puml`: A PlantUML use case diagram showing `Estudiante` interacting with `Reservar Sala` with proper UML boundaries and `<<include>>`/`<<extends>>` dependencies.
  - `docs/estados.md`: A Mermaid state diagram showing `Reserva` states (Creada -> Cancelada/Finalizada).
  - `docs/despliegue.md`: A Mermaid deployment diagram showing the Frontend (Next.js), Backend (Express), and DB (Postgres).
  - `docs/componentes.md`: A Mermaid component diagram showing UI components, API Routes, and Database.
  - `docs/secuencia.md`: A Mermaid sequence diagram showing the flow of creating a reservation.

## Risks / Trade-offs

- None. Mermaid is fully text-based and easy to update.
