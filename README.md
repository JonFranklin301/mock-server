# Mock Server

## Usage

- Run `dist\mock-server.exe`.
- This will launch a server on port `5555`.
- Send a request to the server and it will log the request information.
- All responses from the server are `200 OK`

## Options:

```
Usage: mock-server.exe [options]

Options:
  -V, --version        output the version number
  -p, --port <number>  port to run mock-server on (default: 5555)
  -j, --json           output data in json format (default: false)
  -c, --nocolor        do not use colors (default: false)
  -h, --help           output usage information
```

## Development

- `git clone`
- `npm install`
- Start the server: `npm run start`
- Start development server (watch for changes): `npm run dev`
- Package for win-x86 and win-x64: `npm run pkg`
- Package for win-x86: `npm run pkg-win-x86`
- Package for win-x64: `npm run pkg-win-x64`
