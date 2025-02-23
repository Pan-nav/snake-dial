const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.Bwgtiiv3.js",app:"_app/immutable/entry/app.Cn8DI5n3.js",imports:["_app/immutable/entry/start.Bwgtiiv3.js","_app/immutable/chunks/D52XMmf-.js","_app/immutable/chunks/Uw8UQGvQ.js","_app/immutable/chunks/ZV-lNZbo.js","_app/immutable/entry/app.Cn8DI5n3.js","_app/immutable/chunks/Uw8UQGvQ.js","_app/immutable/chunks/DZy-YRRM.js","_app/immutable/chunks/BN8xHMNY.js","_app/immutable/chunks/CKxjRRem.js","_app/immutable/chunks/ZV-lNZbo.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-mUCfF48G.js')),
			__memo(() => import('./chunks/1-afPmZ9Q9.js')),
			__memo(() => import('./chunks/2-BY1M3Bsj.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
