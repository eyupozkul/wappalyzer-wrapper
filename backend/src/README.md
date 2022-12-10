# Silverlight Backend

:arrow_forward: Node.js 18+

:arrow_forward: Typescript

<br /> <br />

## ️Start development

---

```bash
npm install      # Install dependencies
npm run dev      # Start development server with hot-reload
```

## Run tests

---

```bash
npm run test     # Run tests
```

## Production

---

```bash
npm run build    # Transpile typescript to javascript (output: dist/)
npm run start    # Start production server
```

## :evergreen_tree: File Structure

---

```bash
.
└── src                   # Source files
    ├── application       # Core application logic
    │   ├── interfaces    # Interfaces defined here for communication between layers
    │   └── use_cases     # Business logic of every use case
    ├── config            # Configuration files
    ├── frameworks        # Contains external frameworks/services used in the application
    │   └── db            # Database connections are defines
    └── models            # Database models

```
