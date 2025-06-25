# Vulnerability Table Assessment

Welcome to Second Front Systems' React take-home assessment! This project simulates working with our Game Warden application, where you'll build components similar to what our team creates daily.

## Assessment Overview

You'll create a vulnerability management interface that:

- Parses security scan data into a sortable and searchable table
- Checks against CISA's public "known exploited vulnerabilities (kev) catalog"
- allows users to dismiss CVEs

## Requirements

### 1. Parse Vulnerability Scan Results

Create a component that ingests and parses security scan results from Trivy, use the `scan-results.json` also attached

### 2. Display Results in a Table

Build a data table following the provided Figma designs that shows:

- Vulnerability ID (CVE)
- Package name and version
- Severity level
- Description
- Any other relevant fields from the scan data

**Design Requirements:**

- Follow the provided Figma mockups
- Implement responsive design
- Include sorting and filtering capabilities
- Handle large datasets efficiently

### 3. Enrich Data with External API

Enhance the vulnerability data by retrieving the latest CISA Known Exploited Vulnerabilities (KEV) Catalog to identify what if any of the scanned vulnerabilities are known to be actively exploited.

### 4. Implement Vulnerability Dismissal

Add functionality to "dismiss" vulnerabilities:

- Add a dismiss action to each table row
- Track dismissed status (local state is fine)
- Provide visual indication of dismissed items
- Allow filtering to show/hide dismissed vulnerabilities

### 5. Additional Features

If you have any additional functionality you want to add that you think would be interesting feel free to do it!

## Technical Requirements

- **Framework**: React with TypeScript (already configured)
- **Routing**: TanStack Router (already configured)
- **Styling**: Your choice - we've included no CSS framework intentionally
- **HTTP Client**: Your choice (fetch, axios, etc.)

## Getting Started

1. clone skeleton

   ```bash
   git clone https://github.com/second-front/react-skeleton
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start development server:**

   ```bash
   npm run dev
   ```

4. **Import sample data:**
   - Sample Trivy scan file is attached as scan_results.json or can be generated manually with the public trivy docker image and Damn Vulnerabile Web App [trivy installation docs (optional)](https://trivy.dev/v0.18.3/installation/)

   ```bash
   docker pull vulnerables/web-dvwa
   trivy image --format json --output scan-results.json vulnerables/web-dvwa
   ```

   - Figma designs are linked [`here`](https://www.figma.com/design/KutSnpcDGQKU9DzyJAI5of/CVE-Tracker?node-id=0-1&m=dev&t=KAu6hoz0eViJKbUP-1)

## Evaluation Criteria

We'll assess your submission based on:

### Code Quality

- Clean, readable, and well-organized code
- Proper TypeScript usage
- Component structure and reusability
- Error handling and edge cases

### Functionality

- All requirements implemented and working
- Smooth user experience
- Proper data parsing and API integration
- Effective state management

### Design Implementation

- Faithful implementation of Figma designs
- Responsive and accessible interface
- Thoughtful UX decisions
- Visual polish and attention to detail

### Technical Decisions

- Appropriate technology choices
- Code organization and architecture

## Submission Guidelines

1. **Time Expectation**: 2-4 hours of work over 2 days
2. **Submission**: Compress the project directory and send via email or file sharing
3. **Documentation**: Be prepared to discuss:
   - Your approach and key decisions
   - Any trade-offs you made
   - How to run and test your solution
   - What you'd improve with more time

## Sample Data & Resources

- `/sample-data/` - Example vulnerability scan outputs
- **CISA KEV**: https://www.cisa.gov/known-exploited-vulnerabilities-catalog

## Questions?

If you have any questions about the requirements or run into technical issues, don't hesitate to reach out. We want you to succeed and show your best work!

Good luck, and we look forward to seeing your solution!
