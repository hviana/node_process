import { EventEmitter as d } from "./node_events.js";
function s(t) {
  const e = performance.now(),
    r = Math.floor(e / 1e3),
    o = Math.floor(e * 1e6 - r * 1e9);
  if (!t) return [r, o];
  const [i, c] = t;
  return [r - i, o - c];
}
s.bigint = function () {
  const [t, e] = s();
  return BigInt(t) * 1000000000n + BigInt(e);
};
class p extends d {
  title = "browser";
  browser = !0;
  env = {};
  argv = [];
  pid = 0;
  arch = "unknown";
  platform = "browser";
  version = "";
  versions = {};
  emitWarning = () => {
    throw new Error("process.emitWarning is not supported");
  };
  binding = () => {
    throw new Error("process.binding is not supported");
  };
  cwd = () => {
    throw new Error("process.cwd is not supported");
  };
  chdir = (e) => {
    throw new Error("process.chdir is not supported");
  };
  umask = () => 18;
  nextTick = (e, ...r) => queueMicrotask(() => e(...r));
  hrtime = s;
  constructor() {
    super();
  }
}
const n = new p();
if (typeof Deno < "u") {
  n.name = "deno",
    n.browser = !1,
    n.pid = Deno.pid,
    n.cwd = () => Deno.cwd(),
    n.chdir = (e) => Deno.chdir(e),
    n.arch = Deno.build.arch,
    n.platform = Deno.build.os,
    n.version = "v18.12.1",
    n.versions = {
      node: "18.12.1",
      uv: "1.43.0",
      zlib: "1.2.11",
      brotli: "1.0.9",
      ares: "1.18.1",
      modules: "108",
      nghttp2: "1.47.0",
      napi: "8",
      llhttp: "6.0.10",
      openssl: "3.0.7+quic",
      cldr: "41.0",
      icu: "71.1",
      tz: "2022b",
      unicode: "14.0",
      ngtcp2: "0.8.1",
      nghttp3: "0.7.0",
      ...Deno.version,
    },
    n.env = new Proxy({}, {
      get(e, r) {
        return Deno.env.get(String(r));
      },
      ownKeys: () => Reflect.ownKeys(Deno.env.toObject()),
      getOwnPropertyDescriptor: (e, r) => {
        const o = Deno.env.toObject();
        if (r in Deno.env.toObject()) {
          const i = { enumerable: !0, configurable: !0 };
          return typeof r == "string" && (i.value = o[r]), i;
        }
      },
      set(e, r, o) {
        return Deno.env.set(String(r), String(o)), o;
      },
    });
  const t = ["", "", ...Deno.args];
  Object.defineProperty(t, "0", { get: Deno.execPath }),
    Object.defineProperty(t, "1", {
      get: () =>
        Deno.mainModule.startsWith("file:")
          ? new URL(Deno.mainModule).pathname
          : join(Deno.cwd(), "$deno$node.js"),
    }),
    n.argv = t;
} else {
  let t = "/";
  n.cwd = () => t, n.chdir = (e) => t = e;
}
var a = n;
export { a as default };
