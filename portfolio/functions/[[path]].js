import { createRequestHandler } from "@remix-run/node";
import * as build from "../build/index.js";

export default createRequestHandler({ build });
