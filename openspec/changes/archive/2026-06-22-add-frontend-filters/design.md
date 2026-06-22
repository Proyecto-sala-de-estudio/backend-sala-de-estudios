## Context

The current frontend lists all available rooms and active reservations without any option to filter them. As the number of entries grows, users may find it tedious to scroll and locate a room or a specific reservation. Implementing local filtering directly in the React frontend allows for a fast and responsive user experience without needing additional backend endpoints at this time.

## Goals / Non-Goals

**Goals:**
- Implement state-based filtering for the room catalog in `frontend/app/page.js`.
- Implement state-based filtering for active reservations in `frontend/app/page.js`.
- Provide intuitive UI controls (dropdowns, text inputs, date pickers) for users to filter by specific fields.

**Non-Goals:**
- Implementing server-side filtering or pagination.
- Changing backend API responses or endpoints.
- Introducing a global state management library (like Redux or Zustand); local component state is sufficient.

## Decisions

- **Local State Filtering**: We will use React's `useState` to store filter criteria (e.g., `filterRoomCapacity`, `filterRoomBuilding`, `filterRoomStatus`, `filterResName`, `filterResDate`). The displayed list will be a computed derived state from the fetched data based on these filter variables. This avoids mutating the original `salas` and `reservas` data arrays.
  - *Alternative*: Refetch from backend with query params. *Rejected* because backend might not support it and it's slower than local filtering for a small-to-medium dataset.
- **UI Placement**: Filters will be placed directly above their respective lists (Catalog and Active Bookings) inside a small collapsible or fixed container for easy access without disrupting the current layout too much.

## Risks / Trade-offs

- **Performance with Large Datasets** → Local filtering might become slow if thousands of records are returned. *Mitigation*: The current application scale is small, so local filtering is optimal. If scale grows, server-side filtering can be added later.
