# Basic Postgres/Express Implimentation

A basic implimentation of a Postgresql database and Nodejs/Express server.

## Installation & Usage

### Installation

- Spin up the containers and start the server and database by running `docker compose up`
- Spin down the containers and stop the server and database by running `docker compose down --remove-orphans --volumes`

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

---

**`/anime` Endpoint**

Get all anime.

`GET /anime`

returns

```json
{
	"anime": [
    {
      "id": int uid,
      "title": string,
      "genre": string,
      "rating": int
    },
    ...
  ]
}
```

---

Get an anime by id.

`GET /anime/:id`

returns

```json
{
	"anime":
    {
      "id": int uid,
      "title": string,
      "genre": string,
      "rating": int
    }
}
```
