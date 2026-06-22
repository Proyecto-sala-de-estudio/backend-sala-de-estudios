## Why

The project `README.md` references several high-level diagrams (Domain Model, Use Case, State, Deployment, Component, Sequence) that are currently marked as "Pending creation". Creating these diagrams as small, abstract, and high-level visuals using Mermaid and PlantUML will provide clear documentation of the system's architecture without being overly verbose, fulfilling the project requirements.

## What Changes

- Create 6 markdown/puml files inside `docs/` containing diagram definitions.
- The diagrams will be: `docs/modelo-dominio.md`, `docs/casos-uso.puml` (PlantUML), `docs/estados.md`, `docs/despliegue.md`, `docs/componentes.md`, `docs/secuencia.md`.
- Each diagram will be small, abstract, and high-level. Diagrams that cannot be properly modeled in Mermaid (such as Use Case diagrams with system boundaries and <<include>>/<<extends>> relationships) will be implemented using PlantUML.
- Update `README.md` to link to these new files.

## Capabilities

### New Capabilities
- `system-diagrams`: capability documenting the creation of system architecture diagrams.

### Modified Capabilities

## Impact

- Improves project documentation.
- No impact on application logic or behavior.
