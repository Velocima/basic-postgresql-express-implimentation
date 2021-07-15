# Basic Postgres/Express Implimentation

A basic implimentation of a Postgresql database and Nodejs/Express server.

## Installation & Usage

### Installation

- To start the server and database run `docker compose up`
- To stop the server and database run `docker compose down --remove-orphans --volumes`

### Usage

- Server listens on port `5000`
- Requests can be made to API endpoints

## API

Accepts and returns JSON.

### Root

The base url of the api is `http://localhost:5000/`

### Endpoints

**`/` Endpoint**

Get `Hello World!` message. For testing (✿◡‿◡)

`GET /`

returns

```json
{
	"message": "Hello World!"
}
```
