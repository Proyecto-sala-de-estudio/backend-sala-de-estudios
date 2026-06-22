# Reservation Filtering Capability

**Purpose**: Defines the requirements for filtering active reservations in the frontend.

## Requirements

### Requirement: Filter reservations by student name
The system SHALL allow users to filter the list of active reservations by the name of the student who made the reservation.

#### Scenario: Filter by student name substring
- **WHEN** the user types a name or partial name into the student filter
- **THEN** the system displays only the reservations where the student's name contains the typed text (case-insensitive)

### Requirement: Filter reservations by date
The system SHALL allow users to filter active reservations by their scheduled date.

#### Scenario: Filter for a specific date
- **WHEN** the user selects a specific date in the filter
- **THEN** the system displays only reservations scheduled for that exact date
