.PHONY: run-be
# Start backend development server (with hot reload)
run-be:
	cd backend && uvicorn main:app --reload --port 13000