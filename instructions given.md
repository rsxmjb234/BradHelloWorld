I found internal references describing both the current SPRL transaction model and the planned PDR integration model, including patient discovery (XCPD), document query, and document retrieval flows.

For a website whose purpose is to educate stakeholders on the migration from SPRL to PDR, I would make the core requirement a side-by-side transaction comparison matrix.

Functional Requirements
1. Purpose

The website shall provide a transaction-by-transaction comparison between the current SHIN-NY Statewide Patient Record Locator (SPRL) workflow and the future Primary Document Repository (PDR) workflow.

The website shall enable business, technical, and QE stakeholders to understand:

What transaction occurs today in SPRL.
What equivalent capability exists in PDR.
What changes for the requestor.
What systems participate.
What standards/protocols are used.
Migration status.
2. Landing Page
FR-001 Transaction Comparison Dashboard

The system shall display a side-by-side comparison table with:

SPRL Transaction	PDR EquivalentPatient Discovery	Patient Lookup / Patient Resolution
Document Discovery	Document Manifest Search
Document Retrieve	Document Retrieval
CCD Aggregation	Repository Search Across Documents
Alert Driven Retrieval	Alert Driven Retrieval from PDR
Cross-QE Query	Repository Query
Clinical Portal Query	Clinical Portal Query

The dashboard shall visually indicate:

Current State
Future State
In Progress
Retired
3. Patient Discovery Comparison
FR-002 Patient Discovery View

The system shall provide a detailed side-by-side comparison.

SPRL Column

Display:

IHE XCPD transaction
Query sent to SPRL
SPRL identifies participating QEs
Returns patient identifiers
Returns locations where patient records may exist
PDR Column

Display:

Patient Lookup service
Uses Verato/sMPI matching
Identifies patient within PDR
Returns repository-specific patient identity
Supports subsequent document search

Source architecture shows PDR introducing patient lookup and link identifiers before document retrieval.

4. Document Discovery Comparison
FR-003 Document Discovery View

The system shall display:

SPRL
User submits document discovery request.
QE network queried.
Locations containing documents identified.
Metadata returned to requestor.
PDR
Query PDR Document Index.
Repository searches stored document metadata.
Matching documents returned.
Manifest returned without contacting multiple QEs.

PDR documentation describes searching for available documents prior to retrieval.

5. Document Retrieval Comparison
FR-004 Document Retrieve View
SPRL
Request sent via XCA Retrieve.
SPRL routes request to identified QE.
QE returns CCD/document.
Results returned to requester.
PDR
Retrieve document directly from repository.
Repository returns selected document.
No QE fan-out required.
Document returned using API.

Architecture documentation identifies PDR as a new document holder supporting document query and retrieval operations.

6. End-to-End Flow Visualization
FR-005 Workflow Diagram

For every transaction the site shall display:

SPRL Flow
Provider
   ↓
QE
   ↓
SPRL
   ↓
Other QEs
   ↓
Documents Returned

PDR Flow
Provider
   ↓
PDR
   ↓
Document Store
   ↓
Documents Returned


Architecture materials describe PDR becoming a centralized document holder and repository.

7. Transaction Detail Page
FR-006 Individual Transaction Pages

Selecting a transaction shall open a detail page containing:

Business purpose
Triggering event
Input message
Output message
Standards used
Security requirements
Participating systems
Migration impact
Benefits
8. Standards Mapping
FR-007 Standards Matrix

For every transaction the system shall display:

Capability	SPRL	PDRPatient Discovery	XCPD	Patient Lookup
Document Discovery	XCA Query	Manifest Search
Document Retrieve	XCA Retrieve	Document Retrieval API
Transport	IHE/XML	FHIR JSON/API
Repository	QEs	PDR Repository

Architecture documentation explicitly references IHE XML on the SPRL side and FHIR JSON integration for PDR.

9. Migration Impact View
FR-008 Migration Impact

For every transaction the site shall display:

No change
Minor change
Major change
Retired

Examples:

Transaction	ImpactPatient Discovery	Minor
Document Discovery	Major
Document Retrieve	Major
XCA Routing	Retired
Repository Search	New
10. Search Capability
FR-009 Search

Users shall be able to search by:

Transaction name
Standard
System
QE
PDR capability

Example searches:

"Patient Discovery"
"XCPD"
"Document Retrieve"
"FHIR"
"XCA"
11. Export
FR-010 Export

The system shall allow export of the side-by-side comparison as:

PDF
Word
Excel
Suggested Initial Transaction List

Based on the SPRL reports and PDR architecture documentation, the first release should include:

Patient Discovery
Document Discovery
Document Retrieve
CCD Retrieval
Alert Driven Retrieval
Clinical Portal Auto Query
On-Demand Document Query
Cross-QE Querying
Patient Identity Resolution
Document Manifest Search
Repository Document Retrieval
Subscription/Alert Document Access

The most important page should be the first one: a single side-by-side table showing the entire Patient Discovery → Document Discovery → Document Retrieve journey, because that is the mental model most QE leaders already understand from SPRL