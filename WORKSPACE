load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
    name = "aspect_rules_js",
    sha256 = "aea8d12bdc4b40127e57fb3da5b61cbb17e969e7786471a71cbff0808c600bcb",
    strip_prefix = "rules_js-1.24.1",
    url = "https://github.com/aspect-build/rules_js/releases/download/v1.24.1/rules_js-v1.24.1.tar.gz",
)

http_archive(
    name = "aspect_rules_ts",
    sha256 = "8eb25d1fdafc0836f5778d33fb8eaac37c64176481d67872b54b0a05de5be5c0",
    strip_prefix = "rules_ts-1.3.3",
    url = "https://github.com/aspect-build/rules_ts/releases/download/v1.3.3/rules_ts-v1.3.3.tar.gz",
)

load("@aspect_rules_js//js:repositories.bzl", "rules_js_dependencies")

rules_js_dependencies()

load("@rules_nodejs//nodejs:repositories.bzl", "DEFAULT_NODE_VERSION", "nodejs_register_toolchains")

nodejs_register_toolchains(
    name = "nodejs",
    node_version = DEFAULT_NODE_VERSION,
)

##################
# rules_ts setup #
##################
# Fetches the rules_ts dependencies.
# If you want to have a different version of some dependency,
# you should fetch it *before* calling this.
# Alternatively, you can skip calling this function, so long as you've
# already fetched all the dependencies.
load("@aspect_rules_ts//ts:repositories.bzl", "rules_ts_dependencies")

rules_ts_dependencies(
    # This keeps the TypeScript version in-sync with the editor, which is typically best.
    ts_version_from = "//:package.json",
)


# Register aspect_bazel_lib toolchains;
# If you use npm_translate_lock or npm_import from aspect_rules_js you can omit this block.
load("@aspect_bazel_lib//lib:repositories.bzl", "register_copy_directory_toolchains", "register_copy_to_directory_toolchains")

register_copy_directory_toolchains()

register_copy_to_directory_toolchains()

load("@aspect_rules_js//npm:npm_import.bzl", "npm_translate_lock")

npm_translate_lock(
    name = "npm",
    pnpm_lock = "//:pnpm-lock.yaml",
    verify_node_modules_ignored = "//:.bazelignore",
	npmrc = "//:.npmrc",
    bins = {
        "storybook": {
            "storybook": "./index.js"
        }
    }
)

load("@npm//:repositories.bzl", "npm_repositories")

npm_repositories()