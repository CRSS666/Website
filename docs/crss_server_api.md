# The CRSS Mod <-> CRSS Website Communication API

A layer bellow the website api to retrieve and send data to the CRSS server. For example a user requests `https://crss.cc/api/v1/server/players`, the website api will call the crss mod api to get the data from the server.

It will use not use http for reasons.

## Packets

### Get Server Info

#### Client -> Server

| Identifier | Lenght                |
|------------|-----------------------|
| `0x00`     | `0x00 0x00 0x00 0x00` |

* Identifier (1 Byte) - `0x00`
* Length (4 Bytes) - `UInt32`

#### Server -> Client

| Identifier | Lenght                | Data      |
|------------|-----------------------|-----------|
| `0x00`     | `0x00 0x00 0x00 0x00` | `{ ... }` |

* Identifier (1 Byte) - `0x00`
* Length (4 Bytes) - `UInt32`
* Data (*Lenght) - `String` - JSON Object