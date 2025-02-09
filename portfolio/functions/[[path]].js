import { createRequestHandler } from "@remix-run/node";
import * as build from "../build/index.js"; // Now matches the config

export default createRequestHandler({ build });
