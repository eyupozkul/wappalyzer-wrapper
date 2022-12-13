## Wappalayzer Wrapper

### Quick Start

---

#### Docker - Recommended

```bash
# Clone the repository
git clone https://github.com/eyupozkul/wappalyzer-wrapper
# Change directory
cd wappalyzer-wrapper
# Run both backend/frontend (should take a few minutes)
# NOTE: Ports 4173 and 4174 are used by the backend and frontend respectively
docker compose up

# If you changed the code, you can run the following command to rebuild the images
docker compose build --no-cache
docker compose up
```

#### Run Individual Service

You can also run the backend and frontend separately. For more information.

- [Backend](backend/README.md)

- [Frontend](frontend/README.md)
