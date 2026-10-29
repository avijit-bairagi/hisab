# Hisab — Architectural Overview & Design Document

## 1. System Vision & Architecture

**Hisab** ("Everyday calculations, made simple") is built as a **Modular Monolith** designed for high developer productivity, rapid local execution, mathematical precision, and zero-headache operations.

```
                    +------------------------------------+
                    |        Client Web Browser          |
                    | (Vue 3 + Vuetify + TypeScript SPA) |
                    +-----------------+------------------+
                                      |
                         HTTP Port 8080 (Same Origin)
                                      |
                                      v
       +--------------------------------------------------------------+
       |               Spring Boot 4.1.x / Embedded Tomcat            |
       |                                                              |
       |  +--------------------+             +---------------------+  |
       |  |  Static / SPA      |             |   REST API v1       |  |
       |  |  Resource Handlers |             |   Controllers       |  |
       |  +---------+----------+             +----------+----------+  |
       |            |                                   |             |
       |            v                                   v             |
       |  [Compiled Vue Assets]              +----------+----------+  |
       |  - index.html (no-cache)            | Domain Services     |  |
       |  - /assets/** (immutable)           | - CalculatorService |  |
       |                                     | - DpsService        |  |
       |                                     | - TaxService        |  |
       |                                     | - ToolRegistry      |  |
       +--------------------------------------------------------------+
```

### Key Architectural Tenets
1. **Single Artifact Deployment**: One executable `target/hisab.jar` packages both Spring Boot backend classes and compiled Vue static assets. No external Node.js runtime, reverse proxy, or container orchestration is required for the application to function in production.
2. **Defensive SPA Routing**:
   - Explicit SPA endpoints (`/`, `/tools/**`) resolve to `/index.html`.
   - Missing static assets (`/assets/*.js`) yield HTTP 404, preventing false 200 SPA responses.
   - Unknown `/api/**` paths return structured JSON error payloads, never falling back to HTML.
3. **Cache Invalidation by Design**:
   - HTML entry point (`/index.html`): `Cache-Control: no-cache, no-store, must-revalidate`.
   - Bundled JavaScript, CSS, and web fonts: `Cache-Control: public, max-age=31536000, immutable`.
   - Users automatically receive asset updates on redeploy without clearing their browser cache.
4. **Deterministic Financial Math**:
   - All arithmetic and financial compounding are handled using `BigDecimal` with `MathContext.DECIMAL128`.
   - Explicit rounding modes (`RoundingMode.HALF_UP`) protect against floating-point inaccuracies.

---

## 2. Tool Domains

### 2.1 Calculator (`com.hisab.calculator`)
- **Safe Parsing**: Evaluates mathematical expressions using a recursive-descent parser.
- **Security**: Rejects arbitrary code, reflection, and external scripting engines.
- **Features**: Supports standard operator precedence, parentheses, decimals, exponentiation (`^`), and postfix percentages (`%`).
- **Defensive Limits**: Division by zero and malformed syntax return explicit `400 Bad Request` messages.

### 2.2 DPS Calculator (`com.hisab.dps`)
- **Model**: Deposit Pension Scheme recurring compound growth calculator.
- **Parameters**: Monthly deposit amount, duration (months), annual interest rate, timing convention (`BEGINNING_OF_MONTH` vs `END_OF_MONTH`), and compounding frequency (`MONTHLY`, `QUARTERLY`, `SEMI_ANNUALLY`, `ANNUALLY`).
- **Output**: Total principal, estimated interest/profit, maturity amount, assumptions list, and year-by-year schedule.

### 2.3 Bangladesh Income Tax Calculator (`com.hisab.tax`)
- **Statutory Alignment**: Implements the **Income Tax Act 2023** and **Finance Act 2024 / 2025** provisions:
  - Employment income exemption: Section 32 & Rule 19 (lower of 1/3 salary or ৳ 4,50,000).
  - Individual taxpayer thresholds: General (৳ 3.5L), Female/Senior 65+ (৳ 4.0L), Persons with Disability (৳ 4.75L), Freedom Fighters (৳ 5.0L), plus ৳ 50,000 for each dependent with disability.
  - Slabs: 0%, 5%, 10%, 15%, 20%, and 25%.
  - Investment rebate: Section 78 (lower of 3% taxable income, 15% investment, or ৳ 10,00,000 cap).
  - Minimum tax: Section 73 (Dhaka/Ctg: ৳ 5,000, other cities: ৳ 4,000, non-city: ৳ 3,000).
- **Rule Separation**: Calculation algorithms are separated from ruleset definitions (`TaxRuleProfile`), ensuring that adding upcoming assessment years does not require altering calculation logic.

---

## 3. Extending the Platform: Adding a New Tool

To add a new tool (e.g., `Expense Tracker` or `Zakat Calculator`):
1. **Backend Registry**: Add the tool definition to `com.hisab.tools.ToolRegistryService`.
2. **Backend Engine**: Create a dedicated package (e.g., `com.hisab.zakat`) containing the controller, service, and DTOs.
3. **Frontend Component & Route**:
   - Create `frontend/src/views/ZakatCalculatorView.vue`.
   - Register route `/tools/zakat-calculator` in `frontend/src/router/index.ts`.
   - Add the tool definition to `frontend/src/tools/registry.ts`.
4. **Auto-Discovery**: The home page search and category filtering automatically detect and display the new tool without layout modifications.
