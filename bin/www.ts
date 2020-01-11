#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../app';

import http, { Server } from 'http';
import { AddressInfo } from 'net';
import Debug, { Debugger } from 'debug';

const debug: Debugger = Debug('test-server:server');

/**
 * Get port from environment and store in Express.
 */

const port: string = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server: Server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: any) {
  const port: number = parseInt(val, 10);

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
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind: string = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr: string | AddressInfo | null = server.address();
  const bind: string = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr!.port;
  debug('Listening on ' + bind);
}