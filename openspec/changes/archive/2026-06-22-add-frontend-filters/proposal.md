## Why

The current web interface displays all rooms (salas) and active reservations (reservas) in a single list, which can be overwhelming when there is a large amount of data. Implementing a filtering system in the frontend solves this by allowing users to quickly find specific rooms or reservations based on relevant criteria, improving usability and the overall user experience.

## What Changes

- Add a UI filter section above the room catalog to filter rooms by capacity, building (edificio), and availability (estado).
- Add a UI filter section above the active reservations to filter by student name or date.
- Update the React state to hold the filter criteria and apply them to the displayed lists dynamically.

## Capabilities

### New Capabilities
- `room-filtering`: Adds filtering capabilities for the room catalog in the frontend, enabling filtering by capacity, building, and availability status.
- `reservation-filtering`: Adds filtering capabilities for the active reservations in the frontend, enabling filtering by student name and date.

### Modified Capabilities

## Impact

- **Frontend UI (`frontend/app/page.js`)**: Will be modified to include the new input fields (text, select, date) for the filters and logic to apply these filters to the `salas` and `reservas` state variables before rendering them.
- **User Experience**: Users will have an easier time navigating the platform when a large number of rooms or reservations exist.
