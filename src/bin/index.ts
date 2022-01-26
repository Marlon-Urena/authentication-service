/**
 * Module dependencies.
 */
import app from "../app";
import * as http from "http";
import * as https from "https";
import { debug } from "util";

/**
 * Get port from environment and store in Express.
 */

const httpPort = normalizePort(process.env.HTTP_PORT || "3002");
const httpsPort = normalizePort(process.env.PORT || '5000');

/**
 * Create HTTP server.
 */

const httpServer = http.createServer(app);
const httpsServer = https.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
httpServer.listen(httpPort);
httpsServer.listen(httpsPort)

httpServer.on("error", onError);
httpsServer.on("error", onError);

httpServer.on("listening", () => onListening(httpServer));
httpsServer.on("listening", () => onListening(httpsServer));

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof httpPort === "string"
    ? "Pipe " + httpPort
    : "Port " + httpPort;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(server: http.Server | https.Server) {
  const addr = server.address();
  const bind = typeof addr === "string"
    ? "pipe " + addr
    : "port " + addr!.port;
  debug("Listening on " + bind);
}
