# Room Filtering Capability

**Purpose**: Defines the requirements for filtering the catalog of rooms in the frontend.

## Requirements

### Requirement: Filter rooms by building
The system SHALL allow users to filter the list of rooms by the building they are located in.

#### Scenario: Filter by building matches
- **WHEN** the user selects or enters a specific building in the filter
- **THEN** the system displays only the rooms located in that building

### Requirement: Filter rooms by capacity
The system SHALL allow users to filter the list of rooms by minimum capacity.

#### Scenario: Filter by minimum capacity
- **WHEN** the user inputs a minimum capacity value
- **THEN** the system displays only rooms that have a capacity equal to or greater than the specified value

### Requirement: Filter rooms by availability status
The system SHALL allow users to filter rooms based on whether they are available or not.

#### Scenario: Filter available rooms
- **WHEN** the user selects the "available" status filter
- **THEN** the system displays only rooms with the "disponible" status
