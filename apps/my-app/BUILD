load("@npm//:storybook/package_json.bzl", storybook_bin = "bin")
load("@aspect_rules_js//js:defs.bzl", "js_run_binary", "js_run_devserver")

SRC_PATTERNS = [
    "src/**/*",
    ".storybook/**/*",
    "public/**/*",
]

srcs = glob(
    include = SRC_PATTERNS,
)

npm_deps = [
    "//:node_modules/{}".format(dep)
    for dep in [
        "@types/node",
        "@types/react",
        "@types/react-dom",
        "next",
        "react",
        "react-dom",
        "typescript",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/addon-links",
        "@storybook/blocks",
        "@storybook/nextjs",
        "@storybook/react",
        "@storybook/testing-library",
        "storybook",
        "styled-jsx",
        "@storybook/builder-webpack5",
        "webpack",
        "util",
        "path-browserify",
        "assert",
        "postcss-loader",
        "css-loader"
    ]
]

other_deps = [
    "next-env.d.ts",
    "next.config.js",
    "tsconfig.json",
    "package.json",
    "//:package_json",
]

# Available attributes: sb, sb_binary, sb_test, storybook, storybook_binary, storybook_test
storybook_bin.storybook_binary(
    name = "storybook_binary",
)

js_run_devserver(
    name = "storybook_dev",
    # using a binary tool like :storybook_binary is not supported yet for 
    # hot reloading as it runs like a js_binary.
    command = "/".join([".."] * len(package_name().split("/"))) + "/node_modules/.bin/storybook",
    data = srcs + npm_deps + other_deps,
    chdir = package_name(),
    patch_node_fs = False,
    args = [
        "dev",
        "-p 6009",
        "--no-open"
    ],
    env = {
        "CACHE_DIR": "node_modules/.cache/storybook"
    }
)

js_run_binary(
    name = "build_storybook",
    srcs = srcs + npm_deps + other_deps,
    args = [
        "build",
    ],
    chdir = package_name(),
    out_dirs = ["storybook-static"],
    tool = ":storybook_binary"
)
