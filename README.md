# Hisab — Everyday calculations, made simple.

[![Java](https://img.shields.io/badge/Java-25-orange.svg)](https://openjdk.org/projects/jdk/25/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.1.2-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Node](https://img.shields.io/badge/Node.js-26.13-339933.svg)](https://nodejs.org/)
[![Vue](https://img.shields.io/badge/Vue.js-3.5-4FC08D.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF.svg)](https://vitejs.dev/)
[![Vuetify](https://img.shields.io/badge/Vuetify-3.13-1867C0.svg)](https://vuetifyjs.com/)

**Hisab** is a high-performance web platform that delivers essential calculators and personal finance management tools. The initial release provides:
1. **Standard Calculator**: Safe, precision-based arithmetic and percentage evaluation.
2. **DPS Calculator**: Recurring Deposit Pension Scheme maturity and interest modeling.
3. **Bangladesh Income Tax Calculator**: Statutory assessment calculator conforming to the Bangladesh Income Tax Act 2023 and the Finance Act.

Built as a **Modular Monolith**, Hisab packages both the compiled Vue 3 frontend and Spring Boot backend into a **single executable JAR artifact** (`target/hisab.jar`).

---

## 1. Technology Stack & Versions

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Language** | Java (OpenJDK) | 25 | Backend execution platform |
| **Framework** | Spring Boot | 4.1.2 | Web MVC, dependency injection, validation |
| **API Docs** | Springdoc OpenAPI | 3.2.0 | Swagger UI & OpenAPI 3.1 schema generation |
| **Build System**| Apache Maven | 3.9+ | Toolchain orchestration & artifact packaging |
| **Node Toolchain**| Node.js / npm | 26.13.0 / 12.2.1 | Modern LTS JavaScript runtime & package manager |
| **Frontend UI** | Vue.js | 3.5.44 | Reactive component architecture |
| **Component Lib**| Vuetify 3 | 3.13.7 | Material Design UI & accessible layout |
| **Type System** | TypeScript | 6.0.3 | Strict type safety across client layers |
| **Bundler** | Vite | 8.3.5 | Modern high-speed bundler & production asset hashing |
| **Client Test** | Vitest & Vue Test Utils | 5.0.5 / 2.5.1 | Unit testing for frontend components |
| **Server Test** | JUnit 5 & Spring Test | 6.0.3 / 7.0.10 | Automated service, controller, and routing tests |

---

## 2. Critical Deployment: One Executable JAR

Hisab produces a self-contained executable JAR:
```bash
target/hisab.jar
```
The JAR contains:
- Spring Boot backend classes and domain services.
- Tomcat embedded HTTP server.
- All backend runtime dependencies.
- Compiled frontend assets in `BOOT-INF/classes/static/` (`index.html`, content-hashed JS/CSS, fonts, favicons).

### Production Runtime Requirements
To run in production, only Java 25 is required:
```bash
java -jar target/hisab.jar
```
**No Node.js, npm, separate frontend server, Nginx, or database is needed to run the application.**

---

## 3. Build Prerequisites

Ensure the following tools are available on your Linux environment:
- **Java Development Kit (JDK) 25**:
  ```bash
  export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64
  export PATH=$JAVA_HOME/bin:$PATH
  java -version
  ```
- **Apache Maven 3.9+**:
  ```bash
  mvn -version
  ```
- **Node.js**:
  Node.js (v26.13.0 LTS) and npm (12.2.1) are handled automatically by Maven during `mvn clean package` via `frontend-maven-plugin`. For independent frontend development, Node 26 can be enabled via nvm:
  ```bash
  nvm use 26
  node -v
  ```

---

## 4. Development Setup

### Running the Frontend (Independent Vite Dev Server)
The Vite development server provides instant Hot Module Replacement (HMR) and automatically proxies `/api/**` calls to the Spring Boot backend on `localhost:8080`:

```bash
cd frontend
npm ci
npm run dev
```
Access the client development server at: `http://localhost:5173`

### Running the Backend Independently
Start the Spring Boot backend in a separate terminal:
```bash
mvn spring-boot:run
```
The backend listens on `http://localhost:8080`.

---

## 5. Full Production Build

Run the integrated Maven build from the project root:
```bash
mvn clean package
```

### What this command does:
1. Installs/verifies local Node.js `v22.11.0` and npm `10.9.0` toolchain in `target/node` via `frontend-maven-plugin`.
2. Installs frontend dependencies using `package-lock.json` (`npm ci`).
3. Runs the production TypeScript checks (`vue-tsc --noEmit`) and Vite bundle build (`vite build`).
4. Generates content-hashed JavaScript, CSS, and web fonts in `frontend/dist`.
5. Copies all static assets into `${project.build.outputDirectory}/static` (`target/classes/static/`).
6. Compiles all Java 25 backend classes.
7. Executes all automated unit and integration tests.
8. Packages the entire application into `target/hisab.jar`.

---

## 6. Running the Production JAR

Once built, start the production application with:
```bash
java -jar target/hisab.jar
```

Now open your browser and navigate to:
- **Home Page**: `http://localhost:8080/`
- **Calculator**: `http://localhost:8080/tools/calculator`
- **DPS Calculator**: `http://localhost:8080/tools/dps-calculator`
- **Tax Calculator**: `http://localhost:8080/tools/tax-calculator`
- **OpenAPI Swagger UI**: `http://localhost:8080/swagger-ui.html`
- **OpenAPI JSON Spec**: `http://localhost:8080/v3/api-docs`

---

## 7. REST API Endpoints

All backend endpoints are prefixed with `/api/v1/`:

| Method | Endpoint | Description | Request Payload | Response Sample |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/health` | Service health status | None | `{"status":"UP","version":"1.0.0","timestamp":"..."}` |
| `GET` | `/api/v1/tools` | Tool catalog & search metadata | None | `[{"id":"calculator","name":"Calculator",...}]` |
| `GET` | `/api/v1/tools/{id}` | Single tool metadata | None | `{"id":"dps-calculator",...}` |
| `POST` | `/api/v1/calculator/evaluate` | Evaluates arithmetic expression | `{"expression":"12 + 5 * (3 - 1)"}` | `{"expression":"...","result":"22","formattedResult":"22"}` |
| `POST` | `/api/v1/dps/calculate` | Recurring savings maturity calculation | `{"monthlyDeposit":5000,"durationMonths":36,"annualInterestRate":8.5,"depositTiming":"BEGINNING_OF_MONTH","compoundingFrequency":"MONTHLY"}` | `{"totalPrincipal":180000,"estimatedProfit":25659.81,"maturityAmount":205659.81,...}` |
| `POST` | `/api/v1/tax/calculate` | Bangladesh income tax assessment | `{"taxYear":"2024-2025","category":"GENERAL","location":"DHAKA_CHATTOGRAM_CITY","annualSalary":1200000,"eligibleInvestment":100000}` | `{"grossIncome":1200000,"taxableIncome":800000,"finalTax":25000,...}` |

### API Error Handling & Status Codes
- `200 OK`: Request succeeded.
- `400 Bad Request`: Input validation failed, malformed expression, or unsupported tax year.
  ```json
  {
    "status": 400,
    "error": "Bad Request",
    "message": "Validation failed for one or more fields",
    "path": "/api/v1/dps/calculate",
    "timestamp": "2026-10-29T14:30:00Z",
    "fieldErrors": {
      "monthlyDeposit": "Monthly deposit must be at least 1.00"
    }
  }
  ```
- `404 Not Found`: Unknown API routes or missing static assets.
- `405 Method Not Allowed`: Invalid HTTP method.
- `500 Internal Server Error`: Sanitized error response without stack trace leakage.

---

## 8. Deployment & Cache Behavior

Hisab implements strict cache headers to ensure users immediately receive updated frontend code following a deployment without needing to manually clear browser caches:

1. **SPA Entry Point (`/`, `/tools/**`, `/index.html`)**:
   - Headers: `Cache-Control: no-cache, no-store, must-revalidate, max-age=0`
   - Browsers always revalidate the index HTML to discover the latest content-hashed asset filenames.
2. **Hashed Assets (`/assets/*.js`, `/assets/*.css`, web fonts)**:
   - Headers: `Cache-Control: max-age=31536000, public, immutable`
   - Content hashes in the filename allow safe long-term caching.
3. **Defensive SPA Routing**:
   - `/`, `/tools`, `/tools/**` forward cleanly to `index.html`.
   - `/api/**` endpoints **never** fall through to HTML.
   - Unknown `/api/**` endpoints return JSON 404.
   - Missing static assets (e.g. `/assets/missing.js`) return 404, not `index.html` with HTTP 200.

---

## 9. Automated Testing

### Running Frontend Tests (Vitest)
```bash
cd frontend
npm test
```
- Tests tool registry matching (case-insensitive, keywords, descriptions).
- Tests empty state and search clear.
- Tests Vue Router navigation and route metadata.
- Tests API service layer and exception handling.
- Tests `ToolCard` and `HomeView` component rendering.

### Running Backend Tests (JUnit 5 / Spring Test)
```bash
mvn test
```
- Tests application context loading.
- Tests health and tool registry endpoints.
- Tests safe arithmetic expression parser, operator precedence, percentages, exponents, division by zero, and invalid tokens.
- Tests DPS compounding calculations, zero-interest edge cases, and deposit timing differences.
- Tests Bangladesh tax ruleset selection, 1/3 salary exemption, slab calculations, Section 78 investment rebates, and minimum tax application.
- Tests SPA routing, no-cache headers, and 404 isolation for unknown APIs and assets.

---

## 10. Adding New Tools

Hisab's modular design makes extending the platform straightforward:

1. **Add Backend Service**:
   Create a new package under `src/main/java/com/hisab/<tool-name>/` with your controller, service, and DTOs.
2. **Register in Tool Catalog**:
   Add the tool metadata to `com.hisab.tools.ToolRegistryService`.
3. **Create Frontend View**:
   Create `frontend/src/views/<ToolName>View.vue`.
4. **Register Route**:
   Add the path `/tools/<tool-name>` in `frontend/src/router/index.ts`.
5. **Add to Frontend Registry**:
   Add the tool to `INITIAL_TOOLS` in `frontend/src/tools/registry.ts`.

The Home page search and category filtering will automatically detect, filter, and render the new tool.
